import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { DesertRunnerGame } from "@/components/games/DesertRunner";
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
                <span className="text-gradient-gold">رحلة الصحراء</span>
              </h1>
            </div>
            <p className="text-xl text-muted-foreground">
              Desert Word Runner — Learn Arabic through adventure!
            </p>
          </motion.div>

          {/* Game container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="max-w-5xl mx-auto"
          >
            <DesertRunnerGame />
          </motion.div>

          {/* Instructions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="max-w-2xl mx-auto mt-8 text-center"
          >
            <h3 className="text-lg font-semibold text-foreground mb-3">How to Play</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
              <div className="bg-muted/30 rounded-xl p-4">
                <span className="text-2xl block mb-2">🎯</span>
                <p>Click Arabic words that match the English translation shown at the top</p>
              </div>
              <div className="bg-muted/30 rounded-xl p-4">
                <span className="text-2xl block mb-2">⬆️⬇️</span>
                <p>Use arrow keys or W/S to change lanes and avoid obstacles</p>
              </div>
              <div className="bg-muted/30 rounded-xl p-4">
                <span className="text-2xl block mb-2">🔥</span>
                <p>Build streaks for bonus points! Wrong words cost you a life</p>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
