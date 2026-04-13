import { useState, useEffect } from "react";
import { PROFILE } from "../data/profile";
import "./Navbar.css";

const NAV_LINKS = [
  { href: "#about", label: "경력" },
  { href: "#skills", label: "스킬" },
  { href: "#projects", label: "프로젝트" },
  { href: "#contact", label: "연락처" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header className={`navbar${scrolled ? " navbar--scrolled" : ""}`}>
      <div className="navbar__inner">
        <a href="#hero" className="navbar__logo">
          &lt;KCH /&gt;
        </a>

        <nav className={`navbar__nav${menuOpen ? " navbar__nav--open" : ""}`}>
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="navbar__link" onClick={() => setMenuOpen(false)}>
              {link.label}
            </a>
          ))}
          <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" className="navbar__github">
            GitHub
          </a>
        </nav>

        <button className={`navbar__burger${menuOpen ? " navbar__burger--open" : ""}`} onClick={() => setMenuOpen((o) => !o)} aria-label="메뉴 열기">
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
