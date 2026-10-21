import OrisLogo from "@/components/OrisLogo/OrisLogo";
import ThemeSwitch from "@/components/ThemeSwitch/ThemeSwitch";
import styles from "./SiteHeader.module.scss";

const LINKS = [
  { label: "Perguntas", href: "#perguntas" },
  { label: "Contato", href: "#contato" },
];

// Barra simples no topo: logo numa ponta, links e tema na outra.
export default function SiteHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <a className={styles.brand} href="#topo" aria-label="Oris, início">
          <OrisLogo height={20} markColor="var(--accent)" />
        </a>

        <div className={styles.actions}>
          <nav className={styles.links} aria-label="Principal">
            {LINKS.map((link) => (
              <a key={link.href} className={styles.link} href={link.href}>
                {link.label}
              </a>
            ))}
          </nav>

          <ThemeSwitch />
        </div>
      </div>
    </header>
  );
}
