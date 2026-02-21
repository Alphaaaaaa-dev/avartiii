import { useState, useEffect } from 'react';
import { Camera, Maximize2, Volume2, Circle } from 'lucide-react';

interface CameraFeed {
  id: string;
  name: string;
  zone: string;
  status: 'ONLINE' | 'OFFLINE' | 'RECORDING';
  resolution: string;
  fps: number;
}

const cameras: CameraFeed[] = [
  { id: 'CAM-A1', name: 'Zone A — Main Gate', zone: 'A', status: 'RECORDING', resolution: '1920x1080', fps: 30 },
  { id: 'CAM-B1', name: 'Zone B — Processing Floor', zone: 'B', status: 'RECORDING', resolution: '1920x1080', fps: 30 },
  { id: 'CAM-B2', name: 'Zone B — Gas Storage', zone: 'B', status: 'RECORDING', resolution: '1280x720', fps: 24 },
  { id: 'CAM-C1', name: 'Zone C — Cold Storage', zone: 'C', status: 'ONLINE', resolution: '1920x1080', fps: 30 },
  { id: 'CAM-D1', name: 'Zone D — Loading Dock', zone: 'D', status: 'RECORDING', resolution: '1920x1080', fps: 30 },
  { id: 'CAM-E1', name: 'Zone E — Control Room', zone: 'E', status: 'ONLINE', resolution: '1280x720', fps: 24 },
  { id: 'CAM-P1', name: 'Perimeter — North Fence', zone: 'P', status: 'RECORDING', resolution: '1920x1080', fps: 30 },
  { id: 'CAM-P2', name: 'Perimeter — South Entrance', zone: 'P', status: 'OFFLINE', resolution: '1920x1080', fps: 0 },
];

const SimulatedFeed = ({ camera }: { camera: CameraFeed }) => {
  const [noise, setNoise] = useState(0);

  useEffect(() => {
    if (camera.status === 'OFFLINE') return;
    const id = setInterval(() => setNoise(Math.random()), 200);
    return () => clearInterval(id);
  }, [camera.status]);

  const isOffline = camera.status === 'OFFLINE';

  return (
    <div className={`bg-card border ${isOffline ? 'border-destructive/30' : 'border-border'} group overflow-hidden`}>
      {/* Feed area */}
      <div className="relative aspect-video bg-background overflow-hidden">
        {isOffline ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <Camera className="text-destructive/30 mx-auto mb-2" size={32} />
              <span className="text-xs font-mono-space text-destructive/50">SIGNAL LOST</span>
            </div>
          </div>
        ) : (
          <>
            {/* Simulated static noise pattern */}
            <div className="absolute inset-0" style={{
              background: `radial-gradient(ellipse at ${30 + noise * 40}% ${30 + noise * 40}%, hsl(187 100% 50% / 0.03), transparent 70%)`,
            }} />
            {/* Grid overlay */}
            <div className="absolute inset-0" style={{
              backgroundImage: 'linear-gradient(hsl(187 100% 50% / 0.05) 1px, transparent 1px), linear-gradient(90deg, hsl(187 100% 50% / 0.05) 1px, transparent 1px)',
              backgroundSize: '20px 20px',
            }} />
            {/* Crosshair center */}
            <div className="absolute inset-0 flex items-center justify-center opacity-20">
              <div className="w-8 h-px bg-primary" />
              <div className="absolute w-px h-8 bg-primary" />
            </div>
            {/* Scan line */}
            <div className="absolute left-0 right-0 h-px bg-primary/20" style={{
              top: `${(noise * 100) % 100}%`,
            }} />
            {/* Camera ID overlay */}
            <div className="absolute top-2 left-2 text-[9px] font-mono-space text-primary/60">
              {camera.id} | {camera.resolution} | {camera.fps}FPS
            </div>
            {/* REC indicator */}
            {camera.status === 'RECORDING' && (
              <div className="absolute top-2 right-2 flex items-center gap-1">
                <Circle size={6} className="text-destructive fill-destructive animate-blink" />
                <span className="text-[9px] font-mono-space text-destructive">REC</span>
              </div>
            )}
            {/* Timestamp */}
            <div className="absolute bottom-2 left-2 text-[9px] font-mono-space text-primary/40">
              {new Date().toLocaleTimeString('en-US', { hour12: false })}
            </div>
          </>
        )}

        {/* Hover controls */}
        {!isOffline && (
          <div className="absolute bottom-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button className="w-6 h-6 bg-card/80 border border-border flex items-center justify-center cursor-pointer hover:border-primary">
              <Maximize2 size={10} className="text-primary" />
            </button>
            <button className="w-6 h-6 bg-card/80 border border-border flex items-center justify-center cursor-pointer hover:border-primary">
              <Volume2 size={10} className="text-primary" />
            </button>
          </div>
        )}
      </div>

      {/* Info bar */}
      <div className="px-3 py-2 flex items-center justify-between">
        <div>
          <div className="text-xs font-body text-foreground">{camera.name}</div>
        </div>
        <div className="flex items-center gap-1.5">
          <span className={`w-1.5 h-1.5 rounded-full ${isOffline ? 'bg-destructive' : 'bg-safe animate-pulse-glow'}`} />
          <span className={`text-[8px] font-mono-space tracking-wider ${isOffline ? 'text-destructive' : 'text-safe'}`}>
            {camera.status}
          </span>
        </div>
      </div>
    </div>
  );
};

const LiveCamerasPage = () => (
  <div className="space-y-6">
    <div className="flex items-end justify-between">
      <div>
        <div className="text-xs tracking-[0.4em] text-primary font-mono-space mb-1">SURVEILLANCE</div>
        <h1 className="font-display text-3xl text-foreground tracking-wider">LIVE CAMERA FEEDS</h1>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-[10px] font-mono-space text-safe">{cameras.filter(c => c.status !== 'OFFLINE').length}/{cameras.length} ONLINE</span>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
      {cameras.map(cam => (
        <SimulatedFeed key={cam.id} camera={cam} />
      ))}
    </div>
  </div>
);

export default LiveCamerasPage;
