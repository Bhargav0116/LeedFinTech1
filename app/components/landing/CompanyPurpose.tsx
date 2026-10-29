"use client";

import { JSX, useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";

/* -------------------------------------------------------------------------- */
/*  Motion                                                                     */
/* -------------------------------------------------------------------------- */

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT } },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.04 } },
};

const lineReveal: Variants = {
  hidden: { opacity: 0, y: 22, filter: "blur(10px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.85, ease: EASE_OUT },
  },
};

const cardReveal: Variants = {
  hidden: { opacity: 0, y: 28, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: EASE_OUT },
  },
};

/* -------------------------------------------------------------------------- */
/*  Icons                                                                      */
/* -------------------------------------------------------------------------- */

function Svg({
  className,
  children,
  strokeWidth = 1.75,
}: {
  className?: string;
  children: React.ReactNode;
  strokeWidth?: number;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className ?? "h-full w-full"}
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

const CodeIcon = ({ className }: { className?: string }) => (
  <Svg className={className}>
    <path d="M16 18l6-6-6-6" />
    <path d="M8 6l-6 6 6 6" />
  </Svg>
);

const GraduationIcon = ({ className }: { className?: string }) => (
  <Svg className={className}>
    <path d="M22 10L12 5 2 10l10 5 10-5z" />
    <path d="M6 12v5c0 1.5 3 3 6 3s6-1.5 6-3v-5" />
  </Svg>
);

const ShieldIcon = ({ className }: { className?: string }) => (
  <Svg className={className}>
    <path d="M12 3l8 4v6c0 5-4 8-8 8s-8-3-8-8V7z" />
    <path d="M9 12l2 2 4-4" />
  </Svg>
);

const ArrowIcon = ({ className }: { className?: string }) => (
  <Svg className={className} strokeWidth={2}>
    <path d="M5 12h14" />
    <path d="M13 5l7 7-7 7" />
  </Svg>
);

/* -------------------------------------------------------------------------- */
/*  Data                                                                       */
/* -------------------------------------------------------------------------- */

type Pillar = {
  key: string;
  num: string;
  annotation: string;
  label: string;
  titleStart: string;
  titleAccent: string;
  description: string;
  features: string[];
  metric: { value: string; label: string };
  href: string;
  accent: {
    iconBg: string;
    text: string;
    gradient: string;
    dot: string;
    divider: string;
    arrowHover: string;
    glow: string;
    watermark: string;
    conicGradient: string;
    glowShadow: string;
  };
  Icon: ({ className }: { className?: string }) => JSX.Element;
};

const PILLARS: Pillar[] = [
  {
    key: "it",
    num: "01",
    annotation: "engineering",
    label: "IT & Product Engineering",
    titleStart: "Software that scales",
    titleAccent: "with ambition.",
    description:
      "Web, mobile, SaaS and the cloud architecture that keeps them fast and safe.",
    features: ["Web", "Mobile", "SaaS", "Cloud"],
    metric: { value: "120+", label: "products" },
    href: "/services/it",
    accent: {
      iconBg: "from-violet-500 to-violet-700",
      text: "text-violet-700",
      gradient: "from-violet-500 to-violet-700",
      dot: "bg-violet-500",
      divider: "bg-violet-200",
      arrowHover:
        "group-hover/link:border-violet-700 group-hover/link:bg-violet-700 group-hover/link:text-white",
      glow: "bg-violet-200",
      watermark: "text-violet-200",
      conicGradient:
        "conic-gradient(from 0deg, #8b5cf6 0deg, #c4b5fd 40deg, transparent 120deg, transparent 360deg)",
      glowShadow:
        "group-hover:shadow-[0_28px_70px_-18px_rgba(139,92,246,0.42)]",
    },
    Icon: CodeIcon,
  },
  {
    key: "edtech",
    num: "02",
    annotation: "education",
    label: "EdTech & Growth",
    titleStart: "Learning that becomes",
    titleAccent: "a career.",
    description:
      "Courses, internships and certifications built with practitioners.",
    features: ["Courses", "Internships", "Certs"],
    metric: { value: "5K+", label: "learners" },
    href: "/lms",
    accent: {
      iconBg: "from-amber-500 to-orange-600",
      text: "text-orange-700",
      gradient: "from-amber-500 to-orange-600",
      dot: "bg-amber-500",
      divider: "bg-amber-200",
      arrowHover:
        "group-hover/link:border-orange-600 group-hover/link:bg-orange-600 group-hover/link:text-white",
      glow: "bg-amber-200",
      watermark: "text-amber-200",
      conicGradient:
        "conic-gradient(from 0deg, #f59e0b 0deg, #fcd34d 40deg, transparent 120deg, transparent 360deg)",
      glowShadow:
        "group-hover:shadow-[0_28px_70px_-18px_rgba(245,158,11,0.42)]",
    },
    Icon: GraduationIcon,
  },
  {
    key: "finserve",
    num: "03",
    annotation: "finserv",
    label: "Financial Services",
    titleStart: "Money operations,",
    titleAccent: "handled properly.",
    description:
      "NBFC partnerships, recovery and asset workflows built on compliance.",
    features: ["NBFC", "Recovery", "Compliance"],
    metric: { value: "3+", label: "partners" },
    href: "/services/finserve",
    accent: {
      iconBg: "from-emerald-500 to-teal-600",
      text: "text-teal-700",
      gradient: "from-emerald-500 to-teal-600",
      dot: "bg-emerald-500",
      divider: "bg-emerald-200",
      arrowHover:
        "group-hover/link:border-teal-600 group-hover/link:bg-teal-600 group-hover/link:text-white",
      glow: "bg-emerald-200",
      watermark: "text-emerald-200",
      conicGradient:
        "conic-gradient(from 0deg, #10b981 0deg, #6ee7b7 40deg, transparent 120deg, transparent 360deg)",
      glowShadow:
        "group-hover:shadow-[0_28px_70px_-18px_rgba(16,185,129,0.42)]",
    },
    Icon: ShieldIcon,
  },
];

/* -------------------------------------------------------------------------- */
/*  Corner brackets                                                            */
/* -------------------------------------------------------------------------- */

function CornerBrackets() {
  return (
    <>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-3 top-3 h-3.5 w-3.5 rounded-tl-md border-l border-t border-[#ddd3eb] transition-colors duration-500 group-hover:border-[#b7a5d6]"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-3 top-3 h-3.5 w-3.5 rounded-tr-md border-r border-t border-[#ddd3eb] transition-colors duration-500 group-hover:border-[#b7a5d6]"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-3 left-3 h-3.5 w-3.5 rounded-bl-md border-b border-l border-[#ddd3eb] transition-colors duration-500 group-hover:border-[#b7a5d6]"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-3 right-3 h-3.5 w-3.5 rounded-br-md border-b border-r border-[#ddd3eb] transition-colors duration-500 group-hover:border-[#b7a5d6]"
      />
    </>
  );
}

/* -------------------------------------------------------------------------- */
/*  Pillar card                                                                */
/* -------------------------------------------------------------------------- */

function PillarCard({ pillar }: { pillar: Pillar }) {
  const reduce = useReducedMotion();
  const [hovered, setHovered] = useState(false);
  const [tapped, setTapped] = useState(false);
  const tapTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Card is "active" (scaled + sweep) if hovered OR tapped recently
  const showActive = (hovered || tapped) && !reduce;

  // Clear the tap timer on unmount
  useEffect(() => {
    return () => {
      if (tapTimerRef.current) clearTimeout(tapTimerRef.current);
    };
  }, []);

  // Framer motion's onTap fires only on a complete tap (down + up, no drag),
  // so accidental touches during scroll won't falsely trigger it.
  const handleTap = () => {
    if (reduce) return;
    setTapped(true);
    if (tapTimerRef.current) clearTimeout(tapTimerRef.current);
    tapTimerRef.current = setTimeout(() => setTapped(false), 2000);
  };

  return (
    <motion.div
      variants={cardReveal}
      initial={reduce ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      className="h-full"
    >
      <motion.article
        initial={false}
        animate={showActive ? { y: -6, scale: 1.02 } : { y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 26 }}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        onTap={handleTap}
        onFocusCapture={() => setHovered(true)}
        onBlurCapture={() => setHovered(false)}
        style={{ zIndex: showActive ? 10 : undefined }}
        className="group relative h-full"
      >
        {/* Border shell — 2px padding = the visible rotating "fence" */}
        <div
          className={`relative h-full overflow-hidden rounded-2xl p-0.5 shadow-[0_1px_2px_rgba(42,30,64,0.04)] transition-shadow duration-500 ${pillar.accent.glowShadow}`}
        >
          {/* Base border: static gradient */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-2xl bg-linear-to-b from-[#ece6f5] via-[#f4effa] to-[#e8e0f4]"
          />

          {/* Rotating accent sweep — clipped to the 2px border ring */}
          <div
            aria-hidden="true"
            className={`pointer-events-none absolute inset-[-50%] transition-opacity duration-500 ${
              showActive ? "opacity-100" : "opacity-0"
            }`}
          >
            <motion.div
              animate={showActive ? { rotate: [0, 360] } : { rotate: 0 }}
              transition={
                showActive
                  ? { duration: 3.5, repeat: Infinity, ease: "linear" }
                  : { duration: 0 }
              }
              className="h-full w-full"
              style={{ background: pillar.accent.conicGradient }}
            />
          </div>

          {/* Card body */}
          <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(1rem-2px)] bg-white">
            {/* Blueprint grid — masked to top half */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-[0.55]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(97,75,140,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(97,75,140,0.07) 1px, transparent 1px)",
                backgroundSize: "24px 24px",
                maskImage:
                  "linear-gradient(to bottom, black 0%, black 45%, transparent 78%)",
                WebkitMaskImage:
                  "linear-gradient(to bottom, black 0%, black 45%, transparent 78%)",
              }}
            />

            {/* Film-grain noise */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-multiply"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
              }}
            />

            {/* Dot-grid accent */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute right-4 top-4 h-10 w-10 opacity-60"
              style={{
                backgroundImage:
                  "radial-gradient(circle, #d6c9e8 1px, transparent 1px)",
                backgroundSize: "6px 6px",
              }}
            />

            <CornerBrackets />

            {/* Watermark number */}
            <span
              aria-hidden="true"
              className={`pointer-events-none absolute -right-3 -top-8 select-none font-mono text-[8.5rem] font-black leading-none ${pillar.accent.watermark}`}
            >
              {pillar.num}
            </span>

            {/* Content */}
            <div className="relative z-10 flex flex-1 flex-col p-6 sm:p-7">
              {/* Annotation + icon */}
              <div className="flex items-start justify-between">
                <div className="inline-flex items-center gap-2">
                  <span
                    aria-hidden="true"
                    className={`h-1.5 w-1.5 rotate-45 rounded-[1px] ${pillar.accent.dot}`}
                  />
                  <span
                    className={`font-mono text-[9.5px] font-semibold uppercase tracking-[0.24em] ${pillar.accent.text}`}
                  >
                    {pillar.annotation}
                  </span>
                </div>
                <div
                  className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-linear-to-br ${pillar.accent.iconBg} text-white shadow-lg shadow-violet-900/15 ring-1 ring-white/40`}
                >
                  <pillar.Icon className="h-5 w-5" />
                </div>
              </div>

              {/* Label */}
              <div className="mt-6 flex items-center gap-2">
                <span
                  className={`font-mono text-[11px] font-bold tracking-[0.06em] ${pillar.accent.text}`}
                >
                  {pillar.num}
                </span>
                <span
                  className={`h-px flex-1 ${pillar.accent.divider} opacity-60`}
                />
                <span
                  className={`text-[10px] font-bold uppercase tracking-[0.16em] ${pillar.accent.text}`}
                >
                  {pillar.label}
                </span>
              </div>

              {/* Title */}
              <h3 className="mt-3 text-[1.3rem] font-semibold leading-[1.18] tracking-[-0.02em] text-[#211d2a]">
                {pillar.titleStart}{" "}
                <span
                  className={`bg-linear-to-r ${pillar.accent.gradient} bg-clip-text text-transparent`}
                >
                  {pillar.titleAccent}
                </span>
              </h3>

              {/* Description */}
              <p className="mt-2.5 text-[13px] leading-relaxed text-[#625c6b]">
                {pillar.description}
              </p>

              {/* Feature trail */}
              <div className="mt-4 flex flex-wrap items-center gap-x-2.5 gap-y-1.5 text-[11px] font-medium text-[#51495d]">
                {pillar.features.map((f, i) => (
                  <span key={f} className="inline-flex items-center gap-2.5">
                    <span>{f}</span>
                    {i < pillar.features.length - 1 && (
                      <span
                        aria-hidden="true"
                        className={`h-1 w-1 rounded-full ${pillar.accent.dot} opacity-80`}
                      />
                    )}
                  </span>
                ))}
              </div>

              {/* Bottom row */}
              <div className="mt-6 flex items-end justify-between border-t border-[#f2edf9] pt-4">
                <div>
                  <div className="font-mono text-xl font-bold leading-none text-[#211d2a]">
                    {pillar.metric.value}
                  </div>
                  <div className="mt-1.5 text-[9.5px] font-semibold uppercase tracking-[0.14em] text-[#a8a0b3]">
                    {pillar.metric.label}
                  </div>
                </div>

                <Link
                  href={pillar.href}
                  aria-label={`Learn more about ${pillar.label}`}
                  className={`group/link inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#ece7f3] bg-white text-[#51495d] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 ${pillar.accent.arrowHover}`}
                >
                  <ArrowIcon className="h-3.5 w-3.5 transition-transform duration-300 group-hover/link:translate-x-0.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </motion.article>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Main                                                                       */
/* -------------------------------------------------------------------------- */

export default function CompanyPurpose() {
  const reduce = useReducedMotion();

  return (
    <section
      id="purpose"
      aria-labelledby="purpose-title"
      className="relative isolate overflow-hidden bg-[#faf9fc] py-12 sm:py-14 lg:py-16"
    >
      {/* Background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(97,75,140,0.14) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
            maskImage:
              "radial-gradient(ellipse at 50% 30%, black 25%, transparent 78%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at 50% 30%, black 25%, transparent 78%)",
          }}
        />
        <div className="absolute left-1/2 top-0 h-65 w-180 -translate-x-1/2 rounded-full bg-violet-200/35 blur-[100px]" />
        <div className="absolute -right-20 bottom-0 h-56 w-56 rounded-full bg-amber-100/50 blur-[90px]" />
      </div>

      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.header
          variants={stagger}
          initial={reduce ? false : "hidden"}
          whileInView="show"
          viewport={{ once: true, amount: 0.35 }}
          className="grid items-end gap-6 sm:gap-8 lg:grid-cols-[1.25fr_1fr] lg:gap-12"
        >
          <div>
            <motion.div
              variants={fadeUp}
              className="inline-flex items-center gap-2 rounded-full border border-violet-200/80 bg-white/90 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-violet-800 shadow-sm shadow-violet-900/4"
            >
              <span className="relative flex h-1.5 w-1.5">
                {!reduce && (
                  <motion.span
                    aria-hidden
                    className="absolute inset-0 rounded-full bg-violet-500"
                    animate={{ scale: [1, 2.5, 1], opacity: [0.6, 0, 0.6] }}
                    transition={{
                      duration: 2.2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                )}
                <span className="relative h-1.5 w-1.5 rounded-full bg-violet-600" />
              </span>
              Our purpose
            </motion.div>

            <h2
              id="purpose-title"
              className="mt-4 text-[clamp(1.85rem,4.4vw,3rem)] font-semibold leading-[1.05] tracking-[-0.045em] text-[#211d2a]"
            >
              <span className="block overflow-hidden pb-[0.06em]">
                <motion.span variants={lineReveal} className="block">
                  Three disciplines.
                </motion.span>
              </span>
              <span className="block overflow-hidden pb-[0.06em]">
                <motion.span
                  variants={lineReveal}
                  className="block bg-linear-to-r from-violet-600 via-violet-500 to-violet-700 bg-clip-text text-transparent"
                >
                  One standard of care.
                </motion.span>
              </span>
            </h2>
          </div>

          <motion.div variants={fadeUp} className="lg:pb-1.5">
            <p className="text-sm leading-relaxed text-[#625c6b] sm:text-[15px]">
              We build software, grow careers, and simplify financial operations
              — as{" "}
              <span className="font-semibold text-[#211d2a]">
                one accountable team
              </span>{" "}
              without handoffs.
            </p>

            <div className="mt-4 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.16em] text-[#8c8398]">
              <span className="flex items-center gap-1.5">
                <span className="h-1 w-1 rounded-full bg-violet-500" />
                01 it
              </span>
              <span className="h-px w-3 bg-[#d4cbe6]" />
              <span className="flex items-center gap-1.5">
                <span className="h-1 w-1 rounded-full bg-amber-500" />
                02 edu
              </span>
              <span className="h-px w-3 bg-[#d4cbe6]" />
              <span className="flex items-center gap-1.5">
                <span className="h-1 w-1 rounded-full bg-emerald-500" />
                03 fin
              </span>
            </div>
          </motion.div>
        </motion.header>

        {/* Pillars */}
        <motion.div
          variants={stagger}
          initial={reduce ? false : "hidden"}
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-10 grid gap-4 sm:mt-12 sm:gap-5 md:grid-cols-3 lg:gap-6"
        >
          {PILLARS.map((pillar) => (
            <PillarCard key={pillar.key} pillar={pillar} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
