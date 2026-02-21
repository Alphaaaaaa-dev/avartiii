import { useState, useEffect } from 'react';
import { useSensorData } from '@/hooks/useSensorData';
import SensorCard from '@/components/SensorCard';
import CriticalAlert from '@/components/CriticalAlert';

const SensorsPage = () => {
  const sensors = useSensorData();
  const [utcTime, setUtcTime] = useState(new Date().toUTCString());

  useEffect(() => {
    const id = setInterval(() => setUtcTime(new Date().toUTCString()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between">
        <div>
          <div className="text-xs tracking-[0.4em] text-primary font-mono-space mb-1">REAL-TIME DATA</div>
          <h1 className="font-display text-3xl text-foreground tracking-wider">LIVE SENSOR MONITORING</h1>
        </div>
        <div className="text-xs font-mono-space text-muted-foreground mt-2 md:mt-0">UTC: {utcTime}</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {sensors.map(sensor => (
          <SensorCard key={sensor.id} sensor={sensor} />
        ))}
      </div>

      <CriticalAlert onAcknowledge={() => {}} />
    </div>
  );
};

export default SensorsPage;
