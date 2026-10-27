import type { Metadata } from "next";
import Link from "next/link";
import AmbientVideo from "../components/landing/AmbientVideo";
import ScrollReveal from "../components/landing/ScrollReveal";
import ContactEnquiry from "../components/ContactEnquiry";

export const metadata: Metadata = {
  title: "Contact",
  description: "Start a conversation with LeedfinTech about technology services, technical learning, or internships.",
};

export default function ContactPage() {
  return (
    <div className="editorial-page">
      <section className="inner-hero inner-hero-contact">
        <AmbientVideo
          className="inner-ambient-video"
          poster="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=85"
        />
        <div className="inner-container inner-hero-grid">
          <div className="inner-hero-copy">
            <p className="inner-eyebrow">Contact</p>
            <h1>Good work begins with a conversation.</h1>
            <p className="inner-hero-description">
              Tell us what you are working toward. We will help you find the right place to start.
            </p>
            <div className="inner-actions">
              <a href="#enquiry-form" className="inner-button inner-button-gold">Share your enquiry <span aria-hidden="true">↓</span></a>
              <Link href="/features" className="inner-button inner-button-outline">See what we do <span aria-hidden="true">↗</span></Link>
            </div>
          </div>
          <div className="inner-hero-image inner-image-contact" role="img" aria-label="A welcoming, light-filled meeting space" />
        </div>
      </section>

      <ScrollReveal>
        <section className="inner-band inner-band-light contact-band">
          <div className="inner-container contact-layout">
            <div className="contact-aside">
              <p className="inner-eyebrow inner-eyebrow-dark">A good place to begin</p>
              <h2>What brings you here?</h2>
              <p>Choose the path closest to what you have in mind. Your note will stay in your browser until you choose to copy it.</p>
              <div className="contact-pathways">
                <Link href="/features" className="contact-pathway">
                  <span>01 / For teams</span>
                  <strong>Technology for your business</strong>
                  <span className="capability-mark" aria-hidden="true">↗</span>
                </Link>
                <Link href="/lms" className="contact-pathway">
                  <span>02 / For learners</span>
                  <strong>Courses and career experience</strong>
                  <span className="capability-mark" aria-hidden="true">↗</span>
                </Link>
              </div>
            </div>
            <ContactEnquiry />
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="inner-band inner-band-dark">
          <div className="inner-container inner-heading-row inner-heading-row-dark">
            <div>
              <p className="inner-eyebrow">A clear next step</p>
              <h2>Thoughtful from the first hello.</h2>
            </div>
            <p>We start by understanding the goal, then help map a practical next move together.</p>
          </div>
        </section>
      </ScrollReveal>
    </div>
  );
}