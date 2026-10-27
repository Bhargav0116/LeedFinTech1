export default function WhyChooseUs() {
  return (
    <section className="theme-dark py-24 max-w-7xl mx-auto px-6">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white">Good work, grounded in good thinking.</h2>
        <p className="mt-3 text-slate-400">A considered approach to technology, learning, and the people behind both.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 text-center">
        <div className="proof-point p-8 rounded-3xl bg-slate-900/40 border border-slate-800">
          <div className="text-3xl font-serif text-[#D4AF37] mb-2">01</div>
          <h3 className="text-lg font-semibold text-white">Start with context</h3>
          <p className="text-sm text-slate-400 mt-2">We listen first, then shape technology decisions around the work that matters.</p>
        </div>
        <div className="proof-point p-8 rounded-3xl bg-slate-900/40 border border-slate-800">
          <div className="text-3xl font-serif text-[#D4AF37] mb-2">02</div>
          <h3 className="text-lg font-semibold text-white">Learn by doing</h3>
          <p className="text-sm text-slate-400 mt-2">Practical learning brings concepts closer to the way technology is used.</p>
        </div>
        <div className="proof-point p-8 rounded-3xl bg-slate-900/40 border border-slate-800">
          <div className="text-3xl font-serif text-[#D4AF37] mb-2">03</div>
          <h3 className="text-lg font-semibold text-white">Make progress together</h3>
          <p className="text-sm text-slate-400 mt-2">Thoughtful collaboration keeps teams and learners moving forward.</p>
        </div>
      </div>
    </section>
  );
}