import { useState, useEffect, useCallback } from 'react';

export interface SensorData {
  id: string;
  name: string;
  formula: string;
  nodeId: string;
  value: number;
  unit: string;
  min: number;
  max: number;
  threshold_warning: number;
  threshold_critical: number;
  status: 'NORMAL' | 'WARNING' | 'CRITICAL';
  history: number[];
}

const initialSensors: SensorData[] = [
  { id: 'co', name: 'Carbon Monoxide', formula: 'CO', nodeId: 'SN-A1-007', value: 4, unit: 'PPM', min: 0, max: 50, threshold_warning: 25, threshold_critical: 35, status: 'NORMAL', history: [3, 4, 3.5, 4, 3.8, 4.2, 3.9, 4, 4.1, 3.7] },
  { id: 'h2s', name: 'Hydrogen Sulfide', formula: 'H₂S', nodeId: 'SN-B2-014', value: 23.7, unit: 'PPM', min: 0, max: 30, threshold_warning: 10, threshold_critical: 20, status: 'CRITICAL', history: [18, 19, 20, 21, 22, 23, 23.5, 23.7, 23.8, 23.7] },
  { id: 'ch4', name: 'Methane', formula: 'CH₄', nodeId: 'SN-A3-022', value: 8, unit: '% LEL', min: 0, max: 100, threshold_warning: 20, threshold_critical: 50, status: 'NORMAL', history: [7, 8, 7.5, 8, 8.2, 7.8, 8.1, 7.9, 8, 8.1] },
  { id: 'o2', name: 'Oxygen Level', formula: 'O₂', nodeId: 'SN-C1-003', value: 20.3, unit: '% VOL', min: 0, max: 25, threshold_warning: 19.5, threshold_critical: 18, status: 'NORMAL', history: [20.5, 20.4, 20.3, 20.4, 20.3, 20.2, 20.3, 20.4, 20.3, 20.3] },
  { id: 'nh3', name: 'Ammonia', formula: 'NH₃', nodeId: 'SN-D1-019', value: 18, unit: 'PPM', min: 0, max: 50, threshold_warning: 15, threshold_critical: 35, status: 'WARNING', history: [12, 14, 15, 16, 17, 17.5, 18, 17.8, 18, 18.2] },
  { id: 'co2', name: 'Carbon Dioxide', formula: 'CO₂', nodeId: 'SN-A2-011', value: 412, unit: 'PPM', min: 0, max: 5000, threshold_warning: 1000, threshold_critical: 3000, status: 'NORMAL', history: [410, 411, 412, 411, 413, 412, 411, 412, 413, 412] },
];

const getStatus = (value: number, warn: number, crit: number, id: string): 'NORMAL' | 'WARNING' | 'CRITICAL' => {
  if (id === 'o2') {
    if (value <= crit) return 'CRITICAL';
    if (value <= warn) return 'WARNING';
    return 'NORMAL';
  }
  if (value >= crit) return 'CRITICAL';
  if (value >= warn) return 'WARNING';
  return 'NORMAL';
};

export const useSensorData = () => {
  const [sensors, setSensors] = useState<SensorData[]>(initialSensors);

  const fluctuate = useCallback(() => {
    setSensors(prev =>
      prev.map(sensor => {
        const delta = (Math.random() - 0.5) * sensor.value * 0.1;
        const newValue = Math.max(sensor.min, Math.min(sensor.max, parseFloat((sensor.value + delta).toFixed(1))));
        const newHistory = [...sensor.history.slice(1), newValue];
        const status = getStatus(newValue, sensor.threshold_warning, sensor.threshold_critical, sensor.id);
        return { ...sensor, value: newValue, history: newHistory, status };
      })
    );
  }, []);

  useEffect(() => {
    const interval = setInterval(fluctuate, 2000);
    return () => clearInterval(interval);
  }, [fluctuate]);

  return sensors;
};
