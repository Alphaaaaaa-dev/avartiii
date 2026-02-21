import type { SensorData } from '@/hooks/useSensorData';

const Sparkline = ({ data, status }: { data: number[]; status: string }) => {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const h = 30;
  const w = 120;
  const points = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / range) * h}`).join(' ');
  const color = status === 'CRITICAL' ? 'hsl(0 100% 55%)' : status === 'WARNING' ? 'hsl(44 100% 50%)' : 'hsl(187 100% 50%)';

  return (
    <svg width={w} height={h} className="mt-2">
      <polyline points={points} fill="none" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
};

const statusColors = {
  NORMAL: { border: 'border-border', glow: '', badge: 'bg-safe/20 text-safe', bar: 'bg-safe' },
  WARNING: { border: 'border-warning/50', glow: 'glow-amber', badge: 'bg-warning/20 text-warning', bar: 'bg-warning' },
  CRITICAL: { border: 'border-destructive/50', glow: 'glow-red', badge: 'bg-destructive/20 text-destructive', bar: 'bg-destructive' },
};

const SensorCard = ({ sensor }: { sensor: SensorData }) => {
  const colors = statusColors[sensor.status];
  const percent = Math.min(100, (sensor.value / sensor.max) * 100);

  return (
    <div className={`bg-card border ${colors.border} ${colors.glow} p-5 transition-all duration-300 hover:-translate-y-1`}>
      <div className="flex justify-between items-start mb-3">
        <div>
          <div className="text-sm font-body font-semibold text-foreground">{sensor.name}</div>
          <div className="text-[10px] font-mono-space text-muted-foreground">{sensor.nodeId}</div>
        </div>
        <span className={`text-[9px] font-mono-space tracking-wider px-2 py-0.5 ${colors.badge}`} aria-label={`Status: ${sensor.status}`}>
          {sensor.status}
        </span>
      </div>

      <div className="text-3xl font-mono-space text-muted-foreground/20 font-bold mb-1">{sensor.formula}</div>

      <div className="flex items-baseline gap-2 mb-3">
        <span className="text-2xl font-display text-foreground">{sensor.value}</span>
        <span className="text-xs font-mono-space text-muted-foreground">{sensor.unit}</span>
      </div>

      <div className="w-full h-1 bg-muted mb-2">
        <div className={`h-full ${colors.bar} transition-all duration-500`} style={{ width: `${percent}%` }} />
      </div>

      <div className="flex justify-between text-[9px] font-mono-space text-muted-foreground mb-1">
        <span>MIN {sensor.min}</span>
        <span>MAX {sensor.max}</span>
      </div>

      <Sparkline data={sensor.history} status={sensor.status} />
    </div>
  );
};

export default SensorCard;
