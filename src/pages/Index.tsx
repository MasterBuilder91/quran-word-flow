import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { MethodSection } from "@/components/home/MethodSection";
import { WhySectionApart } from "@/components/home/WhySectionApart";
import { ModulePreview } from "@/components/home/ModulePreview";
import { CommunitySection } from "@/components/home/CommunitySection";
import { PricingSection } from "@/components/home/PricingSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <MethodSection />
        <WhySectionApart />
        <ModulePreview />
        <CommunitySection />
        <PricingSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
