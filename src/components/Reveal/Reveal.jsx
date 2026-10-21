"use client";

import { useEffect, useRef } from "react";

// Aparece ao entrar na tela (subindo um pouco). Só esconde o que ainda está
// abaixo da dobra depois da hidratação: sem JS, ou com movimento reduzido,
// o conteúdo fica visível como sempre. Estilos em globals.scss
// ([data-reveal]); `delay` escalona itens de uma lista.
export default function Reveal({ as: Tag = "div", delay = 0, style, children, ...rest }) {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    if (element.getBoundingClientRect().top < window.innerHeight) return undefined;

    element.dataset.reveal = "hidden";
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        element.dataset.reveal = "shown";
        observer.disconnect();
      },
      { rootMargin: "0px 0px -12% 0px" },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag ref={ref} style={{ "--reveal-delay": `${delay}ms`, ...style }} {...rest}>
      {children}
    </Tag>
  );
}
