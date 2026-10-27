import Link from "next/link";

export default function PricingSection() {
  return (
    <section className="theme-light py-24 bg-slate-900/30 border-y border-slate-800">
      <div className="max-w-7xl mx-auto px-6 text-center max-w-3xl mb-16">
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white">A thoughtful fit starts with a conversation.</h2>
        <p className="mt-3 text-slate-400">Scope and learning options depend on your goals. Let&apos;s find the right way forward.</p>
      </div>

      <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-8">
        <div className="pricing-card p-8 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-serif font-semibold text-white">Technology partnerships</h3>
            <p className="text-sm text-slate-400 mt-1">For teams planning a product, platform, or stronger technology foundations.</p>
            <div className="text-3xl font-bold text-[#E6C687] my-6">Scoped to your goals</div>
            <ul className="space-y-3 text-sm text-slate-300">
              <li>✓ A clear conversation about your needs</li>
              <li>✓ A practical, tailored scope of work</li>
              <li>✓ Engineering support aligned to your team</li>
            </ul>
          </div>
          <Link href="/contact" className="mt-8 block py-3 rounded-full bg-slate-800 text-center text-sm font-medium text-white hover:bg-slate-700 transition">Discuss a project</Link>
        </div>

        <div className="pricing-card pricing-card-featured p-8 rounded-3xl bg-slate-900 border border-[#D4AF37]/50 flex flex-col justify-between relative shadow-xl">
          <div className="absolute -top-3 right-6 px-3 py-1 bg-[#D4AF37] text-slate-950 text-xs font-bold rounded-full">LEARNING</div>
          <div>
            <h3 className="text-xl font-serif font-semibold text-white">Learning &amp; mentorship</h3>
            <p className="text-sm text-slate-400 mt-1">For learners exploring practical technology education and project experience.</p>
            <div className="text-3xl font-bold text-[#E6C687] my-6">Explore pathways</div>
            <ul className="space-y-3 text-sm text-slate-300">
              <li>✓ Practical learning pathways</li>
              <li>✓ Guidance from experienced practitioners</li>
              <li>✓ Project and career-readiness support</li>
            </ul>
          </div>
          <Link href="/lms" className="mt-8 block py-3 rounded-full bg-gradient-to-r from-[#C5A059] to-[#D4AF37] text-center text-sm font-medium text-slate-950 hover:opacity-90 transition">Explore learning</Link>
        </div>
      </div>
    </section>
  );
}