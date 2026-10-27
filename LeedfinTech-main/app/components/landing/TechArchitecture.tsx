export default function TechArchitecture() {
  return (
    <section className="architecture-band theme-light py-24 bg-slate-900/30 border-y border-slate-800">
      <div className="architecture-content relative z-10 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white">Strong foundations. Considered delivery.</h2>
          <p className="mt-4 text-slate-400 leading-relaxed">
            Good engineering starts with understanding the problem. We help teams make clear architecture choices and build secure, maintainable solutions that can evolve.
          </p>
          <div className="architecture-features mt-6 space-y-3 text-sm text-slate-300">
            <div className="flex items-center gap-2">Security and privacy considered from the start</div>
            <div className="flex items-center gap-2">Delivery workflows shaped around your team</div>
            <div className="flex items-center gap-2">Integrations designed for your product needs</div>
          </div>
        </div>
        <div className="architecture-status p-8 rounded-3xl bg-slate-950 border border-[#D4AF37]/30 shadow-2xl font-mono text-xs text-[#E6C687] space-y-2">
          <p className="text-slate-500">A considered delivery process</p>
          <p>{`{ understand: "your goals", plan: "the right scope" }`}</p>
          <p className="text-emerald-400">01 / Discover the opportunity</p>
          <p className="text-emerald-400">02 / Design a practical approach</p>
          <p className="text-emerald-400">03 / Build, review, and evolve</p>
        </div>
      </div>
    </section>
  );
}