import { Link } from "react-router-dom";
import { OrnamentalDivider } from "@/components/ui/OrnamentalDivider";

export const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <OrnamentalDivider symbol="۞" />
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-arabic text-xl">ق</span>
              </div>
              <div>
                <h3 className="font-english font-semibold text-lg text-foreground">Nūr al-Bayān</h3>
                <p className="text-xs text-muted-foreground font-arabic">نور البيان</p>
              </div>
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
                <Link to="/progress" className="text-muted-foreground hover:text-foreground transition-colors">
                  Your Progress
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                  Methodology
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-english font-semibold text-foreground mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/help" className="text-muted-foreground hover:text-foreground transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
                  Terms of Service
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
            © {new Date().getFullYear()} Nūr al-Bayān. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
