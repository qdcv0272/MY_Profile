import { useEffect, useRef } from "react";
import "./SpaceBg.css";

interface Star {
  x: number;
  y: number;
  r: number;
  opacity: number;
  speed: number;
  phase: number;
}

export default function SpaceBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let stars: Star[] = [];

    const initStars = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      stars = [];
      const count = Math.floor((canvas.width * canvas.height) / 3000);
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          r: Math.random() * 1.3 + 0.2,
          opacity: Math.random() * 0.55 + 0.25,
          speed: Math.random() * 0.6 + 0.2,
          phase: Math.random() * Math.PI * 2,
        });
      }
    };

    let t = 0;
    const render = () => {
      t += 0.008;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const s of stars) {
        const alpha = s.opacity + Math.sin(t * s.speed + s.phase) * 0.18;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(210, 225, 255, ${Math.max(0, Math.min(1, alpha))})`;
        ctx.fill();
      }
      animId = requestAnimationFrame(render);
    };

    initStars();
    render();
    window.addEventListener("resize", initStars);
    return () => {
      window.removeEventListener("resize", initStars);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div className="space-bg">
      <canvas ref={canvasRef} className="space-bg__canvas" />
      <div className="space-bg__nebula space-bg__nebula--1" />
      <div className="space-bg__nebula space-bg__nebula--2" />
      <div className="space-bg__nebula space-bg__nebula--3" />
      <div className="space-bg__nebula space-bg__nebula--4" />
      <div className="space-bg__nebula space-bg__nebula--5" />
    </div>
  );
}
