"use client";

import { useEffect, useState } from "react";
import Icon from "@/components/Icon/Icon";
import { THEME_KEY } from "./themeBoot";
import styles from "./ThemeSwitch.module.scss";

const darkQuery = () => window.matchMedia("(prefers-color-scheme: dark)");

function currentTheme() {
  const chosen = document.documentElement.dataset.theme;
  if (chosen === "light" || chosen === "dark") return chosen;
  return darkQuery().matches ? "dark" : "light";
}

// Sem escolha, segue o sistema. A posição do indicador vem do CSS (mesmo
// seletor do tema), então não depende da hidratação; o estado aqui só
// alimenta o aria-checked.
export default function ThemeSwitch() {
  const [theme, setTheme] = useState(null);

  useEffect(() => {
    setTheme(currentTheme());
    const query = darkQuery();
    const onChange = () => setTheme(currentTheme());
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  function toggle() {
    const next = currentTheme() === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {}
    setTheme(next);
  }

  return (
    <button
      type="button"
      role="switch"
      aria-checked={theme === "dark"}
      aria-label="Modo escuro"
      className={styles.switch}
      onClick={toggle}
    >
      <span className={styles.thumb} aria-hidden="true" />
      <span className={`${styles.option} ${styles.sun}`} aria-hidden="true">
        <Icon name="sun" size={16} />
      </span>
      <span className={`${styles.option} ${styles.moon}`} aria-hidden="true">
        <Icon name="moon" size={16} />
      </span>
    </button>
  );
}
