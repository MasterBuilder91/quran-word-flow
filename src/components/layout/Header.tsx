import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/logo.png";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = (sectionId: string) => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        element?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      element?.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src={logo} alt="Quranic Arabic Lab" className="h-10 md:h-12 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/learn-to-read" className="text-muted-foreground hover:text-foreground transition-colors font-ui">
              Learn to Read
            </Link>
            <Link to="/modules" className="text-muted-foreground hover:text-foreground transition-colors font-ui">
              Modules
            </Link>
            <Link to="/practice" className="text-muted-foreground hover:text-foreground transition-colors font-ui">
              Practice
            </Link>
            <Link to="/ask-about-islam" className="text-muted-foreground hover:text-foreground transition-colors font-ui">
              Ask About Islam
            </Link>
            <Link to="/forum" className="text-muted-foreground hover:text-foreground transition-colors font-ui">
              Forum
            </Link>
            <button
              onClick={() => scrollToSection("pricing")}
              className="text-muted-foreground hover:text-foreground transition-colors font-ui"
            >
              Pricing
            </button>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Link to="/auth">
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
                to="/learn-to-read"
                onClick={() => setIsMenuOpen(false)}
                className="text-lg text-foreground py-2 border-b border-border/50"
              >
                Learn to Read
              </Link>
              <Link
                to="/modules"
                onClick={() => setIsMenuOpen(false)}
                className="text-lg text-foreground py-2 border-b border-border/50"
              >
                Modules
              </Link>
              <Link
                to="/practice"
                onClick={() => setIsMenuOpen(false)}
                className="text-lg text-foreground py-2 border-b border-border/50"
              >
                Practice
              </Link>
              <Link
                to="/ask-about-islam"
                onClick={() => setIsMenuOpen(false)}
                className="text-lg text-foreground py-2 border-b border-border/50"
              >
                Ask About Islam
              </Link>
              <Link
                to="/forum"
                onClick={() => setIsMenuOpen(false)}
                className="text-lg text-foreground py-2 border-b border-border/50"
              >
                Forum
              </Link>
              <button
                onClick={() => {
                  scrollToSection("pricing");
                  setIsMenuOpen(false);
                }}
                className="text-lg text-foreground py-2 border-b border-border/50 text-left"
              >
                Pricing
              </button>
              <div className="flex flex-col gap-3 pt-4">
                <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
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
