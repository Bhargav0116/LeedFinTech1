"use client";

import React, { useState, useEffect, useRef } from "react";

interface TeamMember {
  name: string;
  role: string;
  photo: string;
  bio: string;
  expertise: string[];
  quote: string;
}

const team: TeamMember[] = [
  {
    name: "Kranthi Kumar",
    role: "CEO & Founder",
    photo:
      "https://plain-apac-prod-public.komododecks.com/202610/13/1JJViBo0prR8NkU3cV53/image.jpg",
    bio: "Kranthi Kumar leads the vision and strategic growth at LeedfinTech. With a deep passion for scalable architecture, digital empowerment, and transformative product engineering, he guides the company toward building sustainable technology solutions for businesses and learners alike.",
    expertise: [
      "Strategic Leadership",
      "Product Architecture",
      "Digital Transformation",
    ],
    quote:
      "Building technology that creates genuine, lasting leverage for businesses and careers.",
  },
  {
    name: "Yadam Naga Venkata Naveen Kumar",
    role: "Co-founder & Executive Director",
    photo:
      "https://plain-apac-prod-public.komododecks.com/202610/13/SBn2P0XIPM1Q1XlFTJYz/image.jpg",
    bio: "As Co-founder & Executive Director, Naveen oversees operational excellence and organizational expansion. He bridges the gap between high-level technological execution and day-to-day delivery, ensuring rigorous standards across all client engagements and educational initiatives.",
    expertise: ["Operations", "Executive Management", "Scalable Delivery"],
    quote:
      "Execution excellence is the bridge between ambitious vision and real-world results.",
  },
  {
    name: "Kondaveeti Prudhivi",
    role: "Co-founder & CMO",
    photo:
      "https://plain-apac-prod-public.komododecks.com/202610/13/HlTc8lTfBFNwHXkSOf7l/image.png",
    bio: "Prudhivi drives brand growth, communications, and outreach strategies at LeedfinTech. By connecting our mission with communities, partner organizations, and future technologists, Prudhivi ensures our message of practical innovation reaches those who need it most.",
    expertise: ["Brand Strategy", "Market Growth", "Community Engagement"],
    quote:
      "Connecting meaningful technology with the communities and minds that drive tomorrow.",
  },
];

