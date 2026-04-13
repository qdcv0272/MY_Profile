import { useRef } from "react";
import { useFadeInUp, useStaggerFadeIn } from "../hooks/useGsap";
import { CAREER } from "../data/profile";
import Particles from "./Particles";
import "./About.css";

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  useFadeInUp(headingRef as React.RefObject<HTMLElement>);
  useStaggerFadeIn(listRef as React.RefObject<HTMLElement>, ".about__card");

  return (
    <section className="about section" id="about" ref={sectionRef}>
      <Particles count={25} />
      <div className="container">
        <div className="section__header" ref={headingRef}>
          <span className="section__tag">CAREER</span>
          <h2 className="section__title">경력 사항</h2>
        </div>

        <ul className="about__list" ref={listRef}>
          {CAREER.map((item, i) => (
            <li key={i} className="about__card">
              <div className="about__card-header">
                <div>
                  <h3 className="about__company">{item.company}</h3>
                  <span className="about__position">{item.position}</span>
                </div>
                <div className="about__period-wrap">
                  <span className="about__period">{item.period}</span>
                  <span className="about__duration">{item.duration}</span>
                </div>
              </div>

              <ul className="about__tasks">
                {item.tasks.map((task, j) => (
                  <li key={j} className="about__task">
                    <span className="about__task-dot" />
                    {task}
                  </li>
                ))}
              </ul>

              <div className="about__tags">
                {item.tags.map((tag) => (
                  <span key={tag} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
            </li>
          ))}
        </ul>

        {/* Education */}
        <div className="about__edu-wrap">
          <div className="about__edu-card">
            <div className="about__edu-icon">🎓</div>
            <div>
              <h4 className="about__edu-school">인제대학교 컴퓨터공학부</h4>
              <p className="about__edu-detail">졸업 · 2015.03 – 2021.02</p>
              <p className="about__edu-project">졸업작품: 스마트금고 (Firebase &amp; Kotlin)</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
