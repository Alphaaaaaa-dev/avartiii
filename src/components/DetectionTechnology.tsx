const specs = [
  { label: 'Sensor Type', value: 'Electrochemical / Catalytic Bead / NDIR' },
  { label: 'Response Time', value: 'T90 < 15 seconds' },
  { label: 'Operating Range', value: '-40°C to +65°C' },
  { label: 'Accuracy', value: '±2% of reading' },
  { label: 'Certification', value: 'IECEx, ATEX, CSA, UL' },
  { label: 'IP Rating', value: 'IP66/IP68' },
];

const DetectionTechnology = () => (
  <section id="technology" className="py-20 px-6 grid-bg">
    <div className="max-w-7xl mx-auto">
      <div className="text-xs tracking-[0.4em] text-primary font-mono-space mb-2">ENGINEERING</div>
      <h2 className="font-display text-4xl md:text-5xl text-foreground tracking-wider mb-12">
        PRECISION DETECTION TECHNOLOGY
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
        {[
          { value: '0.1 PPM', label: 'SENSITIVITY' },
          { value: '6', label: 'GAS TYPES' },
          { value: 'IECEx', label: 'CERTIFIED' },
        ].map(s => (
          <div key={s.label} className="bg-card border border-border p-8 text-center">
            <div className="font-display text-4xl text-primary text-glow-cyan mb-1">{s.value}</div>
            <div className="text-xs tracking-[0.3em] text-muted-foreground font-mono-space">{s.label}</div>
          </div>
        ))}
      </div>

      <p className="text-muted-foreground font-body text-base leading-relaxed max-w-3xl mb-12">
        Our electrochemical sensor arrays utilize advanced molecular recognition technology to detect trace-level concentrations of hazardous gases. Each sensor node combines three detection methodologies for cross-validation, ensuring zero false negatives in critical safety scenarios.
      </p>

      <div className="bg-card border border-border overflow-hidden">
        <div className="grid grid-cols-2 text-xs font-mono-space tracking-wider text-muted-foreground border-b border-border">
          <div className="px-4 py-3">SPECIFICATION</div>
          <div className="px-4 py-3">VALUE</div>
        </div>
        {specs.map(spec => (
          <div key={spec.label} className="grid grid-cols-2 border-b border-border last:border-0">
            <div className="px-4 py-3 text-sm font-body text-muted-foreground">{spec.label}</div>
            <div className="px-4 py-3 text-sm font-mono-space text-foreground">{spec.value}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default DetectionTechnology;
