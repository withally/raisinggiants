import type { Metadata } from "next";
import { Geist } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const fragmentGlare = localFont({
  src: [
    { path: "../public/fonts/PPFragment-GlareLight.otf", weight: "300", style: "normal" },
    { path: "../public/fonts/PPFragment-GlareLightItalic.otf", weight: "300", style: "italic" },
    { path: "../public/fonts/PPFragment-GlareRegular.otf", weight: "400", style: "normal" },
    { path: "../public/fonts/PPFragment-GlareRegularItalic.otf", weight: "400", style: "italic" },
    { path: "../public/fonts/PPFragment-GlareExtraBold.otf", weight: "800", style: "normal" },
    { path: "../public/fonts/PPFragment-GlareExtraBoldItalic.otf", weight: "800", style: "italic" },
  ],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://raisinggiants.com"),
  title: "Kin — The Mirror",
  description:
    "Finally, the words for it. A free, research-backed assessment that reveals the parenting patterns you inherited — and how they still shape you.",
  openGraph: {
    title: "Kin — The Mirror",
    description:
      "Finally, the words for it. A free, research-backed assessment that reveals the parenting patterns you inherited — and how they still shape you.",
    type: "website",
    siteName: "Kin",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "The Mirror — Discover Your Parenting Archetype",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kin — The Mirror",
    description:
      "Finally, the words for it. A free, research-backed assessment that reveals the parenting patterns you inherited — and how they still shape you.",
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${fragmentGlare.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
