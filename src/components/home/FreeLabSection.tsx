import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FlaskConical, Sparkles, Zap } from "lucide-react";
import { motion } from "framer-motion";

export const FreeLabSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <FlaskConical className="h-4 w-4" />
            Free Forever
          </div>
          
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            Qur'anic Arabic Lab
          </h2>
          
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Paste any Qur'anic verse and get instant word-by-word analysis — roots, particles, verb patterns, and grammar notes. 
            <span className="text-foreground font-medium"> No login. No limits. 100% free.</span>
          </p>

          <div className="flex flex-wrap justify-center gap-6 mb-10">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Zap className="h-5 w-5 text-primary" />
              <span>Instant Analysis</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Sparkles className="h-5 w-5 text-primary" />
              <span>Root Extraction</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <FlaskConical className="h-5 w-5 text-primary" />
              <span>Grammar Notes</span>
            </div>
          </div>

          <Link to="/lab">
            <Button size="lg" className="font-ui text-lg px-8 py-6">
              Try the Free Lab →
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
