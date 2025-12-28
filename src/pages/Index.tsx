import { useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { MethodSection } from "@/components/home/MethodSection";
import { WhySectionApart } from "@/components/home/WhySectionApart";
import { BuiltForOurBrainsSection } from "@/components/home/BuiltForOurBrainsSection";
import { ModulePreview } from "@/components/home/ModulePreview";
import { CommunitySection } from "@/components/home/CommunitySection";
import { OurCommunitySection } from "@/components/home/OurCommunitySection";
import { PricingSection } from "@/components/home/PricingSection";
import { ReferralSection } from "@/components/home/ReferralSection";
import { AskAboutIslamCTA } from "@/components/home/AskAboutIslamCTA";
import { CheatSheetModal } from "@/components/modals/CheatSheetModal";

const Index = () => {
  const [showCheatSheet, setShowCheatSheet] = useState(false);

  // Show cheat sheet modal after 30 seconds on first visit
  useEffect(() => {
    const hasSeenModal = localStorage.getItem('cheatsheet_modal_seen');
    if (!hasSeenModal) {
      const timer = setTimeout(() => {
        setShowCheatSheet(true);
        localStorage.setItem('cheatsheet_modal_seen', 'true');
      }, 30000);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <OurCommunitySection />
        <BuiltForOurBrainsSection />
        <MethodSection />
        <WhySectionApart />
        <ModulePreview />
        <ReferralSection />
        <CommunitySection />
        <PricingSection />
        <AskAboutIslamCTA />
      </main>
      <Footer />
      
      <CheatSheetModal open={showCheatSheet} onOpenChange={setShowCheatSheet} />
    </div>
  );
};

export default Index;
