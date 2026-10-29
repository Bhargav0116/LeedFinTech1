"use client";

import { useEffect, useState, type MouseEvent } from "react";
import TesseractBackground from "./TesseractBackground";
import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUpRight, Check, Code2, GraduationCap, Layers3, MoveUpRight, Sparkles, Workflow, Zap, LayoutDashboard, FolderKanban, ChartNoAxesColumn, Home, BookOpen, UserRound, Play } from "lucide-react";

const capabilities = [
  { number: "01", title: "Digital products", text: "Websites, applications and platforms built around real business needs.", icon: Code2, href: "/features", image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1000&q=85", tag: "DESIGN · DEVELOP · LAUNCH", visual: "Product studio" },
  { number: "02", title: "Cloud & systems", text: "Reliable foundations, integrations and workflows that scale with you.", icon: Layers3, href: "/features", image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1000&q=85", tag: "CONNECTED BY DESIGN", visual: "Cloud infrastructure" },
  { number: "03", title: "Technical learning", text: "Practical learning paths that turn knowledge into capability.", icon: GraduationCap, href: "/lms", image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1000&q=85", tag: "LEARN · PRACTISE · GROW", visual: "Learning lab" },
  { number: "04", title: "Career readiness", text: "Project-based experience and guidance for the next step in your career.", icon: Workflow, href: "/lms", image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1000&q=85", tag: "SKILLS INTO MOMENTUM", visual: "Career pathways" },
];

export default function ReferenceStyleHome() {
  const [audience, setAudience] = useState<"business" | "learner">("business");
  const [dashboardTab, setDashboardTab] = useState("Overview");
  const [phoneTab, setPhoneTab] = useState("Home");
  const [progress, setProgress] = useState(68);
  const [lessonStarted, setLessonStarted] = useState(false);

  useEffect(() => {
    const cards = document.querySelectorAll<HTMLElement>(".ref-capability-card");
    if (!("IntersectionObserver" in window)) {
      cards.forEach((card) => card.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.16, rootMargin: "0px 0px -5% 0px" });
    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  const moveCapabilityCard = (event: MouseEvent<HTMLAnchorElement>) => {
    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const rotateY = ((x / rect.width) - 0.5) * 5;
    const rotateX = (0.5 - (y / rect.height)) * 5;
    card.style.setProperty("--pointer-x", `${x}px`);
    card.style.setProperty("--pointer-y", `${y}px`);
    card.style.setProperty("--tilt-x", `${rotateX}deg`);
    card.style.setProperty("--tilt-y", `${rotateY}deg`);
  };

  const resetCapabilityCard = (event: MouseEvent<HTMLAnchorElement>) => {
    const card = event.currentTarget;
    card.style.setProperty("--tilt-x", "0deg");
    card.style.setProperty("--tilt-y", "0deg");
  };

  return (
    <div className="reference-home">
      <section className="ref-hero">
        <TesseractBackground />
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

          <div className="ref-hero-visual ref-device-stage">
            <div className="ref-visual-label ref-label-top"><span>01</span> YOUR DIGITAL WORLD</div>
            <div className="ref-device-orbit ref-device-orbit-a" />
            <div className="ref-device-orbit ref-device-orbit-b" />
            <div className="ref-laptop-wrap">
              <div className="ref-laptop-screen">
                <div className="ref-browser-bar"><span className="ref-browser-dots"><i /><i /><i /></span><span className="ref-browser-url"><span className="ref-lock">▣</span> leedfin.app / dashboard</span><span className="ref-browser-live">LIVE PREVIEW</span></div>
                <div className="ref-dashboard">
                  <aside className="ref-dashboard-sidebar">
                    <div className="ref-dashboard-brand"><b>L</b><span>LEEDFIN</span></div>
                    <nav aria-label="Dashboard preview navigation">
                      {[{name:"Overview",icon:LayoutDashboard},{name:"Projects",icon:FolderKanban},{name:"Analytics",icon:ChartNoAxesColumn}].map(item=>{const Icon=item.icon;return <button key={item.name} className={dashboardTab===item.name?"is-active":""} onClick={()=>setDashboardTab(item.name)}><Icon size={14}/>{item.name}</button>;})}
                    </nav>
                    <div className="ref-sidebar-profile"><span /> <i /></div>
                  </aside>
                  <div className="ref-dashboard-main">
                    <div className="ref-dashboard-topline"><span>WELCOME BACK</span><b><i /> Live</b></div>
                    <h3>{dashboardTab === "Overview" ? "Good morning, Banti" : dashboardTab === "Projects" ? "Your projects" : "Performance overview"}</h3>
                    <div className="ref-metric-grid"><div><small>{dashboardTab === "Projects" ? "Active" : "Revenue"}</small><strong>{dashboardTab === "Projects" ? "08" : "$ 48k"}</strong><em>+12%</em></div><div><small>{dashboardTab === "Analytics" ? "Sessions" : "Users"}</small><strong>{dashboardTab === "Analytics" ? "8,492" : "1,204"}</strong><em>+8%</em></div><div><small>Completed</small><strong>{dashboardTab === "Projects" ? "06" : "96%"}</strong><em>On track</em></div></div>
                    <div className="ref-dashboard-chart"><div className="ref-chart-heading"><strong>{dashboardTab === "Analytics" ? "Traffic overview" : dashboardTab === "Projects" ? "Project activity" : "Weekly activity"}</strong><span>THIS WEEK⌄</span></div><div className="ref-chart-bars">{[34,52,41,68,57,82,73,91,62,77,49,69].map((v,i)=><i key={i} style={{height:`${v}%`}} />)}</div><div className="ref-chart-labels"><span>MON</span><span>TUE</span><span>WED</span><span>THU</span><span>FRI</span><span>SAT</span><span>SUN</span></div></div>
                  </div>
                </div>
              </div>
              <div className="ref-laptop-base"><div /></div>
            </div>
            <div className="ref-phone-wrap">
              <div className="ref-phone-frame"><div className="ref-phone-screen">
                <div className="ref-phone-status"><span>9:41</span><span>●●● ▰</span></div><div className="ref-phone-notch" />
                <div className="ref-phone-greeting"><div><small>{phoneTab === "Learn" ? "YOUR LEARNING PATH" : phoneTab === "Profile" ? "YOUR PROFILE" : "WELCOME BACK"}</small><strong>{phoneTab === "Learn" ? "Keep growing." : phoneTab === "Profile" ? "Hi, Banti" : "Hi, Banti"}</strong></div><span className="ref-phone-avatar">B</span></div>
                {phoneTab === "Profile" ? <div className="ref-phone-profile"><span className="ref-phone-avatar large">B</span><strong>Banti Kumar</strong><small>Learning member</small><div><span>Courses completed</span><b>12</b></div><div><span>Points earned</span><b>2,840</b></div></div> : <>
                  <div className="ref-learning-card"><div className="ref-learning-card-top"><span>{phoneTab === "Learn" ? "UP NEXT" : "CONTINUE LEARNING"}</span><span className="ref-progress-ring" style={{background:`conic-gradient(#fff ${progress}%,rgba(255,255,255,.2) 0)`}}><i>{progress}%</i></span></div><strong>{phoneTab === "Learn" ? "Java & Spring Boot" : "Advanced React Patterns"}</strong><div className="ref-learning-track"><span style={{width:`${progress}%`}} /></div><button onClick={()=>{setProgress(p=>Math.min(100,p+8));setLessonStarted(true)}}><Play size={10} fill="currentColor"/>{lessonStarted ? (progress >= 100 ? "Lesson completed!" : "Continue lesson") : "Continue lesson"} <ArrowRight size={11}/></button></div>
                  <div className="ref-phone-stats"><div><small>🔥 Streak</small><b>12 days</b></div><div><small>Points</small><b>2,840</b></div></div>
                  <div className="ref-phone-recommended"><div><small>RECOMMENDED</small><strong>{phoneTab === "Learn" ? "Spring Boot APIs" : "Design Systems Masterclass"}</strong><span>12 lessons · 4h</span></div><span className="ref-bookmark">☆</span></div>
                </>}
                <nav className="ref-phone-nav" aria-label="Mobile preview navigation">{[{name:"Home",icon:Home},{name:"Learn",icon:BookOpen},{name:"Profile",icon:UserRound}].map(item=>{const Icon=item.icon;return <button key={item.name} className={phoneTab===item.name?"is-active":""} onClick={()=>setPhoneTab(item.name)}><Icon size={16}/><span>{item.name}</span></button>;})}</nav>
              </div></div>
            </div>
            <div className="ref-visual-label ref-label-bottom"><span className="ref-drag-symbol">↗</span> INTERACT WITH THE PREVIEW</div>
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
        <div className="ref-capability-grid">{capabilities.map((item) => { const Icon = item.icon; return <Link href={item.href} className="ref-capability-card" key={item.number} aria-label={`${item.title}: ${item.text}`} onMouseMove={moveCapabilityCard} onMouseLeave={resetCapabilityCard}><div className="ref-capability-image" style={{ backgroundImage: `url("${item.image}")` }}><div className="ref-capability-image-shade" /><div className="ref-capability-image-top"><span>{item.number} / 04</span><Icon size={19} strokeWidth={1.6} /></div><span className="ref-capability-image-tag">{item.tag}</span><span className="ref-capability-image-caption">{item.visual}</span><span className="ref-image-corner" aria-hidden="true">↗</span></div><div className="ref-capability-content"><h3>{item.title}</h3><p>{item.text}</p><span className="ref-card-arrow"><ArrowUpRight size={18} /></span></div></Link>; })}</div>
        <div className="ref-section-foot"><span>ONE PARTNER, MULTIPLE WAYS TO MOVE FORWARD</span><Link href="/features" className="ref-text-link">See all capabilities <ArrowRight size={17} /></Link></div>
      </section>

      <section className="ref-statement-section"><div className="ref-statement-mark">“</div><p>Not technology for technology&apos;s sake.<br /><em>Progress with a purpose.</em></p><div className="ref-statement-foot"><span>THE WAY WE THINK</span><span>LEEDFINTECH — TECHNOLOGY & LEARNING</span></div></section>

      <section className="ref-about-strip"><div className="ref-about-copy"><p className="ref-eyebrow">Small enough to listen. Built to deliver.</p><h2>Let&apos;s make the<br /><em>next step clearer.</em></h2><p>Tell us what you are trying to achieve. We will help you work out a sensible place to begin.</p><Link href="/about" className="ref-text-link">Meet LeedfinTech <ArrowRight size={17} /></Link></div><div className="ref-about-visual"><div className="ref-about-circle ref-about-circle-one"/><div className="ref-about-circle ref-about-circle-two"/><div className="ref-about-word">MAKE<br /><em>IT</em><br />MATTER<span>®</span></div><div className="ref-about-tag">CURIOUS BY DESIGN<br />PRACTICAL BY NATURE</div></div></section>

      <section className="ref-final-cta"><div className="ref-cta-decoration" aria-hidden="true"><span /><span /><span /></div><p className="ref-eyebrow">The first step is a conversation</p><h2>What could we<br /><em>move forward together?</em></h2><p>Bring us a challenge, an idea or a goal. We&apos;ll start by listening.</p><Link href="/contact" className="ref-button ref-button-light">Tell us what you have in mind <ArrowUpRight size={17} /></Link><div className="ref-cta-bottom"><span>NO BIG PITCH. JUST A GOOD START.</span><span>LEEDFINTECH © {new Date().getFullYear()}</span></div></section>
    </div>
  );
}
