import { EmotionalHookSection } from "@/components/landing/EmotionalHookSection";
import { FAQSection } from "@/components/landing/FAQSection";
import { FinalCTASection } from "@/components/landing/FinalCTASection";
import { HeroSection } from "@/components/landing/HeroSection";
import { HowItWorksProcess } from "@/components/landing/HowItWorksProcess";
import { HowItWorksScience } from "@/components/landing/HowItWorksScience";
import { KOLSection } from "@/components/landing/KOLSection";
import { LandingNav } from "@/components/landing/LandingNav";
import { ProductLadder } from "@/components/landing/ProductLadder";
import { SophiaSection } from "@/components/landing/SophiaSection";

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
      <HeroSection />
      <EmotionalHookSection />
      <HowItWorksProcess />
      <HowItWorksScience />
      <KOLSection />
      <ProductLadder />
      <SophiaSection />
      <FAQSection />
      <FinalCTASection />
    </div>
  );
}
