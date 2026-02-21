import { useSensorData } from '@/hooks/useSensorData';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, BarChart, Bar, Tooltip } from 'recharts';

const generateHourlyData = () => {
  return Array.from({ length: 24 }, (_, i) => ({
    hour: `${String(i).padStart(2, '0')}:00`,
    co: 3 + Math.random() * 4,
    h2s: 5 + Math.random() * 20,
    ch4: 5 + Math.random() * 10,
    nh3: 10 + Math.random() * 15,
  }));
};

const incidentData = [
  { month: 'Sep', critical: 1, high: 2, medium: 4 },
  { month: 'Oct', critical: 0, high: 3, medium: 2 },
  { month: 'Nov', critical: 2, high: 1, medium: 5 },
  { month: 'Dec', critical: 1, high: 2, medium: 3 },
  { month: 'Jan', critical: 0, high: 1, medium: 2 },
  { month: 'Feb', critical: 2, high: 1, medium: 3 },
];

const hourlyData = generateHourlyData();

const AnalyticsPage = () => {
  const sensors = useSensorData();

  return (
    <div className="space-y-6">
      <div>
        <div className="text-xs tracking-[0.4em] text-primary font-mono-space mb-1">DATA INSIGHTS</div>
        <h1 className="font-display text-3xl text-foreground tracking-wider">ANALYTICS</h1>
      </div>

      {/* Gas Trends */}
      <div className="bg-card border border-border p-5">
        <h3 className="font-display text-sm tracking-wider text-foreground mb-4">24H GAS CONCENTRATION TRENDS</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={hourlyData}>
              <XAxis dataKey="hour" tick={{ fontSize: 9, fill: 'hsl(200 20% 45%)' }} tickLine={false} axisLine={{ stroke: 'hsl(205 40% 18%)' }} interval={3} />
              <YAxis tick={{ fontSize: 9, fill: 'hsl(200 20% 45%)' }} tickLine={false} axisLine={{ stroke: 'hsl(205 40% 18%)' }} />
              <Tooltip
                contentStyle={{ background: 'hsl(210 45% 8%)', border: '1px solid hsl(205 40% 18%)', fontSize: 11, fontFamily: 'Space Mono' }}
                labelStyle={{ color: 'hsl(200 40% 85%)' }}
              />
              <Line type="monotone" dataKey="co" stroke="hsl(187 100% 50%)" strokeWidth={1.5} dot={false} name="CO" />
              <Line type="monotone" dataKey="h2s" stroke="hsl(0 100% 55%)" strokeWidth={1.5} dot={false} name="H₂S" />
              <Line type="monotone" dataKey="ch4" stroke="hsl(110 100% 55%)" strokeWidth={1.5} dot={false} name="CH₄" />
              <Line type="monotone" dataKey="nh3" stroke="hsl(44 100% 50%)" strokeWidth={1.5} dot={false} name="NH₃" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Incident Frequency */}
        <div className="bg-card border border-border p-5">
          <h3 className="font-display text-sm tracking-wider text-foreground mb-4">INCIDENT FREQUENCY (6 MONTHS)</h3>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={incidentData}>
                <XAxis dataKey="month" tick={{ fontSize: 9, fill: 'hsl(200 20% 45%)' }} tickLine={false} axisLine={{ stroke: 'hsl(205 40% 18%)' }} />
                <YAxis tick={{ fontSize: 9, fill: 'hsl(200 20% 45%)' }} tickLine={false} axisLine={{ stroke: 'hsl(205 40% 18%)' }} />
                <Tooltip contentStyle={{ background: 'hsl(210 45% 8%)', border: '1px solid hsl(205 40% 18%)', fontSize: 11, fontFamily: 'Space Mono' }} />
                <Bar dataKey="critical" fill="hsl(0 100% 55%)" name="Critical" />
                <Bar dataKey="high" fill="hsl(18 100% 50%)" name="High" />
                <Bar dataKey="medium" fill="hsl(44 100% 50%)" name="Medium" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sensor Health */}
        <div className="bg-card border border-border p-5">
          <h3 className="font-display text-sm tracking-wider text-foreground mb-4">SENSOR HEALTH MATRIX</h3>
          <div className="space-y-3">
            {sensors.map(s => {
              const health = s.status === 'CRITICAL' ? 65 : s.status === 'WARNING' ? 82 : 97 + Math.floor(Math.random() * 3);
              const barColor = health > 90 ? 'bg-safe' : health > 75 ? 'bg-warning' : 'bg-destructive';
              return (
                <div key={s.id}>
                  <div className="flex justify-between mb-1">
                    <span className="text-xs font-body text-muted-foreground">{s.name} ({s.nodeId})</span>
                    <span className="text-xs font-mono-space text-foreground">{health}%</span>
                  </div>
                  <div className="w-full h-1 bg-muted">
                    <div className={`h-full ${barColor} transition-all`} style={{ width: `${health}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
