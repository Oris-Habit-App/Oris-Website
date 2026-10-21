// Fora do módulo "use client" para o layout (server) poder ler a string.
export const THEME_KEY = "oris-theme";

// Roda no <head> antes da pintura: aplica a escolha salva sem piscar o tema
// do sistema primeiro.
export const THEME_BOOT_SCRIPT = `try{var t=localStorage.getItem("${THEME_KEY}");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}`;
