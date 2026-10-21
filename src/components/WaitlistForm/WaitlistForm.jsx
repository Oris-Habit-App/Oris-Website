"use client";

import { useEffect, useRef, useState } from "react";
import Icon from "@/components/Icon/Icon";
import styles from "./WaitlistForm.module.scss";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://oris-habit-backend.onrender.com/api";

// O backend no Render free dorme: a primeira chamada pode levar ~50 s.
// O timeout dá folga antes de desistir.
const TIMEOUT_MS = 75000;
const SLOW_AFTER_MS = 6000;

const DONE_TEXT =
  "Pronto, você está na lista. Avisamos por e-mail quando abrir.";

const MESSAGES = {
  slow: "O servidor está acordando. Leva alguns segundos.",
  invalid: "Confira o e-mail digitado.",
  failed: "Não conseguimos salvar agora. Tente de novo em instantes.",
};

export default function WaitlistForm({ source = "hero" }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");
  const timeoutRef = useRef(null);
  const slowTimerRef = useRef(null);

  // Um único warm-up para o site inteiro: acorda o backend antes de alguém
  // apertar o botão.
  useEffect(() => {
    fetch(API_URL, { mode: "no-cors" }).catch(() => {});
    return () => {
      clearTimeout(timeoutRef.current);
      clearTimeout(slowTimerRef.current);
    };
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    if (status === "sending") return;

    const formData = new FormData(event.currentTarget);

    setStatus("sending");
    setMessage("");

    const controller = new AbortController();
    timeoutRef.current = setTimeout(() => controller.abort(), TIMEOUT_MS);
    slowTimerRef.current = setTimeout(() => {
      setStatus((current) => (current === "sending" ? "slow" : current));
      setMessage(MESSAGES.slow);
    }, SLOW_AFTER_MS);

    try {
      const response = await fetch(`${API_URL}/waitlist`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          source,
          website: formData.get("website") || "",
        }),
        signal: controller.signal,
      });

      if (response.status === 400) {
        setStatus("invalid");
        setMessage(MESSAGES.invalid);
        return;
      }

      if (!response.ok) {
        setStatus("failed");
        setMessage(MESSAGES.failed);
        return;
      }

      setStatus("done");
    } catch {
      setStatus("failed");
      setMessage(MESSAGES.failed);
    } finally {
      clearTimeout(timeoutRef.current);
      clearTimeout(slowTimerRef.current);
    }
  }

  const done = status === "done";

  return (
    <div className={styles.wrap}>
      {!done && (
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.row}>
            <label className="visually-hidden" htmlFor={`waitlist-email-${source}`}>
              Seu e-mail
            </label>
            <input
              id={`waitlist-email-${source}`}
              className={styles.input}
              type="email"
              name="email"
              placeholder="voce@email.com"
              autoComplete="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <button
              className={styles.submit}
              type="submit"
              disabled={status === "sending"}
            >
              {status === "sending" ? (
                "Enviando…"
              ) : (
                <>
                  Entrar na lista
                  <span className={styles.arrow} aria-hidden="true">
                    <Icon name="arrowRight" size={16} />
                  </span>
                </>
              )}
            </button>
          </div>

          {/* Honeypot: fora da tela, humanos deixam vazio. */}
          <div className={styles.honeypot} aria-hidden="true">
            <label htmlFor={`waitlist-website-${source}`}>Website</label>
            <input
              id={`waitlist-website-${source}`}
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              defaultValue=""
            />
          </div>
        </form>
      )}

      {/* A mesma região viva da ida à volta: quem muda é o texto. */}
      <p
        className={done ? styles.done : styles.message}
        role="status"
        aria-live="polite"
      >
        {done ? (
          <>
            <span className={styles.doneIcon} aria-hidden="true">
              <Icon name="check" size={14} />
            </span>
            {DONE_TEXT}
          </>
        ) : (
          message
        )}
      </p>
    </div>
  );
}
