import { useState } from 'react';

interface CriticalAlertProps {
  onAcknowledge: () => void;
}

const CriticalAlert = ({ onAcknowledge }: CriticalAlertProps) => {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="border border-destructive/50 bg-destructive/5 glow-red p-5 mt-6" role="alert">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="text-destructive text-2xl animate-blink" aria-hidden="true">⚠</span>
          <div>
            <div className="font-display text-lg text-destructive tracking-wider">
              CRITICAL ALERT — ZONE B PROCESSING
            </div>
            <div className="text-sm text-muted-foreground font-body">
              H₂S concentration at 23.7 PPM — Emergency Protocol Level 3 Active
            </div>
          </div>
        </div>
        <button
          onClick={() => { setDismissed(true); onAcknowledge(); }}
          className="clip-angled-sm bg-destructive text-destructive-foreground px-6 py-2 font-display tracking-widest text-sm hover:glow-red transition-shadow cursor-pointer whitespace-nowrap"
        >
          ACKNOWLEDGE ALERT
        </button>
      </div>
    </div>
  );
};

export default CriticalAlert;
