import AndroidMockup from "@/components/AndroidMockup/AndroidMockup";
import ExpandOnScroll from "@/components/ExpandOnScroll/ExpandOnScroll";
import HoloCard from "@/components/HoloCard/HoloCard";
import Reveal from "@/components/Reveal/Reveal";
import Icon from "@/components/Icon/Icon";
import SiteFooter from "@/components/SiteFooter/SiteFooter";
import SiteHeader from "@/components/SiteHeader/SiteHeader";
import WaitlistForm from "@/components/WaitlistForm/WaitlistForm";
import styles from "./page.module.scss";

const PERGUNTAS = [
  {
    q: "O que é o Oris?",
    a: "Um planejador adaptativo de hábitos. O Oris conecta à sua agenda, encaixa seus hábitos no tempo livre e ajusta o plano quando o dia muda. Você cuida da intenção; o Oris cuida do planejamento.",
  },
  {
    q: "Como eu crio um hábito?",
    a: "Conversando. Você escreve “quero correr seg, qua e sex de manhã”, a IA pergunta só o que falta (dias, duração, o mínimo que ainda vale) e mostra o plano para você revisar antes de criar.",
  },
  {
    q: "O Oris mexe nos meus eventos da agenda?",
    a: "Nunca nos que você criou. As sessões dos hábitos entram no Google Agenda, e o Oris só remarca as sessões que ele mesmo criou.",
  },
  {
    q: "E quando o dia sai do plano?",
    a: "Em cada sessão você escolhe Começar, +30 min ou Adiar. Em Adiar, o Oris procura um espaço livre na agenda (hoje, senão amanhã) e explica o novo horário. Um lembrete chega 15 minutos antes, com as mesmas ações.",
  },
  {
    q: "Que tipo de hábito dá para acompanhar?",
    a: "De duração, com meta e mínimo (60 min, com mínimo de 25: a sessão conta ao chegar no mínimo), ou de conclusão, feito ou não feito, como tomar o remédio. A tela de Progresso mostra o ritmo do ano e o tempo dedicado na semana.",
  },
  {
    q: "Quando vou poder usar?",
    a: "Estamos abrindo aos poucos. Deixe seu e-mail na lista e avisamos quando chegar a sua vez.",
  },
];

// Canais do app e da equipe, não de pessoas.
const CONTATOS = [
  {
    label: "E-mail",
    value: "orishabitapp@gmail.com",
    icon: "mail",
    href: "mailto:orishabitapp@gmail.com",
  },
  {
    label: "Instagram",
    value: "@orishabitapp",
    icon: "instagram",
    href: "https://www.instagram.com/orishabitapp/",
  },
  {
    label: "LinkedIn",
    value: "Oris Habit App",
    icon: "linkedin",
    href: "https://www.linkedin.com/company/oris-habit-app/",
  },
  {
    label: "GitHub",
    value: "Oris-Habit-App",
    icon: "github",
    href: "https://github.com/Oris-Habit-App",
  },
];

