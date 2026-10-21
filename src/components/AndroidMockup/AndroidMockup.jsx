import styles from "./AndroidMockup.module.scss";

// Android atual (aro de metal, borda fina de vidro, câmera em furo central,
// botões à direita) desenhado em CSS. `screen` aponta para as capturas em
// public/app: <screen>-light.webp e <screen>-dark.webp, trocadas pelo tema
// da página.
export default function AndroidMockup({ screen = "home", alt, time = "9:41" }) {
  return (
    <div className={styles.device}>
      <span className={`${styles.button} ${styles.power}`} aria-hidden="true" />
      <span className={`${styles.button} ${styles.volume}`} aria-hidden="true" />

      <div className={styles.rim}>
        <div className={styles.bezel}>
          <div className={styles.screen}>
            <div className={styles.statusBar} aria-hidden="true">
              <span className={styles.time}>{time}</span>
              <span className={styles.camera} />
              <span className={styles.indicators}>
                <svg viewBox="0 0 24 24" className={styles.indicator}>
                  <path d="M12 20.5 1.2 9.3a15.3 15.3 0 0 1 21.6 0Z" />
                </svg>
                <svg viewBox="0 0 24 24" className={styles.indicator}>
                  <path d="M21.5 2.5v19h-19Z" />
                </svg>
                <svg viewBox="0 0 12 24" className={styles.battery}>
                  <rect x="4" y="1" width="4" height="2.5" rx="1" />
                  <rect x="1" y="3" width="10" height="20" rx="2.4" />
                </svg>
              </span>
            </div>

            {/* As duas versões ficam no HTML e o CSS mostra a do tema atual.
                Lazy: a escondida (display: none) não é baixada. */}
            {["light", "dark"].map((scheme) => (
              <img
                key={scheme}
                className={`${styles.capture} ${styles[scheme]}`}
                src={`/app/${screen}-${scheme}.webp`}
                alt={alt}
                width={1080}
                height={2325}
                loading="lazy"
                decoding="async"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
