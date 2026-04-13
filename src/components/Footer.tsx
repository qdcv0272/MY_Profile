import { PROFILE } from "../data/profile";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <span className="footer__logo">&lt;KCH /&gt;</span>
          <p className="footer__copy">
            © {new Date().getFullYear()} {PROFILE.name} · Front-end Engineer
          </p>
          <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" className="footer__github">
            GitHub ↗
          </a>
        </div>
      </div>
    </footer>
  );
}
