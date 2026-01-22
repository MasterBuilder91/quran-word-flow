import { Link } from "react-router-dom";
import { OrnamentalDivider } from "@/components/ui/OrnamentalDivider";
import logo from "@/assets/logo.png";

export const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <OrnamentalDivider symbol="۞" />
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="mb-4">
              <img src={logo} alt="Quranic Arabic Lab" className="h-12 w-auto" />
            </div>
            <p className="text-muted-foreground font-ui text-sm max-w-md">
              A respectful platform for learning Qur'anic Arabic through repetition, context, and structure. 
              Building comfort and access to the language of the Qur'an.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-english font-semibold text-foreground mb-4">Learn</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/modules" className="text-muted-foreground hover:text-foreground transition-colors">
                  All Modules
                </Link>
              </li>
              <li>
                <Link to="/#method" className="text-muted-foreground hover:text-foreground transition-colors">
                  Our Method
                </Link>
              </li>
              <li>
                <Link to="/subscribe" className="text-muted-foreground hover:text-foreground transition-colors">
                  Subscribe
                </Link>
              </li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h4 className="font-english font-semibold text-foreground mb-4">Account</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/auth" className="text-muted-foreground hover:text-foreground transition-colors">
                  Sign In
                </Link>
              </li>
              <li>
                <Link to="/subscribe" className="text-muted-foreground hover:text-foreground transition-colors">
                  Get Started
                </Link>
              </li>
              <li>
                <Link to="/#pricing" className="text-muted-foreground hover:text-foreground transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-muted-foreground hover:text-foreground transition-colors">
                  Careers
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground font-arabic mb-2">
            وَلَقَدْ يَسَّرْنَا ٱلْقُرْآنَ لِلذِّكْرِ فَهَلْ مِن مُّدَّكِرٍ
          </p>
          <p className="text-xs text-muted-foreground italic">
            "And We have certainly made the Qur'an easy for remembrance, so is there any who will remember?"
          </p>
          <p className="text-xs text-muted-foreground mt-4">
            © {new Date().getFullYear()} Quranic Arabic Lab. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
