import ThemeSwitch from "@/components/ThemeSwitch/ThemeSwitch";
import styles from "./SiteHeader.module.scss";

const LINKS = [
  { label: "Perguntas", href: "#perguntas" },
  { label: "Contato", href: "#contato" },
];

// Barra simples no topo: links numa ponta, tema na outra. Sem logo: o
// ícone do app já abre a página logo abaixo.
export default function SiteHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <nav className={styles.links} aria-label="Principal">
          {LINKS.map((link) => (
            <a key={link.href} className={styles.link} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <ThemeSwitch />
      </div>
    </header>
  );
}
