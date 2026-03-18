import { useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageSEO } from "@/components/layout/PageSEO";
import { Button } from "@/components/ui/button";
import { BookOpen, ExternalLink, Maximize2, Minimize2, Moon, Sparkles, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const MushafPage = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <div className="min-h-screen bg-background pattern-stars">
      <PageSEO title="Mushaf Reader" description="Read the Holy Quran online with a clean, distraction-free digital Mushaf." path="/mushaf" />
      <Header />
      
      <main className="pt-20 md:pt-24">
        {/* Hero Section */}
        <section className="relative py-12 md:py-16 overflow-hidden">
          {/* Background glow effects */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute top-20 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto"
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="inline-flex items-center gap-2 lab-badge mb-6"
              >
                <Moon className="h-3.5 w-3.5" />
                100% FREE
              </motion.div>
              
              {/* Title with decorative elements */}
              <div className="relative mb-6">
                <motion.h1 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-4xl md:text-5xl lg:text-6xl font-display font-bold"
                >
                  <span className="text-foreground">Read the </span>
                  <span className="text-gradient-gold">Qur'an</span>
                </motion.h1>
                
                {/* Decorative sparkles */}
                <Sparkles className="absolute -top-2 -right-4 md:right-20 h-5 w-5 text-accent/60 twinkle" />
                <Sparkles className="absolute top-8 -left-2 md:left-24 h-4 w-4 text-primary/60 twinkle" style={{ animationDelay: '1s' }} />
              </div>

              {/* Arabic Bismillah */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="arabic text-2xl md:text-3xl text-accent/80 mb-4"
              >
                بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
              </motion.p>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto"
              >
                A beautiful, free Mushaf to read and reflect upon. No account needed.
              </motion.p>

              {/* Action buttons */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="flex flex-wrap justify-center gap-3"
              >
                <Button
                  variant="outline"
                  onClick={toggleFullscreen}
                  className="gap-2 border-border/50 hover:border-primary/50 hover:bg-primary/10 transition-all"
                >
                  {isFullscreen ? (
                    <>
                      <Minimize2 className="h-4 w-4" />
                      Exit Fullscreen
                    </>
                  ) : (
                    <>
                      <Maximize2 className="h-4 w-4" />
                      Fullscreen Mode
                    </>
                  )}
                </Button>
                <a
                  href="https://quran.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" className="gap-2 border-border/50 hover:border-accent/50 hover:bg-accent/10 transition-all">
                    <ExternalLink className="h-4 w-4" />
                    Open in Quran.com
                  </Button>
                </a>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Mushaf Embed */}
        <section className="pb-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative"
            >
              {/* Glow effect behind the card */}
              <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-accent/5 rounded-3xl blur-xl" />
              
              {/* Main container */}
              <div className="relative glass-card rounded-2xl md:rounded-3xl overflow-hidden border-glow">
                {/* Top bar */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-border/50 bg-card/50">
                  <div className="flex items-center gap-3">
                    <BookOpen className="h-5 w-5 text-primary" />
                    <span className="text-sm font-medium text-foreground">Qur'an Reader</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-primary/30" />
                    <div className="w-3 h-3 rounded-full bg-accent/30" />
                    <div className="w-3 h-3 rounded-full bg-purple/30" />
                  </div>
                </div>
                
                {/* Iframe - Using Mushaf mode with RTL page navigation */}
                <iframe
                  src="https://quran.com/1?reading=true"
                  title="Quran Mushaf"
                  className="w-full h-[65vh] md:h-[75vh] border-0 bg-white"
                  allow="fullscreen"
                  style={{ direction: 'rtl' }}
                />
              </div>
            </motion.div>

            {/* Disclaimer */}
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="text-center text-sm text-muted-foreground mt-6 max-w-2xl mx-auto"
            >
              This Mushaf is provided via Quran.com, a trusted and widely-used Qur'an platform. 
              We do not store or modify any content.
            </motion.p>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/20 to-transparent" />
          <div className="absolute inset-0 pattern-islamic opacity-30" />
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl mx-auto text-center"
            >
              <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-4">
                Want to <span className="text-gradient-emerald">Understand</span> What You Read?
              </h2>
              <p className="text-muted-foreground mb-8 text-lg">
                Reading is beautiful, but understanding transforms your connection with the Qur'an. 
                Learn Qur'anic Arabic with our structured courses.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/modules">
                  <Button size="lg" className="font-ui gap-2 group">
                    Explore Our Courses
                    <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/lab">
                  <Button size="lg" variant="outline" className="font-ui gap-2 border-border/50 hover:border-primary/50">
                    <Sparkles className="h-4 w-4" />
                    Try Free Arabic Lab
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default MushafPage;
