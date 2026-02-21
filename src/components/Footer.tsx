const footerLinks = {
  Products: ['Fixed Gas Detectors', 'Portable Units', 'Multi-Gas Analyzers', 'Sensor Controllers', 'Cloud Platform'],
  Solutions: ['Oil & Gas', 'Chemical Plants', 'Wastewater', 'Mining', 'Cold Storage'],
  Support: ['Documentation', 'Calibration Service', 'Training Programs', 'Compliance Reports', 'Contact Us'],
};

const Footer = () => (
  <footer className="border-t border-border">
    {/* Emergency Banner */}
    <div className="border-b border-destructive/30 bg-destructive/5 px-6 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-3">
        <span className="text-destructive text-sm">🚨</span>
        <span className="text-xs font-mono-space text-destructive tracking-wider">
          24/7 EMERGENCY LINE: 91092xxxxx
        </span>
      </div>
    </div>

    <div className="max-w-7xl mx-auto px-6 py-16">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-1 mb-4">
            <span className="font-display text-xl text-primary text-glow-cyan">AVERTI</span>
            <span className="w-1.5 h-1.5 bg-accent rounded-full" />
          </div>
          <p className="text-sm text-muted-foreground font-body leading-relaxed">
            Industry-leading gas detection and monitoring solutions. Protecting workers and facilities worldwide since 2019.
          </p>
        </div>

        {Object.entries(footerLinks).map(([title, links]) => (
          <div key={title}>
            <h4 className="font-display text-sm tracking-[0.2em] text-foreground mb-4">{title.toUpperCase()}</h4>
            <ul className="space-y-2">
              {links.map(link => (
                <li key={link}>
                  <span className="text-sm text-muted-foreground font-body hover:text-primary transition-colors cursor-pointer">
                    {link}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>

    <div className="border-t border-border px-6 py-4">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
        <span className="text-[10px] font-mono-space text-muted-foreground">
          © 2026 AVERTI SAFETY SYSTEMS. ALL RIGHTS RESERVED.
        </span>
        <span className="text-[10px] font-mono-space text-primary tracking-[0.3em]">
          PROTECTING LIVES THROUGH INTELLIGENT DETECTION
        </span>
      </div>
    </div>
  </footer>
);

export default Footer;
