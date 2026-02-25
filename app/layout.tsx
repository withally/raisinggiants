import type { Metadata } from "next";
import { Cormorant_Garamond, Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Raising Giants — The Mirror",
  description:
    "Understand the parenting you received. A free, research-backed assessment grounded in the work of the world's leading parenting scientists.",
  openGraph: {
    title: "Raising Giants — The Mirror",
    description:
      "Understand the parenting you received. A free, research-backed assessment grounded in the work of the world's leading parenting scientists.",
    type: "website",
    siteName: "Raising Giants",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${cormorantGaramond.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
