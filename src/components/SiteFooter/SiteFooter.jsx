import OrisLogo from "@/components/OrisLogo/OrisLogo";
import styles from "./SiteFooter.module.scss";

// Rodapé tradicional: marca à esquerda e colunas de links empilhados.
const COLUMNS = [
  {
    title: "Navegação",
    links: [
      { label: "Início", href: "#topo" },
      { label: "Perguntas frequentes", href: "#perguntas" },
      { label: "Fale com a equipe", href: "#contato" },
      { label: "Lista de espera", href: "#lista" },
    ],
  },
  {
    title: "Redes",
    links: [
      { label: "Instagram", href: "https://www.instagram.com/orishabitapp/" },
      { label: "LinkedIn", href: "https://www.linkedin.com/company/oris-habit-app/" },
      { label: "GitHub", href: "https://github.com/Oris-Habit-App" },
    ],
  },
  {
    title: "Contato",
    links: [{ label: "orishabitapp@gmail.com", href: "mailto:orishabitapp@gmail.com" }],
  },
];

export default function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <OrisLogo height={22} />
            <p className={styles.tagline}>
              Planejador adaptativo de hábitos. Você cuida da intenção; o Oris
              cuida do planejamento.
            </p>
          </div>

          <nav className={styles.columns} aria-label="Rodapé">
            {COLUMNS.map((column) => (
              <div key={column.title} className={styles.column}>
                <p className={styles.columnTitle}>{column.title}</p>
                <ul className={styles.list}>
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <a
                        className={styles.link}
                        href={link.href}
                        rel="noreferrer"
                        target={link.href.startsWith("http") ? "_blank" : undefined}
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <p className={styles.copy}>© 2026 Oris. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}
