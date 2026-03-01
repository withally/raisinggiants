import { Instrument_Serif, Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google";

export const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
});

export const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const ff = plusJakarta.style.fontFamily;
export const ffSerif = instrumentSerif.style.fontFamily;
export const ffDisplay = spaceGrotesk.style.fontFamily;

export const p = {
  blue: { light: "#B3D5DE", dark: "#002833" },
  pink: { light: "#EEC0DA", dark: "#4A1942" },
  mint: { light: "#B2DECD", dark: "#1A4A3A" },
  butter: { light: "#FEF4AC", dark: "#3D3B1A" },
};

/** Barely-there top-to-bottom gradients — whisper of light at top, nearly flat */
export const grad = {
  butter: {
    light: `linear-gradient(180deg, #FEF6B2 0%, ${p.butter.light} 100%)`,
  },
  pink: {
    light: `linear-gradient(180deg, #F0C5DE 0%, ${p.pink.light} 100%)`,
  },
  mint: {
    light: `linear-gradient(180deg, #BBE2D2 0%, ${p.mint.light} 100%)`,
  },
  blue: {
    light: `linear-gradient(180deg, #BBDAE3 0%, ${p.blue.light} 100%)`,
    dark: `linear-gradient(180deg, #042F3B 0%, ${p.blue.dark} 100%)`,
  },
  dark: "linear-gradient(180deg, #212121 0%, #1A1A1A 100%)",
};

/** Modern layered shadows */
export const shadow = {
  card: "0 1px 2px rgba(0,0,0,0.03), 0 4px 16px rgba(0,0,0,0.03), 0 16px 48px rgba(0,0,0,0.025)",
  cardDark:
    "0 2px 4px rgba(0,0,0,0.12), 0 8px 24px rgba(0,0,0,0.08), 0 24px 48px rgba(0,0,0,0.06)",
  button:
    "0 1px 3px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.04)",
};
