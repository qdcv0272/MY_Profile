import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useFadeInUp } from "../hooks/useGsap";
import { SKILLS } from "../data/profile";
import Particles from "./Particles";
import "./Skills.css";

gsap.registerPlugin(ScrollTrigger);

function SkillBar({ name, level }: { name: string; level: number }) {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;
    gsap.fromTo(
      bar,
      { width: "0%" },
      {
        width: `${level}%`,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: bar,
          start: "top 90%",
          toggleActions: "play none none none",
        },
      },
    );
  }, [level]);

  return (
    <div className="skill-bar-item">
      <div className="skill-bar-label">
        <span>{name}</span>
        <span className="skill-bar-level">{level}%</span>
      </div>
      <div className="skill-bar-track">
        <div className="skill-bar-fill" ref={barRef} />
      </div>
    </div>
  );
}

export default function Skills() {
  const headingRef = useRef<HTMLDivElement>(null);
  const toolsRef = useRef<HTMLDivElement>(null);

  useFadeInUp(headingRef as React.RefObject<HTMLElement>);
  useFadeInUp(toolsRef as React.RefObject<HTMLElement>, 0.2);

  return (
    <section className="skills section" id="skills">
      <Particles count={25} />
      <div className="container">
        <div className="section__header" ref={headingRef}>
          <span className="section__tag">SKILLS</span>
          <h2 className="section__title">기술 스택</h2>
        </div>

        <div className="skills__grid">
          <div className="skills__col">
            <h3 className="skills__col-title">Frontend</h3>
            {SKILLS.frontend.map((s) => (
              <SkillBar key={s.name} name={s.name} level={s.level} />
            ))}
          </div>

          <div className="skills__col">
            <h3 className="skills__col-title">Animation</h3>
            {SKILLS.animation.map((s) => (
              <SkillBar key={s.name} name={s.name} level={s.level} />
            ))}
            <h3 className="skills__col-title" style={{ marginTop: "1.5rem" }}>
              State &amp; Data
            </h3>
            {SKILLS.state.map((s) => (
              <SkillBar key={s.name} name={s.name} level={s.level} />
            ))}
          </div>

          <div className="skills__col">
            <h3 className="skills__col-title">Backend</h3>
            {SKILLS.backend.map((s) => (
              <SkillBar key={s.name} name={s.name} level={s.level} />
            ))}
          </div>
        </div>

        <div className="skills__tools" ref={toolsRef}>
          <h3 className="skills__col-title skills__tools-title">Tools</h3>
          <div className="skills__tools-list">
            {SKILLS.tools.map((t) => (
              <span key={t} className="skills__tool-badge">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
