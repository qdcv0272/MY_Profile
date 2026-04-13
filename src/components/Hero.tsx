import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { PROFILE } from "../data/profile";
import Particles from "./Particles";
import "./Hero.css";

const TYPED_TEXTS = ["Front-end Engineer", "React / TypeScript", "Interactive UI Dev", "Algorithm Visualizer"];

// 아바타 주변 궤도 기술 아이콘
const ORBIT_ICONS = [
  {
    label: "HTML",
    color: "#e34f26",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.195-2.155H6.494l.383 4.258 5.11 1.412 5.08-1.382.93-10.26H8.532l-.001-.001z" />
      </svg>
    ),
  },
  {
    label: "CSS",
    color: "#1572b6",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438zm5.32 4.41l.459 5.34h8.313l-.324 3.697-3.268.904-3.268-.904-.212-2.378H6.22l.411 4.677 5.346 1.48 5.35-1.48.73-8.19H8.397l-.223-2.587h9.454l.222-2.559z" />
      </svg>
    ),
  },
  {
    label: "JS",
    color: "#f7df1e",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z" />
      </svg>
    ),
  },
  {
    label: "TS",
    color: "#3178c6",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.917.138a1.567 1.567 0 0 0-.663.38c-.18.167-.27.392-.267.615a.882.882 0 0 0 .239.591c.155.172.35.32.575.43.173.09.562.231 1.163.423.84.267 1.518.548 2.034.84.49.27.89.63 1.196 1.075a2.742 2.742 0 0 1 .454 1.608c0 .678-.175 1.26-.525 1.746-.35.487-.843.858-1.48 1.11-.637.25-1.37.376-2.196.376a8.79 8.79 0 0 1-1.91-.198 6.955 6.955 0 0 1-1.49-.498v-2.58c.5.33 1.02.587 1.56.768.54.18 1.05.27 1.528.27.341 0 .637-.036.889-.108a1.49 1.49 0 0 0 .608-.338c.148-.148.223-.337.225-.567a.863.863 0 0 0-.287-.664c-.194-.179-.447-.327-.762-.445-.315-.119-.714-.26-1.198-.42-.87-.275-1.58-.57-2.126-.888a3.535 3.535 0 0 1-1.132-1.1c-.264-.432-.396-.965-.396-1.599 0-.661.168-1.24.499-1.735.332-.494.806-.872 1.42-1.132.614-.26 1.32-.39 2.116-.39zM9.498 9.75H12v2.09H9.498v6.76H6.96v-6.76H4.5V9.75z" />
      </svg>
    ),
  },
  {
    label: "React",
    color: "#61dafb",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09c.275 0 .487.058.665.175.74.448.974 2.049.33 4.205-.07.238-.153.48-.245.726a15.9 15.9 0 0 0-3.646-.845 15.9 15.9 0 0 0-2.367-2.748c.998-.95 1.994-1.686 2.93-2.139.417-.2.785-.374 1.333-.374zm-9.228 0c.548 0 .916.174 1.333.375.936.452 1.932 1.188 2.93 2.14a15.9 15.9 0 0 0-2.368 2.748 15.9 15.9 0 0 0-3.645.845c-.092-.245-.175-.487-.245-.726-.645-2.156-.411-3.756.33-4.205.178-.117.39-.177.665-.177zM12 8.443a13.98 13.98 0 0 1 1.83.115 13.98 13.98 0 0 1 1.129 1.978 13.98 13.98 0 0 1 .672 2.142 13.98 13.98 0 0 1-.665 2.152 13.98 13.98 0 0 1-1.126 1.983 13.98 13.98 0 0 1-3.675 0 13.98 13.98 0 0 1-1.126-1.983A13.98 13.98 0 0 1 9.374 12.678a13.98 13.98 0 0 1 .672-2.14 13.98 13.98 0 0 1 1.128-1.98c.594-.076 1.207-.115 1.826-.115zm-6.33 1.7c.485.122.97.265 1.451.43-.21.692-.35 1.42-.42 2.168H4.5c.098-1.006.39-1.91.832-2.704.11.033.219.068.338.106zm12.66 0c.119-.038.228-.073.337-.106.44.794.735 1.698.832 2.704h-2.2c-.07-.748-.21-1.476-.42-2.168.48-.165.966-.308 1.45-.43zm-11.66 4.32H9.87c.07.748.21 1.476.42 2.168-.48.165-.965.308-1.45.43-.12.037-.229.072-.338.106a7.87 7.87 0 0 1-.832-2.704zm11.66 0h2.2c-.097 1.006-.39 1.91-.832 2.704-.109-.034-.218-.069-.338-.106-.484-.122-.97-.265-1.45-.43.21-.692.35-1.42.42-2.168zm-7.9 3.126c.384.59.79 1.12 1.212 1.584a13.98 13.98 0 0 1-2.93-2.14c.314.19.84.392 1.718.556zm5.636-3.126a13.98 13.98 0 0 1-1.128 1.983c-.59.075-1.203.115-1.826.115-.624 0-1.237-.04-1.83-.115a13.98 13.98 0 0 1-1.128-1.983z" />
      </svg>
    ),
  },
  {
    label: "GSAP",
    color: "#88ce02",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.381 0 0 5.381 0 12s5.381 12 12 12 12-5.381 12-12S18.619 0 12 0zm-.55 4.5h1.1v3.3h-1.1V4.5zm-4.24 1.4l.78.78-2.33 2.33-.78-.78 2.33-2.33zm9.58 0l2.33 2.33-.78.78-2.33-2.33.78-.78zM12 7.5a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9zM4.5 11.45h3.3v1.1H4.5v-1.1zm11.7 0h3.3v1.1h-3.3v-1.1zM6.21 16.97l2.33-2.33.78.78-2.33 2.33-.78-.78zm9.58 0l-.78.78-2.33-2.33.78-.78 2.33 2.33zM11.45 19.5h1.1v-3.3h-1.1v3.3z" />
      </svg>
    ),
  },
  {
    label: "Next",
    color: "#ffffff",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 0 1-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 0 0-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.25 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.106.247-.134.219-.158-.02-.013-.9-1.193-1.955-2.62l-1.919-2.592-2.404-3.558a338.739 338.739 0 0 0-2.422-3.556c-.009-.002-.018 1.579-.023 3.51-.007 3.38-.01 3.515-.052 3.595a.426.426 0 0 1-.206.214c-.075.037-.14.044-.495.044H7.81l-.108-.068a.438.438 0 0 1-.157-.171l-.05-.106.006-4.703.007-4.705.072-.092a.645.645 0 0 1 .174-.143c.096-.047.134-.051.54-.051.478 0 .558.018.682.154.035.038 1.337 1.999 2.895 4.361a10760.433 10760.433 0 0 0 4.735 7.17l1.9 2.879.096-.063a12.317 12.317 0 0 0 2.466-2.163 11.944 11.944 0 0 0 2.824-6.134c.096-.66.108-.854.108-1.748 0-.893-.012-1.088-.108-1.747C23.573 4.715 20.366.929 16.016.534a18.59 18.59 0 0 0-.636-.04C15.184.487 11.607.477 11.572 0z" />
      </svg>
    ),
  },
  {
    label: "Git",
    color: "#f05032",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.9l2.658 2.66c.645-.223 1.387-.078 1.9.435.724.721.724 1.892 0 2.614-.722.722-1.894.722-2.613 0-.539-.541-.674-1.337-.404-1.996L12.86 8.955v6.525c.176.086.342.203.488.348.713.721.713 1.891 0 2.611-.713.721-1.892.721-2.609 0-.719-.72-.719-1.89 0-2.611.174-.174.368-.31.571-.405V8.9c-.203-.096-.396-.232-.571-.405-.52-.679-.513-1.549.026-2.161l-2.7-2.699-7.163 7.17c-.604.604-.604 1.582 0 2.188l10.477 10.476c.604.604 1.582.604 2.187 0l10.43-10.428c.605-.603.605-1.582.01-2.187z" />
      </svg>
    ),
  },
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);

  const [typedText, setTypedText] = useState("");
  const [textIdx, setTextIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  // Typewriter
  useEffect(() => {
    const current = TYPED_TEXTS[textIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting) {
      if (charIdx < current.length) {
        timeout = setTimeout(() => {
          setTypedText(current.slice(0, charIdx + 1));
          setCharIdx((c) => c + 1);
        }, 80);
      } else {
        timeout = setTimeout(() => setDeleting(true), 1800);
      }
    } else {
      if (charIdx > 0) {
        timeout = setTimeout(() => {
          setTypedText(current.slice(0, charIdx - 1));
          setCharIdx((c) => c - 1);
        }, 45);
      } else {
        setDeleting(false);
        setTextIdx((i) => (i + 1) % TYPED_TEXTS.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [charIdx, deleting, textIdx]);

  // GSAP entrance
  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.2 });
    tl.fromTo(avatarRef.current, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.8, ease: "back.out(1.7)" })
      .fromTo(".hero__orbit-icon", { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(2)", stagger: 0.08 }, "-=0.1")
      .fromTo(titleRef.current, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" }, "-=0.3")
      .fromTo(subtitleRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }, "-=0.4")
      .fromTo(ctaRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }, "-=0.3");
  }, []);

  // Floating avatar
  useEffect(() => {
    gsap.to(avatarRef.current, {
      y: -12,
      duration: 2.5,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    });
  }, []);

  return (
    <section className="hero" ref={sectionRef} id="hero">
      <Particles count={40} />
      <div className="hero__glow hero__glow--left" />
      <div className="hero__glow hero__glow--right" />

      <div className="hero__content">
        <div className="hero__orbit-wrap" ref={avatarRef}>
          {ORBIT_ICONS.map((icon, i) => {
            const angle = (i / ORBIT_ICONS.length) * 360;
            const rad = (angle * Math.PI) / 180;
            const r = 110;
            const x = Math.cos(rad) * r;
            const y = Math.sin(rad) * r;
            return (
              <div
                key={icon.label}
                className="hero__orbit-icon"
                style={
                  {
                    transform: `translate(${x}px, ${y}px)`,
                    color: icon.color,
                    borderColor: icon.color,
                    "--glow-color": icon.color,
                  } as React.CSSProperties
                }
              >
                <span className="hero__orbit-icon__svg">{icon.svg}</span>
                <span className="hero__orbit-icon__label">{icon.label}</span>
              </div>
            );
          })}
          <div className="hero__avatar-wrap">
            <div className="hero__avatar-ring" />
            <img className="hero__avatar" src={PROFILE.avatar} alt={PROFILE.name} />
          </div>
        </div>

        <h1 className="hero__name" ref={titleRef}>
          <span className="hero__name--en">{PROFILE.nameEn}</span>
          <span className="hero__name--kr">{PROFILE.name}</span>
        </h1>

        <p className="hero__typed" ref={subtitleRef}>
          <span className="hero__typed--bracket">&lt;</span>
          <span className="hero__typed--text">{typedText}</span>
          <span className="hero__typed--cursor" ref={cursorRef}>
            |
          </span>
          <span className="hero__typed--bracket">/&gt;</span>
        </p>

        <p className="hero__sub">{PROFILE.subtitle}</p>

        <div className="hero__cta" ref={ctaRef}>
          <a href="#projects" className="btn btn--primary">
            Projects 보기
          </a>
          <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" className="btn btn--ghost">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
            </svg>
            GitHub
          </a>
        </div>
      </div>

      <div className="hero__scroll-hint">
        <span>scroll</span>
        <div className="hero__scroll-line" />
      </div>
    </section>
  );
}
