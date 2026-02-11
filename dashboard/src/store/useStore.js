import { useState, useEffect, useCallback } from 'react';
import { INITIAL_DSA_PATTERNS, DS_BUILD_PHASES } from '../data/dsaPatterns';
import { INITIAL_ML_TOPICS } from '../data/mlTopics';
import { INITIAL_GENAI_TOPICS } from '../data/genaiTopics';

const STORAGE_KEY = 'placement-dashboard-v1';

const defaultSettings = {
  placementDeadline: '2026-08-15',
  dailyHours: { dsa: 3, ml: 1.5, genai: 1.5, projects: 0.5 },
  workingDaysPerWeek: 6,
  avgTimePerProblem: 30, // minutes
  startDate: '2026-03-01',
};

const defaultProjects = [
  { id: 'p1', name: 'ML Project', description: 'End-to-end ML project with deployment', status: 'Planning', milestones: [], color: '#22c55e' },
  { id: 'p2', name: 'RAG Project', description: 'RAG-based chatbot with vector DB', status: 'Planning', milestones: [], color: '#06b6d4' },
  { id: 'p3', name: 'Agentic AI Project', description: 'Multi-tool agent system', status: 'Planning', milestones: [], color: '#ef4444' },
];

const defaultCompanies = [];

function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.error('Failed to load state:', e);
  }
  return null;
}

function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error('Failed to save state:', e);
  }
}

export function useStore() {
  const [state, setState] = useState(() => {
    const saved = loadState();
    return saved || {
      dsaPatterns: INITIAL_DSA_PATTERNS,
      dsBuildPhases: DS_BUILD_PHASES,
      mlTopics: INITIAL_ML_TOPICS,
      genaiTopics: INITIAL_GENAI_TOPICS,
      projects: defaultProjects,
      companies: defaultCompanies,
      settings: defaultSettings,
      streak: { current: 0, best: 0, lastActiveDate: null, history: {} },
      dailyLogs: {},
    };
  });

  useEffect(() => {
    saveState(state);
  }, [state]);

  const updateDSAPattern = useCallback((id, updates) => {
    setState(prev => ({
      ...prev,
      dsaPatterns: prev.dsaPatterns.map(p => p.id === id ? { ...p, ...updates } : p),
    }));
  }, []);

  const updateBuildTask = useCallback((dsId, taskId, completed) => {
    setState(prev => ({
      ...prev,
      dsBuildPhases: prev.dsBuildPhases.map(ds => {
        if (ds.id !== dsId) return ds;
        return {
          ...ds,
          buildTasks: ds.buildTasks.map(t => t.id === taskId ? { ...t, completed } : t),
          algoTasks: ds.algoTasks.map(t => t.id === taskId ? { ...t, completed } : t),
        };
      }),
    }));
  }, []);

  const updateMLTopic = useCallback((categoryId, sectionId, topicId, updates) => {
    setState(prev => ({
      ...prev,
      mlTopics: prev.mlTopics.map(cat => {
        if (cat.id !== categoryId) return cat;
        return {
          ...cat,
          sections: cat.sections.map(sec => {
            if (sec.id !== sectionId) return sec;
            return {
              ...sec,
              topics: sec.topics.map(t => t.id === topicId ? { ...t, ...updates } : t),
            };
          }),
        };
      }),
    }));
  }, []);

  const updateGenAITopic = useCallback((categoryId, sectionId, topicId, updates) => {
    setState(prev => ({
      ...prev,
      genaiTopics: prev.genaiTopics.map(cat => {
        if (cat.id !== categoryId) return cat;
        return {
          ...cat,
          sections: cat.sections.map(sec => {
            if (sec.id !== sectionId) return sec;
            return {
              ...sec,
              topics: sec.topics.map(t => t.id === topicId ? { ...t, ...updates } : t),
            };
          }),
        };
      }),
    }));
  }, []);

  const updateProject = useCallback((id, updates) => {
    setState(prev => ({
      ...prev,
      projects: prev.projects.map(p => p.id === id ? { ...p, ...updates } : p),
    }));
  }, []);

  const addCompany = useCallback((company) => {
    setState(prev => ({
      ...prev,
      companies: [...prev.companies, { id: Date.now().toString(), ...company }],
    }));
  }, []);

  const updateCompany = useCallback((id, updates) => {
    setState(prev => ({
      ...prev,
      companies: prev.companies.map(c => c.id === id ? { ...c, ...updates } : c),
    }));
  }, []);

  const removeCompany = useCallback((id) => {
    setState(prev => ({
      ...prev,
      companies: prev.companies.filter(c => c.id !== id),
    }));
  }, []);

  const updateSettings = useCallback((updates) => {
    setState(prev => ({
      ...prev,
      settings: { ...prev.settings, ...updates },
    }));
  }, []);

  const logDailyActivity = useCallback((date, track, hours) => {
    setState(prev => ({
      ...prev,
      dailyLogs: {
        ...prev.dailyLogs,
        [date]: { ...(prev.dailyLogs[date] || {}), [track]: hours },
      },
    }));
  }, []);

  const updateStreak = useCallback(() => {
    const today = new Date().toISOString().split('T')[0];
    setState(prev => {
      const lastDate = prev.streak.lastActiveDate;
      const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
      let newCurrent = prev.streak.current;
      if (lastDate === today) return prev;
      if (lastDate === yesterday) {
        newCurrent += 1;
      } else {
        newCurrent = 1;
      }
      return {
        ...prev,
        streak: {
          current: newCurrent,
          best: Math.max(prev.streak.best, newCurrent),
          lastActiveDate: today,
          history: { ...prev.streak.history, [today]: true },
        },
      };
    });
  }, []);

  // Computed values
  const dsaStats = computeDSAStats(state.dsaPatterns, state.dsBuildPhases);
  const mlStats = computeMLStats(state.mlTopics);
  const genaiStats = computeGenAIStats(state.genaiTopics);
  const overallReadiness = computeReadiness(dsaStats, mlStats, genaiStats);

  return {
    ...state,
    updateDSAPattern,
    updateBuildTask,
    updateMLTopic,
    updateGenAITopic,
    updateProject,
    addCompany,
    updateCompany,
    removeCompany,
    updateSettings,
    logDailyActivity,
    updateStreak,
    dsaStats,
    mlStats,
    genaiStats,
    overallReadiness,
  };
}

