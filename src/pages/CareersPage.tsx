import { Helmet } from "react-helmet-async";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight, Users, BookOpen, TrendingUp } from "lucide-react";

const CareersPage = () => {
  const handleApply = () => {
    window.open("mailto:careers@example.com?subject=Coach%20Application", "_blank");
  };

  return (
    <>
      <Helmet>
        <title>Careers: Arabic Demystification Coaches | Quranic Arabic Lab</title>
        <meta
          name="description"
          content="Join the first platform building a new category of Arabic coaches: native English speakers who deeply understand Arabic and can demystify it for beginners."
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
              <p className="text-gold font-medium mb-4 tracking-wide uppercase text-sm">
                Careers
              </p>
              <h1 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
                Arabic Demystification Coaches
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                We're building the first team of coaches trained to make Arabic actually make sense to English speakers.
              </p>
            </motion.div>
          </div>
        </section>

        {/* The Problem */}
        <section className="py-12 md:py-16 px-4 bg-card/50">
          <div className="container max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8">
                The Gap in Arabic Education
              </h2>
              <div className="prose prose-lg max-w-none text-foreground/90 space-y-6">
                <p className="text-lg leading-relaxed">
                  Most Arabic teaching relies on native-speaker intuition. Native speakers absorbed the language as children, before they could ever articulate why anything works the way it does. When they teach, they often recreate patterns without explaining them.
                </p>
                <p className="text-lg leading-relaxed">
                  This works for immersion-based learners with years of exposure ahead of them. It fails adult English speakers who need structure, logic, and clear explanations. The questions that confuse English-speaking beginners — "Why does this word change here?" or "What's the logic behind this pattern?" — often don't register as questions to someone who never had to ask them.
                </p>
                <p className="text-lg leading-relaxed font-semibold text-foreground">
                  We're building a platform to fix this.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* A New Category */}
        <section className="py-12 md:py-16 px-4">
          <div className="container max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8">
                A New Coaching Category
              </h2>
              <div className="prose prose-lg max-w-none text-foreground/90 space-y-6">
                <p className="text-lg leading-relaxed">
                  Quranic Arabic Lab is intentionally seeking a different kind of coach: <span className="font-semibold text-foreground">native English speakers who deeply understand Arabic and can explain it clearly</span>.
                </p>
                <p className="text-lg leading-relaxed">
                  This is not tutoring. This is not marketplace teaching. This is a focused discipline we call <span className="text-gold font-semibold">demystification</span> — the ability to take something that feels foreign and opaque, and make it logical, memorable, and intuitive.
                </p>
                <p className="text-lg leading-relaxed">
                  We believe the best person to guide an English speaker through the mental barriers of Arabic is someone who had to overcome those exact barriers themselves. Someone who asked "why" relentlessly. Someone who can bridge the gap between Arabic logic and English thinking patterns.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* What Coaches Receive */}
        <section className="py-12 md:py-16 px-4 bg-card/50">
          <div className="container max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8">
                What Accepted Coaches Receive
              </h2>
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-card border border-border rounded-xl p-6">
                  <BookOpen className="w-10 h-10 text-gold mb-4" />
                  <h3 className="font-semibold text-lg text-foreground mb-2">Method Training</h3>
                  <p className="text-muted-foreground text-sm">
                    Training in a specific demystification method developed over 23+ years of learning Arabic as a native English speaker.
                  </p>
                </div>
                <div className="bg-card border border-border rounded-xl p-6">
                  <Users className="w-10 h-10 text-gold mb-4" />
                  <h3 className="font-semibold text-lg text-foreground mb-2">Client Access</h3>
                  <p className="text-muted-foreground text-sm">
                    Clients are sourced and matched through the platform. No need to build your own audience or marketing.
                  </p>
                </div>
                <div className="bg-card border border-border rounded-xl p-6">
                  <TrendingUp className="w-10 h-10 text-gold mb-4" />
                  <h3 className="font-semibold text-lg text-foreground mb-2">Majority Revenue</h3>
                  <p className="text-muted-foreground text-sm">
                    Coaches earn the majority of coaching revenue per client. This is a partnership, not exploitation.
                  </p>
                </div>
              </div>
              <p className="text-muted-foreground text-center">
                The long-term vision is to build a small, elite group of Arabic demystification coaches as the platform scales globally.
              </p>
            </motion.div>
          </div>
        </section>

        {/* What We're Looking For */}
        <section className="py-12 md:py-16 px-4">
          <div className="container max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8">
                Who We're Looking For
              </h2>
              <div className="prose prose-lg max-w-none text-foreground/90 space-y-6">
                <ul className="space-y-4 list-none pl-0">
                  {[
                    "Native English speakers with deep Arabic understanding",
                    "People who learned Arabic the hard way — through struggle and questioning",
                    "Clear communicators who can explain complex ideas simply",
                    "Those who prioritize understanding over memorization",
                    "Patient, thoughtful individuals who care about learner outcomes",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-lg leading-relaxed font-semibold text-foreground">
                  Quality and clarity matter more than credentials. Degrees help, but the ability to demystify is what counts.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Important Clarifications */}
        <section className="py-12 md:py-16 px-4 bg-card/50">
          <div className="container max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8">
                Important Clarifications
              </h2>
              <div className="bg-card border border-border rounded-xl p-6 md:p-8 space-y-4">
                <div className="flex items-start gap-3">
                  <ArrowRight className="w-5 h-5 text-gold mt-1 flex-shrink-0" />
                  <p className="text-foreground/90">
                    <span className="font-semibold">This is selective.</span> We are not hiring in bulk. We are carefully building a team.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <ArrowRight className="w-5 h-5 text-gold mt-1 flex-shrink-0" />
                  <p className="text-foreground/90">
                    <span className="font-semibold">Not everyone will be accepted.</span> We review applications based on fit, clarity of communication, and depth of understanding.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <ArrowRight className="w-5 h-5 text-gold mt-1 flex-shrink-0" />
                  <p className="text-foreground/90">
                    <span className="font-semibold">Training is required.</span> Even experienced teachers will go through our demystification method training.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <ArrowRight className="w-5 h-5 text-gold mt-1 flex-shrink-0" />
                  <p className="text-foreground/90">
                    <span className="font-semibold">This is exploratory.</span> We are growing intentionally, not rapidly. Income depends on client volume as the platform scales.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 px-4">
          <div className="container max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
                Interested?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
                If this resonates with your experience and you believe you can help English speakers finally understand Arabic, we'd like to hear from you.
              </p>
              
              <Button
                onClick={handleApply}
                size="lg"
                className="bg-gold hover:bg-gold/90 text-background font-semibold text-lg px-8 py-6"
              >
                Apply to Become a Coach
              </Button>
              
              <p className="text-muted-foreground text-sm mt-6">
                Applications are reviewed manually. We'll respond if there's a potential fit.
              </p>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default CareersPage;
