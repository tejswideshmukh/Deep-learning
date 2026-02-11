import { BarChart3, TrendingUp, Target, Zap } from 'lucide-react';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  RadarChart, PolarGrid, PolarAngleAxis, Radar, PieChart, Pie, Cell,
} from 'recharts';
import ProgressBar from '../components/ui/ProgressBar';
import ProgressRing from '../components/ui/ProgressRing';

const CATEGORY_COLORS = {
  'Array': '#6366f1', 'Binary Search': '#8b5cf6', 'Linked List': '#a855f7',
  'Tree': '#22c55e', 'Graph': '#06b6d4', 'DP': '#f97316',
  'Backtracking': '#eab308', 'Greedy': '#ec4899', 'Bit Manipulation': '#ef4444',
  'Heap': '#14b8a6', 'Trie': '#84cc16', 'Advanced': '#f43f5e', 'Math': '#a78bfa',
};

export default function Analytics({ store }) {
  const { dsaStats, mlStats, genaiStats, dsaPatterns, streak, settings } = store;

  const deadline = new Date(settings.placementDeadline);
  const start = new Date(settings.startDate);
  const today = new Date();
  const totalDays = Math.ceil((deadline - start) / 86400000);
  const elapsedDays = Math.max(0, Math.ceil((today - start) / 86400000));
  const progressPct = totalDays > 0 ? Math.round((elapsedDays / totalDays) * 100) : 0;

  // Category bar chart data
  const categoryData = Object.entries(dsaStats.byCategory).map(([name, data]) => ({
    name: name.length > 8 ? name.slice(0, 6) + '..' : name,
    fullName: name,
    solved: data.solved,
    remaining: data.total - data.solved,
    total: data.total,
    pct: data.total > 0 ? Math.round((data.solved / data.total) * 100) : 0,
  }));

  // Tier breakdown pie
  const tierData = ['Tier 1', 'Tier 2', 'Tier 3'].map(tier => {
    const patterns = dsaPatterns.filter(p => p.tier === tier);
    return {
      name: tier,
      value: patterns.reduce((s, p) => s + p.problemsSolved, 0),
      total: patterns.reduce((s, p) => s + p.targetProblems, 0),
    };
  });
  const TIER_PIE_COLORS = ['#22c55e', '#eab308', '#ef4444'];

  // Status distribution
  const statusData = ['Not Started', 'Learning', 'Practicing', 'Completed', 'Needs Review'].map(status => ({
    name: status,
    count: dsaPatterns.filter(p => p.status === status).length,
  }));
  const STATUS_COLORS = ['#5c5c78', '#eab308', '#6366f1', '#22c55e', '#ef4444'];

  // ML track progress
  const mlCategoryData = Object.entries(mlStats.byCategory).map(([name, data]) => ({
    name: name.length > 12 ? name.slice(0, 10) + '..' : name,
    completed: data.completed,
    total: data.total,
    pct: data.total > 0 ? Math.round((data.completed / data.total) * 100) : 0,
  }));

  // GenAI track progress
  const genaiCategoryData = Object.entries(genaiStats.byCategory).map(([name, data]) => ({
    name: name.length > 12 ? name.slice(0, 10) + '..' : name,
    completed: data.completed,
    total: data.total,
    pct: data.total > 0 ? Math.round((data.completed / data.total) * 100) : 0,
  }));

  // Consistency heatmap (last 30 days)
  const last30 = Array.from({ length: 30 }, (_, i) => {
    const d = new Date(today);
    d.setDate(d.getDate() - (29 - i));
    const key = d.toISOString().split('T')[0];
    return { date: key, active: !!streak.history?.[key], day: d.getDate() };
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Analytics</h1>
        <p className="text-text-secondary text-sm mt-1">
          Day {elapsedDays} of {totalDays} | {progressPct}% of timeline elapsed
        </p>
      </div>

      {/* Timeline Progress */}
      <div className="bg-bg-card border border-border rounded-xl p-4">
        <div className="flex justify-between text-xs text-text-muted mb-2">
          <span>{settings.startDate}</span>
          <span>Today</span>
          <span>{settings.placementDeadline}</span>
        </div>
        <div className="w-full h-3 rounded-full bg-bg-hover relative">
          <div
            className="h-3 rounded-full bg-accent-blue transition-all"
            style={{ width: `${Math.min(progressPct, 100)}%` }}
          />
          <div
            className="absolute top-0 w-0.5 h-5 -mt-1 bg-accent-yellow"
            style={{ left: `${Math.min(progressPct, 100)}%` }}
          />
        </div>
      </div>

      {/* All 3 Track Rings */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'DSA', pct: dsaStats.totalProblems > 0 ? (dsaStats.solvedProblems / dsaStats.totalProblems) * 100 : 0, color: '#6366f1', sub: `${dsaStats.solvedProblems}/${dsaStats.totalProblems} problems` },
          { label: 'ML/DL', pct: mlStats.total > 0 ? (mlStats.completed / mlStats.total) * 100 : 0, color: '#22c55e', sub: `${mlStats.completed}/${mlStats.total} topics` },
          { label: 'GenAI', pct: genaiStats.total > 0 ? (genaiStats.completed / genaiStats.total) * 100 : 0, color: '#ec4899', sub: `${genaiStats.completed}/${genaiStats.total} topics` },
        ].map(track => (
          <div key={track.label} className="bg-bg-card border border-border rounded-xl p-6 flex flex-col items-center">
            <ProgressRing percent={track.pct} color={track.color} size={100} strokeWidth={8} label={track.label} sublabel={track.sub} />
          </div>
        ))}
      </div>

      {/* DSA Category Chart */}
      <div className="bg-bg-card border border-border rounded-xl p-6">
        <h3 className="text-sm font-semibold mb-4">DSA Problems by Category</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={categoryData} layout="vertical">
            <XAxis type="number" tick={{ fill: '#8888a4', fontSize: 11 }} axisLine={{ stroke: '#2a2a3d' }} />
            <YAxis dataKey="name" type="category" tick={{ fill: '#8888a4', fontSize: 11 }} width={70} axisLine={{ stroke: '#2a2a3d' }} />
            <Tooltip
              contentStyle={{ backgroundColor: '#1e1e2e', border: '1px solid #2a2a3d', borderRadius: 8, color: '#e4e4ed' }}
              formatter={(value, name) => [value, name === 'solved' ? 'Solved' : 'Remaining']}
            />
            <Bar dataKey="solved" stackId="a" fill="#6366f1" radius={[0, 0, 0, 0]} />
            <Bar dataKey="remaining" stackId="a" fill="#2a2a3d" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Status + Tier */}
      <div className="grid grid-cols-2 gap-4">
        {/* Pattern Status Distribution */}
        <div className="bg-bg-card border border-border rounded-xl p-6">
          <h3 className="text-sm font-semibold mb-4">Pattern Status (180 patterns)</h3>
          <div className="space-y-2">
            {statusData.map((s, i) => (
              <div key={s.name} className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: STATUS_COLORS[i] }} />
                <span className="text-sm flex-1">{s.name}</span>
                <span className="text-sm font-medium" style={{ color: STATUS_COLORS[i] }}>{s.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tier Breakdown */}
        <div className="bg-bg-card border border-border rounded-xl p-6">
          <h3 className="text-sm font-semibold mb-4">Problems by Tier</h3>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={tierData} dataKey="total" nameKey="name" cx="50%" cy="50%" innerRadius={40} outerRadius={70} paddingAngle={2}>
                {tierData.map((_, i) => <Cell key={i} fill={TIER_PIE_COLORS[i]} />)}
              </Pie>
              <Tooltip
                contentStyle={{ backgroundColor: '#1e1e2e', border: '1px solid #2a2a3d', borderRadius: 8, color: '#e4e4ed' }}
                formatter={(value, name, props) => [`${props.payload.value}/${value} solved`, name]}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-4 mt-2">
            {tierData.map((t, i) => (
              <span key={t.name} className="text-xs flex items-center gap-1">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: TIER_PIE_COLORS[i] }}></span>
                {t.name} ({t.value}/{t.total})
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ML & GenAI Progress */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-bg-card border border-border rounded-xl p-6">
          <h3 className="text-sm font-semibold mb-4">ML/DL Progress</h3>
          <div className="space-y-3">
            {mlCategoryData.map(d => (
              <ProgressBar key={d.name} label={d.name} value={d.completed} max={d.total} showCount color="#22c55e" />
            ))}
          </div>
        </div>
        <div className="bg-bg-card border border-border rounded-xl p-6">
          <h3 className="text-sm font-semibold mb-4">GenAI Progress</h3>
          <div className="space-y-3">
            {genaiCategoryData.map(d => (
              <ProgressBar key={d.name} label={d.name} value={d.completed} max={d.total} showCount color="#ec4899" />
            ))}
          </div>
        </div>
      </div>

      {/* Streak / Consistency */}
      <div className="bg-bg-card border border-border rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold flex items-center gap-2">
            <Zap size={14} className="text-accent-yellow" /> Consistency (Last 30 Days)
          </h3>
          <div className="text-sm">
            <span className="text-accent-orange font-bold">{streak.current}</span>
            <span className="text-text-muted"> day streak | </span>
            <span className="text-accent-yellow font-bold">{streak.best}</span>
            <span className="text-text-muted"> best</span>
          </div>
        </div>
        <div className="flex gap-1">
          {last30.map(d => (
            <div
              key={d.date}
              className="flex-1 h-8 rounded-sm flex items-end justify-center"
              style={{ backgroundColor: d.active ? '#22c55e30' : '#1a1a24' }}
              title={d.date}
            >
              <div
                className="w-full rounded-sm transition-all"
                style={{
                  height: d.active ? '100%' : '20%',
                  backgroundColor: d.active ? '#22c55e' : '#2a2a3d',
                }}
              />
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-1">
          <span className="text-xs text-text-muted">{last30[0].date}</span>
          <span className="text-xs text-text-muted">Today</span>
        </div>
      </div>
    </div>
  );
}
