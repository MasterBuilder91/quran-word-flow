import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/logo.png";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import { toast } from "sonner";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const moreMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (moreMenuRef.current && !moreMenuRef.current.contains(event.target as Node)) {
        setIsMoreOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error("Error signing out");
    } else {
      toast.success("Signed out successfully");
      navigate("/");
    }
  };

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
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/learn-to-read" className="text-muted-foreground hover:text-foreground transition-colors font-ui text-sm">
              Learn to Read
            </Link>
            <Link to="/modules" className="text-muted-foreground hover:text-foreground transition-colors font-ui text-sm">
              Modules
            </Link>
            <Link to="/practice" className="text-muted-foreground hover:text-foreground transition-colors font-ui text-sm">
              Practice
            </Link>
            <Link to="/flashcards" className="text-muted-foreground hover:text-foreground transition-colors font-ui text-sm">
              Flashcards
            </Link>
            <Link to="/forum" className="text-muted-foreground hover:text-foreground transition-colors font-ui text-sm">
              Forum
            </Link>
            <Link to="/heritage" className="text-muted-foreground hover:text-foreground transition-colors font-ui text-sm">
              Heritage
            </Link>
            <Link to="/lab" className="text-muted-foreground hover:text-foreground transition-colors font-ui text-sm">
              Free Lab
            </Link>
            
            {/* More Dropdown */}
            <div className="relative" ref={moreMenuRef}>
              <button
                onClick={() => setIsMoreOpen(!isMoreOpen)}
                className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors font-ui text-sm"
              >
                More
                <ChevronDown className={`h-4 w-4 transition-transform ${isMoreOpen ? 'rotate-180' : ''}`} />
              </button>
              
              <AnimatePresence>
                {isMoreOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 mt-2 w-64 bg-background border border-border rounded-lg shadow-lg py-2 z-50"
                  >
                    <Link
                      to="/quran-insight"
                      onClick={() => setIsMoreOpen(false)}
                      className="block px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                    >
                      How Much Quran Do I Understand?
                    </Link>
                    <Link
                      to="/ask-about-islam"
                      onClick={() => setIsMoreOpen(false)}
                      className="block px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                    >
                      Ask About Islam
                    </Link>
                    <Link
                      to="/mushaf"
                      onClick={() => setIsMoreOpen(false)}
                      className="block px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                    >
                      Free Mushaf
                    </Link>
                    <Link
                      to="/careers"
                      onClick={() => setIsMoreOpen(false)}
                      className="block px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                    >
                      Careers
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <Button variant="ghost" className="font-ui" onClick={handleSignOut}>
                Sign Out
              </Button>
            ) : (
              <Link to="/auth">
                <Button variant="ghost" className="font-ui">
                  Sign In
                </Button>
              </Link>
            )}
            <Link to="/modules">
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
                to="/flashcards"
                onClick={() => setIsMenuOpen(false)}
                className="text-lg text-foreground py-2 border-b border-border/50"
              >
                Flashcards
              </Link>
              <Link
                to="/heritage"
                onClick={() => setIsMenuOpen(false)}
                className="text-lg text-foreground py-2 border-b border-border/50"
              >
                Qur'anic Arabic Heritage
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
              <Link
                to="/careers"
                onClick={() => setIsMenuOpen(false)}
                className="text-lg text-foreground py-2 border-b border-border/50"
              >
                Careers
              </Link>
              <Link
                to="/quran-insight"
                onClick={() => setIsMenuOpen(false)}
                className="text-lg text-foreground py-2 border-b border-border/50"
              >
                How Much Quran Do I Understand?
              </Link>
              <Link
                to="/lab"
                onClick={() => setIsMenuOpen(false)}
                className="text-lg text-foreground py-2 border-b border-border/50"
              >
                Free Arabic Lab
              </Link>
              <Link
                to="/mushaf"
                onClick={() => setIsMenuOpen(false)}
                className="text-lg text-foreground py-2 border-b border-border/50"
              >
                Free Mushaf
              </Link>
              <div className="flex flex-col gap-3 pt-4">
                {user ? (
                  <Button variant="outline" className="w-full" onClick={() => {
                    handleSignOut();
                    setIsMenuOpen(false);
                  }}>
                    Sign Out
                  </Button>
                ) : (
                  <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="outline" className="w-full">
                      Sign In
                    </Button>
                  </Link>
                )}
                <Link to="/modules" onClick={() => setIsMenuOpen(false)}>
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
