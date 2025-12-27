import { motion } from "framer-motion";
import { MessageCircle, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const AskAboutIslamCTA = () => {
  return (
    <section className="py-16 md:py-20 bg-gradient-to-b from-background to-card/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm mb-6">
            <MessageCircle className="w-4 h-4" />
            <span>Live Chat Available</span>
          </div>

          <h2 className="font-english text-3xl md:text-4xl font-semibold text-foreground mb-4">
            Curious About <span className="text-gradient-emerald">Islam</span>?
          </h2>
          
          <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
            Learn about the Five Pillars of Islam and the Six Pillars of Faith. 
            Have questions? We're here to chat — no judgment, just friendly conversation.
          </p>

          <div className="flex items-center justify-center gap-2 text-gold mb-8">
            <Clock className="w-5 h-5" />
            <span className="font-medium">Available every evening 9–11 PM Eastern</span>
          </div>

          <Link to="/ask-about-islam">
            <Button size="lg" className="bg-primary hover:bg-primary/90 glow-emerald">
              Ask Me About Islam
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
