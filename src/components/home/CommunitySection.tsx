import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Users, MessageSquare, BookOpen, Scroll, Feather, Sparkles } from "lucide-react";

// Import community photos
import diverseMan1 from "@/assets/community/diverse-man-1.jpg";
import diverseWoman1 from "@/assets/community/diverse-woman-1.jpg";
import professionalWoman from "@/assets/community/professional-woman.jpg";
import diverseMan3 from "@/assets/community/diverse-man-3.jpg";

const categories = [
  { icon: BookOpen, name: "Quranic Studies", color: "text-primary", bgColor: "bg-primary/10" },
  { icon: Scroll, name: "Hadith & Sunnah", color: "text-gold", bgColor: "bg-gold/10" },
  { icon: Feather, name: "Arabic Poetry", color: "text-purple", bgColor: "bg-purple/10" },
];

const communityMembers = [
  { image: diverseMan1, name: "Marcus" },
  { image: diverseWoman1, name: "Sarah" },
  { image: professionalWoman, name: "Aisha" },
  { image: diverseMan3, name: "James" },
];
export const CommunitySection = () => {
  return (
    <section className="py-24 bg-card/30 relative overflow-hidden">
      {/* Star pattern background */}
      <div className="absolute inset-0 pattern-stars opacity-30" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple/10 border border-purple/20 mb-6">
              <Users className="w-4 h-4 text-purple" />
              <span className="text-sm text-purple-light font-medium">Community Forum</span>
            </div>
            
            <h2 className="font-english text-3xl md:text-4xl font-semibold text-foreground mb-4">
              Join the <span className="text-gradient-cosmic">Knowledge Circle</span>
            </h2>
            
            <p className="text-muted-foreground mb-6 font-ui">
              Connect with fellow seekers of knowledge. Discuss Quranic vocabulary, share insights 
              from classical poetry, explore hadith, and grow together in understanding the Arabic language.
            </p>

            <div className="flex flex-wrap gap-3 mb-8">
              {categories.map((cat) => (
                <div
                  key={cat.name}
                  className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg ${cat.bgColor} border border-border`}
                >
                  <cat.icon className={`w-4 h-4 ${cat.color}`} />
                  <span className="text-sm text-foreground">{cat.name}</span>
                </div>
              ))}
              <div className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/50 border border-border">
                <span className="text-sm text-muted-foreground">+3 more</span>
              </div>
            </div>

            <Link to="/forum">
              <Button size="lg" className="gap-2">
                <MessageSquare className="w-5 h-5" />
                Explore the Forum
              </Button>
            </Link>
          </motion.div>

          {/* Right Visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative p-8 rounded-2xl bg-card border border-border">
              {/* Decorative glow */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/20 rounded-full blur-3xl" />
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-purple/20 rounded-full blur-3xl" />

              {/* Forum illustration with faces */}
              <div className="space-y-4 relative z-10">
                <div className="flex items-center gap-2 mb-6">
                  <Sparkles className="w-5 h-5 text-gold" />
                  <span className="text-sm text-gold font-medium">Community Awaits</span>
                </div>

                <div className="text-center py-6">
                  {/* Stacked avatars */}
                  <div className="flex justify-center -space-x-3 mb-6">
                    {communityMembers.map((member, index) => (
                      <motion.div
                        key={member.name}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="relative"
                      >
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-14 h-14 rounded-full object-cover border-3 border-card"
                        />
                      </motion.div>
                    ))}
                    <div className="w-14 h-14 rounded-full bg-primary/20 border-3 border-card flex items-center justify-center">
                      <span className="text-xs text-primary font-medium">& more</span>
                    </div>
                  </div>
                  
                  <p className="text-foreground font-medium mb-2">Join the Conversation</p>
                  <p className="text-muted-foreground text-sm">
                    Share insights, ask questions, and grow together with fellow students of knowledge.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
