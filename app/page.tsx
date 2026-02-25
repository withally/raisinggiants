import { ArchetypePreview } from "@/components/landing/ArchetypePreview";
import { FAQ } from "@/components/landing/FAQ";
import { Footer } from "@/components/landing/Footer";
import { HeroSection } from "@/components/landing/HeroSection";
import { KOLCredibility } from "@/components/landing/KOLCredibility";
import { KOLNarrative } from "@/components/landing/KOLNarrative";
import { ProductLadder } from "@/components/landing/ProductLadder";
import { SecondaryHero } from "@/components/landing/SecondaryHero";
import { SocialProof } from "@/components/landing/SocialProof";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <SocialProof />
      <ProductLadder />
      <ArchetypePreview />
      <KOLCredibility />
      <KOLNarrative />
      <FAQ />
      <SecondaryHero />
      <Footer />
    </main>
  );
}