export default function Home() {
  return (
    <>
      <SiteHeader />

      <main id="topo">
        <section className={styles.hero}>
          {/* Só o movimento seguindo o cursor (sem foil, brilho ou faísca):
              inclina e desliza até 10 px na direção dele, já a partir de
              140 px em volta do ícone. Perspectiva curta para o 3D aparecer
              num ícone pequeno. */}
          <HoloCard
            className={styles.appIcon}
            image="/oris-icon.webp"
            alt="Oris"
            intensity={0}
            edgeSparkle={0}
            frame={0}
            glare={0}
            width={72}
            radius={16}
            tiltMax={26}
            hoverScale={1.1}
            reach={140}
            follow={10}
            perspective={320}
            idle={false}
            shadow={false}
          />
          <h1 className={styles.title}>
            Hábitos que sobrevivem à <span className={styles.accent}>vida real</span>.
          </h1>
          <p className={styles.subtitle}>
            O Oris conecta à sua agenda, encaixa seus hábitos no tempo livre e
            ajusta o plano quando o dia muda.
          </p>
          <div className={styles.form} id="lista">
            <WaitlistForm source="hero" />
          </div>
          <p className={styles.microcopy}>Um e-mail quando abrir. Nada além disso.</p>
        </section>

        <ExpandOnScroll className={styles.showcase} aria-label="O app">
          <div className={styles.card}>
            <div className={styles.scene} aria-hidden="true">
              <div className={styles.sceneImage} />
              <div className={`${styles.sceneImage} ${styles.sceneNight}`} />
              <div className={styles.sceneTint} />
              <div className={styles.sceneGrain} />
            </div>

            <div className={styles.phone}>
              <AndroidMockup
                screen="home"
                alt="Tela inicial do Oris com os hábitos de hoje: Ir à academia, Estudar React e Tomar vitaminas."
              />
            </div>

            <div className={`${styles.float} ${styles.floatLeft}`} aria-hidden="true">
              <span className={`${styles.floatIcon} ${styles.floatIconAccent}`}>
                <Icon name="calendar" size={18} />
              </span>
              <span className={styles.floatText}>
                <span className={styles.floatTitle}>Estudar React</span>
                <span className={styles.floatMetaAccent}>15:00 → 17:30 · reunião nova</span>
              </span>
            </div>

            <div className={`${styles.float} ${styles.floatRight}`} aria-hidden="true">
              <span className={styles.floatIcon}>
                <Icon name="bell" size={18} />
              </span>
              <span className={styles.floatText}>
                <span className={styles.floatTitle}>Ir à academia às 13:00</span>
                <span className={styles.floatMeta}>Começar · +30 min · Adiar</span>
              </span>
            </div>
          </div>
        </ExpandOnScroll>

        <section className={styles.faq} id="perguntas">
          <Reveal as="h2" className={styles.sectionTitle}>
            Perguntas frequentes
          </Reveal>
          <Reveal as="p" className={styles.sectionLead} delay={80}>
            O que o Oris faz, como ele trata a sua agenda e quando abre.
          </Reveal>
          <div className={styles.faqList}>
            {PERGUNTAS.map((item, index) => (
              <Reveal
                as="details"
                className={styles.faqItem}
                key={item.q}
                open={index === 0}
                delay={160 + index * 70}
              >
                <summary className={styles.faqQuestion}>
                  {item.q}
                  <span className={styles.faqToggle} aria-hidden="true">
                    <Icon name="plus" size={16} />
                  </span>
                </summary>
                <p className={styles.faqAnswer}>{item.a}</p>
              </Reveal>
            ))}
          </div>
        </section>

        <section className={styles.contact} id="contato">
          <Reveal as="h2" className={styles.sectionTitle}>
            Fale com a equipe
          </Reveal>
          <Reveal as="p" className={styles.sectionLead} delay={80}>
            Dúvidas, parcerias ou vontade de testar antes de todo mundo: estamos por aqui.
          </Reveal>
          <ul className={styles.contactList}>
            {CONTATOS.map((contato, index) => (
              <Reveal as="li" key={contato.label} delay={160 + index * 70}>
                <a
                  className={styles.contactRow}
                  href={contato.href}
                  rel="noreferrer"
                  target={contato.href.startsWith("http") ? "_blank" : undefined}
                >
                  <span className={styles.contactIcon}>
                    <Icon name={contato.icon} size={20} />
                  </span>
                  <span className={styles.contactText}>
                    <span className={styles.contactLabel}>{contato.label}</span>
                    <span className={styles.contactValue}>{contato.value}</span>
                  </span>
                  <span className={styles.contactArrow} aria-hidden="true">
                    <Icon name="arrowUpRight" size={18} />
                  </span>
                </a>
              </Reveal>
            ))}
          </ul>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
