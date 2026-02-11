import { useState } from 'react';
import { ChevronDown, ChevronRight, CheckCircle2, Circle } from 'lucide-react';
import ProgressBar from '../components/ui/ProgressBar';

const MASTERY_LABELS = ['Not Started', 'Concept', 'Implement', 'Apply', 'Explain'];
const MASTERY_COLORS = ['#5c5c78', '#eab308', '#f97316', '#6366f1', '#22c55e'];

export default function MLTracker({ store }) {
  const { mlTopics, updateMLTopic, mlStats } = store;
  const [expandedCats, setExpandedCats] = useState(new Set(['math']));
  const [expandedSecs, setExpandedSecs] = useState(new Set());

  const toggleCat = (id) => {
    setExpandedCats(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
  };
  const toggleSec = (id) => {
    setExpandedSecs(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">AI / ML / DL Tracker</h1>
        <p className="text-text-secondary text-sm mt-1">
          {mlStats.completed}/{mlStats.total} topics completed |
          Math → Classical ML → Deep Learning → System Design
        </p>
      </div>

      {/* Mastery Legend */}
      <div className="flex gap-4 flex-wrap">
        {MASTERY_LABELS.map((label, i) => (
          <div key={label} className="flex items-center gap-1.5 text-xs">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: MASTERY_COLORS[i] }} />
            <span className="text-text-secondary">{label}</span>
          </div>
        ))}
      </div>

      {/* Category Cards */}
      {mlTopics.map(cat => {
        const isExpanded = expandedCats.has(cat.id);
        const catStats = mlStats.byCategory[cat.name] || { total: 0, completed: 0 };

        return (
          <div key={cat.id} className="bg-bg-card border border-border rounded-xl overflow-hidden">
            <button
              onClick={() => toggleCat(cat.id)}
              className="w-full flex items-center justify-between p-4 hover:bg-bg-hover transition-colors"
            >
              <div className="flex items-center gap-3">
                {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: cat.color }} />
                <span className="font-medium">{cat.name}</span>
                <span className="text-xs text-text-muted">
                  {catStats.completed}/{catStats.total} topics
                </span>
              </div>
              <div className="w-40">
                <ProgressBar value={catStats.completed} max={catStats.total} color={cat.color} height={4} />
              </div>
            </button>

            {isExpanded && (
              <div className="px-4 pb-4 space-y-3">
                {cat.sections.map(sec => {
                  const secExpanded = expandedSecs.has(sec.id);
                  const secDone = sec.topics.filter(t => t.completed).length;

                  return (
                    <div key={sec.id} className="border border-border/50 rounded-lg overflow-hidden">
                      <button
                        onClick={() => toggleSec(sec.id)}
                        className="w-full flex items-center justify-between px-3 py-2.5 hover:bg-bg-hover transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          {secExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                          <span className="text-sm font-medium">{sec.name}</span>
                          <span className="text-xs text-text-muted">{secDone}/{sec.topics.length}</span>
                        </div>
                      </button>

                      {secExpanded && (
                        <div className="px-3 pb-3">
                          {sec.topics.map(topic => (
                            <div key={topic.id} className="flex items-center gap-3 py-2 border-t border-border/30 first:border-t-0">
                              <button
                                onClick={() => updateMLTopic(cat.id, sec.id, topic.id, { completed: !topic.completed })}
                                className="flex-shrink-0"
                              >
                                {topic.completed ? (
                                  <CheckCircle2 size={16} className="text-accent-green" />
                                ) : (
                                  <Circle size={16} className="text-text-muted" />
                                )}
                              </button>
                              <span className={`flex-1 text-sm ${topic.completed ? 'text-text-muted line-through' : ''}`}>
                                {topic.name}
                              </span>
                              <div className="flex gap-1">
                                {[1, 2, 3, 4].map(level => (
                                  <button
                                    key={level}
                                    onClick={() => updateMLTopic(cat.id, sec.id, topic.id, { mastery: topic.mastery === level ? 0 : level })}
                                    className="w-5 h-5 rounded-full border text-[9px] font-bold flex items-center justify-center transition-colors"
                                    style={{
                                      borderColor: topic.mastery >= level ? MASTERY_COLORS[level] : '#2a2a3d',
                                      backgroundColor: topic.mastery >= level ? MASTERY_COLORS[level] + '30' : 'transparent',
                                      color: topic.mastery >= level ? MASTERY_COLORS[level] : '#5c5c78',
                                    }}
                                    title={MASTERY_LABELS[level]}
                                  >
                                    {level}
                                  </button>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
