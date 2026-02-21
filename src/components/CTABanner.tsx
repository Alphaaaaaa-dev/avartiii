const CTABanner = () => (
  <section className="py-20 px-6 border-t-2 border-primary/30">
    <div className="max-w-4xl mx-auto text-center">
      <h2 className="font-display text-4xl md:text-6xl text-foreground tracking-wider mb-4">
        READY TO PROTECT YOUR FACILITY?
      </h2>
      <p className="text-muted-foreground font-body text-lg mb-10">
        Deploy in 48 hours. Full compliance from day one.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
        <button className="clip-angled bg-primary text-primary-foreground px-10 py-3 font-display text-lg tracking-widest hover:glow-cyan transition-shadow cursor-pointer">
          REQUEST A DEMO
        </button>
        <button className="clip-angled border border-primary text-primary px-10 py-3 font-display text-lg tracking-widest hover:bg-primary/10 transition-colors cursor-pointer">
          CONTACT SALES
        </button>
      </div>
      <div className="text-sm font-mono-space text-muted-foreground">
        Emergency Contact: <span className="text-accent">91092xxxxx</span>
      </div>
    </div>
  </section>
);

export default CTABanner;
