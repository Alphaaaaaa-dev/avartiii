import { useEffect, useState } from 'react';
import { Shield, Cpu, Flame, Bell, ChevronRight, Zap, Globe, Target } from 'lucide-react';

const HomePage = () => {
  const [visible, setVisible] = useState(false);
  useEffect(() => { setVisible(true); }, []);

  return (
    <div className="space-y-0 -m-6">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Grid background */}
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: 'linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]" />

        <div className={`relative z-10 text-center px-6 max-w-4xl mx-auto transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 border border-primary/30 bg-primary/5 px-4 py-1.5 mb-6">
            <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
            <span className="text-[10px] font-mono-space text-primary tracking-[0.3em]">NEXT-GEN SAFETY INFRASTRUCTURE</span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-foreground tracking-wider leading-[0.9] mb-4">
            AI-POWERED SMART
            <br />
            <span className="text-primary text-glow-cyan">GAS & FIRE SAFETY</span>
          </h1>

          <p className="font-body text-sm md:text-base text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed">
            Averti builds intelligent gas-detection and fire-safety systems. 
            Our flagship <span className="text-foreground font-semibold">Averti-X</span> combines sensors, AI & mobile connectivity 
            to detect hazards and trigger instant action — protecting lives everywhere.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#solution" className="clip-angled bg-primary text-primary-foreground px-10 py-3 font-display text-sm tracking-widest hover:glow-cyan transition-shadow cursor-pointer flex items-center justify-center gap-2">
              EXPLORE SOLUTION
              <ChevronRight size={16} />
            </a>
            <a href="#mission" className="clip-angled border border-primary/60 text-primary px-10 py-3 font-display text-sm tracking-widest hover:bg-primary/10 transition-colors cursor-pointer text-center">
              OUR MISSION
            </a>
          </div>
        </div>

        <div className="absolute top-8 left-8 w-12 h-12 border-t border-l border-primary/20" />
        <div className="absolute bottom-8 right-8 w-12 h-12 border-b border-r border-primary/20" />
      </section>

      {/* What We Do */}
      <section id="solution" className="px-6 py-16 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="text-[10px] font-mono-space text-primary tracking-[0.4em] mb-2">CAPABILITIES</div>
            <h2 className="font-display text-3xl md:text-4xl text-foreground tracking-wider">WHAT WE DO</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: Cpu, title: 'AI DETECTION', desc: 'ML algorithms analyze sensor data in real-time to identify gas leaks before danger.' },
              { icon: Bell, title: 'INSTANT ALERTS', desc: 'Sub-2s notifications via SMS, push & sirens for immediate hazard response.' },
              { icon: Flame, title: 'FIRE SAFETY', desc: 'Integrated fire & gas detection with automated suppression triggers.' },
              { icon: Globe, title: 'REMOTE MONITOR', desc: '24/7 cloud dashboard for real-time visibility from anywhere.' },
            ].map(item => (
              <div key={item.title} className="group bg-card border border-border p-5 hover:border-primary/40 hover:-translate-y-1 transition-all duration-300">
                <div className="w-10 h-10 border border-primary/30 flex items-center justify-center mb-3 group-hover:bg-primary/10 transition-colors">
                  <item.icon size={18} className="text-primary" />
                </div>
                <h3 className="font-display text-sm tracking-wider text-foreground mb-1.5">{item.title}</h3>
                <p className="text-xs font-body text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why It Matters */}
      <section className="px-6 py-16 border-t border-border bg-card/30">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="text-[10px] font-mono-space text-primary tracking-[0.4em] mb-2">IMPACT</div>
            <h2 className="font-display text-3xl md:text-4xl text-foreground tracking-wider">WHY IT MATTERS</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              { stat: '300+', label: 'Gas accidents yearly in India alone', icon: Shield },
              { stat: '< 2s', label: 'Averti-X response time', icon: Zap },
              { stat: '24/7', label: 'Autonomous monitoring', icon: Target },
            ].map(item => (
              <div key={item.label} className="text-center">
                <div className="w-12 h-12 mx-auto border border-primary/30 flex items-center justify-center mb-3">
                  <item.icon size={20} className="text-primary" />
                </div>
                <div className="font-display text-4xl text-primary text-glow-cyan mb-1">{item.stat}</div>
                <p className="text-xs font-body text-muted-foreground leading-relaxed max-w-[200px] mx-auto">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section id="mission" className="px-6 py-16 border-t border-border relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/3 rounded-full blur-[100px]" />

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-8">
            <div className="text-[10px] font-mono-space text-primary tracking-[0.4em] mb-2">PURPOSE</div>
            <h2 className="font-display text-3xl md:text-4xl text-foreground tracking-wider">OUR MISSION</h2>
          </div>

          <div className="border-l-2 border-primary pl-6 md:pl-10 py-2">
            <p className="font-display text-lg md:text-xl text-foreground tracking-wide leading-relaxed mb-3">
              "MAKE SAFETY INTELLIGENT, ACCESSIBLE & AUTOMATIC — SO NO LIFE IS LOST TO A PREVENTABLE HAZARD."
            </p>
            <p className="font-body text-sm text-muted-foreground leading-relaxed">
              We deploy smart, AI-driven detection that protects every worker, home & vehicle — regardless of scale or budget.
            </p>
          </div>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/dashboard" className="clip-angled bg-primary text-primary-foreground px-10 py-3 font-display text-sm tracking-widest hover:glow-cyan transition-shadow cursor-pointer flex items-center justify-center gap-2">
              LIVE DASHBOARD
              <ChevronRight size={16} />
            </a>
            <a href="/support" className="clip-angled border border-primary/60 text-primary px-10 py-3 font-display text-sm tracking-widest hover:bg-primary/10 transition-colors cursor-pointer text-center">
              CONTACT US
            </a>
          </div>
        </div>
      </section>

      {/* Footer strip */}
      <section className="border-t border-border px-6 py-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <span className="text-[10px] font-mono-space text-muted-foreground">© 2026 AVERTI SAFETY SYSTEMS</span>
          <span className="text-[10px] font-mono-space text-primary tracking-[0.3em]">PROTECTING LIVES THROUGH INTELLIGENT DETECTION</span>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
