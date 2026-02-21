import { useState } from 'react';
import { Shield, ChevronDown, ChevronUp } from 'lucide-react';

interface EmergencyEvent {
  id: string;
  date: string;
  time: string;
  zone: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  gasType: string;
  peakValue: string;
  duration: string;
  status: 'RESOLVED' | 'INVESTIGATING' | 'CLOSED';
  description: string;
  actions: string[];
  responders: string[];
}

const events: EmergencyEvent[] = [
  {
    id: 'EM-2026-0047', date: '2026-02-20', time: '08:14:22', zone: 'Zone B', severity: 'CRITICAL',
    gasType: 'H₂S', peakValue: '23.7 PPM', duration: 'ONGOING', status: 'INVESTIGATING',
    description: 'Hydrogen Sulfide concentration exceeded critical threshold in Zone B Processing area. Emergency Protocol Level 3 activated.',
    actions: ['Ventilation system engaged at 100%', 'SMS alerts sent to 14 contacts', 'Zone B lockdown initiated', 'Emergency response team deployed'],
    responders: ['R. Chen (Safety Officer)', 'Emergency Team Alpha'],
  },
  {
    id: 'EM-2026-0046', date: '2026-02-19', time: '14:32:10', zone: 'Zone D', severity: 'HIGH',
    gasType: 'NH₃', peakValue: '42 PPM', duration: '47 min', status: 'RESOLVED',
    description: 'Ammonia leak detected near loading dock valve station. Source identified as faulty valve seal.',
    actions: ['Area evacuated', 'Valve isolated', 'Maintenance crew dispatched', 'Seal replaced and tested'],
    responders: ['K. Thompson (Technician)', 'M. Rodriguez (Operator)'],
  },
  {
    id: 'EM-2026-0045', date: '2026-02-18', time: '03:15:44', zone: 'Zone A', severity: 'MEDIUM',
    gasType: 'CH₄', peakValue: '22% LEL', duration: '12 min', status: 'CLOSED',
    description: 'Methane concentration elevated during overnight batch processing. Auto-ventilation resolved within threshold.',
    actions: ['Auto-ventilation activated', 'Night shift supervisor notified', 'Root cause: batch process venting'],
    responders: ['Auto-system'],
  },
  {
    id: 'EM-2026-0044', date: '2026-02-16', time: '11:05:33', zone: 'Zone C', severity: 'LOW',
    gasType: 'CO₂', peakValue: '1200 PPM', duration: '8 min', status: 'CLOSED',
    description: 'Elevated CO₂ in cold storage area during dry ice handling. Workers equipped with PPE.',
    actions: ['PPE verification confirmed', 'Ventilation boosted', 'Monitoring continued'],
    responders: ['A. Patel (Engineer)'],
  },
  {
    id: 'EM-2026-0043', date: '2026-02-14', time: '16:42:18', zone: 'Zone B', severity: 'CRITICAL',
    gasType: 'H₂S', peakValue: '31.2 PPM', duration: '1h 23min', status: 'RESOLVED',
    description: 'Major H₂S release from processing unit PU-07. Full emergency response with facility partial evacuation.',
    actions: ['Full evacuation Zone B', 'Fire suppression standby', 'External emergency services contacted', 'Source isolated at valve V-B12', 'Air quality monitoring extended 24h'],
    responders: ['Emergency Team Alpha', 'Emergency Team Bravo', 'External: City Fire Dept'],
  },
  {
    id: 'EM-2026-0042', date: '2026-02-12', time: '09:18:05', zone: 'Zone A', severity: 'MEDIUM',
    gasType: 'CO', peakValue: '28 PPM', duration: '19 min', status: 'CLOSED',
    description: 'Carbon monoxide spike during equipment startup. Traced to incomplete combustion in furnace F-A3.',
    actions: ['Furnace shutdown', 'Area ventilated', 'Furnace serviced and restarted'],
    responders: ['K. Thompson (Technician)'],
  },
];

