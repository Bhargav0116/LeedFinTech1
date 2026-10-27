"use client";

import { useEffect, useRef, type ReactNode } from "react";

export default function ScrollReveal({ children }: { children: ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;

    if (!container || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    container.classList.add("scroll-reveal-ready");

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          container.classList.add("is-visible");
          observer.disconnect();
        }
      },
      { threshold: 0.14, rootMargin: "0px 0px -6% 0px" },
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return <div ref={containerRef} className="scroll-reveal">{children}</div>;
}