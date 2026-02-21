import { useState, useEffect, useRef } from 'react';

export interface LogEntry {
  timestamp: string;
  type: 'ALERT' | 'WARNING' | 'INFO' | 'OK';
  message: string;
}

const initialLogs: LogEntry[] = [
  { timestamp: '2026-02-20T08:14:22Z', type: 'ALERT', message: 'H₂S concentration exceeded critical threshold in Zone B — 23.7 PPM detected' },
  { timestamp: '2026-02-20T08:14:25Z', type: 'ALERT', message: 'Emergency Protocol Level 3 activated for Zone B Processing' },
  { timestamp: '2026-02-20T08:14:28Z', type: 'INFO', message: 'Automated SMS dispatch to 14 emergency contacts initiated' },
  { timestamp: '2026-02-20T08:15:01Z', type: 'WARNING', message: 'NH₃ levels rising in Zone D — currently at 18 PPM, monitoring threshold' },
  { timestamp: '2026-02-20T08:15:30Z', type: 'INFO', message: 'Ventilation system engaged in Zone B — exhaust fans at 100% capacity' },
  { timestamp: '2026-02-20T08:16:00Z', type: 'OK', message: 'CO levels stable across all zones — routine check passed' },
  { timestamp: '2026-02-20T08:16:45Z', type: 'INFO', message: 'Self-diagnostics completed on 48 sensor nodes — all operational' },
  { timestamp: '2026-02-20T08:17:10Z', type: 'OK', message: 'O₂ levels nominal in Zone C — 20.3% VOL confirmed' },
  { timestamp: '2026-02-20T08:18:00Z', type: 'INFO', message: 'Operator J. Martinez logged into monitoring station MS-04' },
  { timestamp: '2026-02-20T08:18:30Z', type: 'WARNING', message: 'Scheduled calibration due for sensors SN-A1-007, SN-D1-019 in 48 hours' },
];

const rotatingEntries: Omit<LogEntry, 'timestamp'>[] = [
  { type: 'OK', message: 'Perimeter sensor mesh integrity check — all links active' },
  { type: 'INFO', message: 'Cloud backup completed — 2.4 GB synced to redundant storage' },
  { type: 'WARNING', message: 'Battery level low on portable unit PU-07 — 12% remaining' },
  { type: 'OK', message: 'CH₄ levels within safe range across all mining zones' },
  { type: 'INFO', message: 'Compliance report auto-generated for EPA submission Q1-2026' },
  { type: 'WARNING', message: 'Network latency spike detected on node SN-B2-014 — 340ms' },
  { type: 'OK', message: 'Fire suppression system armed and verified in Zone A' },
  { type: 'INFO', message: 'Shift change logged — Team Bravo now on active duty' },
];

const typeColors: Record<string, string> = {
  ALERT: 'text-destructive',
  WARNING: 'text-warning',
  INFO: 'text-primary',
  OK: 'text-safe',
};

const EventLog = ({ externalEntries = [] }: { externalEntries?: LogEntry[] }) => {
  const [logs, setLogs] = useState<LogEntry[]>(initialLogs);
  const rotateIdx = useRef(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (externalEntries.length > 0) {
      setLogs(prev => [...prev, ...externalEntries]);
    }
  }, [externalEntries]);

  useEffect(() => {
    const interval = setInterval(() => {
      const entry = rotatingEntries[rotateIdx.current % rotatingEntries.length];
      rotateIdx.current++;
      setLogs(prev => [...prev, { ...entry, timestamp: new Date().toISOString() }]);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  const alertCount = logs.filter(l => l.type === 'ALERT').length;
  const warningCount = logs.filter(l => l.type === 'WARNING').length;

  return (
    <section id="events" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-xs tracking-[0.4em] text-primary font-mono-space mb-2">ACTIVITY FEED</div>
        <h2 className="font-display text-4xl md:text-5xl text-foreground tracking-wider mb-8">
          SYSTEM EVENT LOG
        </h2>

        <div className="flex flex-col lg:flex-row gap-4">
          <div className="lg:w-[60%] bg-card border border-border">
            <div className="border-b border-border px-4 py-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-safe" />
              <span className="text-[10px] font-mono-space text-muted-foreground">LIVE TERMINAL</span>
            </div>
            <div ref={scrollRef} className="h-[400px] overflow-y-auto p-4 font-mono-space text-xs space-y-1">
              {logs.map((log, i) => (
                <div key={i} className="flex gap-2">
                  <span className="text-muted-foreground whitespace-nowrap">
                    {new Date(log.timestamp).toLocaleTimeString('en-US', { hour12: false })}
                  </span>
                  <span className={`${typeColors[log.type]} font-bold whitespace-nowrap`}>[{log.type}]</span>
                  <span className="text-foreground/80">{log.message}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:w-[40%] bg-card border border-border p-6">
            <h3 className="font-display text-xl tracking-wider text-foreground mb-6">SYSTEM STATUS</h3>
            <div className="space-y-4">
              {[
                { label: 'Active Alerts', value: alertCount, color: 'text-destructive' },
                { label: 'Warnings', value: warningCount, color: 'text-warning' },
                { label: 'Nodes Online', value: '48/48', color: 'text-safe' },
                { label: 'System Uptime', value: '99.97%', color: 'text-primary' },
              ].map(item => (
                <div key={item.label} className="flex justify-between items-center border-b border-border pb-3">
                  <span className="text-sm text-muted-foreground font-body">{item.label}</span>
                  <span className={`font-display text-2xl ${item.color}`}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventLog;
