"use client";

import { useState, type FormEvent } from "react";

export default function ContactEnquiry() {
  const [status, setStatus] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const enquiry = [
      `Name: ${formData.get("name")}`,
      `Email: ${formData.get("email")}`,
      `I'm interested in: ${formData.get("interest")}`,
      "",
      String(formData.get("message")),
    ].join("\n");

    try {
      await navigator.clipboard.writeText(enquiry);
      setStatus("Your enquiry has been copied. Paste it into your preferred email or messaging app.");
    } catch {
      setStatus("Clipboard access is unavailable. Your message is still here to copy manually.");
    }
  }

  return (
    <form id="enquiry-form" className="contact-form" onSubmit={handleSubmit}>
      <div className="contact-form-heading">
        <p className="inner-eyebrow inner-eyebrow-dark">Your enquiry</p>
        <h2>Tell us a little about it.</h2>
      </div>
      <div className="contact-form-grid">
        <label>
          <span>Your name</span>
          <input autoComplete="name" name="name" required />
        </label>
        <label>
          <span>Email address</span>
          <input autoComplete="email" name="email" type="email" required />
        </label>
        <label className="contact-form-wide">
          <span>I&apos;m interested in</span>
          <select name="interest" defaultValue="Business technology">
            <option>Business technology</option>
            <option>Courses and internships</option>
            <option>Something else</option>
          </select>
        </label>
        <label className="contact-form-wide">
          <span>How can we help?</span>
          <textarea name="message" rows={5} required />
        </label>
      </div>
      <div className="contact-submit-row">
        <button className="inner-button inner-button-dark" type="submit">Copy enquiry <span aria-hidden="true">↗</span></button>
        <p className="contact-form-note">This form copies your message; it does not send automatically.</p>
      </div>
      <p className="contact-form-status" role="status" aria-live="polite">{status}</p>
    </form>
  );
}