import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { AnalyticsProvider } from "@/components/AnalyticsProvider";
import { CookieConsentBanner } from "@/components/CookieConsentBanner";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://meetkin.com"),
  title: {
    default: "Discover the Parenting Patterns You Inherited | Kin",
    template: "%s | Kin",
  },
  description:
    "A free, research-informed quiz that uncovers the parenting patterns you inherited — and how they shape the parent you're becoming.",
  openGraph: {
    type: "website",
    siteName: "Kin",
    locale: "en_US",
    images: [
      {
        url: "/images/og-default.png",
        width: 1200,
        height: 630,
        alt: "Kin — Discover the Parenting Patterns You Inherited",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/images/og-default.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${plusJakarta.variable} antialiased`}>
        {children}
        <AnalyticsProvider />
        <CookieConsentBanner />
      </body>
    </html>
  );
}