function computeDSAStats(patterns, buildPhases) {
  const totalProblems = patterns.reduce((s, p) => s + p.targetProblems, 0);
  const solvedProblems = patterns.reduce((s, p) => s + p.problemsSolved, 0);
  const completedPatterns = patterns.filter(p => p.status === 'Completed').length;
  const tier1 = patterns.filter(p => p.tier === 'Tier 1');
  const tier1Solved = tier1.reduce((s, p) => s + p.problemsSolved, 0);
  const tier1Total = tier1.reduce((s, p) => s + p.targetProblems, 0);

  const byCategory = {};
  patterns.forEach(p => {
    if (!byCategory[p.category]) byCategory[p.category] = { solved: 0, total: 0, patterns: 0, completed: 0 };
    byCategory[p.category].solved += p.problemsSolved;
    byCategory[p.category].total += p.targetProblems;
    byCategory[p.category].patterns += 1;
    if (p.status === 'Completed') byCategory[p.category].completed += 1;
  });

  const buildCompleted = buildPhases.reduce((s, ds) => {
    return s + ds.buildTasks.filter(t => t.completed).length + ds.algoTasks.filter(t => t.completed).length;
  }, 0);
  const buildTotal = buildPhases.reduce((s, ds) => s + ds.buildTasks.length + ds.algoTasks.length, 0);

  return { totalProblems, solvedProblems, completedPatterns, totalPatterns: patterns.length, tier1Solved, tier1Total, byCategory, buildCompleted, buildTotal };
}

function computeMLStats(mlTopics) {
  let total = 0;
  let completed = 0;
  const byCategory = {};
  mlTopics.forEach(cat => {
    let catTotal = 0;
    let catCompleted = 0;
    cat.sections.forEach(sec => {
      sec.topics.forEach(t => {
        total++;
        catTotal++;
        if (t.completed) { completed++; catCompleted++; }
      });
    });
    byCategory[cat.name] = { total: catTotal, completed: catCompleted };
  });
  return { total, completed, byCategory };
}

function computeGenAIStats(genaiTopics) {
  let total = 0;
  let completed = 0;
  const byCategory = {};
  genaiTopics.forEach(cat => {
    let catTotal = 0;
    let catCompleted = 0;
    cat.sections.forEach(sec => {
      sec.topics.forEach(t => {
        total++;
        catTotal++;
        if (t.completed) { completed++; catCompleted++; }
      });
    });
    byCategory[cat.name] = { total: catTotal, completed: catCompleted };
  });
  return { total, completed, byCategory };
}

function computeReadiness(dsa, ml, genai) {
  const dsaScore = dsa.totalProblems > 0 ? (dsa.solvedProblems / dsa.totalProblems) * 100 : 0;
  const mlScore = ml.total > 0 ? (ml.completed / ml.total) * 100 : 0;
  const genaiScore = genai.total > 0 ? (genai.completed / genai.total) * 100 : 0;
  // Weighted: DSA 40%, ML/DL 30%, GenAI 30%
  return Math.round(dsaScore * 0.4 + mlScore * 0.3 + genaiScore * 0.3);
}
