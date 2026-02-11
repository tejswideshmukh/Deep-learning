import { useState } from 'react';
import { Plus, X, FolderKanban } from 'lucide-react';

const STATUS_OPTIONS = ['Planning', 'Building', 'Polishing', 'Deployed'];
const STATUS_COLORS = { Planning: '#eab308', Building: '#6366f1', Polishing: '#f97316', Deployed: '#22c55e' };

export default function Projects({ store }) {
  const { projects, updateProject } = store;
  const [addingMilestone, setAddingMilestone] = useState(null);
  const [newMilestone, setNewMilestone] = useState('');

  const addMilestone = (projectId) => {
    if (!newMilestone.trim()) return;
    const project = projects.find(p => p.id === projectId);
    updateProject(projectId, {
      milestones: [...project.milestones, { id: Date.now().toString(), text: newMilestone.trim(), done: false }],
    });
    setNewMilestone('');
    setAddingMilestone(null);
  };

  const toggleMilestone = (projectId, milestoneId) => {
    const project = projects.find(p => p.id === projectId);
    updateProject(projectId, {
      milestones: project.milestones.map(m => m.id === milestoneId ? { ...m, done: !m.done } : m),
    });
  };

  const removeMilestone = (projectId, milestoneId) => {
    const project = projects.find(p => p.id === projectId);
    updateProject(projectId, {
      milestones: project.milestones.filter(m => m.id !== milestoneId),
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Projects</h1>
        <p className="text-text-secondary text-sm mt-1">
          Track your portfolio projects — at least 1 ML, 1 RAG, 1 Agentic AI
        </p>
      </div>

      {/* Status Lane Overview */}
      <div className="grid grid-cols-4 gap-3">
        {STATUS_OPTIONS.map(status => {
          const count = projects.filter(p => p.status === status).length;
          return (
            <div key={status} className="bg-bg-card border border-border rounded-lg p-3 text-center">
              <p className="text-xs text-text-muted uppercase tracking-wider">{status}</p>
              <p className="text-xl font-bold mt-1" style={{ color: STATUS_COLORS[status] }}>{count}</p>
            </div>
          );
        })}
      </div>

      {/* Project Cards */}
      <div className="grid grid-cols-1 gap-4">
        {projects.map(project => {
          const doneMilestones = project.milestones.filter(m => m.done).length;
          const totalMilestones = project.milestones.length;

          return (
            <div key={project.id} className="bg-bg-card border border-border rounded-xl p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: project.color }} />
                  <div>
                    <h3 className="font-semibold">{project.name}</h3>
                    <p className="text-sm text-text-secondary">{project.description}</p>
                  </div>
                </div>
                <select
                  value={project.status}
                  onChange={e => updateProject(project.id, { status: e.target.value })}
                  className="bg-bg-hover border border-border rounded-lg px-3 py-1.5 text-xs"
                  style={{ color: STATUS_COLORS[project.status] }}
                >
                  {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              {/* Milestones */}
              <div className="space-y-1.5">
                {totalMilestones > 0 && (
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex-1 h-1.5 rounded-full bg-bg-hover">
                      <div
                        className="h-1.5 rounded-full transition-all"
                        style={{
                          width: `${totalMilestones > 0 ? (doneMilestones / totalMilestones) * 100 : 0}%`,
                          backgroundColor: project.color,
                        }}
                      />
                    </div>
                    <span className="text-xs text-text-muted">{doneMilestones}/{totalMilestones}</span>
                  </div>
                )}

                {project.milestones.map(m => (
                  <div key={m.id} className="flex items-center gap-2 group">
                    <input
                      type="checkbox"
                      checked={m.done}
                      onChange={() => toggleMilestone(project.id, m.id)}
                      className="w-3.5 h-3.5 accent-accent-green"
                    />
                    <span className={`text-sm flex-1 ${m.done ? 'text-text-muted line-through' : ''}`}>{m.text}</span>
                    <button
                      onClick={() => removeMilestone(project.id, m.id)}
                      className="opacity-0 group-hover:opacity-100 text-text-muted hover:text-accent-red transition-opacity"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}

                {addingMilestone === project.id ? (
                  <div className="flex gap-2 mt-2">
                    <input
                      autoFocus
                      value={newMilestone}
                      onChange={e => setNewMilestone(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && addMilestone(project.id)}
                      placeholder="Add milestone..."
                      className="flex-1 bg-bg-hover border border-border rounded px-3 py-1.5 text-sm"
                    />
                    <button
                      onClick={() => addMilestone(project.id)}
                      className="bg-accent-blue text-white px-3 py-1.5 rounded text-sm"
                    >
                      Add
                    </button>
                    <button
                      onClick={() => { setAddingMilestone(null); setNewMilestone(''); }}
                      className="text-text-muted px-2"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setAddingMilestone(project.id)}
                    className="flex items-center gap-1.5 text-xs text-text-muted hover:text-accent-blue mt-2 transition-colors"
                  >
                    <Plus size={14} /> Add milestone
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
