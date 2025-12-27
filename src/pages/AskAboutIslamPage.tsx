import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { MessageCircle, Clock, Heart, Book, Users, Coins, Moon, Star, Shield, FileText, Scale, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { OrnamentalDivider } from "@/components/ui/OrnamentalDivider";

const fivePillars = [
  {
    icon: Heart,
    arabic: "الشَّهَادَة",
    name: "Shahada (Declaration of Faith)",
    description: "The sincere declaration that there is no god but Allah, and Muhammad (peace be upon him) is His messenger. This is the foundation of a Muslim's faith and the gateway to Islam."
  },
  {
    icon: Users,
    arabic: "الصَّلَاة",
    name: "Salah (Prayer)",
    description: "The five daily prayers performed at specific times throughout the day. Prayer is the direct connection between the believer and Allah, offering spiritual nourishment and discipline."
  },
  {
    icon: Coins,
    arabic: "الزَّكَاة",
    name: "Zakat (Charity)",
    description: "An obligatory form of charity, typically 2.5% of one's savings annually. It purifies wealth and helps those in need, fostering social responsibility and community care."
  },
  {
    icon: Moon,
    arabic: "الصِّيَام",
    name: "Sawm (Fasting)",
    description: "Fasting during the holy month of Ramadan from dawn to sunset. It teaches self-discipline, empathy for the less fortunate, and spiritual reflection."
  },
  {
    icon: Star,
    arabic: "الحَجّ",
    name: "Hajj (Pilgrimage)",
    description: "The pilgrimage to Mecca that every able Muslim should undertake at least once in their lifetime. It symbolizes unity and equality before Allah."
  }
];

const sixPillarsOfFaith = [
  {
    icon: Sparkles,
    arabic: "الإِيمَانُ بِاللهِ",
    name: "Belief in Allah",
    description: "The absolute belief in one God (Allah) who is the Creator, Sustainer, and Master of all that exists. He has no partners, no equals, and nothing is like Him."
  },
  {
    icon: Shield,
    arabic: "الإِيمَانُ بِالمَلَائِكَة",
    name: "Belief in Angels",
    description: "Belief in the angels created by Allah from light. They carry out His commands, record our deeds, and serve various roles in the unseen world."
  },
  {
    icon: Book,
    arabic: "الإِيمَانُ بِالكُتُب",
    name: "Belief in Divine Books",
    description: "Belief in all scriptures revealed by Allah, including the Torah, Psalms, Gospel, and the Qur'an — the final and preserved revelation."
  },
  {
    icon: FileText,
    arabic: "الإِيمَانُ بِالرُّسُل",
    name: "Belief in Prophets",
    description: "Belief in all messengers sent by Allah, from Adam to Muhammad (peace be upon them all). They were chosen to guide humanity to the truth."
  },
  {
    icon: Scale,
    arabic: "الإِيمَانُ بِاليَوْمِ الآخِر",
    name: "Belief in the Day of Judgment",
    description: "Belief that this life is temporary and that we will all be resurrected and held accountable for our deeds on the Day of Judgment."
  },
  {
    icon: Heart,
    arabic: "الإِيمَانُ بِالقَدَر",
    name: "Belief in Divine Decree",
    description: "Belief that Allah has knowledge of all things and that everything happens according to His will and wisdom, while humans have free will in their choices."
  }
];

const AskAboutIslamPage = () => {
  const scrollToChat = () => {
    const chatWidget = document.querySelector('[data-chat-widget]');
    if (chatWidget) {
      chatWidget.scrollIntoView({ behavior: 'smooth' });
    }
    // Also trigger the chat to open
    const chatButton = document.querySelector('[data-chat-trigger]') as HTMLButtonElement;
    if (chatButton) {
      chatButton.click();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 md:py-24 relative overflow-hidden">
          <div className="absolute inset-0 pattern-islamic opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-3xl mx-auto"
            >
              <span className="font-arabic text-gold text-2xl md:text-3xl block mb-4">
                بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
              </span>
              
              <h1 className="font-english text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground mb-6">
                Ask Me About <span className="text-gradient-emerald">Islam</span>
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground mb-8">
                Islam is a complete way of life built upon five foundational pillars of practice 
                and six pillars of faith. Whether you're curious, seeking answers, or just want 
                to learn — we're here to help.
              </p>

              {/* Live Chat CTA */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="inline-flex flex-col items-center p-6 rounded-2xl bg-card border border-primary/30 glow-emerald"
              >
                <div className="flex items-center gap-2 text-primary mb-2">
                  <Clock className="w-5 h-5" />
                  <span className="font-medium">Live Chat Available</span>
                </div>
                <p className="text-2xl font-bold text-foreground mb-1">
                  Every Evening 9–11 PM Eastern
                </p>
                <p className="text-sm text-muted-foreground mb-4">
                  Friendly, judgment-free conversations about Islam
                </p>
                <Button onClick={scrollToChat} size="lg" className="glow-emerald">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Start a Conversation
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <OrnamentalDivider />

        {/* Five Pillars of Islam */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <span className="text-gold font-ui text-sm uppercase tracking-widest">
                The Foundation of Practice
              </span>
              <h2 className="font-english text-3xl md:text-4xl font-semibold text-foreground mt-4 mb-4">
                The Five Pillars of Islam
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                These five acts of worship form the framework of a Muslim's life, 
                guiding their relationship with Allah and their community.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {fivePillars.map((pillar, index) => (
                <motion.div
                  key={pillar.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 rounded-2xl bg-card border border-border hover:border-gold/30 transition-all h-full"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center">
                      <pillar.icon className="w-6 h-6 text-gold" />
                    </div>
                    <div>
                      <p className="font-arabic text-gold text-lg">{pillar.arabic}</p>
                    </div>
                  </div>
                  <h3 className="font-english text-lg font-semibold text-foreground mb-2">
                    {pillar.name}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {pillar.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <OrnamentalDivider symbol="☪" />

        {/* Six Pillars of Faith */}
        <section className="py-16 md:py-20 bg-card/30">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <span className="text-primary font-ui text-sm uppercase tracking-widest">
                The Foundation of Belief
              </span>
              <h2 className="font-english text-3xl md:text-4xl font-semibold text-foreground mt-4 mb-4">
                The Six Pillars of Faith (Iman)
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                These six beliefs form the core of what a Muslim holds in their heart. 
                They are the unseen truths that shape a believer's worldview.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {sixPillarsOfFaith.map((pillar, index) => (
                <motion.div
                  key={pillar.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 rounded-2xl bg-background border border-border hover:border-primary/30 transition-all h-full"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <pillar.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-arabic text-primary text-lg">{pillar.arabic}</p>
                    </div>
                  </div>
                  <h3 className="font-english text-lg font-semibold text-foreground mb-2">
                    {pillar.name}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {pillar.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-2xl mx-auto text-center"
            >
              <MessageCircle className="w-16 h-16 text-primary mx-auto mb-6" />
              <h2 className="font-english text-2xl md:text-3xl font-semibold text-foreground mb-4">
                Have Questions? We're Here to Listen.
              </h2>
              <p className="text-muted-foreground mb-8">
                No question is too simple or too complex. Whether you're exploring Islam 
                for the first time or deepening your understanding, our team is available 
                every evening to chat with you.
              </p>
              
              <div className="p-6 rounded-2xl bg-card border border-gold/30 mb-8">
                <div className="flex items-center justify-center gap-3 mb-3">
                  <Clock className="w-5 h-5 text-gold" />
                  <span className="text-xl font-semibold text-foreground">
                    9:00 PM – 11:00 PM Eastern Time
                  </span>
                </div>
                <p className="text-muted-foreground">
                  Available every evening • Friendly & judgment-free
                </p>
              </div>

              <Button onClick={scrollToChat} size="lg" className="bg-primary hover:bg-primary/90 glow-emerald">
                <MessageCircle className="w-5 h-5 mr-2" />
                Come Speak to Us
              </Button>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AskAboutIslamPage;
