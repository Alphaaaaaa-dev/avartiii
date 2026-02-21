const NAV_LINKS = ['OVERVIEW', 'SENSORS', 'ANALYTICS', 'ALERTS', 'COMPLIANCE', 'SETTINGS'];

const Navbar = () => {
  const handleClick = (link: string) => {
    const sectionMap: Record<string, string> = {
      'OVERVIEW': 'hero',
      'SENSORS': 'sensors',
      'ANALYTICS': 'features',
      'ALERTS': 'events',
      'COMPLIANCE': 'technology',
      'SETTINGS': 'deployment',
    };
    const el = document.getElementById(sectionMap[link] || 'hero');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-[70px] bg-background/80 backdrop-blur-xl border-b border-border flex items-center px-6">
      <div className="flex items-center gap-2">
        <span className="font-display text-2xl tracking-widest text-primary text-glow-cyan">
          AVERTI
        </span>
        <span className="w-2 h-2 bg-accent rounded-full mt-1" />
        <div className="hidden sm:block ml-2">
          <span className="text-[9px] tracking-[0.3em] text-muted-foreground font-mono-space uppercase">
            GAS DETECTION SYSTEM
          </span>
        </div>
      </div>

      <div className="hidden lg:flex items-center gap-6 mx-auto">
        {NAV_LINKS.map(link => (
          <button
            key={link}
            onClick={() => handleClick(link)}
            className="text-xs tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors font-mono-space cursor-pointer"
          >
            {link}
          </button>
        ))}
      </div>

      <div className="ml-auto flex items-center gap-2">
        <span className="w-2 h-2 bg-safe rounded-full animate-pulse-glow" />
        <span className="text-[10px] font-mono-space text-safe tracking-wider hidden sm:inline">
          ALL SYSTEMS OPERATIONAL
        </span>
      </div>
    </nav>
  );
};

export default Navbar;
