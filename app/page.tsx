import { Footer } from "@/components/landing/Footer";
import { HeroSection } from "@/components/landing/HeroSection";
import { KOLCredibility } from "@/components/landing/KOLCredibility";
import { ProductLadder } from "@/components/landing/ProductLadder";
import { SecondaryHero } from "@/components/landing/SecondaryHero";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <ProductLadder />
      <KOLCredibility />
      <SecondaryHero />
      <Footer />
    </main>
  );
}
