"use client";

import { useState } from "react";

export default function ResourceFAQs() {
  const [open, setOpen] = useState<number | null>(null);

  const faqs = [
    { q: "Do you offer project or internship opportunities?", a: "Project and internship opportunities can depend on current availability, eligibility, and the needs of a particular program. They are not guaranteed. Contact us to discuss what is currently available." },
    { q: "What technology services can you help with?", a: "Our team can discuss digital product development, cloud and infrastructure, engineering workflows, and technical guidance. The right scope depends on your goals." },
    { q: "How can I learn more about learning pathways?", a: "Explore the learning page for areas of focus, then contact our team to ask about current formats, availability, and the best fit for your goals." }
  ];

  return (
    <section className="theme-dark py-24 max-w-4xl mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white">Resource Center & FAQs</h2>
        <p className="mt-3 text-slate-400">Got questions? We have answers.</p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <div key={idx} className="faq-item border border-slate-800 rounded-2xl bg-slate-900/40 overflow-hidden">
            <button
              type="button"
              onClick={() => setOpen(open === idx ? null : idx)}
              aria-expanded={open === idx}
              aria-controls={`faq-answer-${idx}`}
              className="w-full p-6 text-left font-medium text-white flex justify-between items-center"
            >
              {faq.q}
              <span>{open === idx ? "−" : "+"}</span>
            </button>
            {open === idx && (
              <div id={`faq-answer-${idx}`} className="px-6 pb-6 text-sm text-slate-400 leading-relaxed">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}