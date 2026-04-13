import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { EffectCards, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-cards";
import { useFadeInUp } from "../hooks/useGsap";
import { PROJECTS } from "../data/profile";
import Particles from "./Particles";
import "./Projects.css";

const GITHUB_SVG = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

export default function Projects() {
  const headingRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);

  useFadeInUp(headingRef as React.RefObject<HTMLElement>);

  const active = PROJECTS[activeIdx];

  return (
    <section className="projects section" id="projects">
      <Particles count={25} />
      <div className="container">
        <div className="section__header" ref={headingRef}>
          <span className="section__tag">PROJECTS</span>
          <h2 className="section__title">프로젝트</h2>
        </div>

        <div className="projects__layout">
          {/* 왼쪽: 텍스트 정보 */}
          <div className="projects__info">
            <span className="projects__num">0{activeIdx + 1}</span>
            <h3 className="projects__info-title">{active.title}</h3>
            <p className="projects__info-desc">{active.description}</p>

            <ul className="projects__info-details">
              {active.detail.map((d, i) => (
                <li key={i}>
                  <span className="projects__info-dot" />
                  {d}
                </li>
              ))}
            </ul>

            <div className="projects__info-tags">
              {active.tags.map((tag) => (
                <span key={tag} className="projects__info-tag">
                  {tag}
                </span>
              ))}
            </div>

            <div className="projects__btn-group">
              <a href={active.github} target="_blank" rel="noopener noreferrer" className="projects__github-btn">
                {GITHUB_SVG}
                GitHub 보기
              </a>

              {active.demo && (
                <a href={active.demo} target="_blank" rel="noopener noreferrer" className="projects__demo-btn">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                  배포 사이트
                </a>
              )}
            </div>

            {/* 커스텀 내비게이션 */}
            <div className="projects__nav">
              <button className="projects__nav-btn" onClick={() => swiperRef.current?.slidePrev()} aria-label="이전">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <span className="projects__nav-count">
                {activeIdx + 1} / {PROJECTS.length}
              </span>
              <button className="projects__nav-btn" onClick={() => swiperRef.current?.slideNext()} aria-label="다음">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>
          </div>

          {/* 오른쪽: 카드 스택 */}
          <div className="projects__cards-wrap">
            <Swiper
              effect="cards"
              grabCursor
              rewind
              autoplay={{ delay: 4000, disableOnInteraction: true, pauseOnMouseEnter: true }}
              modules={[EffectCards, Autoplay]}
              className="projects__swiper"
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              onActiveIndexChange={(swiper) => setActiveIdx(swiper.activeIndex)}
            >
              {PROJECTS.map((project) => (
                <SwiperSlide key={project.id} className="projects__slide">
                  <div className="project-card" style={{ background: project.gradient }}>
                    <div className="project-card__noise" />
                    <div className="project-card__inner">
                      <span className="project-card__label">PROJECT</span>
                      <h4 className="project-card__name">{project.title}</h4>
                      <p className="project-card__short">{project.description}</p>
                    </div>
                    <div className="project-card__bottom">
                      {project.tags.slice(0, 3).map((t) => (
                        <span key={t} className="project-card__chip">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
}
