import type { Metadata } from "next";
import { ArchetypePreviewSection } from "@/components/landing/ArchetypePreviewSection";
import { ReportPreviewSection } from "@/components/landing/ReportPreviewSection";
import { EmotionalHookSection } from "@/components/landing/EmotionalHookSection";
import { FAQSection } from "@/components/landing/FAQSection";
import { FinalCTASection } from "@/components/landing/FinalCTASection";
import { HeroSection } from "@/components/landing/HeroSection";
import { HowItWorksProcess } from "@/components/landing/HowItWorksProcess";
import { HowItWorksScience } from "@/components/landing/HowItWorksScience";
import { InlineCTA } from "@/components/landing/InlineCTA";
import { KOLSection } from "@/components/landing/KOLSection";
import { LandingNav } from "@/components/landing/LandingNav";
import { ProductLadder } from "@/components/landing/ProductLadder";
import { ScrollReveal } from "@/components/landing/ScrollReveal";
import { SophiaSection } from "@/components/landing/SophiaSection";
import { StickyQuizCTA } from "@/components/landing/StickyQuizCTA";
import { TestimonialsSection } from "@/components/landing/TestimonialsSection";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Discover the Parenting Patterns You Inherited | Kin",
  description:
    "A free, research-informed quiz that uncovers the parenting patterns you inherited — and how they shape the parent you're becoming. 5 minutes. Completely private.",
  openGraph: {
    title: "Discover the Parenting Patterns You Inherited | Kin",
    description:
      "A free, research-informed quiz that uncovers the parenting patterns you inherited. 5 minutes. Completely private.",
    url: "https://meetkin.com",
    type: "website",
    siteName: "Kin",
    locale: "en_US",
    images: [{ url: "/images/og-default.png", width: 1200, height: 630 }],
  },
};

export default function Home() {
  return (
    <div
      className="min-h-screen flex flex-col relative overflow-hidden"
      style={{ backgroundColor: "#FAFAF7", color: "#1A1A1A" }}
    >
      {/* Subtle gradient wash */}
      <div
        className="absolute top-0 left-0 right-0 h-[500px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 60% 0%, rgba(254,244,172,0.18) 0%, transparent 70%), radial-gradient(ellipse 50% 40% at 30% 5%, rgba(238,192,218,0.12) 0%, transparent 60%)",
        }}
      />

      <LandingNav />
      <StickyQuizCTA />

      {/* Hero handles its own internal stagger */}
      <HeroSection />
      <ScrollReveal>
        <EmotionalHookSection />
      </ScrollReveal>

      <ScrollReveal>
        <ArchetypePreviewSection />
      </ScrollReveal>

      {/* Product demo — animated report preview */}
      <ScrollReveal>
        <ReportPreviewSection />
      </ScrollReveal>

      {/* How it Works — process + science grouped */}
      <ScrollReveal>
        <HowItWorksProcess />
      </ScrollReveal>

      <ScrollReveal>
        <HowItWorksScience />
      </ScrollReveal>

      <InlineCTA text="15 minutes. Completely free." label="Start The Mirror" />

      {/* Social proof — testimonials then research */}
      <ScrollReveal>
        <TestimonialsSection />
      </ScrollReveal>

      <ScrollReveal>
        <KOLSection />
      </ScrollReveal>

      <ScrollReveal>
        <ProductLadder />
      </ScrollReveal>

      <ScrollReveal>
        <SophiaSection />
      </ScrollReveal>

      <ScrollReveal>
        <FAQSection />
      </ScrollReveal>

      <ScrollReveal>
        <FinalCTASection />
      </ScrollReveal>

      <Footer />
    </div>
  );
}
