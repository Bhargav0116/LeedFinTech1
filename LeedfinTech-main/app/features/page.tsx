import type { Metadata } from "next";
import Link from "next/link";
import AmbientVideo from "../components/landing/AmbientVideo";
import ScrollReveal from "../components/landing/ScrollReveal";

export const metadata: Metadata = {
  title: "Capabilities",
  description: "Explore LeedfinTech's engineering, infrastructure, learning, and career-development capabilities.",
};

export default function FeaturesPage() {
  return (
    <div className="editorial-page">
      <section className="inner-hero inner-hero-features">
        <AmbientVideo
          className="inner-ambient-video"
          poster="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=85"
        />
        <div className="inner-container inner-hero-grid">
          <div className="inner-hero-copy">
            <p className="inner-eyebrow">What we do</p>
            <h1>One connected path from idea to impact.</h1>
            <p className="inner-hero-description">
              Build the digital foundations your business needs, or develop the skills to help shape what comes next.
            </p>
            <div className="inner-actions">
              <Link href="/contact" className="inner-button inner-button-gold">Discuss your goals <span aria-hidden="true">↗</span></Link>
              <Link href="/lms" className="inner-button inner-button-outline">Explore learning <span aria-hidden="true">↗</span></Link>
            </div>
          </div>
          <div className="inner-hero-image inner-image-features" role="img" aria-label="Close detail of modern technology and engineering" />
        </div>
      </section>

      <ScrollReveal>
        <section className="inner-band inner-band-light">
          <div className="inner-container">
            <div className="inner-heading-row">
              <div>
                <p className="inner-eyebrow inner-eyebrow-dark">Capabilities</p>
                <h2>Thoughtful work at every layer.</h2>
              </div>
              <p>Focused expertise, brought together around the outcome you need.</p>
            </div>
            <div className="capability-list">
              <article>
                <span className="inner-index">01</span>
                <div><h3>Digital engineering</h3><p>Custom web and mobile applications, built to perform and evolve with your business.</p></div>
                <span className="capability-mark" aria-hidden="true">↗</span>
              </article>
              <article>
                <span className="inner-index">02</span>
                <div><h3>Cloud &amp; infrastructure</h3><p>Modern architecture, DevOps automation, security practices, and dependable operations.</p></div>
                <span className="capability-mark" aria-hidden="true">↗</span>
              </article>
              <article>
                <span className="inner-index">03</span>
                <div><h3>Technical learning</h3><p>Structured learning paths and expert guidance for people building in technology.</p></div>
                <span className="capability-mark" aria-hidden="true">↗</span>
              </article>
              <article>
                <span className="inner-index">04</span>
                <div><h3>Career experience</h3><p>Mentorship and practical project experience designed to help learners take their next step.</p></div>
                <span className="capability-mark" aria-hidden="true">↗</span>
              </article>
            </div>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="inner-band inner-band-dark inner-outcomes-band">
          <div className="inner-container inner-split">
            <p className="inner-eyebrow">Made to work together</p>
            <div className="inner-copy-column">
              <h2>Better technology starts with the right conversation.</h2>
              <p>Whether you are planning a platform or your next career move, we can help clarify a practical way forward.</p>
              <div className="inner-actions">
                <Link href="/contact" className="inner-button inner-button-gold">Tell us what you need <span aria-hidden="true">↗</span></Link>
                <Link href="/about" className="inner-text-link inner-text-link-light">Get to know us <span aria-hidden="true">→</span></Link>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </div>
  );
}