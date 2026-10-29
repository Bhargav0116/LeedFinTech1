export default function ServicesSection() {
  const services = [
    { title: "Digital product engineering", desc: "Web and mobile experiences planned around your customers, team, and business goals." },
    { title: "Cloud & platform engineering", desc: "Architecture, infrastructure, and delivery workflows designed for dependable growth." },
    { title: "Technical learning", desc: "Focused learning pathways that connect technology concepts to practical work." },
    { title: "Project & career readiness", desc: "Mentorship and guided practice to help learners build confidence through experience." }
  ];

  return (
    <section className="theme-dark py-24 max-w-7xl mx-auto px-6 border-t border-slate-900">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white">Expertise for what comes next.</h2>
        <p className="mt-3 text-slate-400">Thoughtful technology services and practical learning, brought together by one team.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((item, idx) => (
          <div key={idx} className="service-card p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-[#D4AF37]/50 transition group">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-[#E6C687] font-bold mb-4 group-hover:scale-110 transition">✦</div>
            <h3 className="text-lg font-serif font-semibold text-white">{item.title}</h3>
            <p className="mt-2 text-sm text-slate-400 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}