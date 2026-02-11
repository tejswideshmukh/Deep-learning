import { useState } from 'react';
import { Calendar, Clock, Code2, Brain, Sparkles, FolderKanban, CheckCircle2, Circle } from 'lucide-react';

const TRACKS = [
  { id: 'dsa', label: 'DSA', icon: Code2, color: '#6366f1' },
  { id: 'ml', label: 'AI/ML/DL', icon: Brain, color: '#22c55e' },
  { id: 'genai', label: 'GenAI', icon: Sparkles, color: '#ec4899' },
  { id: 'projects', label: 'Projects', icon: FolderKanban, color: '#f97316' },
];

export default function DailyPlanner({ store }) {
  const { settings, dsaPatterns, dsBuildPhases } = store;
  const today = new Date().toISOString().split('T')[0];
  const dayOfWeek = new Date().toLocaleDateString('en-US', { weekday: 'long' });

  // Auto-generate today's plan based on current progress
  const currentDSPhase = dsBuildPhases.find(ds => {
    const allDone = [...ds.buildTasks, ...ds.algoTasks].every(t => t.completed);
    return !allDone;
  });

  const currentPatterns = dsaPatterns.filter(p => p.status === 'Learning' || p.status === 'Practicing');
  const nextPattern = dsaPatterns.find(p => p.status === 'Not Started' && p.tier === 'Tier 1');

  // Build today's tasks
  const dsaTasks = [];

  if (currentDSPhase) {
    const pendingBuild = currentDSPhase.buildTasks.filter(t => !t.completed);
    const pendingAlgo = currentDSPhase.algoTasks.filter(t => !t.completed);
    if (pendingBuild.length > 0) {
      dsaTasks.push({ type: 'build', label: `BUILD: ${pendingBuild[0].name}`, time: '45 min', done: false });
    }
    if (pendingAlgo.length > 0) {
      dsaTasks.push({ type: 'algo', label: `ALGO: ${pendingAlgo[0].name}`, time: '30 min', done: false });
      if (pendingAlgo.length > 1) {
        dsaTasks.push({ type: 'algo', label: `ALGO: ${pendingAlgo[1].name}`, time: '30 min', done: false });
      }
    }
  }

  if (currentPatterns.length > 0) {
    const p = currentPatterns[0];
    const remaining = p.targetProblems - p.problemsSolved;
    const todayCount = Math.min(remaining, 6);
    dsaTasks.push({ type: 'pattern', label: `PATTERN: ${p.name} (${todayCount} problems)`, time: `${todayCount * 30} min`, done: false });
  } else if (nextPattern && dsaTasks.length < 3) {
    dsaTasks.push({ type: 'pattern', label: `START: ${nextPattern.name} (concept + 3 easy)`, time: '90 min', done: false });
  }

  if (dsaTasks.length === 0) {
    dsaTasks.push({ type: 'info', label: 'Start by picking a pattern or building a DS!', time: '', done: false });
  }

  const [tasks, setTasks] = useState({
    dsa: dsaTasks,
    ml: [
      { type: 'study', label: 'Study current ML topic (theory + notes)', time: '45 min', done: false },
      { type: 'implement', label: 'Implement from scratch (numpy)', time: '45 min', done: false },
    ],
    genai: [
      { type: 'study', label: 'Study current GenAI topic', time: '45 min', done: false },
      { type: 'build', label: 'Build / code along', time: '45 min', done: false },
    ],
    projects: [
      { type: 'work', label: 'Work on current project milestone', time: '30 min', done: false },
    ],
  });

  const toggleTask = (track, idx) => {
    setTasks(prev => ({
      ...prev,
      [track]: prev[track].map((t, i) => i === idx ? { ...t, done: !t.done } : t),
    }));
  };

  const totalMinutes = Object.values(settings.dailyHours).reduce((s, h) => s + h * 60, 0);
  const completedMinutes = Object.entries(tasks).reduce((total, [, trackTasks]) => {
    return total + trackTasks.filter(t => t.done).reduce((s, t) => {
      const mins = parseInt(t.time) || 0;
      return s + mins;
    }, 0);
  }, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Daily Planner</h1>
          <p className="text-text-secondary text-sm mt-1">
            {dayOfWeek}, {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </div>
        <div className="flex items-center gap-2 bg-bg-card border border-border rounded-xl px-4 py-2">
          <Clock size={16} className="text-accent-blue" />
          <span className="text-sm">
            {Math.round(completedMinutes / 60 * 10) / 10}/{Object.values(settings.dailyHours).reduce((s, h) => s + h, 0)} hrs
          </span>
        </div>
      </div>

      {/* Time Allocation Bar */}
      <div className="bg-bg-card border border-border rounded-xl p-4">
        <h3 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">Today's Time Allocation</h3>
        <div className="flex h-4 rounded-full overflow-hidden">
          {TRACKS.map(track => {
            const hours = settings.dailyHours[track.id] || 0;
            const totalHours = Object.values(settings.dailyHours).reduce((s, h) => s + h, 0);
            const pct = totalHours > 0 ? (hours / totalHours) * 100 : 0;
            return (
              <div
                key={track.id}
                style={{ width: `${pct}%`, backgroundColor: track.color }}
                className="transition-all"
                title={`${track.label}: ${hours} hrs`}
              />
            );
          })}
        </div>
        <div className="flex gap-4 mt-2">
          {TRACKS.map(track => (
            <div key={track.id} className="flex items-center gap-1.5 text-xs text-text-secondary">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: track.color }} />
              {track.label}: {settings.dailyHours[track.id]}h
            </div>
          ))}
        </div>
      </div>

      {/* Track Task Lists */}
      <div className="grid grid-cols-2 gap-4">
        {TRACKS.map(track => (
          <div key={track.id} className="bg-bg-card border border-border rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <track.icon size={16} style={{ color: track.color }} />
              <h3 className="text-sm font-semibold">{track.label}</h3>
              <span className="text-xs text-text-muted ml-auto">{settings.dailyHours[track.id]} hrs</span>
            </div>
            <div className="space-y-2">
              {tasks[track.id].map((task, idx) => (
                <button
                  key={idx}
                  onClick={() => toggleTask(track.id, idx)}
                  className={`w-full flex items-center gap-3 p-2.5 rounded-lg text-left transition-colors ${
                    task.done ? 'bg-accent-green/5' : 'bg-bg-hover hover:bg-bg-hover/80'
                  }`}
                >
                  {task.done ? (
                    <CheckCircle2 size={16} className="text-accent-green flex-shrink-0" />
                  ) : (
                    <Circle size={16} className="text-text-muted flex-shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm truncate ${task.done ? 'text-text-muted line-through' : ''}`}>
                      {task.label}
                    </p>
                  </div>
                  {task.time && (
                    <span className="text-xs text-text-muted flex-shrink-0">{task.time}</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Current Focus */}
      <div className="bg-bg-card border border-border rounded-xl p-4">
        <h3 className="text-sm font-semibold mb-3">Current Focus</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="p-3 rounded-lg bg-accent-blue/10 border border-accent-blue/20">
            <p className="text-xs text-accent-blue font-medium">Current DS</p>
            <p className="text-sm mt-1">{currentDSPhase?.name || 'None — pick one!'}</p>
          </div>
          <div className="p-3 rounded-lg bg-accent-green/10 border border-accent-green/20">
            <p className="text-xs text-accent-green font-medium">Current Pattern</p>
            <p className="text-sm mt-1">{currentPatterns[0]?.name || nextPattern?.name || 'None yet'}</p>
          </div>
          <div className="p-3 rounded-lg bg-accent-pink/10 border border-accent-pink/20">
            <p className="text-xs text-accent-pink font-medium">Phase</p>
            <p className="text-sm mt-1">
              {currentDSPhase && !currentDSPhase.buildTasks.every(t => t.completed) ? 'Building DS' :
               currentDSPhase && !currentDSPhase.algoTasks.every(t => t.completed) ? 'Implementing Algos' :
               currentPatterns.length > 0 ? 'Pattern Drilling' : 'Getting Started'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
