import { Code2, Brain, Sparkles, Target, Flame, TrendingUp, Hammer } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar } from 'recharts';
import StatCard from '../components/ui/StatCard';
import ProgressRing from '../components/ui/ProgressRing';
import ProgressBar from '../components/ui/ProgressBar';

export default function Dashboard({ store }) {
  const { dsaStats, mlStats, genaiStats, overallReadiness, streak, settings } = store;

  const deadline = new Date(settings.placementDeadline);
  const today = new Date();
  const daysLeft = Math.max(0, Math.ceil((deadline - today) / (1000 * 60 * 60 * 24)));
  const weeksLeft = Math.ceil(daysLeft / 7);

  // Radar chart data
  const radarData = Object.entries(dsaStats.byCategory).map(([name, data]) => ({
    category: name.length > 10 ? name.slice(0, 8) + '..' : name,
    progress: data.total > 0 ? Math.round((data.solved / data.total) * 100) : 0,
  }));

  // Mock growth data (cumulative progress over time)
  const today_str = new Date().toISOString().split('T')[0];
  const growthData = [
    { month: 'Mar', dsa: 0, ml: 0, genai: 0 },
    { month: 'Apr', dsa: 15, ml: 10, genai: 8 },
    { month: 'May', dsa: 35, ml: 25, genai: 20 },
    { month: 'Jun', dsa: 55, ml: 45, genai: 40 },
    { month: 'Jul', dsa: 75, ml: 65, genai: 60 },
    { month: 'Aug', dsa: 100, ml: 85, genai: 80 },
  ];

  // Current actual data point
  const dsaPct = dsaStats.totalProblems > 0 ? Math.round((dsaStats.solvedProblems / dsaStats.totalProblems) * 100) : 0;
  const mlPct = mlStats.total > 0 ? Math.round((mlStats.completed / mlStats.total) * 100) : 0;
  const genaiPct = genaiStats.total > 0 ? Math.round((genaiStats.completed / genaiStats.total) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Placement Dashboard</h1>
          <p className="text-text-secondary text-sm mt-1">
            {daysLeft} days left ({weeksLeft} weeks) until placement deadline
          </p>
        </div>
        <div className="flex items-center gap-2 bg-bg-card border border-border rounded-xl px-4 py-2">
          <Flame size={20} className="text-accent-orange" />
          <div>
            <p className="text-lg font-bold text-accent-orange">{streak.current}</p>
            <p className="text-xs text-text-muted">day streak</p>
          </div>
        </div>
      </div>

      {/* Overall Readiness */}
      <div className="bg-bg-card border border-border rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Overall Readiness</h2>
          <span className="text-3xl font-bold text-accent-blue">{overallReadiness}%</span>
        </div>
        <div className="w-full h-3 rounded-full bg-bg-hover">
          <div
            className="h-3 rounded-full transition-all duration-700"
            style={{
              width: `${overallReadiness}%`,
              background: `linear-gradient(90deg, #6366f1, #a855f7, #22c55e)`,
            }}
          />
        </div>
        <p className="text-xs text-text-muted mt-2">
          Weighted: DSA 40% + AI/ML/DL 30% + GenAI 30%
        </p>
      </div>

      {/* Track Cards */}
      <div className="grid grid-cols-4 gap-4">
        <StatCard
          icon={Code2}
          label="DSA Problems"
          value={`${dsaStats.solvedProblems}/${dsaStats.totalProblems}`}
          sub={`${dsaStats.completedPatterns}/${dsaStats.totalPatterns} patterns`}
          color="#6366f1"
        />
        <StatCard
          icon={Hammer}
          label="DS Built"
          value={`${dsaStats.buildCompleted}/${dsaStats.buildTotal}`}
          sub="build + algo tasks"
          color="#f97316"
        />
        <StatCard
          icon={Brain}
          label="ML/DL Topics"
          value={`${mlStats.completed}/${mlStats.total}`}
          sub={`${mlPct}% complete`}
          color="#22c55e"
        />
        <StatCard
          icon={Sparkles}
          label="GenAI Topics"
          value={`${genaiStats.completed}/${genaiStats.total}`}
          sub={`${genaiPct}% complete`}
          color="#ec4899"
        />
      </div>

      {/* Tier Progress + Radar */}
      <div className="grid grid-cols-2 gap-4">
        {/* Tier Rings */}
        <div className="bg-bg-card border border-border rounded-xl p-6">
          <h3 className="text-sm font-semibold mb-4">DSA Tier Progress</h3>
          <div className="flex justify-around">
            {['Tier 1', 'Tier 2', 'Tier 3'].map((tier, i) => {
              const patterns = store.dsaPatterns.filter(p => p.tier === tier);
              const solved = patterns.reduce((s, p) => s + p.problemsSolved, 0);
              const total = patterns.reduce((s, p) => s + p.targetProblems, 0);
              const pct = total > 0 ? (solved / total) * 100 : 0;
              const colors = ['#22c55e', '#eab308', '#ef4444'];
              return (
                <ProgressRing
                  key={tier}
                  percent={pct}
                  color={colors[i]}
                  label={tier}
                  sublabel={`${solved}/${total}`}
                />
              );
            })}
          </div>
        </div>

        {/* Radar Chart */}
        <div className="bg-bg-card border border-border rounded-xl p-6">
          <h3 className="text-sm font-semibold mb-4">Category Coverage</h3>
          <ResponsiveContainer width="100%" height={200}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#2a2a3d" />
              <PolarAngleAxis dataKey="category" tick={{ fill: '#8888a4', fontSize: 10 }} />
              <Radar dataKey="progress" stroke="#6366f1" fill="#6366f1" fillOpacity={0.2} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Growth Chart */}
      <div className="bg-bg-card border border-border rounded-xl p-6">
        <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
          <TrendingUp size={16} /> Planned Growth Trajectory
        </h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={growthData}>
            <XAxis dataKey="month" tick={{ fill: '#8888a4', fontSize: 12 }} axisLine={{ stroke: '#2a2a3d' }} />
            <YAxis tick={{ fill: '#8888a4', fontSize: 12 }} axisLine={{ stroke: '#2a2a3d' }} domain={[0, 100]} />
            <Tooltip
              contentStyle={{ backgroundColor: '#1e1e2e', border: '1px solid #2a2a3d', borderRadius: 8, color: '#e4e4ed' }}
            />
            <Line type="monotone" dataKey="dsa" stroke="#6366f1" strokeWidth={2} name="DSA %" dot={false} />
            <Line type="monotone" dataKey="ml" stroke="#22c55e" strokeWidth={2} name="ML/DL %" dot={false} />
            <Line type="monotone" dataKey="genai" stroke="#ec4899" strokeWidth={2} name="GenAI %" dot={false} />
          </LineChart>
        </ResponsiveContainer>
        <div className="flex gap-6 mt-2 justify-center">
          <span className="text-xs flex items-center gap-1"><span className="w-3 h-0.5 bg-accent-blue inline-block"></span> DSA</span>
          <span className="text-xs flex items-center gap-1"><span className="w-3 h-0.5 bg-accent-green inline-block"></span> ML/DL</span>
          <span className="text-xs flex items-center gap-1"><span className="w-3 h-0.5 bg-accent-pink inline-block"></span> GenAI</span>
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="bg-bg-card border border-border rounded-xl p-6">
        <h3 className="text-sm font-semibold mb-4">DSA Category Breakdown</h3>
        <div className="grid grid-cols-2 gap-x-8 gap-y-3">
          {Object.entries(dsaStats.byCategory).map(([cat, data]) => (
            <ProgressBar
              key={cat}
              label={cat}
              value={data.solved}
              max={data.total}
              showCount
              color={data.solved === data.total && data.total > 0 ? '#22c55e' : '#6366f1'}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
