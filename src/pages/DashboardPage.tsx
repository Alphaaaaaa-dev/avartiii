import { useSensorData } from '@/hooks/useSensorData';
import { AlertTriangle, Radio, Shield, Activity, Zap, Users } from 'lucide-react';

const DashboardPage = () => {
  const sensors = useSensorData();
  const criticalCount = sensors.filter(s => s.status === 'CRITICAL').length;
  const warningCount = sensors.filter(s => s.status === 'WARNING').length;
  const normalCount = sensors.filter(s => s.status === 'NORMAL').length;

  const stats = [
    { label: 'TOTAL NODES', value: '48', icon: Radio, color: 'text-primary' },
    { label: 'CRITICAL', value: String(criticalCount), icon: AlertTriangle, color: 'text-destructive' },
    { label: 'WARNINGS', value: String(warningCount), icon: Shield, color: 'text-warning' },
    { label: 'NORMAL', value: String(normalCount), icon: Activity, color: 'text-safe' },
    { label: 'UPTIME', value: '99.97%', icon: Zap, color: 'text-primary' },
    { label: 'PERSONNEL', value: '24', icon: Users, color: 'text-foreground' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <div className="text-xs tracking-[0.4em] text-primary font-mono-space mb-1">CONTROL CENTER</div>
        <h1 className="font-display text-3xl text-foreground tracking-wider">SYSTEM OVERVIEW</h1>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {stats.map(s => (
          <div key={s.label} className="bg-card border border-border p-4">
            <div className="flex items-center gap-2 mb-2">
              <s.icon size={14} className={s.color} />
              <span className="text-[9px] font-mono-space text-muted-foreground tracking-wider">{s.label}</span>
            </div>
            <div className={`font-display text-3xl ${s.color}`}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Critical Alert */}
      {criticalCount > 0 && (
        <div className="border border-destructive/50 bg-destructive/5 glow-red p-4" role="alert">
          <div className="flex items-center gap-3">
            <AlertTriangle className="text-destructive animate-blink" size={20} />
            <div>
              <div className="font-display text-lg text-destructive tracking-wider">
                {criticalCount} CRITICAL ALERT{criticalCount > 1 ? 'S' : ''} ACTIVE
              </div>
              <div className="text-sm text-muted-foreground font-body">
                H₂S concentration in Zone B exceeds safe limits — Emergency protocols engaged
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quick Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Zone Status */}
        <div className="bg-card border border-border p-5">
          <h3 className="font-display text-sm tracking-wider text-foreground mb-4">ZONE STATUS</h3>
          {['Zone A — Processing', 'Zone B — Processing', 'Zone C — Storage', 'Zone D — Loading', 'Zone E — Control Room'].map((zone, i) => {
            const status = i === 1 ? 'CRITICAL' : i === 3 ? 'WARNING' : 'NORMAL';
            const dot = status === 'CRITICAL' ? 'bg-destructive' : status === 'WARNING' ? 'bg-warning' : 'bg-safe';
            const textColor = status === 'CRITICAL' ? 'text-destructive' : status === 'WARNING' ? 'text-warning' : 'text-safe';
            return (
              <div key={zone} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <span className="text-sm font-body text-muted-foreground">{zone}</span>
                <div className="flex items-center gap-2">
                  <span className={`w-1.5 h-1.5 rounded-full ${dot}`} />
                  <span className={`text-[9px] font-mono-space tracking-wider ${textColor}`}>{status}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="bg-card border border-border p-5">
          <h3 className="font-display text-sm tracking-wider text-foreground mb-4">QUICK ACTIONS</h3>
          <div className="space-y-2">
            {[
              { label: 'TRIGGER EVACUATION', style: 'border-destructive text-destructive hover:bg-destructive/10' },
              { label: 'ACTIVATE VENTILATION', style: 'border-warning text-warning hover:bg-warning/10' },
              { label: 'LOCKDOWN ZONE B', style: 'border-destructive text-destructive hover:bg-destructive/10' },
              { label: 'SILENCE ALARMS', style: 'border-primary text-primary hover:bg-primary/10' },
              { label: 'RUN DIAGNOSTICS', style: 'border-primary text-primary hover:bg-primary/10' },
            ].map(action => (
              <button
                key={action.label}
                className={`w-full clip-angled-sm border px-4 py-2 font-display text-xs tracking-widest transition-colors cursor-pointer ${action.style}`}
              >
                {action.label}
              </button>
            ))}
          </div>
        </div>

        {/* Active Personnel */}
        <div className="bg-card border border-border p-5">
          <h3 className="font-display text-sm tracking-wider text-foreground mb-4">ACTIVE PERSONNEL</h3>
          {[
            { name: 'J. Martinez', role: 'Shift Supervisor', zone: 'Control Room' },
            { name: 'R. Chen', role: 'Safety Officer', zone: 'Zone B' },
            { name: 'K. Thompson', role: 'Technician', zone: 'Zone A' },
            { name: 'M. Rodriguez', role: 'Operator', zone: 'Zone D' },
            { name: 'A. Patel', role: 'Engineer', zone: 'Zone C' },
          ].map(person => (
            <div key={person.name} className="flex items-center justify-between py-2 border-b border-border last:border-0">
              <div>
                <div className="text-sm font-body text-foreground">{person.name}</div>
                <div className="text-[10px] font-mono-space text-muted-foreground">{person.role}</div>
              </div>
              <span className="text-[9px] font-mono-space text-primary tracking-wider">{person.zone}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Mini sensor overview */}
      <div className="bg-card border border-border p-5">
        <h3 className="font-display text-sm tracking-wider text-foreground mb-4">SENSOR READINGS</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {sensors.map(s => {
            const color = s.status === 'CRITICAL' ? 'text-destructive border-destructive/30' : s.status === 'WARNING' ? 'text-warning border-warning/30' : 'text-safe border-border';
            return (
              <div key={s.id} className={`border p-3 ${color}`}>
                <div className="text-[9px] font-mono-space text-muted-foreground mb-1">{s.formula}</div>
                <div className="font-display text-xl">{s.value}</div>
                <div className="text-[9px] font-mono-space text-muted-foreground">{s.unit}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
