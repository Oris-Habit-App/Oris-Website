import { DM_Sans } from "next/font/google";
import { THEME_BOOT_SCRIPT } from "@/components/ThemeSwitch/themeBoot";
import "@/app/styles/globals.scss";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-dm-sans",
  display: "swap",
});

const description =
  "O Oris lê sua agenda, encaixa seus hábitos no tempo livre e ajusta o plano quando o dia muda. Entre na lista de espera.";

export const metadata = {
  title: "Oris — hábitos que cabem na sua semana real",
  description,
  openGraph: {
    title: "Oris — hábitos que cabem na sua semana real",
    description,
    locale: "pt_BR",
    type: "website",
  },
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f7f5" },
    { media: "(prefers-color-scheme: dark)", color: "#050505" },
  ],
};

export default function RootLayout({ children }) {
  return (
    // data-theme é posto pelo script antes da hidratação.
    <html lang="pt-BR" className={dmSans.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_BOOT_SCRIPT }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
