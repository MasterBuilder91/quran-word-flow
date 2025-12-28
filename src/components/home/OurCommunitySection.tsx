import { motion } from "framer-motion";
import { Quote } from "lucide-react";

// Import community photos
import diverseMan1 from "@/assets/community/diverse-man-1.jpg";
import diverseMan2 from "@/assets/community/diverse-man-2.jpg";
import diverseMan3 from "@/assets/community/diverse-man-3.jpg";
import diverseWoman1 from "@/assets/community/diverse-woman-1.jpg";
import diverseWoman2 from "@/assets/community/diverse-woman-2.jpg";
import diverseWoman3 from "@/assets/community/diverse-woman-3.jpg";
import professionalWoman from "@/assets/community/professional-woman.jpg";
import muslimWomanReading from "@/assets/community/muslim-woman-reading.jpg";

const testimonials = [
  {
    name: "Sarah Mitchell",
    location: "London, UK",
    quote: "As a convert, I struggled for years with Arabic courses that assumed too much. This finally made it click.",
    image: diverseWoman1,
  },
  {
    name: "Marcus Johnson",
    location: "Atlanta, USA",
    quote: "Growing up Muslim in America, I never truly understood what I was reciting. Now I do.",
    image: diverseMan1,
  },
  {
    name: "Aisha Patel",
    location: "Toronto, Canada",
    quote: "My parents spoke Urdu at home, but Quranic Arabic was a mystery. This course bridges that gap beautifully.",
    image: professionalWoman,
  },
  {
    name: "David Williams",
    location: "Sydney, Australia",
    quote: "The English-first approach is exactly what I needed. No more feeling lost in translation.",
    image: diverseMan2,
  },
  {
    name: "Fatima Hassan",
    location: "Birmingham, UK",
    quote: "Finally, a course that respects my intelligence while acknowledging I'm starting from scratch.",
    image: muslimWomanReading,
  },
  {
    name: "James Chen",
    location: "Vancouver, Canada",
    quote: "As a revert, I was intimidated by Arabic. This made learning feel natural and achievable.",
    image: diverseMan3,
  },
];

const communityPhotos = [
  { image: diverseWoman2, alt: "Community member" },
  { image: diverseWoman3, alt: "Community member" },
];

export const OurCommunitySection = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-background to-card/30 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-gold/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-english text-3xl md:text-4xl font-semibold text-foreground mb-4">
            Built For <span className="text-gradient-emerald">English Speakers</span>, By English Speakers
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto font-ui text-lg">
            We understand your journey because we've walked it ourselves. From London to Lagos, 
            Toronto to Karachi — our community spans the globe, united by a common language.
          </p>
        </motion.div>

        {/* Floating Avatar Grid */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex justify-center items-center gap-3 mb-16 flex-wrap"
        >
          {[...testimonials, ...communityPhotos].map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative group"
            >
              <div className={`w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-2 border-primary/30 
                ${index % 2 === 0 ? 'translate-y-2' : '-translate-y-2'} 
                group-hover:border-primary transition-colors duration-300`}
              >
                <img
                  src={member.image}
                  alt={'name' in member ? member.name : member.alt}
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          ))}
          
          {/* "And many more" circle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-primary/20 border-2 border-dashed border-primary/40 
              flex items-center justify-center text-sm text-primary font-medium"
          >
            +500
          </motion.div>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6 hover:border-primary/30 transition-colors"
            >
              <Quote className="w-8 h-8 text-primary/30 mb-4" />
              <p className="text-foreground mb-6 font-ui leading-relaxed">
                "{testimonial.quote}"
              </p>
              <div className="flex items-center gap-3">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-primary/20"
                />
                <div>
                  <p className="font-medium text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
