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
