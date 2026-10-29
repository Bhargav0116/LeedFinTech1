"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useMotionTemplate,
  useInView,
  type Variants,
} from "framer-motion";
import * as THREE from "three";

/* -------------------------------------------------------------------------- */
/*  Motion primitives                                                         */
/* -------------------------------------------------------------------------- */

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_OUT } },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const lineReveal: Variants = {
  hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: EASE_OUT },
  },
};

const chipReveal: Variants = {
  hidden: { opacity: 0, y: 12, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: EASE_OUT },
  },
};

const showcaseStagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.25 } },
};

const showcaseItem: Variants = {
  hidden: { opacity: 0, y: 28, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: EASE_OUT },
  },
};

/* -------------------------------------------------------------------------- */
/*  Data                                                                      */
/* -------------------------------------------------------------------------- */

const CAPABILITIES = [
  "Business Websites & Portals",
  "Custom Web Applications",
  "Mobile App Development",
  "UI/UX & Product Design",
  "AI, ML & Automation",
  "APIs & System Integration",
  "Cloud, DevOps & Deployment",
  "SaaS, ERP & CRM Solutions",
  "Data & Analytics",
  "LMS & Learning Portals",
  "Adaptive Learning & Assessments",
  "Training, Internships & Career Programs",
  "IT Consulting, Maintenance & Support",
];

/* -------------------------------------------------------------------------- */
/*  Three.js architectural canvas                                             */
/* -------------------------------------------------------------------------- */

function ArchitectureCanvas() {
  const hostRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: window.devicePixelRatio <= 1.5,
        powerPreference: "low-power",
      });
    } catch {
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
    camera.position.set(7, 6, 9);
    camera.lookAt(0, 0, 0);

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.domElement.setAttribute("aria-hidden", "true");
    renderer.domElement.className = "absolute inset-0 h-full w-full";
    host.appendChild(renderer.domElement);

    const architecture = new THREE.Group();
    scene.add(architecture);

    const gridMaterial = new THREE.LineBasicMaterial({
      color: 0x9a83d8,
      transparent: true,
      opacity: 0.18,
    });
    const gridPoints: THREE.Vector3[] = [];
    for (let n = -5; n <= 5; n += 1) {
      gridPoints.push(new THREE.Vector3(n * 0.72, -1.15, -3.6));
      gridPoints.push(new THREE.Vector3(n * 0.72, -1.15, 3.6));
      gridPoints.push(new THREE.Vector3(-3.6, -1.15, n * 0.72));
      gridPoints.push(new THREE.Vector3(3.6, -1.15, n * 0.72));
    }
    const gridGeometry = new THREE.BufferGeometry();
    const gridSegments = new THREE.LineSegments(gridGeometry, gridMaterial);
    gridGeometry.setFromPoints(gridPoints);
    architecture.add(gridSegments);

    const moduleDefs = [
      {
        position: [-2.1, -0.12, 0.25],
        size: [1.35, 1.05, 1.1],
        color: 0x9c83e6,
      },
      {
        position: [-0.35, 0.42, -0.25],
        size: [1.3, 1.5, 1.25],
        color: 0x7855cb,
      },
      {
        position: [1.45, 0.05, -0.15],
        size: [1.35, 1.0, 1.25],
        color: 0xb5a1ef,
      },
      {
        position: [0.9, -0.35, 1.55],
        size: [1.05, 0.72, 0.85],
        color: 0x8d76d4,
      },
    ] as const;

    moduleDefs.forEach((item, index) => {
      const geometry = new THREE.BoxGeometry(...item.size);
      const fill = new THREE.Mesh(
        geometry,
        new THREE.MeshBasicMaterial({
          color: item.color,
          transparent: true,
          opacity: 0.055,
          depthWrite: false,
        }),
      );
      fill.position.set(item.position[0], item.position[1], item.position[2]);
      architecture.add(fill);

      const edges = new THREE.LineSegments(
        new THREE.EdgesGeometry(geometry),
        new THREE.LineBasicMaterial({
          color: item.color,
          transparent: true,
          opacity: index === 1 ? 0.55 : 0.35,
        }),
      );
      edges.position.copy(fill.position);
      architecture.add(edges);

      const topDot = new THREE.Mesh(
        new THREE.SphereGeometry(0.055, 10, 10),
        new THREE.MeshBasicMaterial({ color: item.color }),
      );
      topDot.position.set(
        item.position[0],
        item.position[1] + item.size[1] / 2 + 0.06,
        item.position[2],
      );
      architecture.add(topDot);
    });

    const connectorMaterial = new THREE.LineBasicMaterial({
      color: 0x9276e8,
      transparent: true,
      opacity: 0.52,
    });
    const connectors = [
      [
        [-1.4, 0.25, 0.25],
        [-0.85, 0.65, -0.25],
      ],
      [
        [0.3, 0.65, -0.25],
        [0.78, 0.25, -0.15],
      ],
      [
        [1.45, -0.25, 0.45],
        [1.1, -0.55, 1.15],
      ],
      [
        [-0.35, -0.1, 0.45],
        [0.6, -0.4, 1.2],
      ],
    ];
    connectors.forEach((pair) => {
      const geometry = new THREE.BufferGeometry().setFromPoints(
        pair.map((p) => new THREE.Vector3(p[0], p[1], p[2])),
      );
      architecture.add(new THREE.Line(geometry, connectorMaterial));
    });

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let frameId = 0;
    let previousTime = 0;
    let elapsed = 0;
    let visible = true;
    let disposed = false;

    const resize = () => {
      if (disposed) return;
      const width = host.clientWidth;
      const height = host.clientHeight;
      if (!width || !height) return;
      camera.aspect = width / height;
      camera.position.set(
        width < 620 ? 8 : 7,
        width < 620 ? 7 : 6,
        width < 620 ? 11 : 9,
      );
      camera.lookAt(0, 0, 0);
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.render(scene, camera);
    };

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      const rect = host.getBoundingClientRect();
      targetX = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      targetY = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    const onPointerLeave = () => {
      targetX = 0;
      targetY = 0;
    };

    const animate = (time: number) => {
      if (disposed || !visible || reduceMotion) return;
      frameId = requestAnimationFrame(animate);
      if (time - previousTime < 32) return;
      const delta = Math.min(time - (previousTime || time), 48);
      previousTime = time;
      elapsed += delta * 0.001;
      currentX += (targetX - currentX) * 0.035;
      currentY += (targetY - currentY) * 0.035;
      architecture.rotation.y =
        currentX * 0.055 + Math.sin(elapsed * 0.22) * 0.025;
      architecture.rotation.x = -currentY * 0.035;
      renderer.render(scene, camera);
    };

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !reduceMotion) {
        previousTime = 0;
        frameId = requestAnimationFrame(animate);
      } else {
        cancelAnimationFrame(frameId);
      }
    });
    intersectionObserver.observe(host);
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(host);
    host.addEventListener("pointermove", onPointerMove, { passive: true });
    host.addEventListener("pointerleave", onPointerLeave, { passive: true });

    resize();
    if (!reduceMotion) frameId = requestAnimationFrame(animate);

    return () => {
      disposed = true;
      cancelAnimationFrame(frameId);
      intersectionObserver.disconnect();
      resizeObserver.disconnect();
      host.removeEventListener("pointermove", onPointerMove);
      host.removeEventListener("pointerleave", onPointerLeave);
      scene.traverse((object) => {
        if (
          object instanceof THREE.Mesh ||
          object instanceof THREE.Line ||
          object instanceof THREE.LineSegments
        ) {
          object.geometry.dispose();
          const materials = Array.isArray(object.material)
            ? object.material
            : [object.material];
          materials.forEach((material) => material.dispose());
        }
      });
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [reduceMotion]);

  return (
    <div
      ref={hostRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0"
    />
  );
}

