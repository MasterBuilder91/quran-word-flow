import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Link } from "react-router-dom";
import { ArrowLeft, Gamepad2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function DesertRunnerPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Back link */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-6"
          >
            <Link to="/practice">
              <Button variant="ghost" className="gap-2 text-muted-foreground hover:text-foreground">
                <ArrowLeft className="w-4 h-4" />
                Back to Practice
              </Button>
            </Link>
          </motion.div>

          {/* Title section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="flex items-center justify-center gap-3 mb-3">
              <Gamepad2 className="w-8 h-8 text-gold" />
              <h1 className="text-4xl md:text-5xl font-bold">
                <span className="text-gradient-gold">Desert Blaster Fury</span>
              </h1>
            </div>
            <p className="text-xl text-muted-foreground">
              Take a break with this action-packed desert adventure!
            </p>
          </motion.div>

          {/* Game container - Full screen */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="w-full"
          >
            <div className="relative w-full h-[calc(100vh-200px)] min-h-[500px] rounded-2xl overflow-hidden border border-border bg-black shadow-2xl">
              <iframe
                src="https://stickygames.com/game/desert-blaster-fury"
                className="absolute inset-0 w-full h-full"
                allow="fullscreen; autoplay; clipboard-write"
                allowFullScreen
                title="Desert Blaster Fury"
              />
            </div>
          </motion.div>

          {/* Instructions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="max-w-2xl mx-auto mt-8 text-center"
          >
            <p className="text-sm text-muted-foreground">
              Game provided by <a href="https://stickygames.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">StickyGames</a>
            </p>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
