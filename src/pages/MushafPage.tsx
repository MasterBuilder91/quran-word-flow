import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { BookOpen, ExternalLink, Maximize2, Minimize2 } from "lucide-react";
import { motion } from "framer-motion";

const MushafPage = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20 md:pt-24">
        {/* Hero Section */}
        <section className="py-8 md:py-12 bg-gradient-to-b from-primary/5 to-background">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center max-w-3xl mx-auto"
            >
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
                <BookOpen className="h-4 w-4" />
                100% FREE
              </div>
              
              <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
                Read the Qur'an
              </h1>
              
              <p className="text-lg text-muted-foreground mb-6">
                A beautiful, free Mushaf to read and reflect upon. No account needed.
              </p>

              <div className="flex flex-wrap justify-center gap-3">
                <Button
                  variant="outline"
                  onClick={toggleFullscreen}
                  className="gap-2"
                >
                  {isFullscreen ? (
                    <>
                      <Minimize2 className="h-4 w-4" />
                      Exit Fullscreen
                    </>
                  ) : (
                    <>
                      <Maximize2 className="h-4 w-4" />
                      Fullscreen
                    </>
                  )}
                </Button>
                <a
                  href="https://quran.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" className="gap-2">
                    <ExternalLink className="h-4 w-4" />
                    Open in Quran.com
                  </Button>
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Mushaf Embed */}
        <section className="pb-12">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-card border border-border rounded-2xl overflow-hidden shadow-lg"
            >
              <iframe
                src="https://quran.com/1"
                title="Quran Mushaf"
                className="w-full h-[70vh] md:h-[80vh] border-0"
                allow="fullscreen"
              />
            </motion.div>

            {/* Disclaimer */}
            <p className="text-center text-sm text-muted-foreground mt-6 max-w-2xl mx-auto">
              This Mushaf is provided via Quran.com, a trusted and widely-used Qur'an platform. 
              We do not store or modify any content.
            </p>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl font-display font-bold text-foreground mb-4">
              Want to Understand What You Read?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Reading is beautiful, but understanding transforms your connection with the Qur'an. 
              Learn Qur'anic Arabic with our structured courses.
            </p>
            <a href="/modules">
              <Button size="lg" className="font-ui">
                Explore Our Courses
              </Button>
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default MushafPage;
