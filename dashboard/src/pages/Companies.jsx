import { useState } from 'react';
import { Plus, X, Building2, ExternalLink } from 'lucide-react';

const PIPELINE_STAGES = ['Wishlist', 'Applied', 'OA', 'Interview', 'Offer', 'Rejected'];
const STAGE_COLORS = {
  Wishlist: '#5c5c78', Applied: '#6366f1', OA: '#eab308',
  Interview: '#f97316', Offer: '#22c55e', Rejected: '#ef4444',
};

export default function Companies({ store }) {
  const { companies, addCompany, updateCompany, removeCompany } = store;
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ name: '', role: '', stage: 'Wishlist', notes: '' });

  const handleAdd = () => {
    if (!form.name.trim()) return;
    addCompany(form);
    setForm({ name: '', role: '', stage: 'Wishlist', notes: '' });
    setShowAdd(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Company Pipeline</h1>
          <p className="text-text-secondary text-sm mt-1">
            Track applications and interview progress
          </p>
        </div>
        <button
          onClick={() => setShowAdd(true)}
          className="flex items-center gap-2 bg-accent-blue text-white px-4 py-2 rounded-lg text-sm hover:bg-accent-blue/90 transition-colors"
        >
          <Plus size={16} /> Add Company
        </button>
      </div>

      {/* Pipeline Overview */}
      <div className="grid grid-cols-6 gap-2">
        {PIPELINE_STAGES.map(stage => {
          const count = companies.filter(c => c.stage === stage).length;
          return (
            <div key={stage} className="bg-bg-card border border-border rounded-lg p-3 text-center">
              <p className="text-xs text-text-muted">{stage}</p>
              <p className="text-xl font-bold mt-1" style={{ color: STAGE_COLORS[stage] }}>{count}</p>
            </div>
          );
        })}
      </div>

      {/* Add Form */}
      {showAdd && (
        <div className="bg-bg-card border border-accent-blue/30 rounded-xl p-4 space-y-3">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-semibold">Add Company</h3>
            <button onClick={() => setShowAdd(false)} className="text-text-muted"><X size={16} /></button>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <input
              autoFocus
              value={form.name}
              onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
              placeholder="Company name"
              className="bg-bg-hover border border-border rounded-lg px-3 py-2 text-sm"
            />
            <input
              value={form.role}
              onChange={e => setForm(p => ({ ...p, role: e.target.value }))}
              placeholder="Role (e.g. SDE Intern)"
              className="bg-bg-hover border border-border rounded-lg px-3 py-2 text-sm"
            />
            <select
              value={form.stage}
              onChange={e => setForm(p => ({ ...p, stage: e.target.value }))}
              className="bg-bg-hover border border-border rounded-lg px-3 py-2 text-sm"
            >
              {PIPELINE_STAGES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <input
            value={form.notes}
            onChange={e => setForm(p => ({ ...p, notes: e.target.value }))}
            placeholder="Notes (optional)"
            className="w-full bg-bg-hover border border-border rounded-lg px-3 py-2 text-sm"
          />
          <button onClick={handleAdd} className="bg-accent-blue text-white px-4 py-2 rounded-lg text-sm">
            Add to Pipeline
          </button>
        </div>
      )}

      {/* Company List */}
      {companies.length === 0 ? (
        <div className="bg-bg-card border border-border rounded-xl p-8 text-center">
          <Building2 size={48} className="text-text-muted mx-auto mb-3" />
          <p className="text-text-secondary">No companies yet. Add your target companies!</p>
        </div>
      ) : (
        <div className="bg-bg-card border border-border rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left px-4 py-3 text-xs text-text-muted uppercase tracking-wider font-medium">Company</th>
                <th className="text-left px-4 py-3 text-xs text-text-muted uppercase tracking-wider font-medium">Role</th>
                <th className="text-center px-4 py-3 text-xs text-text-muted uppercase tracking-wider font-medium">Stage</th>
                <th className="text-left px-4 py-3 text-xs text-text-muted uppercase tracking-wider font-medium">Notes</th>
                <th className="w-10"></th>
              </tr>
            </thead>
            <tbody>
              {companies.map(c => (
                <tr key={c.id} className="border-b border-border/50 hover:bg-bg-hover">
                  <td className="px-4 py-3 font-medium">{c.name}</td>
                  <td className="px-4 py-3 text-text-secondary">{c.role}</td>
                  <td className="px-4 py-3 text-center">
                    <select
                      value={c.stage}
                      onChange={e => updateCompany(c.id, { stage: e.target.value })}
                      className="bg-bg-hover border border-border rounded px-2 py-1 text-xs"
                      style={{ color: STAGE_COLORS[c.stage] }}
                    >
                      {PIPELINE_STAGES.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </td>
                  <td className="px-4 py-3 text-text-muted text-xs">{c.notes}</td>
                  <td className="px-2 py-3">
                    <button onClick={() => removeCompany(c.id)} className="text-text-muted hover:text-accent-red">
                      <X size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
