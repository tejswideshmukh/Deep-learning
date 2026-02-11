import { useState } from 'react';
import { ChevronDown, ChevronRight, CheckCircle2, Circle, Wrench, Cpu, Shuffle } from 'lucide-react';
import { DSA_CATEGORIES, TIER_COLORS, STATUS_OPTIONS, MASTERY_LEVELS } from '../data/dsaPatterns';
import ProgressBar from '../components/ui/ProgressBar';

export default function DSATracker({ store }) {
  const { dsaPatterns, dsBuildPhases, updateDSAPattern, updateBuildTask } = store;
  const [activeTab, setActiveTab] = useState('patterns');
  const [expandedCategories, setExpandedCategories] = useState(new Set(['Array']));
  const [expandedDS, setExpandedDS] = useState(new Set());
  const [filterTier, setFilterTier] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');

  const toggleCategory = (cat) => {
    setExpandedCategories(prev => {
      const next = new Set(prev);
      next.has(cat) ? next.delete(cat) : next.add(cat);
      return next;
    });
  };

  const toggleDS = (id) => {
    setExpandedDS(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const filtered = dsaPatterns.filter(p => {
    if (filterTier !== 'All' && p.tier !== filterTier) return false;
    if (filterStatus !== 'All' && p.status !== filterStatus) return false;
    return true;
  });

  const grouped = {};
  filtered.forEach(p => {
    if (!grouped[p.category]) grouped[p.category] = [];
    grouped[p.category].push(p);
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">DSA Tracker</h1>
        <p className="text-text-secondary text-sm mt-1">
          {dsaPatterns.filter(p => p.status === 'Completed').length}/{dsaPatterns.length} patterns completed |{' '}
          {dsaPatterns.reduce((s, p) => s + p.problemsSolved, 0)}/{dsaPatterns.reduce((s, p) => s + p.targetProblems, 0)} problems solved
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-bg-secondary rounded-lg p-1 w-fit">
        {[
          { id: 'build', label: 'Build DS', icon: Wrench },
          { id: 'patterns', label: 'Patterns', icon: Cpu },
          { id: 'mix', label: 'Mixed Practice', icon: Shuffle },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm transition-colors ${
              activeTab === tab.id
                ? 'bg-accent-blue text-white font-medium'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            <tab.icon size={14} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* BUILD TAB */}
      {activeTab === 'build' && (
        <div className="space-y-4">
          <p className="text-sm text-text-secondary">
            Phase 1 & 2: Build data structures from scratch and implement core algorithms.
          </p>
          {dsBuildPhases.map(ds => {
            const isExpanded = expandedDS.has(ds.id);
            const buildDone = ds.buildTasks.filter(t => t.completed).length;
            const algoDone = ds.algoTasks.filter(t => t.completed).length;
            const totalDone = buildDone + algoDone;
            const totalTasks = ds.buildTasks.length + ds.algoTasks.length;

            return (
              <div key={ds.id} className="bg-bg-card border border-border rounded-xl overflow-hidden">
                <button
                  onClick={() => toggleDS(ds.id)}
                  className="w-full flex items-center justify-between p-4 hover:bg-bg-hover transition-colors"
                >
                  <div className="flex items-center gap-3">
                    {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                    <span className="font-medium">{ds.name}</span>
                    <span className="text-xs text-text-muted px-2 py-0.5 bg-bg-hover rounded">
                      {totalDone}/{totalTasks} done
                    </span>
                  </div>
                  <div className="w-32">
                    <ProgressBar value={totalDone} max={totalTasks} color="#f97316" height={4} />
                  </div>
                </button>

                {isExpanded && (
                  <div className="px-4 pb-4 space-y-3">
                    {/* Build Tasks */}
                    <div>
                      <h4 className="text-xs font-semibold text-accent-orange uppercase tracking-wide mb-2">
                        Build from Scratch
                      </h4>
                      {ds.buildTasks.map(task => (
                        <label key={task.id} className="flex items-center gap-3 py-1.5 px-2 rounded hover:bg-bg-hover cursor-pointer">
                          <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={(e) => updateBuildTask(ds.id, task.id, e.target.checked)}
                            className="w-4 h-4 accent-accent-orange"
                          />
                          <span className={task.completed ? 'text-text-muted line-through' : 'text-text-primary'}>
                            {task.name}
                          </span>
                        </label>
                      ))}
                    </div>
                    {/* Algo Tasks */}
                    <div>
                      <h4 className="text-xs font-semibold text-accent-purple uppercase tracking-wide mb-2">
                        Implement Algorithms
                      </h4>
                      {ds.algoTasks.map(task => (
                        <label key={task.id} className="flex items-center gap-3 py-1.5 px-2 rounded hover:bg-bg-hover cursor-pointer">
                          <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={(e) => updateBuildTask(ds.id, task.id, e.target.checked)}
                            className="w-4 h-4 accent-accent-purple"
                          />
                          <span className={task.completed ? 'text-text-muted line-through' : 'text-text-primary'}>
                            {task.name}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* PATTERNS TAB */}
      {activeTab === 'patterns' && (
        <div className="space-y-4">
          {/* Filters */}
          <div className="flex gap-3">
            <select
              value={filterTier}
              onChange={e => setFilterTier(e.target.value)}
              className="bg-bg-card border border-border rounded-lg px-3 py-1.5 text-sm text-text-primary"
            >
              <option value="All">All Tiers</option>
              <option value="Tier 1">Tier 1</option>
              <option value="Tier 2">Tier 2</option>
              <option value="Tier 3">Tier 3</option>
            </select>
            <select
              value={filterStatus}
              onChange={e => setFilterStatus(e.target.value)}
              className="bg-bg-card border border-border rounded-lg px-3 py-1.5 text-sm text-text-primary"
            >
              <option value="All">All Status</option>
              {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          {/* Pattern Groups */}
          {DSA_CATEGORIES.filter(cat => grouped[cat]).map(cat => {
            const patterns = grouped[cat];
            const isExpanded = expandedCategories.has(cat);
            const catSolved = patterns.reduce((s, p) => s + p.problemsSolved, 0);
            const catTotal = patterns.reduce((s, p) => s + p.targetProblems, 0);
            const catCompleted = patterns.filter(p => p.status === 'Completed').length;

            return (
              <div key={cat} className="bg-bg-card border border-border rounded-xl overflow-hidden">
                <button
                  onClick={() => toggleCategory(cat)}
                  className="w-full flex items-center justify-between p-4 hover:bg-bg-hover transition-colors"
                >
                  <div className="flex items-center gap-3">
                    {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                    <span className="font-medium">{cat}</span>
                    <span className="text-xs text-text-muted">
                      {catCompleted}/{patterns.length} patterns | {catSolved}/{catTotal} problems
                    </span>
                  </div>
                  <div className="w-40">
                    <ProgressBar value={catSolved} max={catTotal} color="#6366f1" height={4} />
                  </div>
                </button>

                {isExpanded && (
                  <div className="px-4 pb-4">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="text-text-muted text-xs uppercase tracking-wider">
                          <th className="text-left py-2 font-medium">Pattern</th>
                          <th className="text-center py-2 font-medium w-20">Tier</th>
                          <th className="text-center py-2 font-medium w-28">Status</th>
                          <th className="text-center py-2 font-medium w-24">Progress</th>
                          <th className="text-center py-2 font-medium w-28">Mastery</th>
                        </tr>
                      </thead>
                      <tbody>
                        {patterns.map(p => (
                          <tr key={p.id} className="border-t border-border/50 hover:bg-bg-hover">
                            <td className="py-2.5 flex items-center gap-2">
                              {p.status === 'Completed' ? (
                                <CheckCircle2 size={14} className="text-accent-green flex-shrink-0" />
                              ) : (
                                <Circle size={14} className="text-text-muted flex-shrink-0" />
                              )}
                              <span className={p.status === 'Completed' ? 'text-text-muted' : ''}>{p.name}</span>
                            </td>
                            <td className="text-center">
                              <span
                                className="text-xs px-2 py-0.5 rounded-full font-medium"
                                style={{ color: TIER_COLORS[p.tier], backgroundColor: TIER_COLORS[p.tier] + '20' }}
                              >
                                {p.tier.replace('Tier ', 'T')}
                              </span>
                            </td>
                            <td className="text-center">
                              <select
                                value={p.status}
                                onChange={e => updateDSAPattern(p.id, {
                                  status: e.target.value,
                                  dateStarted: p.dateStarted || (e.target.value !== 'Not Started' ? new Date().toISOString().split('T')[0] : null),
                                  dateCompleted: e.target.value === 'Completed' ? new Date().toISOString().split('T')[0] : null,
                                })}
                                className="bg-bg-hover border border-border rounded px-2 py-1 text-xs text-text-primary w-full"
                              >
                                {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                              </select>
                            </td>
                            <td className="text-center">
                              <div className="flex items-center gap-1 justify-center">
                                <input
                                  type="number"
                                  min="0"
                                  max={p.targetProblems}
                                  value={p.problemsSolved}
                                  onChange={e => updateDSAPattern(p.id, { problemsSolved: Math.min(parseInt(e.target.value) || 0, p.targetProblems) })}
                                  className="bg-bg-hover border border-border rounded px-2 py-1 text-xs text-center w-12"
                                />
                                <span className="text-xs text-text-muted">/{p.targetProblems}</span>
                              </div>
                            </td>
                            <td className="text-center">
                              <select
                                value={p.masteryLevel}
                                onChange={e => updateDSAPattern(p.id, { masteryLevel: e.target.value })}
                                className="bg-bg-hover border border-border rounded px-2 py-1 text-xs text-text-primary"
                              >
                                {MASTERY_LEVELS.map(m => <option key={m} value={m}>{m}</option>)}
                              </select>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* MIX TAB */}
      {activeTab === 'mix' && (
        <div className="bg-bg-card border border-border rounded-xl p-6 text-center">
          <Shuffle size={48} className="text-text-muted mx-auto mb-4" />
          <h3 className="font-semibold mb-2">Mixed Practice Mode</h3>
          <p className="text-sm text-text-secondary max-w-md mx-auto mb-4">
            After completing patterns for a data structure, practice random problems
            without labels. Identify which pattern applies and solve it.
          </p>
          <p className="text-xs text-text-muted">
            Complete at least 50% of a category's patterns to unlock mixed practice for it.
          </p>
          <div className="mt-6 grid grid-cols-3 gap-3 max-w-lg mx-auto">
            {DSA_CATEGORIES.slice(0, 9).map(cat => {
              const catPatterns = dsaPatterns.filter(p => p.category === cat);
              const completed = catPatterns.filter(p => p.status === 'Completed').length;
              const unlocked = completed >= catPatterns.length * 0.5;
              return (
                <div
                  key={cat}
                  className={`p-3 rounded-lg border text-xs ${
                    unlocked ? 'border-accent-green/30 bg-accent-green/5 text-accent-green' : 'border-border bg-bg-hover text-text-muted'
                  }`}
                >
                  {cat}
                  <p className="text-xs mt-1">{completed}/{catPatterns.length}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
