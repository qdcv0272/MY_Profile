import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Chart, BarElement, BarController, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import { useFadeInUp } from "../hooks/useGsap";
import { SKILLS } from "../data/profile";
import Particles from "./Particles";
import "./Skills.css";

gsap.registerPlugin(ScrollTrigger);
Chart.register(BarElement, BarController, CategoryScale, LinearScale, Tooltip, Legend);

function buildChartData() {
  const categories = ["frontend", "animation", "state", "backend"] as const;
  const labels: string[] = [];
  const data: number[] = [];

  categories.forEach((category) => {
    SKILLS[category].forEach((skill) => {
      labels.push(skill.name);
      data.push(skill.level);
    });
  });

  return { labels, data };
}

export default function Skills() {
  const headingRef = useRef<HTMLDivElement>(null);
  const toolsRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<HTMLCanvasElement>(null);

  useFadeInUp(headingRef as React.RefObject<HTMLElement>);
  useFadeInUp(toolsRef as React.RefObject<HTMLElement>, 0.2);

  useEffect(() => {
    const canvas = chartRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { labels, data } = buildChartData();

    const chart = new Chart(ctx, {
      type: "bar",
      data: {
        labels,
        datasets: [
          {
            label: "Skill proficiency",
            data,
            backgroundColor: "rgba(0, 212, 255, 0.45)",
            borderColor: "rgba(0, 212, 255, 0.95)",
            borderWidth: 1,
            borderRadius: 8,
            barPercentage: 0.75,
            categoryPercentage: 0.8,
          },
        ],
      },
      options: {
        indexAxis: "y",
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            min: 0,
            max: 100,
            ticks: {
              stepSize: 10,
              color: "rgba(255, 255, 255, 0.75)",
            },
            grid: {
              color: "rgba(255, 255, 255, 0.08)",
            },
          },
          y: {
            ticks: {
              color: "rgba(255, 255, 255, 0.85)",
            },
            grid: {
              display: false,
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            callbacks: {
              label(context) {
                const value = context.parsed.x ?? context.parsed.y;
                return `${value}%`;
              },
            },
          },
        },
      },
    });

    return () => {
      chart.destroy();
    };
  }, []);

  return (
    <section className="skills section" id="skills">
      <Particles count={25} />
      <div className="container">
        <div className="section__header" ref={headingRef}>
          <span className="section__tag">SKILLS</span>
          <h2 className="section__title">기술 스택</h2>
        </div>

        <div className="skills__chart-card">
          <canvas ref={chartRef} className="skills__chart-canvas" />
          <p className="skills__level-note" style={{ marginTop: "1rem" }}>
            이 기술 스택 시각화는 Chart.js를 사용해 작성되었습니다.
          </p>
        </div>

        <p className="skills__level-note">
          숙련도(%)는 나의 생각을 적은 것입니다. &nbsp;<strong>100%</strong> = 리드 가능 &nbsp;·&nbsp;
          <strong>80%</strong> = 단독 개발 가능 &nbsp;·&nbsp;
          <strong>65% 이하</strong> = 구조 이해 후 구현 가능
        </p>

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
