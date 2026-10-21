"use client";

import { useEffect, useRef } from "react";

// Quanto do caminho até o alvo o valor anda por quadro (60 fps): suaviza
// rolagens rápidas em vez de saltar junto com o scroll.
const FOLLOW = 0.1;

// Escreve --expand (0 → 1 → 0) na seção conforme o centro dela passa pelo
// centro da tela: 1 quando estão alinhados, 0 longe dele. O CSS decide o que
// cresce. Com movimento reduzido, fica em 0.
export default function ExpandOnScroll({ children, className, ...rest }) {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    let frame = 0;
    let last = 0;
    let current = 0;

    function target() {
      const rect = element.getBoundingClientRect();
      const viewport = window.innerHeight;
      const distance = Math.abs(rect.top + rect.height / 2 - viewport / 2);
      const linear = 1 - Math.min(distance / (viewport * 0.8), 1);
      // smoothstep: começa e termina devagar.
      return linear * linear * (3 - 2 * linear);
    }

    function step(now) {
      const goal = target();
      const elapsed = last ? Math.min((now - last) / 16.67, 4) : 1;
      last = now;
      current += (goal - current) * (1 - Math.pow(1 - FOLLOW, elapsed));
      if (Math.abs(goal - current) < 0.001) current = goal;
      element.style.setProperty("--expand", current.toFixed(4));
      if (current === goal) {
        frame = 0;
        last = 0;
        return;
      }
      frame = requestAnimationFrame(step);
    }

    function schedule() {
      if (!frame) frame = requestAnimationFrame(step);
    }

    current = target();
    element.style.setProperty("--expand", current.toFixed(4));
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return (
    <section ref={ref} className={className} {...rest}>
      {children}
    </section>
  );
}
