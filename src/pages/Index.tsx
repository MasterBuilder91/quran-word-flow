import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { MethodSection } from "@/components/home/MethodSection";
import { ModulePreview } from "@/components/home/ModulePreview";
import { PricingSection } from "@/components/home/PricingSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <MethodSection />
        <ModulePreview />
        <PricingSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
