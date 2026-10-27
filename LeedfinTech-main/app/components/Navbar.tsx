"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ArrowDownRight, ArrowUpRight, Menu, X } from "lucide-react";
import logo from "../favicon.ico";

const navigation = [
  { href: "/", label: "Home" },
  { href: "/features", label: "Capabilities" },
  { href: "/about", label: "About" },
  { href: "/lms", label: "Learning" },
  { href: "/finserve", label: "Finserve" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 18);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) setIsMobileMenuOpen(false);
    };
    document.addEventListener("pointerdown", handleOutside);
    return () => document.removeEventListener("pointerdown", handleOutside);
  }, []);

  useEffect(() => setIsMobileMenuOpen(false), [pathname]);

  const links = (mobile = false) => navigation.map(({ href, label }) => (
    <Link key={href} href={href} onClick={mobile ? () => setIsMobileMenuOpen(false) : undefined} aria-current={pathname === href ? "page" : undefined} className={`ref-nav-link${pathname === href ? " ref-nav-link-active" : ""}`}>
      {label}{mobile && <ArrowUpRight size={16} />}
    </Link>
  ));

  return (
    <header ref={menuRef} className={`site-header ref-site-header${isScrolled ? " site-header-scrolled" : ""}`}>
      <div className="site-header-inner ref-header-inner">
        <Link href="/" className="site-brand ref-site-brand" aria-label="LeedfinTech home">
          <Image src={logo} alt="" aria-hidden="true" priority />
          <span className="site-brand-name"><span className="site-brand-word">leedfin<span>tech</span><i>.</i></span><small>Technology &amp; learning</small></span>
        </Link>
        <nav className="site-navigation ref-site-navigation" aria-label="Main navigation">
          <div className="ref-nav-dropdown"><Link href="/features" className="ref-nav-link">What we do <span className="ref-nav-caret"><ArrowDownRight size={13} /></span></Link><div className="ref-nav-mega"><p>Explore our capabilities</p><Link href="/features"><span>01</span><strong>Digital products</strong><ArrowUpRight size={15} /></Link><Link href="/features"><span>02</span><strong>Cloud &amp; systems</strong><ArrowUpRight size={15} /></Link><Link href="/lms"><span>03</span><strong>Learning &amp; careers</strong><ArrowUpRight size={15} /></Link></div></div>
          {links()}
        </nav>
        <Link href="/contact" className="site-header-cta ref-header-cta">Start a conversation <ArrowUpRight size={16} /></Link>
        <button className="mobile-menu-toggle ref-menu-toggle" type="button" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"} aria-expanded={isMobileMenuOpen} aria-controls="mobile-navigation">
          {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {isMobileMenuOpen && <nav id="mobile-navigation" className="mobile-navigation ref-mobile-navigation" aria-label="Mobile navigation"><p>EXPLORE LEEDFINTECH</p>{links(true)}<Link href="/contact" className="site-header-cta ref-header-cta">Start a conversation <ArrowUpRight size={16} /></Link></nav>}
    </header>
  );
}
