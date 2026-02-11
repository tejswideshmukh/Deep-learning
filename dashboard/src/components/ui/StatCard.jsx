export default function StatCard({ label, value, sub, color = '#6366f1', icon: Icon }) {
  return (
    <div className="bg-bg-card border border-border rounded-xl p-4 flex items-start gap-3">
      {Icon && (
        <div className="p-2 rounded-lg" style={{ backgroundColor: color + '20' }}>
          <Icon size={20} style={{ color }} />
        </div>
      )}
      <div>
        <p className="text-2xl font-bold" style={{ color }}>{value}</p>
        <p className="text-sm text-text-secondary mt-0.5">{label}</p>
        {sub && <p className="text-xs text-text-muted mt-0.5">{sub}</p>}
      </div>
    </div>
  );
}
