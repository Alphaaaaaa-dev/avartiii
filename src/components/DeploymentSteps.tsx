const steps = [
  { num: '01', title: 'SITE ASSESSMENT', desc: 'Zone mapping and sensor placement planning with our engineering team.' },
  { num: '02', title: 'SENSOR NETWORK', desc: 'Hardware installation and wireless mesh configuration across all zones.' },
  { num: '03', title: 'PLATFORM SETUP', desc: 'Dashboard configuration, threshold settings, and alert routing setup.' },
  { num: '04', title: 'GO LIVE', desc: 'Immediate 24/7 monitoring with full support and compliance coverage.' },
];

const DeploymentSteps = () => (
  <section id="deployment" className="py-20 px-6">
    <div className="max-w-7xl mx-auto">
      <div className="text-xs tracking-[0.4em] text-primary font-mono-space mb-2">DEPLOYMENT</div>
      <h2 className="font-display text-4xl md:text-5xl text-foreground tracking-wider mb-16">
        RAPID DEPLOYMENT. IMMEDIATE PROTECTION.
      </h2>

      <div className="relative">
        {/* Connecting line */}
        <div className="hidden md:block absolute top-8 left-0 right-0 h-px bg-border" />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {steps.map(step => (
            <div key={step.num} className="relative text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 border border-primary text-primary font-display text-2xl mb-4 bg-background relative z-10">
                {step.num}
              </div>
              <h3 className="font-display text-lg tracking-wider text-foreground mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground font-body">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default DeploymentSteps;
