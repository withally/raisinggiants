import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
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
      <body className={`${geistSans.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
