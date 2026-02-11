import { useState } from 'react';
import { Save, RotateCcw } from 'lucide-react';

export default function SettingsPage({ store }) {
  const { settings, updateSettings } = store;
  const [local, setLocal] = useState({ ...settings });
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    updateSettings(local);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = () => {
    if (confirm('This will clear ALL your progress data. Are you sure?')) {
      localStorage.removeItem('placement-dashboard-v1');
      window.location.reload();
    }
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-text-secondary text-sm mt-1">Configure your goal cascade engine</p>
      </div>

      {/* Goal Cascade Settings */}
      <div className="bg-bg-card border border-border rounded-xl p-6 space-y-5">
        <h2 className="font-semibold">Goal Cascade Configuration</h2>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-text-secondary mb-1">Start Date</label>
            <input
              type="date"
              value={local.startDate}
              onChange={e => setLocal(p => ({ ...p, startDate: e.target.value }))}
              className="w-full bg-bg-hover border border-border rounded-lg px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm text-text-secondary mb-1">Placement Deadline</label>
            <input
              type="date"
              value={local.placementDeadline}
              onChange={e => setLocal(p => ({ ...p, placementDeadline: e.target.value }))}
              className="w-full bg-bg-hover border border-border rounded-lg px-3 py-2 text-sm"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm text-text-secondary mb-1">Working Days per Week</label>
          <input
            type="number"
            min="1"
            max="7"
            value={local.workingDaysPerWeek}
            onChange={e => setLocal(p => ({ ...p, workingDaysPerWeek: parseInt(e.target.value) || 6 }))}
            className="w-24 bg-bg-hover border border-border rounded-lg px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label className="block text-sm text-text-secondary mb-1">Avg Time per Problem (minutes)</label>
          <input
            type="number"
            min="10"
            max="120"
            value={local.avgTimePerProblem}
            onChange={e => setLocal(p => ({ ...p, avgTimePerProblem: parseInt(e.target.value) || 30 }))}
            className="w-24 bg-bg-hover border border-border rounded-lg px-3 py-2 text-sm"
          />
        </div>
      </div>

      {/* Daily Hours Allocation */}
      <div className="bg-bg-card border border-border rounded-xl p-6 space-y-4">
        <h2 className="font-semibold">Daily Hours Allocation</h2>
        <p className="text-xs text-text-muted">
          Total: {Object.values(local.dailyHours).reduce((s, h) => s + h, 0)} hrs/day
        </p>

        {[
          { key: 'dsa', label: 'DSA', color: '#6366f1' },
          { key: 'ml', label: 'AI/ML/DL', color: '#22c55e' },
          { key: 'genai', label: 'GenAI & Agentic AI', color: '#ec4899' },
          { key: 'projects', label: 'Projects', color: '#f97316' },
        ].map(track => (
          <div key={track.key} className="flex items-center gap-4">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: track.color }} />
            <span className="text-sm w-40">{track.label}</span>
            <input
              type="number"
              min="0"
              max="12"
              step="0.5"
              value={local.dailyHours[track.key]}
              onChange={e => setLocal(p => ({
                ...p,
                dailyHours: { ...p.dailyHours, [track.key]: parseFloat(e.target.value) || 0 },
              }))}
              className="w-20 bg-bg-hover border border-border rounded-lg px-3 py-2 text-sm text-center"
            />
            <span className="text-xs text-text-muted">hrs</span>
            <input
              type="range"
              min="0"
              max="6"
              step="0.5"
              value={local.dailyHours[track.key]}
              onChange={e => setLocal(p => ({
                ...p,
                dailyHours: { ...p.dailyHours, [track.key]: parseFloat(e.target.value) },
              }))}
              className="flex-1 accent-accent-blue"
            />
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button
          onClick={handleSave}
          className="flex items-center gap-2 bg-accent-blue text-white px-6 py-2.5 rounded-lg text-sm hover:bg-accent-blue/90 transition-colors"
        >
          <Save size={16} />
          {saved ? 'Saved!' : 'Save Settings'}
        </button>
        <button
          onClick={handleReset}
          className="flex items-center gap-2 bg-accent-red/10 text-accent-red border border-accent-red/30 px-6 py-2.5 rounded-lg text-sm hover:bg-accent-red/20 transition-colors"
        >
          <RotateCcw size={16} />
          Reset All Data
        </button>
      </div>
    </div>
  );
}
