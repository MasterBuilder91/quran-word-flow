import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-arabic text-xl">ق</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="font-english font-semibold text-lg text-foreground">Nūr al-Bayān</h1>
              <p className="text-xs text-muted-foreground">نور البيان</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/modules" className="text-muted-foreground hover:text-foreground transition-colors font-ui">
              Modules
            </Link>
            <Link to="/progress" className="text-muted-foreground hover:text-foreground transition-colors font-ui">
              Progress
            </Link>
            <Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors font-ui">
              About
            </Link>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Link to="/login">
              <Button variant="ghost" className="font-ui">
                Sign In
              </Button>
            </Link>
            <Link to="/subscribe">
              <Button className="font-ui bg-primary hover:bg-primary/90">
                Start Learning
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-foreground"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-b border-border"
          >
            <nav className="container mx-auto px-4 py-6 flex flex-col gap-4">
              <Link
                to="/modules"
                onClick={() => setIsMenuOpen(false)}
                className="text-lg text-foreground py-2 border-b border-border/50"
              >
                Modules
              </Link>
              <Link
                to="/progress"
                onClick={() => setIsMenuOpen(false)}
                className="text-lg text-foreground py-2 border-b border-border/50"
              >
                Progress
              </Link>
              <Link
                to="/about"
                onClick={() => setIsMenuOpen(false)}
                className="text-lg text-foreground py-2 border-b border-border/50"
              >
                About
              </Link>
              <div className="flex flex-col gap-3 pt-4">
                <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="outline" className="w-full">
                    Sign In
                  </Button>
                </Link>
                <Link to="/subscribe" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full">
                    Start Learning
                  </Button>
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