/* -------------------------------------------------------------------------- */
/*  Counter — animates when it scrolls into view                              */
/* -------------------------------------------------------------------------- */

function Counter({
  to,
  duration = 1.2,
  className,
}: {
  to: number;
  duration?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [n, setN] = useState(reduce ? to : 0);

  useEffect(() => {
    if (reduce || !inView) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / (duration * 1000), 1);
      setN(Math.round((1 - Math.pow(1 - t, 3)) * to));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration, reduce]);

  return (
    <span ref={ref} className={className}>
      {(reduce ? to : n).toLocaleString()}
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/*  Icon helpers                                                              */
/* -------------------------------------------------------------------------- */

function WebIcon({ id }: { id: string }) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className: "h-3 w-3 sm:h-3.5 sm:w-3.5",
  };
  if (id === "overview")
    return (
      <svg {...common}>
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
      </svg>
    );
  if (id === "projects")
    return (
      <svg {...common}>
        <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      </svg>
    );
  return (
    <svg {...common}>
      <path d="M3 20h18M7 20V10M12 20V4M17 20v-7" />
    </svg>
  );
}

function PhoneIcon({ id }: { id: string }) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className: "h-3 w-3 sm:h-3.5 sm:w-3.5",
  };
  if (id === "home")
    return (
      <svg {...common}>
        <path d="M3 11l9-8 9 8M5 9v11h14V9" />
      </svg>
    );
  if (id === "learn")
    return (
      <svg {...common}>
        <path d="M4 6a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z" />
        <path d="M4 6v14" />
      </svg>
    );
  return (
    <svg {...common}>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21a8 8 0 0 1 16 0" />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*  Web dashboard mockup (interactive)                                        */
/* -------------------------------------------------------------------------- */

type WebTab = "overview" | "projects" | "analytics";

const WEB_TABS: { id: WebTab; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "projects", label: "Projects" },
  { id: "analytics", label: "Analytics" },
];

function StatTile({
  label,
  value,
  prefix = "",
  suffix = "",
  delta,
  tone,
}: {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  delta: string;
  tone: "violet" | "emerald";
}) {
  const toneClass =
    tone === "emerald"
      ? "bg-emerald-50 text-emerald-700"
      : "bg-violet-50 text-violet-700";
  return (
    <div className="rounded-md border border-[#ece7f3] bg-white p-1.5 sm:p-2">
      <div className="text-[6px] font-medium text-[#8c8398] sm:text-[7px]">
        {label}
      </div>
      <div className="mt-0.5 flex items-baseline gap-0.5 text-[11px] font-bold text-[#1a1426] sm:text-sm">
        {prefix}
        <Counter to={value} />
        {suffix}
      </div>
      <div
        className={`mt-0.5 inline-flex rounded px-1 py-0 text-[6px] font-semibold sm:text-[7px] ${toneClass}`}
      >
        {delta}
      </div>
    </div>
  );
}