export default function AboutPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const pauseTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-sliding interval every 6 seconds when not paused
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % team.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isPaused]);

  // Handle manual interaction (hover/tap) with 15-second pause
  const handleInteraction = () => {
    setIsPaused(true);

    if (pauseTimerRef.current) {
      clearTimeout(pauseTimerRef.current);
    }

    // Pause for 15 seconds then resume
    pauseTimerRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 15000);
  };

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
    };
  }, []);

  const handleNext = () => {
    handleInteraction();
    setActiveIndex((prev) => (prev + 1) % team.length);
  };

  const handlePrev = () => {
    handleInteraction();
    setActiveIndex((prev) => (prev === 0 ? team.length - 1 : prev - 1));
  };

  return (
    <main className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900 antialiased overflow-x-hidden">
      {}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 px-6 lg:px-12 max-w-7xl mx-auto border-b border-slate-100">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold tracking-wider uppercase mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
            LeedfinTech Enterprise
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light tracking-tight text-slate-900 leading-[1.1] mb-8">
            Technology for a{" "}
            <span className="font-semibold text-blue-600">capable future.</span>
          </h1>
          <p className="text-xl text-slate-600 font-normal leading-relaxed max-w-2xl">
            We bring thoughtful technology services and practical learning
            together—helping businesses build with confidence and people grow
            into opportunity.
          </p>
        </div>
      </section>

      {}
      <section className="py-24 px-6 lg:px-12 max-w-7xl mx-auto border-b border-slate-100">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
          <div className="lg:col-span-4">
            <span className="text-xs font-mono font-bold tracking-widest text-blue-600 uppercase block mb-3">
              01 / Our Purpose
            </span>
            <h2 className="text-3xl md:text-4xl font-normal text-slate-900 tracking-tight">
              Engineering impact with clarity.
            </h2>
          </div>
          <div className="lg:col-span-8 space-y-12">
            <p className="text-lg md:text-xl text-slate-600 leading-relaxed font-light">
              We believe true progress happens when useful technology meets
              practical knowledge. LeedfinTech exists to solve complex
              organizational problems while making digital engineering
              accessible to the next wave of builders.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:border-slate-200 transition-all">
                <span className="text-xs font-mono font-bold text-slate-400 block mb-4">
                  PILLAR 01
                </span>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                  Build Thoughtfully
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Dependable digital solutions and systems architected around
                  genuine business and user requirements.
                </p>
              </div>
              <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:border-slate-200 transition-all">
                <span className="text-xs font-mono font-bold text-slate-400 block mb-4">
                  PILLAR 02
                </span>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                  Learn by Doing
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Practical technical education, immersion programs, and
                  mentorship tightly coupled with real-world execution.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {}
      <section className="py-24 px-6 lg:px-12 max-w-7xl mx-auto border-b border-slate-100 bg-slate-50/50">
        <div className="max-w-3xl mb-16">
          <span className="text-xs font-mono font-bold tracking-widest text-indigo-600 uppercase block mb-3">
            02 / Our Scope
          </span>
          <h2 className="text-3xl md:text-4xl font-normal text-slate-900 tracking-tight">
            Grounded in today. Scaled for tomorrow.
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-10 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold mb-6">
                ↗
              </div>
              <span className="text-xs font-mono text-blue-600 uppercase tracking-wider block mb-2">
                Current Horizon
              </span>
              <h3 className="text-2xl font-semibold text-slate-900 mb-4">
                Core Capabilities
              </h3>
              <p className="text-slate-600 leading-relaxed mb-8">
                Delivering tailored technology services for growing
                organizations alongside immersive mentorship and career learning
                avenues.
              </p>
            </div>
            <ul className="space-y-3 pt-6 border-t border-slate-100 text-sm font-medium text-slate-700">
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                Enterprise Digital Solutions & Engineering
              </li>
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                Structured Technical Upskilling
              </li>
            </ul>
          </div>

          <div className="p-10 rounded-3xl bg-slate-900 text-white shadow-xl flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-slate-800 text-indigo-400 flex items-center justify-center font-bold mb-6">
                ✦
              </div>
              <span className="text-xs font-mono text-indigo-400 uppercase tracking-wider block mb-2">
                Future Vision
              </span>
              <h3 className="text-2xl font-semibold text-white mb-4">
                Expansion Roadmap
              </h3>
            </div>
            <p className="text-slate-300 leading-relaxed my-6">
              Scaling our technical infrastructure, expanding advanced product
              suites, and bridging professional education directly with industry
              project workflows.
            </p>
            <ul className="space-y-3 pt-6 border-t border-slate-800 text-sm font-medium text-slate-300">
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                Advanced Enterprise Service Pathways
              </li>
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                Ecosystem Integration & Research Labs
              </li>
            </ul>
          </div>
        </div>
      </section>

      {}
      <section
        className="py-28 md:py-36 px-6 lg:px-12 max-w-7xl mx-auto"
        onMouseEnter={handleInteraction}
        onTouchStart={handleInteraction}
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-xs font-mono font-bold tracking-widest text-emerald-600 uppercase block mb-3">
              03 / Leadership
            </span>
            <h2 className="text-3xl md:text-5xl font-light text-slate-900 tracking-tight">
              Guided by <span className="font-semibold">conviction.</span>
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs font-mono text-slate-400">
              {isPaused ? "Paused (15s timer)" : "Auto-sliding..."}
            </span>
            <div className="flex gap-2">
              <button
                onClick={handlePrev}
                className="w-10 h-10 rounded-full border border-slate-300 bg-white hover:bg-slate-100 text-slate-700 flex items-center justify-center transition-all shadow-sm cursor-pointer"
                aria-label="Previous Director"
              >
                ←
              </button>
              <button
                onClick={handleNext}
                className="w-10 h-10 rounded-full border border-slate-300 bg-white hover:bg-slate-100 text-slate-700 flex items-center justify-center transition-all shadow-sm cursor-pointer"
                aria-label="Next Director"
              >
                →
              </button>
            </div>
          </div>
        </div>

        {/* 3D Coverflow Carousel Container */}
        <div className="relative w-full py-8 min-h-[520px] flex items-center justify-center perspective-[1200px]">
          <div className="w-full max-w-5xl relative flex items-center justify-center min-h-[460px]">
            {team.map((dir, idx) => {
              // Calculate relative position (-1 for left, 0 for center, 1 for right)
              const total = team.length;
              let diff = (idx - activeIndex + total) % total;
              if (diff > total / 2) {
                diff -= total;
              }

              const isCenter = diff === 0;
              const isLeft = diff === -1 || (total === 3 && diff === 2);
              const isRight = diff === 1 || (total === 3 && diff === -2);

              // If it's neither left, right, nor center (for > 3 items), hide it or position safely
              if (!isCenter && !isLeft && !isRight) return null;

              return (
                <div
                  key={dir.name}
                  onClick={() => {
                    handleInteraction();
                    setActiveIndex(idx);
                  }}
                  className={`absolute transition-all duration-700 ease-out cursor-pointer rounded-3xl overflow-hidden border shadow-xl bg-white flex flex-col md:flex-row ${
                    isCenter
                      ? "z-30 w-full max-w-3xl scale-100 opacity-100 border-slate-300 shadow-2xl pointer-events-auto"
                      : "z-10 w-[85%] max-w-2xl scale-[0.85] opacity-60 hover:opacity-95 border-slate-200 pointer-events-auto"
                  } ${
                    isLeft
                      ? "-translate-x-[22%] md:-translate-x-[28%] rotate-y-12 blur-[0.5px]"
                      : isRight
                        ? "translate-x-[22%] md:translate-x-[28%] -rotate-y-12 blur-[0.5px]"
                        : "translate-x-0 rotate-0"
                  }`}
                  style={{
                    transform: isCenter
                      ? "translateX(0) scale(1) translateZ(0)"
                      : isLeft
                        ? "translateX(-28%) scale(0.85) translateZ(-100px)"
                        : "translateX(28%) scale(0.85) translateZ(-100px)",
                  }}
                >
                  {/* Card Left: Photo */}
                  <div className="md:w-5/12 relative bg-slate-100 min-h-[300px] md:min-h-[440px]">
                    <img
                      src={dir.photo}
                      alt={dir.name}
                      className="w-full h-full object-cover object-top"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "https://placehold.co/400x500/f1f5f9/475569?text=Director";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent md:hidden" />
                    <div className="absolute bottom-4 left-4 right-4 text-white md:hidden">
                      <span className="text-xs font-semibold uppercase tracking-wider bg-blue-600 px-2.5 py-1 rounded-md mb-1 inline-block">
                        {dir.role}
                      </span>
                      <h3 className="text-xl font-bold">{dir.name}</h3>
                    </div>
                  </div>

                  {/* Card Right: Bio, Quote, Expertise */}
                  <div className="md:w-7/12 p-8 md:p-10 flex flex-col justify-between bg-white">
                    <div>
                      <div className="hidden md:block">
                        <span className="text-xs font-mono font-bold text-blue-600 uppercase tracking-widest block mb-1">
                          {dir.role}
                        </span>
                        <h3 className="text-3xl font-bold text-slate-900 mb-4">
                          {dir.name}
                        </h3>
                      </div>

                      <blockquote className="border-l-2 border-blue-600 pl-4 italic text-slate-700 text-sm md:text-base font-normal mb-6">
                        &ldquo;{dir.quote}&rdquo;
                      </blockquote>

                      <p className="text-slate-600 text-sm md:text-base leading-relaxed font-light mb-6 line-clamp-4">
                        {dir.bio}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-100">
                      <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block mb-2">
                        Key Competencies
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {dir.expertise.map((skill) => (
                          <span
                            key={skill}
                            className="text-[11px] font-medium bg-slate-50 border border-slate-200 text-slate-700 px-2.5 py-1 rounded-md"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Carousel Pagination Dots */}
        <div className="flex justify-center items-center gap-3 mt-10">
          {team.map((dir, idx) => (
            <button
              key={dir.name}
              onClick={() => {
                handleInteraction();
                setActiveIndex(idx);
              }}
              className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                activeIndex === idx
                  ? "w-10 bg-blue-600"
                  : "w-2.5 bg-slate-300 hover:bg-slate-400"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
