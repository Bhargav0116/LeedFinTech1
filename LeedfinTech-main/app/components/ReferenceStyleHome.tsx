"use client";

import { useState, type MouseEvent } from "react";
import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUpRight, Check, Code2, GraduationCap, Layers3, MoveUpRight, Sparkles, Workflow, Zap } from "lucide-react";

const capabilities = [
  { number: "01", title: "Digital products", text: "Websites, applications and platforms built around real business needs.", icon: Code2, href: "/features" },
  { number: "02", title: "Cloud & systems", text: "Reliable foundations, integrations and workflows that scale with you.", icon: Layers3, href: "/features" },
  { number: "03", title: "Technical learning", text: "Practical learning paths that turn knowledge into capability.", icon: GraduationCap, href: "/lms" },
  { number: "04", title: "Career readiness", text: "Project-based experience and guidance for the next step in your career.", icon: Workflow, href: "/lms" },
];

export default function ReferenceStyleHome() {
  const [audience, setAudience] = useState<"business" | "learner">("business");
  const [rotation, setRotation] = useState({ x: -13, y: 24 });

  function handleOrbMove(event: MouseEvent<HTMLDivElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    setRotation({ x: -13 + y * 18, y: 24 + x * 28 });
  }

  return (
    <div className="reference-home">
      <section className="ref-hero">
        <div className="ref-hero-grid" aria-hidden="true" />
        <div className="ref-hero-inner">
          <div className="ref-hero-copy">
            <p className="ref-eyebrow"><span className="ref-live-dot" /> Technology · Learning · Progress</p>
            <h1>Build what&apos;s next.<br /><em>Make it matter.</em></h1>
            <p className="ref-hero-lede">We help businesses move forward with thoughtful technology—and help people build the skills to move with them.</p>
            <div className="ref-hero-actions">
              <Link href="/contact" className="ref-button ref-button-dark">Let&apos;s talk <ArrowUpRight size={17} /></Link>
              <Link href="/features" className="ref-text-link">Explore what we do <ArrowRight size={17} /></Link>
            </div>
            <div className="ref-hero-proof"><span className="ref-proof-mark"><Check size={14} /></span><span>Built around your goals, not off-the-shelf answers.</span></div>
          </div>

          <div className="ref-hero-visual" onMouseMove={handleOrbMove} onMouseLeave={() => setRotation({ x: -13, y: 24 })}>
            <div className="ref-visual-label ref-label-top"><span>01</span> THINK CLEARLY</div>
            <div className="ref-orbit ref-orbit-one" />
            <div className="ref-orbit ref-orbit-two" />
            <div className="ref-orbit ref-orbit-three" />
            <div className="ref-hero-orb" style={{ transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)` }}>
              <div className="ref-orb-core" />
              <div className="ref-orb-ribbon ref-ribbon-a" />
              <div className="ref-orb-ribbon ref-ribbon-b" />
              <div className="ref-orb-ribbon ref-ribbon-c" />
              <div className="ref-orb-shine" />
            </div>
            <div className="ref-orbit-node ref-node-a"><Code2 size={18} /><span>Technology</span></div>
            <div className="ref-orbit-node ref-node-b"><GraduationCap size={18} /><span>Learning</span></div>
            <div className="ref-orbit-node ref-node-c"><Zap size={17} /><span>Impact</span></div>
            <div className="ref-visual-label ref-label-bottom"><span className="ref-drag-symbol">↗</span> MOVE TO EXPLORE</div>
          </div>
        </div>
        <div className="ref-hero-bottom"><span>LEEDFINTECH / DIGITAL PARTNER</span><a href="#the-gap">Scroll to discover <ArrowDown size={14} /></a><span>INDIA · WORKING EVERYWHERE</span></div>
      </section>

      <section className="ref-gap-section" id="the-gap">
        <div className="ref-section-head">
          <p className="ref-eyebrow">One team. Two paths forward.</p>
          <h2>Where do you want<br />to <em>make progress?</em></h2>
          <p className="ref-section-intro">A good solution starts by understanding where you are—and what is holding you back.</p>
        </div>
        <div className="ref-choice-switch" role="tablist" aria-label="Choose your path">
          <button role="tab" aria-selected={audience === "business"} className={audience === "business" ? "is-active" : ""} onClick={() => setAudience("business")}>For businesses <ArrowUpRight size={15} /></button>
          <button role="tab" aria-selected={audience === "learner"} className={audience === "learner" ? "is-active" : ""} onClick={() => setAudience("learner")}>For learners <ArrowUpRight size={15} /></button>
        </div>
        <div className="ref-path-panel">
          <div className="ref-path-copy">
            <span className="ref-index">{audience === "business" ? "01 / DIGITAL PARTNERSHIP" : "02 / LEARNING & CAREERS"}</span>
            <h3>{audience === "business" ? <>Good ideas deserve<br /><em>great execution.</em></> : <>Your next opportunity<br /><em>starts with practice.</em></>}</h3>
            <p>{audience === "business" ? "From the first sketch to a platform people rely on, we bring product thinking and engineering together to solve the right problem." : "Build real skills through guided learning, practical projects and a clearer path from what you know to what you can do."}</p>
            <ul>{(audience === "business" ? ["Digital product development", "Cloud and system integration", "A practical, outcome-led approach"] : ["Structured technology learning", "Portfolio-ready project practice", "Career and internship guidance"]).map((item) => <li key={item}><Check size={15} />{item}</li>)}</ul>
            <Link href={audience === "business" ? "/features" : "/lms"} className="ref-button ref-button-dark">{audience === "business" ? "Explore capabilities" : "Explore learning"}<ArrowUpRight size={17} /></Link>
          </div>
          <div className={`ref-path-art ${audience === "learner" ? "ref-path-art-learning" : ""}`} aria-hidden="true">
            <div className="ref-art-topline"><span>THE LEEDFINTECH APPROACH</span><span>0{audience === "business" ? "1" : "2"} — 02</span></div>
            <div className="ref-art-architecture">
              <div className="ref-art-plane ref-plane-back" />
              <div className="ref-art-plane ref-plane-mid" />
              <div className="ref-art-plane ref-plane-front" />
              <div className="ref-art-ring" />
              <div className="ref-art-center"><Sparkles size={27} /><span>{audience === "business" ? "IDEA → IMPACT" : "LEARN → BUILD"}</span></div>
              <span className="ref-art-caption ref-caption-one">01 / UNDERSTAND</span><span className="ref-art-caption ref-caption-two">02 / BUILD</span><span className="ref-art-caption ref-caption-three">03 / IMPROVE</span>
            </div>
            <div className="ref-art-footer"><span>Clear thinking</span><span>Practical delivery</span><span>Measurable progress</span></div>
          </div>
        </div>
      </section>

      <section className="ref-process-band">
        <div className="ref-process-top"><p className="ref-eyebrow">A connected approach</p><span>FROM AMBITION TO OUTCOME</span></div>
        <h2>Technology is only useful<br />when it <em>moves you forward.</em></h2>
        <div className="ref-process-line"><div className="ref-process-step"><span>01</span><div className="ref-step-icon"><Sparkles size={21} /></div><h3>Understand</h3><p>Start with the real challenge, the people it affects and the outcome that matters.</p></div><div className="ref-process-step"><span>02</span><div className="ref-step-icon"><Layers3 size={21} /></div><h3>Shape</h3><p>Find the right priorities, plan the approach and make the complex feel clear.</p></div><div className="ref-process-step"><span>03</span><div className="ref-step-icon"><Workflow size={21} /></div><h3>Build</h3><p>Turn the plan into useful technology, practical skills and work that lasts.</p></div><div className="ref-process-step"><span>04</span><div className="ref-step-icon"><MoveUpRight size={21} /></div><h3>Improve</h3><p>Learn from what works, refine what does not and keep progress moving.</p></div></div>
      </section>

      <section className="ref-capabilities-section">
        <div className="ref-capabilities-heading"><div><p className="ref-eyebrow">What we bring together</p><h2>Good thinking.<br /><em>Made real.</em></h2></div><p>From digital foundations to hands-on learning, our capabilities are designed to work together—not sit in silos.</p></div>
        <div className="ref-capability-grid">{capabilities.map((item) => { const Icon = item.icon; return <Link href={item.href} className="ref-capability-card" key={item.number}><div className="ref-capability-top"><span>{item.number}</span><Icon size={21} strokeWidth={1.5} /></div><h3>{item.title}</h3><p>{item.text}</p><span className="ref-card-arrow"><ArrowUpRight size={18} /></span></Link>; })}</div>
        <div className="ref-section-foot"><span>ONE PARTNER, MULTIPLE WAYS TO MOVE FORWARD</span><Link href="/features" className="ref-text-link">See all capabilities <ArrowRight size={17} /></Link></div>
      </section>

      <section className="ref-statement-section"><div className="ref-statement-mark">“</div><p>Not technology for technology&apos;s sake.<br /><em>Progress with a purpose.</em></p><div className="ref-statement-foot"><span>THE WAY WE THINK</span><span>LEEDFINTECH — TECHNOLOGY & LEARNING</span></div></section>

      <section className="ref-about-strip"><div className="ref-about-copy"><p className="ref-eyebrow">Small enough to listen. Built to deliver.</p><h2>Let&apos;s make the<br /><em>next step clearer.</em></h2><p>Tell us what you are trying to achieve. We will help you work out a sensible place to begin.</p><Link href="/about" className="ref-text-link">Meet LeedfinTech <ArrowRight size={17} /></Link></div><div className="ref-about-visual"><div className="ref-about-circle ref-about-circle-one"/><div className="ref-about-circle ref-about-circle-two"/><div className="ref-about-word">MAKE<br /><em>IT</em><br />MATTER<span>®</span></div><div className="ref-about-tag">CURIOUS BY DESIGN<br />PRACTICAL BY NATURE</div></div></section>

      <section className="ref-final-cta"><div className="ref-cta-decoration" aria-hidden="true"><span /><span /><span /></div><p className="ref-eyebrow">The first step is a conversation</p><h2>What could we<br /><em>move forward together?</em></h2><p>Bring us a challenge, an idea or a goal. We&apos;ll start by listening.</p><Link href="/contact" className="ref-button ref-button-light">Tell us what you have in mind <ArrowUpRight size={17} /></Link><div className="ref-cta-bottom"><span>NO BIG PITCH. JUST A GOOD START.</span><span>LEEDFINTECH © {new Date().getFullYear()}</span></div></section>
    </div>
  );
}
