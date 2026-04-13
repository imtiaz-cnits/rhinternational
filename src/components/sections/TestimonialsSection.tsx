import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Ahmed Al-Rashid",
    role: "CEO, Gulf Trading Corp.",
    text: "We were struggling to navigate the complexities of government bidding. The team at RH International didn't just help us understand the process—they completely handled the documentation and helped us win a massive contract. Highly recommended!",
    rating: 5,
  },
  {
    name: "Sarah Müller",
    role: "Operations Director, EuroTech GmbH",
    text: "Honestly, their IT team exceeded all our expectations. They built our entire e-commerce platform from scratch and even got it delivered ahead of schedule. Since launch, our online traffic has more than tripled. Incredible work.",
    rating: 5,
  },
  {
    name: "Dr. Kamal Hossain",
    role: "Managing Director, Dhaka Exports Ltd.",
    text: "Whether it’s bulk PVC card printing or handling large-scale packaging for our exports, they manage everything perfectly. It’s rare to find a partner who takes quality control as seriously as we do. They are our go-to team.",
    rating: 5,
  },
];

const TestimonialsSection = () => (
  <section className="relative z-10 pt-10 pb-10 px-6 overflow-hidden">
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.03),transparent_70%)]" />

    <div className="max-w-7xl mx-auto relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 mb-6">
          <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          <span className="text-xs text-primary font-semibold tracking-wider uppercase">Testimonials</span>
        </div>
        <h2
          className="text-4xl md:text-5xl font-bold text-foreground tracking-tight"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          What Our Clients <span className="text-gradient-cyan">Say</span>
        </h2>
        <p className="text-muted-foreground mt-4 max-w-lg mx-auto">
         Don’t just take our word for it. Here’s what real businesses have to say about working with our team.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="relative p-8 rounded-2xl border border-border/15 bg-card/30 backdrop-blur-sm group hover:border-primary/20 transition-all duration-500"
          >
            {/* Quote icon */}
            <Quote className="w-8 h-8 text-primary/15 mb-5" />

            {/* Rating */}
            <div className="flex items-center gap-1 mb-4">
              {[...Array(t.rating)].map((_, s) => (
                <Star key={s} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              ))}
            </div>

            {/* Text */}
            <p className="text-sm text-foreground/80 leading-relaxed mb-6 italic">
              "{t.text}"
            </p>

            {/* Author */}
            <div className="flex items-center gap-3 pt-5 border-t border-border/15">
              <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                <span className="text-xs font-bold text-primary" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {t.name.split(" ").map((n) => n[0]).join("")}
                </span>
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">{t.name}</p>
                <p className="text-[11px] text-muted-foreground">{t.role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default TestimonialsSection;
