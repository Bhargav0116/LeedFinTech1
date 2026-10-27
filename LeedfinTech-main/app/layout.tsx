import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import "./globals.css";
import "./reference-theme.css";
import Navbar from "./components/Navbar";
import logo from "./favicon.ico";

export const metadata: Metadata = {
  title: {
    default: "LeedfinTech | Technology & Learning",
    template: "%s | LeedfinTech",
  },
  description:
    "Thoughtful technology services and practical learning pathways for ambitious teams and emerging talent.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white text-slate-900 antialiased min-h-screen flex flex-col selection:bg-amber-100 selection:text-amber-900">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <footer className="site-footer">
          <div className="site-footer-main">
            <div className="site-footer-brand">
              <Link href="/" className="site-brand">
                <Image src={logo} alt="" aria-hidden="true" />
                <span className="site-brand-name">
                  <span className="site-brand-word">
                    leedfin<span>tech</span><i>.</i>
                  </span>
                  <small>Technology &amp; learning</small>
                </span>
              </Link>
              <p>
                Thoughtful technology and practical learning for people and
                businesses moving forward.
              </p>
            </div>
            <div className="site-footer-column">
              <h2>Quick links</h2>
              <nav className="site-footer-links" aria-label="Quick links">
                <Link href="/">Home</Link>
                <Link href="/about">About us</Link>
                <Link href="/features">Capabilities</Link>
                <Link href="/lms">Learning</Link>
                <Link href="/contact">Contact</Link>
                <Link href="/finserve">Finserve</Link>
              </nav>
            </div>
            <div className="site-footer-column site-footer-connect">
              <h2>Get in touch</h2>
              <p>Have a project or learning goal in mind?</p>
              <Link href="/contact" className="site-footer-cta">
                Start a conversation <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </div>
          <div className="site-footer-bottom">
            <span>
              © {new Date().getFullYear()} LeedfinTech. All rights reserved.
            </span>
            <nav className="site-footer-legal" aria-label="Legal">
              <Link href="/privacy-policy">Privacy policy</Link>
              <Link href="/terms-and-conditions">Terms &amp; conditions</Link>
            </nav>
          </div>
        </footer>
      </body>
    </html>
  );
}
