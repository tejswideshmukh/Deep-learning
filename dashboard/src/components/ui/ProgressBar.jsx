export default function ProgressBar({ value = 0, max = 100, color = '#6366f1', label, showCount = false, height = 6 }) {
  const percent = max > 0 ? (value / max) * 100 : 0;
  return (
    <div className="w-full">
      {(label || showCount) && (
        <div className="flex justify-between items-center mb-1">
          {label && <span className="text-xs text-text-secondary">{label}</span>}
          {showCount && <span className="text-xs text-text-muted">{value}/{max}</span>}
        </div>
      )}
      <div className="w-full rounded-full bg-bg-hover" style={{ height }}>
        <div
          className="rounded-full transition-all duration-500"
          style={{ width: `${Math.min(percent, 100)}%`, height, backgroundColor: color }}
        />
      </div>
    </div>
  );
}
