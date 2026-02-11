export default function ProgressRing({ percent = 0, size = 80, strokeWidth = 6, color = '#6366f1', label, sublabel }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-1">
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#2a2a3d"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 0.5s ease' }}
        />
      </svg>
      <div className="text-center -mt-[calc(50%+12px)] mb-4">
        <p className="text-sm font-bold" style={{ color }}>{Math.round(percent)}%</p>
      </div>
      {label && <p className="text-xs font-medium text-text-primary">{label}</p>}
      {sublabel && <p className="text-xs text-text-muted">{sublabel}</p>}
    </div>
  );
}
