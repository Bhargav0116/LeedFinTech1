import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Learning platform",
  description:
    "The LeedfinTech learning platform is coming soon. Contact us to ask about learning opportunities.",
};

export default function LearningPage() {
  return (
    <main className="lms-coming-soon">
      <div className="lms-coming-soon-content">
        <p className="inner-eyebrow">LeedfinTech learning</p>
        <h1>
          Coming soon. <br />
          <br /> LMS is under construction.
        </h1>
        <p>
          We&apos;re preparing our learning platform. In the meantime, get in
          touch to ask about practical technology learning, mentorship, and
          upcoming opportunities.
        </p>
        <div className="lms-coming-soon-actions">
          <Link
            href="/contact#enquiry-form"
            className="inner-button inner-button-gold"
          >
            Ask about learning <span aria-hidden="true">↗</span>
          </Link>
          <Link href="/" className="inner-button inner-button-outline">
            Back to home <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
