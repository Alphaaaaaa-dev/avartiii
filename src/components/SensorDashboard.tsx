import { useState, useEffect } from 'react';
import { useSensorData } from '@/hooks/useSensorData';
import SensorCard from './SensorCard';
import CriticalAlert from './CriticalAlert';
import EventLog, { type LogEntry } from './EventLog';

const SensorDashboard = () => {
  const sensors = useSensorData();
  const [utcTime, setUtcTime] = useState(new Date().toUTCString());
  const [logEntries, setLogEntries] = useState<LogEntry[]>([]);

  useEffect(() => {
    const interval = setInterval(() => setUtcTime(new Date().toUTCString()), 1000);
    return () => clearInterval(interval);
  }, []);

  const addLogEntry = (entry: Omit<LogEntry, 'timestamp'>) => {
    setLogEntries(prev => [...prev, { ...entry, timestamp: new Date().toISOString() }]);
  };

  const handleAcknowledge = () => {
    addLogEntry({ type: 'INFO', message: 'H₂S critical alert acknowledged by operator' });
  };

  return (
    <section id="sensors" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-xs tracking-[0.4em] text-primary font-mono-space mb-2">REAL-TIME DATA</div>
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <h2 className="font-display text-4xl md:text-5xl text-foreground tracking-wider">
            LIVE SENSOR MONITORING
          </h2>
          <div className="text-xs font-mono-space text-muted-foreground mt-2 md:mt-0">
            UTC: {utcTime}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sensors.map(sensor => (
            <SensorCard key={sensor.id} sensor={sensor} />
          ))}
        </div>

        <CriticalAlert onAcknowledge={handleAcknowledge} />
      </div>
    </section>
  );
};

export default SensorDashboard;