const severityColors: Record<string, string> = {
  CRITICAL: 'text-destructive bg-destructive/10 border-destructive/30',
  HIGH: 'text-accent bg-accent/10 border-accent/30',
  MEDIUM: 'text-warning bg-warning/10 border-warning/30',
  LOW: 'text-primary bg-primary/10 border-primary/30',
};

const statusColors: Record<string, string> = {
  RESOLVED: 'text-safe',
  INVESTIGATING: 'text-warning animate-pulse-glow',
  CLOSED: 'text-muted-foreground',
};

const EmergencyHistoryPage = () => {
  const [expanded, setExpanded] = useState<string | null>(events[0].id);

  return (
    <div className="space-y-6">
      <div>
        <div className="text-xs tracking-[0.4em] text-primary font-mono-space mb-1">INCIDENT LOG</div>
        <h1 className="font-display text-3xl text-foreground tracking-wider">EMERGENCY HISTORY</h1>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'TOTAL INCIDENTS', value: '47', sub: 'THIS YEAR' },
          { label: 'CRITICAL', value: '8', sub: 'INCIDENTS' },
          { label: 'AVG RESPONSE', value: '1.8s', sub: 'DETECTION' },
          { label: 'AVG RESOLUTION', value: '34min', sub: 'TO RESOLVE' },
        ].map(s => (
          <div key={s.label} className="bg-card border border-border p-4">
            <div className="text-[9px] font-mono-space text-muted-foreground tracking-wider mb-1">{s.label}</div>
            <div className="font-display text-2xl text-foreground">{s.value}</div>
            <div className="text-[9px] font-mono-space text-muted-foreground">{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Event list */}
      <div className="space-y-2">
        {events.map(event => {
          const isExpanded = expanded === event.id;
          return (
            <div key={event.id} className="bg-card border border-border">
              <button
                onClick={() => setExpanded(isExpanded ? null : event.id)}
                className="w-full flex items-center gap-4 px-5 py-4 cursor-pointer text-left"
              >
                <Shield size={16} className={severityColors[event.severity].split(' ')[0]} />
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="text-xs font-mono-space text-muted-foreground">{event.id}</span>
                    <span className={`text-[9px] font-mono-space tracking-wider px-2 py-0.5 border ${severityColors[event.severity]}`}>
                      {event.severity}
                    </span>
                    <span className={`text-[9px] font-mono-space tracking-wider ${statusColors[event.status]}`}>
                      {event.status}
                    </span>
                  </div>
                  <div className="text-sm font-body text-foreground truncate">{event.description}</div>
                </div>
                <div className="text-right flex-shrink-0 hidden sm:block">
                  <div className="text-xs font-mono-space text-muted-foreground">{event.date}</div>
                  <div className="text-xs font-mono-space text-muted-foreground">{event.time}</div>
                </div>
                {isExpanded ? <ChevronUp size={14} className="text-muted-foreground" /> : <ChevronDown size={14} className="text-muted-foreground" />}
              </button>

              {isExpanded && (
                <div className="border-t border-border px-5 py-4 space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { label: 'Zone', value: event.zone },
                      { label: 'Gas Type', value: event.gasType },
                      { label: 'Peak Value', value: event.peakValue },
                      { label: 'Duration', value: event.duration },
                    ].map(d => (
                      <div key={d.label}>
                        <div className="text-[9px] font-mono-space text-muted-foreground tracking-wider mb-0.5">{d.label}</div>
                        <div className="text-sm font-body text-foreground">{d.value}</div>
                      </div>
                    ))}
                  </div>

                  <div>
                    <div className="text-[9px] font-mono-space text-muted-foreground tracking-wider mb-2">ACTIONS TAKEN</div>
                    <div className="space-y-1">
                      {event.actions.map((action, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <span className="w-1 h-1 bg-primary rounded-full flex-shrink-0" />
                          <span className="text-xs font-body text-muted-foreground">{action}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="text-[9px] font-mono-space text-muted-foreground tracking-wider mb-1">RESPONDERS</div>
                    <div className="text-xs font-body text-foreground">{event.responders.join(' • ')}</div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EmergencyHistoryPage;
