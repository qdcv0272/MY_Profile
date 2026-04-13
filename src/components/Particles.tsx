import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import "./Particles.css";

interface ParticlesProps {
  count?: number;
  className?: string;
}

export default function Particles({ count = 35, className = "" }: ParticlesProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;
    const items: HTMLSpanElement[] = [];
    for (let i = 0; i < count; i++) {
      const span = document.createElement("span");
      span.className = "particle";
      span.style.left = `${Math.random() * 100}%`;
      span.style.top = `${Math.random() * 100}%`;
      const size = Math.random() * 3 + 1;
      span.style.width = `${size}px`;
      span.style.height = `${size}px`;
      container.appendChild(span);
      items.push(span);
      gsap.to(span, {
        y: -120 - Math.random() * 80,
        opacity: 0,
        duration: 4 + Math.random() * 4,
        delay: Math.random() * 5,
        ease: "none",
        repeat: -1,
        repeatDelay: Math.random() * 3,
      });
    }
    return () => items.forEach((p) => p.remove());
  }, [count]);

  return <div ref={ref} className={`particles ${className}`} />;
}
