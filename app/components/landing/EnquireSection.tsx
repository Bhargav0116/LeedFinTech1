import Link from "next/link";

export default function EnquireSection() {
  return (
    <section className="enquiry-band theme-light py-24 bg-gradient-to-b from-slate-950 to-amber-950/20 border-t border-slate-800 text-center">
      <div className="enquiry-content relative z-10 max-w-3xl mx-auto px-6">
        <p className="inner-eyebrow inner-eyebrow-dark">A good place to begin</p>
        <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white">Ready for what&apos;s next?</h2>
        <p className="mt-4 text-slate-400">Tell us what you are working toward. We will help you find the right place to start.</p>
        <Link href="/contact#enquiry-form" className="hero-primary-link mt-8 px-8 py-4 font-medium text-slate-950 transition duration-300">
          Start a conversation <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </section>
  );
}