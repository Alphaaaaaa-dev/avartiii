import { useCountUp } from '@/hooks/useCountUp';

const RadarSVG = () => (
  <svg className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] opacity-10 pointer-events-none" viewBox="0 0 500 500">
    {[100, 150, 200, 250].map(r => (
      <circle key={r} cx="250" cy="250" r={r} fill="none" stroke="hsl(187 100% 50%)" strokeWidth="0.5" />
    ))}
    <line x1="250" y1="0" x2="250" y2="500" stroke="hsl(187 100% 50%)" strokeWidth="0.3" />
    <line x1="0" y1="250" x2="500" y2="250" stroke="hsl(187 100% 50%)" strokeWidth="0.3" />
    <line x1="250" y1="250" x2="450" y2="100" stroke="hsl(187 100% 50%)" strokeWidth="1" className="animate-radar-spin origin-center" style={{ transformOrigin: '250px 250px' }} />
  </svg>
);

const StatItem = ({ value, label, suffix = '' }: { value: number; label: string; suffix?: string }) => {
  const { value: animated, ref } = useCountUp(value);
  return (
    <div ref={ref} className="text-center px-6 py-4">
      <div className="font-display text-3xl md:text-4xl text-primary text-glow-cyan">
        {suffix === '<' ? '<' : ''}{animated}{suffix === '<' ? '' : suffix}
      </div>
      <div className="text-xs tracking-[0.2em] text-muted-foreground font-mono-space mt-1">{label}</div>
    </div>
  );
};

const HeroSection = () => {
  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-center items-center pt-[70px] overflow-hidden grid-bg">
      <RadarSVG />
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <div className="text-xs tracking-[0.4em] text-primary font-mono-space mb-6">
          INDUSTRIAL SAFETY INFRASTRUCTURE
        </div>

        <h1 className="font-display leading-none mb-6">
          <span className="block text-7xl md:text-9xl text-transparent" style={{ WebkitTextStroke: '2px hsl(187, 100%, 50%)' }}>
            DETECT
          </span>
          <span className="block text-7xl md:text-9xl text-foreground">
            PROTECT
          </span>
        </h1>

        <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-10 font-body leading-relaxed">
          Real-time gas monitoring across all industrial zones. Automated alerts, life-saving response protocols, and complete compliance reporting in one unified platform.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <button
            onClick={() => document.getElementById('sensors')?.scrollIntoView({ behavior: 'smooth' })}
            className="clip-angled bg-primary text-primary-foreground px-8 py-3 font-display text-lg tracking-widest hover:glow-cyan transition-shadow cursor-pointer"
          >
            LIVE DASHBOARD →
          </button>
          <button
            onClick={() => document.getElementById('technology')?.scrollIntoView({ behavior: 'smooth' })}
            className="clip-angled border border-primary text-primary px-8 py-3 font-display text-lg tracking-widest hover:bg-primary/10 transition-colors cursor-pointer"
          >
            VIEW DOCUMENTATION
          </button>
        </div>
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto border-t border-border">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border">
          <StatItem value={48} label="SENSOR NODES" />
          <StatItem value={32} label="GAS TYPES" />
          <StatItem value={99} label="UPTIME" suffix="%" />
          <StatItem value={2} label="RESPONSE" suffix="s" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
