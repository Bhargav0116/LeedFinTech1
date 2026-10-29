"use client";

import { useEffect, useState } from "react";
import TesseractBackground from "./TesseractBackground";

export default function SiteExperience() {
  const [showIntro, setShowIntro] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    // Always run the intro on a fresh page load. This is deliberately safe
    // under React Strict Mode, which mounts effects twice in development.
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    setShowIntro(true);
    setLeaving(false);
    const exitTimer = window.setTimeout(() => setLeaving(true), 3900);
    const hideTimer = window.setTimeout(() => setShowIntro(false), 4650);
    return () => {
      window.clearTimeout(exitTimer);
      window.clearTimeout(hideTimer);
    };
  }, []);

  return (
    <>
      <TesseractBackground className="site-tesseract-global" />
      {showIntro && (
        <div className={`site-intro ${leaving ? "site-intro-leaving" : ""}`} role="status" aria-label="LeedfinTech loading">
          <div className="site-intro-grid" aria-hidden="true" />
          <div className="site-intro-content">
            <div className="site-intro-mark" aria-hidden="true"><span /><span /><span /><i /></div>
            <div className="site-intro-wordmark">leedfin<span>tech</span><i>.</i></div>
            <p>Technology <b>·</b> Learning <b>·</b> Progress</p>
            <div className="site-intro-progress"><span /></div>
          </div>
          <span className="site-intro-index">THINK FORWARD / 001</span>
        </div>
      )}
    </>
  );
}
