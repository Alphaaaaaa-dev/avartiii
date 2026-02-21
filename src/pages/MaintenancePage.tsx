import { Wrench, Clock, AlertTriangle, CheckCircle2 } from 'lucide-react';

interface MaintenanceItem {
  id: string;
  type: 'CALIBRATION' | 'INSPECTION' | 'REPLACEMENT' | 'REPAIR';
  target: string;
  zone: string;
  scheduledDate: string;
  assignee: string;
  status: 'SCHEDULED' | 'OVERDUE' | 'IN PROGRESS' | 'COMPLETED';
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  notes: string;
}

const maintenanceItems: MaintenanceItem[] = [
  { id: 'MNT-0112', type: 'CALIBRATION', target: 'SN-A1-007 (CO Sensor)', zone: 'Zone A', scheduledDate: '2026-02-22', assignee: 'K. Thompson', status: 'SCHEDULED', priority: 'HIGH', notes: 'Bi-monthly calibration with certified reference gas' },
  { id: 'MNT-0113', type: 'CALIBRATION', target: 'SN-D1-019 (NH₃ Sensor)', zone: 'Zone D', scheduledDate: '2026-02-22', assignee: 'K. Thompson', status: 'SCHEDULED', priority: 'HIGH', notes: 'Sensor showing drift — priority calibration required' },
  { id: 'MNT-0114', type: 'REPLACEMENT', target: 'SN-B2-014 (H₂S Sensor)', zone: 'Zone B', scheduledDate: '2026-02-21', assignee: 'A. Patel', status: 'OVERDUE', priority: 'HIGH', notes: 'Sensor cell nearing end of life — replacement unit ordered' },
  { id: 'MNT-0115', type: 'INSPECTION', target: 'Ventilation System B', zone: 'Zone B', scheduledDate: '2026-02-25', assignee: 'M. Rodriguez', status: 'SCHEDULED', priority: 'MEDIUM', notes: 'Post-incident inspection following H₂S event' },
  { id: 'MNT-0116', type: 'CALIBRATION', target: 'All O₂ Sensors (8 units)', zone: 'All Zones', scheduledDate: '2026-03-01', assignee: 'K. Thompson', status: 'SCHEDULED', priority: 'MEDIUM', notes: 'Quarterly oxygen sensor calibration cycle' },
  { id: 'MNT-0117', type: 'INSPECTION', target: 'Camera System CAM-P2', zone: 'Perimeter', scheduledDate: '2026-02-20', assignee: 'J. Lee', status: 'IN PROGRESS', priority: 'HIGH', notes: 'Camera offline — investigating power supply and cable run' },
  { id: 'MNT-0118', type: 'REPAIR', target: 'Valve V-B12', zone: 'Zone B', scheduledDate: '2026-02-23', assignee: 'A. Patel', status: 'SCHEDULED', priority: 'HIGH', notes: 'Valve seal replacement following NH₃ leak incident' },
  { id: 'MNT-0110', type: 'CALIBRATION', target: 'SN-A2-011 (CO₂ Sensor)', zone: 'Zone A', scheduledDate: '2026-02-18', assignee: 'K. Thompson', status: 'COMPLETED', priority: 'LOW', notes: 'Routine calibration completed — within spec' },
  { id: 'MNT-0111', type: 'INSPECTION', target: 'Fire Suppression System A', zone: 'Zone A', scheduledDate: '2026-02-17', assignee: 'M. Rodriguez', status: 'COMPLETED', priority: 'MEDIUM', notes: 'All systems verified operational' },
];

const statusIcon: Record<string, JSX.Element> = {
  'SCHEDULED': <Clock size={14} className="text-primary" />,
  'OVERDUE': <AlertTriangle size={14} className="text-destructive" />,
  'IN PROGRESS': <Wrench size={14} className="text-warning" />,
  'COMPLETED': <CheckCircle2 size={14} className="text-safe" />,
};

const statusColor: Record<string, string> = {
  'SCHEDULED': 'text-primary',
  'OVERDUE': 'text-destructive',
  'IN PROGRESS': 'text-warning',
  'COMPLETED': 'text-safe',
};

const priorityColor: Record<string, string> = {
  HIGH: 'text-destructive bg-destructive/10 border-destructive/30',
  MEDIUM: 'text-warning bg-warning/10 border-warning/30',
  LOW: 'text-muted-foreground bg-muted/30 border-border',
};

const typeColor: Record<string, string> = {
  CALIBRATION: 'text-primary',
  INSPECTION: 'text-foreground',
  REPLACEMENT: 'text-accent',
  REPAIR: 'text-warning',
};

const MaintenancePage = () => {
  const overdue = maintenanceItems.filter(m => m.status === 'OVERDUE').length;
  const upcoming = maintenanceItems.filter(m => m.status === 'SCHEDULED').length;
  const inProgress = maintenanceItems.filter(m => m.status === 'IN PROGRESS').length;

  return (
    <div className="space-y-6">
      <div>
        <div className="text-xs tracking-[0.4em] text-primary font-mono-space mb-1">OPERATIONS</div>
        <h1 className="font-display text-3xl text-foreground tracking-wider">MAINTENANCE SCHEDULE</h1>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'OVERDUE', value: overdue, color: 'text-destructive' },
          { label: 'IN PROGRESS', value: inProgress, color: 'text-warning' },
          { label: 'UPCOMING', value: upcoming, color: 'text-primary' },
          { label: 'NEXT DUE', value: 'FEB 21', color: 'text-foreground' },
        ].map(s => (
          <div key={s.label} className="bg-card border border-border p-4">
            <div className="text-[9px] font-mono-space text-muted-foreground tracking-wider mb-1">{s.label}</div>
            <div className={`font-display text-2xl ${s.color}`}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-card border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                {['STATUS', 'ID', 'TYPE', 'TARGET', 'DATE', 'ASSIGNEE', 'PRIORITY'].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-[9px] font-mono-space text-muted-foreground tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {maintenanceItems.map(item => (
                <tr key={item.id} className="border-b border-border last:border-0 hover:bg-muted/10 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      {statusIcon[item.status]}
                      <span className={`text-[9px] font-mono-space tracking-wider ${statusColor[item.status]}`}>{item.status}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs font-mono-space text-muted-foreground">{item.id}</td>
                  <td className={`px-4 py-3 text-xs font-mono-space tracking-wider ${typeColor[item.type]}`}>{item.type}</td>
                  <td className="px-4 py-3">
                    <div className="text-xs font-body text-foreground">{item.target}</div>
                    <div className="text-[9px] font-mono-space text-muted-foreground">{item.zone}</div>
                  </td>
                  <td className="px-4 py-3 text-xs font-mono-space text-muted-foreground whitespace-nowrap">{item.scheduledDate}</td>
                  <td className="px-4 py-3 text-xs font-body text-muted-foreground">{item.assignee}</td>
                  <td className="px-4 py-3">
                    <span className={`text-[9px] font-mono-space tracking-wider px-2 py-0.5 border ${priorityColor[item.priority]}`}>{item.priority}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MaintenancePage;
