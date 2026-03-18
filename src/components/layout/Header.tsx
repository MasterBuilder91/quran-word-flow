import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/logo.png";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import { toast } from "sonner";

const NAV_GROUPS = [
  {
    label: "Learn",
    links: [
      { to: "/learn-to-read", text: "Learn to Read" },
      { to: "/modules", text: "Vocabulary Modules" },
      { to: "/sarf", text: "Sarf Trainer" },
      { to: "/heritage", text: "Heritage Phrases" },
      { to: "/listening", text: "Immersive Listening" },
    ],
  },
  {
    label: "Practice",
    links: [
      { to: "/practice", text: "Practice Playground" },
      { to: "/flashcards", text: "Flashcards" },
      { to: "/games/desert-runner", text: "Desert Runner Game" },
    ],
  },
  {
    label: "Tools",
    links: [
      { to: "/lab", text: "Arabic Lab" },
      { to: "/mushaf", text: "Mushaf Reader" },
      { to: "/quran-insight", text: "Quran Insight" },
    ],
  },
  {
    label: "Community",
    links: [
      { to: "/forum", text: "Forum" },
      { to: "/ask-about-islam", text: "Ask About Islam" },
    ],
  },
];

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
    setOpenDropdown(null);
  }, [location.pathname]);

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error("Error signing out");
    } else {
      toast.success("Signed out successfully");
      navigate("/");
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center shrink-0">
            <img src={logo} alt="Quranic Arabic Lab" className="h-10 md:h-12 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1" ref={dropdownRef}>
            {NAV_GROUPS.map((group) => (
              <div key={group.label} className="relative">
                <button
                  onClick={() => setOpenDropdown(openDropdown === group.label ? null : group.label)}
                  className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    openDropdown === group.label
                      ? "text-foreground bg-secondary/50"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/30"
                  }`}
                >
                  {group.label}
                  <ChevronDown className={`h-3.5 w-3.5 transition-transform ${openDropdown === group.label ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {openDropdown === group.label && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.96 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-0 mt-1 w-56 bg-card border border-border rounded-xl shadow-lg py-1.5 z-50"
                    >
                      {group.links.map((link) => (
                        <Link
                          key={link.to}
                          to={link.to}
                          onClick={() => setOpenDropdown(null)}
                          className={`block px-4 py-2.5 text-sm transition-colors rounded-lg mx-1 ${
                            location.pathname === link.to
                              ? "text-primary bg-primary/10 font-medium"
                              : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                          }`}
                        >
                          {link.text}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            {user ? (
              <Button variant="ghost" className="font-ui text-sm" onClick={handleSignOut}>
                Sign Out
              </Button>
            ) : (
              <Link to="/auth">
                <Button variant="ghost" className="font-ui text-sm">
                  Sign In
                </Button>
              </Link>
            )}
            <Link to="/modules">
              <Button className="font-ui bg-primary hover:bg-primary/90 text-sm">
                Start Learning
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-foreground"
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
            className="lg:hidden bg-background border-b border-border overflow-hidden"
          >
            <nav className="container mx-auto px-4 py-4 max-h-[80vh] overflow-auto">
              {NAV_GROUPS.map((group) => (
                <div key={group.label} className="mb-4">
                  <div className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-2 px-1">
                    {group.label}
                  </div>
                  <div className="space-y-0.5">
                    {group.links.map((link) => (
                      <Link
                        key={link.to}
                        to={link.to}
                        onClick={() => setIsMenuOpen(false)}
                        className={`block text-base py-2.5 px-3 rounded-lg transition-colors ${
                          location.pathname === link.to
                            ? "text-primary bg-primary/10 font-medium"
                            : "text-foreground hover:bg-secondary/30"
                        }`}
                      >
                        {link.text}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}

              <div className="flex flex-col gap-3 pt-4 border-t border-border mt-2">
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
