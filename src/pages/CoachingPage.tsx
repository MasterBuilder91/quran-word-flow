import { Helmet } from "react-helmet-async";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, ArrowRight } from "lucide-react";
import founderPortrait from "@/assets/founder-portrait.jpg";

const CoachingPage = () => {
  const handleApply = () => {
    window.open("mailto:coaching@example.com?subject=1-on-1%20Coaching%20Application", "_blank");
  };

  return (
    <>
      <Helmet>
        <title>1-on-1 Arabic Demystification Coaching | For Native English Speakers</title>
        <meta
          name="description"
          content="Premium 1-on-1 Arabic coaching for native English speakers. 23+ years of experience distilled into mental models, not memorization. Application required."
        />
      </Helmet>

      <Header />

      <main className="min-h-screen bg-background pt-20">
        {/* Hero Section */}
        <section className="py-16 md:py-24 px-4">
          <div className="container max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h1 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
                1-on-1 Arabic Demystification Coaching
              </h1>
              <p className="text-xl md:text-2xl text-gold font-medium">
                For Native English Speakers
              </p>
            </motion.div>

            {/* Founder Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex justify-center mb-12"
            >
              <div className="relative">
                <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-gold/30 shadow-2xl">
                  <img
                    src={founderPortrait}
                    alt="Founder"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-gold text-background px-4 py-1 rounded-full text-sm font-semibold">
                  23+ Years
                </div>
              </div>
            </motion.div>

            {/* Opening Statement */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="prose prose-lg max-w-none text-foreground/90"
            >
              <p className="text-lg md:text-xl leading-relaxed mb-6">
                I am a native English speaker who has been learning Arabic since the age of 11. That's over 23 years of struggle, confusion, breakthroughs, and hard-won clarity. I hold a degree in Arabic. Yet even degree programs don't teach what this coaching offers.
              </p>
              <p className="text-lg md:text-xl leading-relaxed mb-6">
                If you've spent any time looking for Arabic instruction, you've probably noticed that platforms like Preply, italki, and similar marketplaces proudly advertise "native speakers" as if that alone guarantees effective teaching.
              </p>
              <p className="text-lg md:text-xl leading-relaxed mb-6 font-semibold text-foreground">
                It doesn't.
              </p>
            </motion.div>
          </div>
        </section>

        {/* The Problem with Native Speakers */}
        <section className="py-12 md:py-16 px-4 bg-card/50">
          <div className="container max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8">
                The Native Speaker Illusion
              </h2>
              <div className="prose prose-lg max-w-none text-foreground/90 space-y-6">
                <p className="text-lg leading-relaxed">
                  Native speakers are not inherently good teachers for beginners. They operate on intuition, not explanation. They acquired Arabic as children, absorbing patterns unconsciously before they could ever articulate why anything works the way it does.
                </p>
                <p className="text-lg leading-relaxed">
                  They rarely understand the mental roadblocks English speakers face. The questions that keep you up at night — "Why does this word change form here?" or "How do I know which pattern to use?" — often don't even register as questions to someone who has never had to ask them.
                </p>
                <p className="text-lg leading-relaxed">
                  Add heavy dialect influence — Egyptian, Levantine, Gulf — and you get speech habits that actively confuse learners who need structure and clarity. You end up learning someone's regional quirks instead of the language itself.
                </p>
                <p className="text-lg leading-relaxed font-semibold text-foreground">
                  Native speakers are useful — after you've built a foundation and internal logic. Before that, they can do more harm than good.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* What This Coaching Is */}
        <section className="py-12 md:py-16 px-4">
          <div className="container max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8">
                The Opposite Approach
              </h2>
              <div className="prose prose-lg max-w-none text-foreground/90 space-y-6">
                <p className="text-lg leading-relaxed">
                  I am a native English speaker who fully understands Arabic. I had to fight for understanding. I learned by asking "why" relentlessly — in classrooms, in immersion settings, in private study, over decades. I can explain Arabic in English thinking patterns because I had to build those bridges myself.
                </p>
                <p className="text-lg leading-relaxed">
                  In formal classrooms and immersion settings, Arabic is often taught entirely in Arabic — which is necessary and valuable. Yet even in those environments, myself and other native English speakers would regularly pause, step outside the flow, and quietly demystify what had just been explained. Not because we didn't understand the Arabic — but because Arabic, by its nature, sometimes forces reflection. Certain structures, patterns, and expressions require a moment of conceptual alignment before they truly settle.
                </p>
                <p className="text-lg leading-relaxed">
                  That reflective pause — the moment where English speakers stop and say "wait, why does Arabic do that?" — is almost never taught. It's assumed to happen naturally. For many learners, it never does.
                </p>
                <p className="text-lg leading-relaxed font-semibold text-foreground">
                  This coaching exists to teach that exact process. The mental unpacking. The reframing. The internal alignment that turns exposure into understanding.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* What You Get */}
        <section className="py-12 md:py-16 px-4 bg-card/50">
          <div className="container max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8">
                What This Offers
              </h2>
              <div className="prose prose-lg max-w-none text-foreground/90 space-y-6">
                <p className="text-lg leading-relaxed">
                  This is not tutoring. This is not lessons. This is not curriculum walkthroughs.
                </p>
                <p className="text-lg leading-relaxed">
                  This is <span className="font-semibold text-gold">demystification</span>. Direct access to how Arabic actually works — the mental models, the compressed understanding, the language intuition that normally takes years to discover on your own.
                </p>
                <ul className="space-y-4 list-none pl-0">
                  <li className="flex items-start gap-3">
                    <ArrowRight className="w-5 h-5 text-gold mt-1 flex-shrink-0" />
                    <span>Direct access to 23+ years of hard-earned experience</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <ArrowRight className="w-5 h-5 text-gold mt-1 flex-shrink-0" />
                    <span>Mental shortcuts that normally take decades to discover</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <ArrowRight className="w-5 h-5 text-gold mt-1 flex-shrink-0" />
                    <span>Clarification of things learners stay confused about for years</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <ArrowRight className="w-5 h-5 text-gold mt-1 flex-shrink-0" />
                    <span>Arabic explained through English thinking patterns</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <ArrowRight className="w-5 h-5 text-gold mt-1 flex-shrink-0" />
                    <span>The reflective process that makes study and immersion finally click</span>
                  </li>
                </ul>
                <p className="text-lg leading-relaxed">
                  It's not a replacement for immersion or study — it's the missing layer that makes them finally work.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Why This Exists */}
        <section className="py-12 md:py-16 px-4">
          <div className="container max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8">
                Why This Exists
              </h2>
              <div className="prose prose-lg max-w-none text-foreground/90 space-y-6">
                <p className="text-lg leading-relaxed">
                  Having access to a master of a subject who speaks your native language is always a shortcut. It compresses years into hours. It transforms confusion into clarity.
                </p>
                <p className="text-lg leading-relaxed">
                  I benefited enormously from moments of access like this throughout my own journey. A few minutes with someone who truly understood — and could explain it in terms that made sense to my English-speaking mind — often accomplished what months of study could not.
                </p>
                <p className="text-lg leading-relaxed font-semibold text-foreground">
                  This coaching exists to offer you that same access.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Who This Is For / Not For */}
        <section className="py-12 md:py-16 px-4 bg-card/50">
          <div className="container max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 md:gap-12">
              {/* Who This Is For */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6">
                  Who This Is For
                </h2>
                <ul className="space-y-4">
                  {[
                    "Native English speakers",
                    "Serious learners who are committed",
                    "People frustrated by slow progress",
                    "People who value time more than money",
                    "People who want clarity, not vibes",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-foreground/90">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Who This Is Not For */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6">
                  Who This Is Not For
                </h2>
                <ul className="space-y-4">
                  {[
                    "People looking for cheap tutoring",
                    "People who want to rely on native-speaker intuition",
                    "People who expect memorization without understanding",
                    "People unwilling to think deeply about language",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <XCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                      <span className="text-foreground/90">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-16 md:py-24 px-4">
          <div className="container max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8">
                Investment
              </h2>
              
              <div className="bg-card border border-border rounded-2xl p-8 md:p-12 max-w-lg mx-auto mb-8">
                <div className="mb-6">
                  <span className="text-5xl md:text-6xl font-bold text-foreground">$800</span>
                  <span className="text-xl text-muted-foreground ml-2">/ month</span>
                </div>
                
                <div className="space-y-3 text-muted-foreground mb-8">
                  <p>No discounts.</p>
                  <p>No negotiation.</p>
                  <p>Limited spots available.</p>
                  <p className="font-semibold text-foreground">Application required.</p>
                </div>
                
                <Button
                  onClick={handleApply}
                  size="lg"
                  className="w-full bg-gold hover:bg-gold/90 text-background font-semibold text-lg py-6"
                >
                  Apply for 1-on-1 Coaching
                </Button>
              </div>
              
              <p className="text-muted-foreground text-sm max-w-md mx-auto">
                Applying does not guarantee acceptance. This coaching is selective by design.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Final Statement */}
        <section className="py-12 md:py-16 px-4 bg-card/50">
          <div className="container max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <p className="text-lg md:text-xl text-foreground/90 leading-relaxed max-w-2xl mx-auto">
                If you're tired of spinning your wheels, tired of surface-level explanations, and ready for someone who has walked the exact path you're on — this is your opportunity.
              </p>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default CoachingPage;
