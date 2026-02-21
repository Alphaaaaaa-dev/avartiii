const features = [
  { icon: '🔲', title: 'Multi-Zone Monitoring', desc: 'Deploy across unlimited industrial zones with individual thresholds and real-time zone mapping.' },
  { icon: '⚡', title: 'Instant Alert System', desc: 'Sub-2-second detection with SMS, email, siren, and automated system response across all channels.' },
  { icon: '📊', title: 'Compliance Reporting', desc: 'Auto-generated OSHA, EPA, and ISO-compliant reports with audit trails and certification tracking.' },
  { icon: '🤖', title: 'Automated Response', desc: 'Pre-programmed emergency protocols trigger ventilation, lockdowns, and evacuation alerts automatically.' },
];

const FeatureCards = () => (
  <section id="features" className="py-20 px-6">
    <div className="max-w-7xl mx-auto">
      <div className="text-xs tracking-[0.4em] text-primary font-mono-space mb-2">PLATFORM CAPABILITIES</div>
      <h2 className="font-display text-4xl md:text-5xl text-foreground tracking-wider mb-12">
        COMPREHENSIVE SAFETY ECOSYSTEM
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {features.map(f => (
          <div key={f.title} className="bg-card border border-border p-6 hover:-translate-y-1 transition-transform duration-300 group">
            <div className="text-3xl mb-4">{f.icon}</div>
            <h3 className="font-display text-xl tracking-wider text-primary mb-2">{f.title}</h3>
            <p className="text-sm text-muted-foreground font-body leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default FeatureCards;