function OverviewPanel() {
  const data = [42, 58, 49, 71, 63, 88, 74, 92, 68, 84, 76, 95, 82];
  return (
    <div className="space-y-2 sm:space-y-3">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-[6px] font-semibold uppercase tracking-wider text-violet-700 sm:text-[7px]">
            Welcome back
          </div>
          <div className="mt-0.5 text-[11px] font-bold text-[#1a1426] sm:text-sm">
            Good morning, Banti
          </div>
        </div>
        <span className="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-1.5 py-0.5 text-[6px] font-semibold text-emerald-700 sm:text-[7px]">
          <span className="h-1 w-1 rounded-full bg-emerald-500" /> Live
        </span>
      </div>

      <div className="grid grid-cols-3 gap-1 sm:gap-1.5">
        <StatTile
          label="Revenue"
          value={48}
          prefix="$"
          suffix="k"
          delta="+12%"
          tone="violet"
        />
        <StatTile label="Users" value={1204} delta="+8%" tone="violet" />
        <StatTile
          label="Done"
          value={96}
          suffix="%"
          delta="On track"
          tone="emerald"
        />
      </div>

      <div className="rounded-lg border border-[#ece7f3] p-2 sm:p-2.5">
        <div className="mb-1 flex items-center justify-between">
          <span className="text-[7px] font-semibold text-[#3a3347] sm:text-[8px]">
            Weekly activity
          </span>
          <span className="text-[6px] text-[#8c8398] sm:text-[7px]">
            Last 13 days
          </span>
        </div>
        <div className="flex h-12 items-end gap-0.5 sm:h-16 sm:gap-1">
          {data.map((v, i) => (
            <motion.div
              key={i}
              initial={{ height: 0 }}
              animate={{ height: `${v}%` }}
              transition={{
                duration: 0.55,
                delay: 0.05 + i * 0.03,
                ease: EASE_OUT,
              }}
              className={`flex-1 rounded-t-xs ${
                i === 11
                  ? "bg-violet-600"
                  : i % 2 === 0
                    ? "bg-violet-200"
                    : "bg-violet-300"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

const PROJECT_TONES: Record<string, string> = {
  violet: "bg-violet-50 text-violet-700",
  amber: "bg-amber-50 text-amber-700",
  emerald: "bg-emerald-50 text-emerald-700",
};

function ProjectsPanel() {
  const projects = [
    {
      name: "Design System v2",
      progress: 78,
      status: "On track",
      tone: "violet",
    },
    {
      name: "Mobile Banking App",
      progress: 62,
      status: "In review",
      tone: "amber",
    },
    {
      name: "LMS Portal",
      progress: 91,
      status: "Shipped",
      tone: "emerald",
    },
  ];
  return (
    <div className="space-y-2 sm:space-y-2.5">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-[6px] font-semibold uppercase tracking-wider text-violet-700 sm:text-[7px]">
            Workspace
          </div>
          <div className="mt-0.5 text-[11px] font-bold text-[#1a1426] sm:text-sm">
            Active Projects
          </div>
        </div>
        <span className="rounded-md bg-[#f3effa] px-1.5 py-0.5 text-[6px] font-semibold text-violet-700 sm:text-[7px]">
          3 in flight
        </span>
      </div>
      {projects.map((p, i) => (
        <motion.div
          key={p.name}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            delay: 0.05 + i * 0.06,
            duration: 0.35,
            ease: EASE_OUT,
          }}
          className="rounded-lg border border-[#ece7f3] bg-white p-1.5 sm:p-2.5"
        >
          <div className="flex items-center justify-between gap-2">
            <span className="truncate text-[8px] font-semibold text-[#2c2637] sm:text-[10px]">
              {p.name}
            </span>
            <span
              className={`shrink-0 rounded px-1 py-0 text-[5px] font-semibold sm:text-[6px] ${PROJECT_TONES[p.tone]}`}
            >
              {p.status}
            </span>
          </div>
          <div className="mt-1 flex items-center gap-1.5">
            <div className="h-1 flex-1 rounded-full bg-[#eee8f8]">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${p.progress}%` }}
                transition={{ duration: 0.9, delay: 0.1, ease: EASE_OUT }}
                className="h-1 rounded-full bg-violet-600"
              />
            </div>
            <span className="text-[6px] font-semibold text-[#51485f] sm:text-[7px]">
              {p.progress}%
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function AnalyticsPanel() {
  return (
    <div className="space-y-2 sm:space-y-3">
      <div>
        <div className="text-[6px] font-semibold uppercase tracking-wider text-violet-700 sm:text-[7px]">
          Analytics
        </div>
        <div className="mt-0.5 text-[11px] font-bold text-[#1a1426] sm:text-sm">
          Performance overview
        </div>
      </div>
      <div className="rounded-lg bg-linear-to-br from-violet-600 to-violet-700 p-2 text-white sm:p-3">
        <div className="text-[6px] uppercase tracking-wider text-violet-200 sm:text-[7px]">
          Sessions this month
        </div>
        <div className="mt-0.5 text-lg font-bold sm:text-2xl">
          <Counter to={48200} />
        </div>
        <div className="mt-0.5 text-[7px] text-violet-200 sm:text-[8px]">
          ↑ 24% vs last month
        </div>
      </div>
      <div className="grid grid-cols-2 gap-1 sm:gap-1.5">
        <div className="rounded-md border border-[#ece7f3] p-1.5 sm:p-2">
          <div className="text-[6px] text-[#8c8398] sm:text-[7px]">
            Avg. session
          </div>
          <div className="mt-0.5 text-[10px] font-bold text-[#1a1426] sm:text-xs">
            4m 32s
          </div>
        </div>
        <div className="rounded-md border border-[#ece7f3] p-1.5 sm:p-2">
          <div className="text-[6px] text-[#8c8398] sm:text-[7px]">
            Bounce rate
          </div>
          <div className="mt-0.5 text-[10px] font-bold text-[#1a1426] sm:text-xs">
            18%
          </div>
        </div>
      </div>
    </div>
  );
}

function BrowserMockup() {
  const [tab, setTab] = useState<WebTab>("overview");
  const reduceMotion = useReducedMotion();

  return (
    <div className="overflow-hidden rounded-xl border border-white bg-white shadow-[0_28px_75px_rgba(42,30,64,0.18)] sm:rounded-2xl ml-10 mt-0 sm:mt-0">
      {/* Chrome bar */}
      <div className="flex h-7 items-center gap-1 border-b border-[#eeeaf3] bg-[#fbfaff] px-2 sm:h-9 sm:gap-1.5 sm:px-3">
        <span className="h-1.5 w-1.5 rounded-full bg-[#f0a7a7] sm:h-2 sm:w-2" />
        <span className="h-1.5 w-1.5 rounded-full bg-[#f2cd83] sm:h-2 sm:w-2" />
        <span className="h-1.5 w-1.5 rounded-full bg-[#a7d7ad] sm:h-2 sm:w-2" />
        <div className="ml-1.5 flex h-4 max-w-55 flex-1 items-center gap-1 rounded bg-white px-1.5 text-[6px] text-[#8d849a] sm:ml-2 sm:h-5 sm:text-[7px]">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="h-2 w-2 text-emerald-500"
          >
            <rect x="5" y="11" width="14" height="10" rx="2" />
            <path d="M8 11V7a4 4 0 0 1 8 0v4" />
          </svg>
          leedfin.app/dashboard
        </div>
        <span className="hidden text-[6px] font-semibold uppercase tracking-wider text-[#a09aab] sm:block">
          Live preview
        </span>
      </div>

      <div className="grid grid-cols-[46px_1fr] sm:grid-cols-[124px_1fr]">
        {/* Sidebar */}
        <aside className="flex flex-col gap-0.5 bg-linear-to-b from-[#1a1426] to-[#211a32] p-1.5 text-white sm:gap-1 sm:p-3">
          <div className="mb-1.5 flex items-center gap-1 sm:mb-3 sm:gap-1.5">
            <span className="grid h-4 w-4 place-items-center rounded bg-violet-500 text-[7px] font-bold sm:h-5 sm:w-5 sm:text-[9px]">
              L
            </span>
            <span className="hidden text-white/80 font-bold tracking-[0.14em] sm:inline sm:text-white/80-4">
              LEEDFIN
            </span>
          </div>
          {WEB_TABS.map((t) => {
            const active = tab === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                aria-pressed={active}
                className={`relative flex items-center gap-1 rounded-md px-1 py-1 text-left text-[7px] transition-colors sm:gap-1.5 sm:px-1.5 sm:py-1.5 sm:text-[9px] ${
                  active
                    ? "bg-white/15 text-white"
                    : "text-white/50 hover:bg-white/5 hover:text-white/80"
                }`}
              >
                {active && !reduceMotion && (
                  <motion.span
                    layoutId="web-tab-active"
                    className="absolute inset-0 rounded-md bg-white/15"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                <span className="relative flex items-center gap-1 sm:gap-1.5">
                  <WebIcon id={t.id} />
                  <span className="hidden sm:inline">{t.label}</span>
                </span>
              </button>
            );
          })}
          <div className="mt-auto hidden rounded-md border border-white/10 bg-white/5 p-1.5 sm:block">
            <div className="h-1 w-8 rounded-full bg-violet-300/70" />
            <div className="mt-1 h-0.5 w-full rounded-full bg-white/15" />
            <div className="mt-0.5 h-0.5 w-2/3 rounded-full bg-white/10" />
          </div>
        </aside>

        {/* Content */}
        <div className="relative min-h-47.5 overflow-hidden p-2 sm:min-h-65 sm:p-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: EASE_OUT }}
            >
              {tab === "overview" && <OverviewPanel />}
              {tab === "projects" && <ProjectsPanel />}
              {tab === "analytics" && <AnalyticsPanel />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Mobile app mockup (interactive) — SHORTER now                              */
/* -------------------------------------------------------------------------- */

type PhoneTab = "home" | "learn" | "profile";

const PHONE_TABS: { id: PhoneTab; label: string }[] = [
  { id: "home", label: "Home" },
  { id: "learn", label: "Learn" },
  { id: "profile", label: "Profile" },
];

function PhoneHome() {
  const [bookmarked, setBookmarked] = useState(false);
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-[6px] text-[#8c8398]">Welcome back</div>
          <div className="text-[9px] font-bold text-[#1a1426]">Hi, Banti</div>
        </div>
        <div className="grid h-5 w-5 place-items-center rounded-full bg-linear-to-br from-violet-400 to-violet-600 text-[7px] font-bold text-white">
          B
        </div>
      </div>

      <div className="rounded-xl bg-linear-to-br from-violet-600 to-violet-800 p-2 text-white">
        <div className="flex items-center justify-between">
          <div className="min-w-0 flex-1">
            <div className="text-[5px] uppercase tracking-wider text-violet-200">
              Continue learning
            </div>
            <div className="mt-0.5 truncate text-[8px] font-bold leading-tight">
              Advanced React Patterns
            </div>
          </div>
          <div className="relative h-8 w-8 shrink-0">
            <svg viewBox="0 0 36 36" className="h-8 w-8 -rotate-90">
              <circle
                cx="18"
                cy="18"
                r="14"
                fill="none"
                stroke="rgba(255,255,255,0.22)"
                strokeWidth="3"
              />
              <motion.circle
                cx="18"
                cy="18"
                r="14"
                fill="none"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray="87.96"
                initial={{ strokeDashoffset: 87.96 }}
                animate={{ strokeDashoffset: 87.96 * (1 - 0.68) }}
                transition={{ duration: 1.2, ease: EASE_OUT }}
              />
            </svg>
            <span className="absolute inset-0 grid place-items-center text-[6px] font-bold">
              68%
            </span>
          </div>
        </div>
        <button className="mt-1.5 w-full rounded-md bg-white/20 py-1 text-[6px] font-bold backdrop-blur transition hover:bg-white/30">
          Continue lesson →
        </button>
      </div>

      <div className="grid grid-cols-2 gap-1">
        <div className="rounded-lg border border-[#ece7f3] p-1">
          <div className="text-[5px] text-[#8c8398]">Streak</div>
          <div className="text-[8px] font-bold text-[#1a1426]">🔥 12 days</div>
        </div>
        <div className="rounded-lg border border-[#ece7f3] p-1">
          <div className="text-[5px] text-[#8c8398]">Points</div>
          <div className="text-[8px] font-bold text-[#1a1426]">2,840</div>
        </div>
      </div>

      <div className="rounded-lg border border-[#ece7f3] p-1.5">
        <div className="flex items-start justify-between gap-1">
          <div className="min-w-0 flex-1">
            <div className="text-[5px] uppercase tracking-wider text-violet-700">
              Recommended
            </div>
            <div className="mt-0.5 truncate text-[7px] font-bold text-[#1a1426]">
              Design Systems Masterclass
            </div>
            <div className="text-[5px] text-[#8c8398]">12 lessons · 4h</div>
          </div>
          <motion.button
            type="button"
            onClick={() => setBookmarked((v) => !v)}
            whileTap={{ scale: 0.85 }}
            aria-label="Bookmark course"
            aria-pressed={bookmarked}
            className={`grid h-5 w-5 shrink-0 place-items-center rounded-md transition ${
              bookmarked
                ? "bg-violet-600 text-white"
                : "bg-violet-50 text-violet-600 hover:bg-violet-100"
            }`}
          >
            <svg
              viewBox="0 0 24 24"
              fill={bookmarked ? "currentColor" : "none"}
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinejoin="round"
              className="h-2.5 w-2.5"
            >
              <path d="M6 3h12v18l-6-4-6 4z" />
            </svg>
          </motion.button>
        </div>
      </div>
    </div>
  );
}

function PhoneLearn() {
  const lessons = [
    { name: "React fundamentals", status: "done" as const },
    { name: "State patterns", status: "active" as const },
    { name: "Testing strategies", status: "locked" as const },
    { name: "Deployment", status: "locked" as const },
  ];
  const statusStyles = {
    done: "bg-emerald-100 text-emerald-700",
    active: "bg-violet-600 text-white",
    locked: "bg-[#f2eef8] text-[#a8a0b3]",
  };
  return (
    <div className="space-y-1.5">
      <div>
        <div className="text-[6px] text-[#8c8398]">Your courses</div>
        <div className="text-[9px] font-bold text-[#1a1426]">
          Advanced React
        </div>
      </div>
      <div className="rounded-lg bg-[#f8f6fb] p-1.5">
        <div className="flex items-center justify-between text-[5px]">
          <span className="text-[#8c8398]">Progress</span>
          <span className="font-semibold text-violet-700">7 of 12</span>
        </div>
        <div className="mt-1 h-1 rounded-full bg-[#e7e0f1]">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "58%" }}
            transition={{ duration: 1, ease: EASE_OUT }}
            className="h-1 rounded-full bg-violet-600"
          />
        </div>
      </div>
      {lessons.map((l, i) => (
        <motion.div
          key={l.name}
          initial={{ opacity: 0, x: -6 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.05, duration: 0.3, ease: EASE_OUT }}
          className="flex items-center gap-1.5 rounded-lg border border-[#ece7f3] p-1"
        >
          <div
            className={`grid h-3.5 w-3.5 shrink-0 place-items-center rounded-full text-[5px] font-bold ${statusStyles[l.status]}`}
          >
            {l.status === "done" ? "✓" : l.status === "active" ? "▶" : "•"}
          </div>
          <span
            className={`flex-1 truncate text-[7px] ${
              l.status === "locked"
                ? "text-[#a8a0b3]"
                : "font-medium text-[#2c2637]"
            }`}
          >
            {l.name}
          </span>
          {l.status === "active" && (
            <span className="shrink-0 text-[5px] font-semibold text-violet-700">
              Resume
            </span>
          )}
        </motion.div>
      ))}
    </div>
  );
}

function PhoneProfile() {
  return (
    <div className="space-y-1.5">
      <div className="flex flex-col items-center pt-1">
        <div className="grid h-8 w-8 place-items-center rounded-full bg-linear-to-br from-violet-400 to-violet-600 text-[9px] font-bold text-white">
          B
        </div>
        <div className="mt-1 text-[8px] font-bold text-[#1a1426]">
          Banti Yadam
        </div>
        <div className="text-[6px] text-[#8c8398]">Product Designer</div>
      </div>
      <div className="grid grid-cols-3 gap-1">
        {[
          ["12", "Courses"],
          ["48h", "Hours"],
          ["Top 5%", "Rank"],
        ].map(([v, l]) => (
          <div key={l} className="rounded-md bg-[#f8f6fb] py-1 text-center">
            <div className="text-[7px] font-bold text-violet-700">{v}</div>
            <div className="text-[4px] uppercase tracking-wider text-[#8c8398]">
              {l}
            </div>
          </div>
        ))}
      </div>
      {["Account settings", "Notifications", "Help & support"].map((row) => (
        <div
          key={row}
          className="flex items-center justify-between rounded-md border border-[#ece7f3] px-1.5 py-1"
        >
          <span className="text-[6px] text-[#2c2637]">{row}</span>
          <span className="text-[7px] text-[#a8a0b3]">›</span>
        </div>
      ))}
    </div>
  );
}

function PhoneMockup() {
  const [tab, setTab] = useState<PhoneTab>("home");

  return (
    // w-full so the parent wrapper controls size — no fixed width conflict
    <div className="absolute bottom-4 right-4 sm:right-8 w-37.5 sm:w-50 rounded-[18px] border-4 border-[#1a1426] bg-[#1a1426] shadow-[0_22px_55px_rgba(42,30,64,0.32)] sm:rounded-[22px] sm:border-[5px]">
      {/* Shorter screen — 9:16 instead of 9:19 */}
      <div className="relative aspect-9/16 overflow-hidden rounded-[14px] bg-white sm:rounded-[18px]">
        {/* Notch */}
        <div className="absolute left-1/2 top-0.5 z-20 h-2 w-10 -translate-x-1/2 rounded-full bg-[#1a1426] sm:top-1 sm:h-2.5 sm:w-12" />

        <div className="absolute inset-0 flex flex-col">
          {/* Status bar */}
          <div className="flex h-5 shrink-0 items-center justify-between px-2.5 pt-0.5 text-[5px] font-semibold text-[#1a1426] sm:h-6 sm:px-3 sm:pt-1 sm:text-[6px]">
            <span>9:41</span>
            <span className="flex items-center gap-0.5">
              <span>●●●</span>
            </span>
          </div>

          {/* Content */}
          <div className="relative flex-1 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={tab}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.22, ease: EASE_OUT }}
                className="absolute inset-0 overflow-y-auto px-2 py-1.5 scrollbar-none [&::-webkit-scrollbar]:hidden"
              >
                {tab === "home" && <PhoneHome />}
                {tab === "learn" && <PhoneLearn />}
                {tab === "profile" && <PhoneProfile />}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Bottom nav */}
          <div className="shrink-0 border-t border-[#eee] bg-white/95 px-1 py-1 backdrop-blur">
            <div className="flex justify-around">
              {PHONE_TABS.map((t) => {
                const active = tab === t.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setTab(t.id)}
                    aria-pressed={active}
                    className={`flex flex-col items-center gap-0.5 rounded-md px-1.5 py-0.5 transition-colors ${
                      active
                        ? "text-violet-700"
                        : "text-[#a8a0b3] hover:text-[#51485f]"
                    }`}
                  >
                    <PhoneIcon id={t.id} />
                    <span className="text-[5px] font-semibold">{t.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Hero                                                                      */
/* -------------------------------------------------------------------------- */

export default function HeroSection() {
  const reduceMotion = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const orbVioletY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const orbAmberY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const gridY = useTransform(scrollYProgress, [0, 1], [0, 60]);

  const mx = useMotionValue(50);
  const my = useMotionValue(50);
  const smoothX = useSpring(mx, { stiffness: 120, damping: 22, mass: 0.6 });
  const smoothY = useSpring(my, { stiffness: 120, damping: 22, mass: 0.6 });
  const spotlight = useMotionTemplate`radial-gradient(420px circle at ${smoothX}% ${smoothY}%, rgba(139,92,246,0.16), transparent 70%)`;

  const onShowcasePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "touch") return;
    const rect = event.currentTarget.getBoundingClientRect();
    mx.set(((event.clientX - rect.left) / rect.width) * 100);
    my.set(((event.clientY - rect.top) / rect.height) * 100);
  };

  return (
    <section
      ref={heroRef}
      aria-labelledby="leedfin-hero-title"
      className="relative isolate overflow-hidden bg-[#f7f6f3] text-[#211d2a] selection:bg-violet-200 selection:text-violet-950 mt-10 sm:mt-10"
    >
      {/* Background parallax */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <motion.div
          style={{ y: reduceMotion ? 0 : gridY }}
          className="absolute inset-0 opacity-[0.38]"
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(rgba(97,75,140,0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(97,75,140,0.055) 1px, transparent 1px)",
              backgroundSize: "44px 44px",
              maskImage: "linear-gradient(to bottom, black, transparent 82%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, black, transparent 82%)",
            }}
          />
        </motion.div>
        <motion.div
          style={{ y: reduceMotion ? 0 : orbVioletY }}
          className="absolute -right-24 top-20 h-140 w-140 rounded-full bg-violet-200/45 blur-[110px]"
        />
        <motion.div
          style={{ y: reduceMotion ? 0 : orbAmberY }}
          className="absolute -left-40 bottom-0 h-80 w-80 rounded-full bg-amber-100/55 blur-[90px]"
        />
      </div>

      <div className="relative mx-auto flex min-h-svh max-w-370 flex-col px-5 sm:px-8 lg:px-14">
        <main className="relative z-10 grid flex-1 items-center gap-10 py-12 sm:py-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-6 lg:py-14">
          {/* ---------------- Left: copy ---------------- */}
          <motion.div
            variants={stagger}
            initial={reduceMotion ? false : "hidden"}
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            className="relative z-10 top-0 sm:top-2 max-w-162.5 pt-0 pb-2 lg:pt-0 lg:pb-8"
          >
            <h1
              id="leedfin-hero-title"
              className="text-[clamp(3.15rem,6vw,6.25rem)] font-semibold leading-[0.98] tracking-[-0.075em] mt-0 sm:mt-1"
            >
              <span className="block overflow-hidden pb-[0.08em]">
                <motion.span
                  variants={lineReveal}
                  className="block will-change-transform"
                >
                  One partner.
                </motion.span>
              </span>
              <span className="mt-2 block overflow-hidden pb-[0.08em]">
                <motion.span
                  variants={lineReveal}
                  className="block text-violet-700 will-change-transform"
                >
                  Every layer of
                </motion.span>
              </span>
              <span className="relative block overflow-hidden pb-[0.08em]">
                <motion.span
                  variants={lineReveal}
                  className="block will-change-transform"
                >
                  technology.
                </motion.span>
                <motion.span
                  aria-hidden
                  initial={reduceMotion ? false : { scaleX: 0, opacity: 0 }}
                  whileInView={{ scaleX: 1, opacity: 1 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{
                    duration: 0.9,
                    delay: reduceMotion ? 0 : 0.75,
                    ease: EASE_OUT,
                  }}
                  className="mt-5 block h-0.75 w-24 origin-left rounded-full bg-linear-to-r from-violet-600 to-violet-300"
                />
              </span>
            </h1>

            <motion.p
              variants={fadeUp}
              className="mt-6 max-w-140 text-[15px] leading-7 text-[#625c6b] sm:mt-7 sm:text-[17px] sm:leading-8"
            >
              From business websites and custom software to AI, cloud systems,
              mobile apps and learning platforms — LeedfinTech brings your
              digital ideas together, from first plan to launch.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-8 flex flex-row items-center gap-3"
            >
              <motion.div
                whileHover={reduceMotion ? undefined : { y: -3 }}
                whileTap={reduceMotion ? undefined : { scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 24 }}
                className="inline-flex"
              >
                <Link
                  href="/contact"
                  className="group relative overflow-hidden inline-flex min-h-12 items-center justify-center rounded-full bg-violet-600 px-6 py-3.5 text-sm font-semibold text-white shadow-[0_9px_25px_rgba(91,55,160,0.22)] transition-all duration-300 hover:shadow-[0_13px_30px_rgba(91,55,160,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2"
                >
                  {/* Side wipe from bottom right to top left with white background */}
                  <span className="absolute inset-0 rounded-full bg-white transition-transform duration-500 ease-out translate-x-full translate-y-full group-hover:translate-x-0 group-hover:translate-y-0" />

                  {/* Button content with text color change for contrast */}
                  <span className="relative z-10 flex items-center gap-3 text-white transition-colors duration-300 group-hover:text-violet-900 text-[14px] sm:text-sm">
                    Contact us{" "}
                    <span
                      aria-hidden="true"
                      className="hidden sm:inline-block transition-transform duration-300 group-hover:translate-x-1"
                    >
                      ↗
                    </span>
                  </span>
                </Link>
              </motion.div>

              <motion.div
                whileHover={reduceMotion ? undefined : { y: -3 }}
                whileTap={reduceMotion ? undefined : { scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 24 }}
                className="inline-flex"
              >
                <Link
                  href="/lms"
                  className="group relative overflow-hidden inline-flex min-h-12 items-center justify-center rounded-full border border-[#211d2a]/15 bg-white px-6 py-3.5 text-sm font-semibold text-[#34303d] transition-all duration-300 hover:border-violet-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2"
                >
                  {/* Side wipe from bottom right to top left with violet background */}
                  <span className="absolute inset-0 rounded-full bg-violet-600 transition-transform duration-500 ease-out translate-x-full translate-y-full group-hover:translate-x-0 group-hover:translate-y-0" />

                  {/* Button content with text color change for contrast */}
                  <span className="relative z-10 flex items-center gap-2 text-[#34303d] transition-colors duration-300 group-hover:text-white">
                    Explore Courses{" "}
                    <span
                      aria-hidden="true"
                      className="text-violet-700 transition-all duration-300 group-hover:text-white group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </span>
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              id="approach"
              variants={stagger}
              className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 text-xs font-medium text-[#6f6879] sm:mt-10"
            >
              {[
                "Business-first planning",
                "Design to deployment",
                "IT + EdTech expertise",
              ].map((label) => (
                <motion.span
                  key={label}
                  variants={fadeUp}
                  className="inline-flex items-center gap-2"
                >
                  <span className="grid h-5 w-5 place-items-center rounded-full bg-violet-100 text-[10px] text-violet-800">
                    ✓
                  </span>
                  {label}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>

          {/* ---------------- Right: interactive device showcase ---------------- */}
          <motion.div
            variants={showcaseStagger}
            initial={reduceMotion ? false : "hidden"}
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            onPointerMove={onShowcasePointerMove}
            aria-label="Interactive product preview — web dashboard and mobile learning app"
            className="relative mx-auto w-full max-w-190"
          >
            {/* Responsive container — tuned heights per breakpoint */}
            <div className="relative min-h-115 w-full sm:min-h-140 md:min-h-155 lg:min-h-150">
              {/* Soft glow bed */}
              <motion.div
                variants={showcaseItem}
                aria-hidden="true"
                className="absolute inset-3 rounded-4xl border border-white/60 bg-white/25 shadow-[0_25px_80px_rgba(58,40,86,0.08)] backdrop-blur-[2px] sm:inset-5 sm:rounded-[36px]"
              />

              <ArchitectureCanvas />

              {/* Spotlight follows pointer */}
              <motion.div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-5 rounded-[36px]"
                style={{ background: spotlight }}
              />

              {/* ---- Desktop web preview ---- */}
              <motion.div
                variants={showcaseItem}
                className="absolute left-0 top-[9%] z-10 w-[94%] sm:left-[2%] sm:top-[10%] sm:w-[88%]"
              >
                <motion.div
                  animate={reduceMotion ? undefined : { y: [0, -5, 0] }}
                  transition={{
                    duration: 6.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <BrowserMockup />
                </motion.div>
              </motion.div>

              {/* ---- Mobile app preview — shorter + responsive width ---- */}
              <motion.div
                variants={showcaseItem}
                className="absolute bottom-[3%] right-[3%] z-30 w-[42%] max-w-45 sm:bottom-[6%] sm:right-0 sm:w-[32%] sm:max-w-50 md:w-[28%] md:max-w-55"
              >
                <motion.div
                  animate={reduceMotion ? undefined : { y: [0, 6, 0] }}
                  transition={{
                    duration: 5.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.3,
                  }}
                >
                  <PhoneMockup />
                </motion.div>
              </motion.div>

              {/* Caption strip bottom-left */}
              <motion.div
                variants={showcaseItem}
                className="absolute bottom-20 z-20 flex max-w-[45%] flex-col gap-1 sm:bottom-30 left-7 sm:left-30 sm:max-w-none"
              >
                <span className="text-[8px] font-bold uppercase tracking-[0.16em] text-violet-700 sm:text-[12px]">
                  Design · Develop · Deploy
                </span>
                <span className="text-[9px] text-[#7b7385] sm:text-xs">
                  One team, multiple platforms, one launch.
                </span>
              </motion.div>
            </div>
          </motion.div>
        </main>

        {/* ---------------- Capabilities strip ---------------- */}
        <div
          id="capabilities"
          className="relative z-20 border-t border-[#211d2a]/10 py-6 sm:py-7"
        >
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, ease: EASE_OUT }}
            className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between"
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-violet-800">
              What we can build with you
            </p>
            <p className="text-xs text-[#7b7385]">
              One team for your IT and learning technology needs.
            </p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial={reduceMotion ? false : "hidden"}
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            className="flex flex-wrap gap-2"
          >
            {CAPABILITIES.map((capability) => (
              <motion.span
                key={capability}
                variants={chipReveal}
                whileHover={reduceMotion ? undefined : { y: -3, scale: 1.03 }}
                transition={{ type: "spring", stiffness: 400, damping: 22 }}
                className="group inline-flex cursor-default items-center gap-2 rounded-full border border-[#ded8e8] bg-white/75 px-3.5 py-2.5 text-[11px] font-medium text-[#51495d] shadow-[0_2px_8px_rgba(42,30,64,0.025)] transition-colors hover:border-violet-300 hover:bg-white hover:text-violet-900 sm:px-4 sm:text-xs"
              >
                <span
                  aria-hidden="true"
                  className="h-1.5 w-1.5 rounded-full bg-violet-500 transition group-hover:scale-125"
                />
                {capability}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
