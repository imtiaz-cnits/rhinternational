import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, HelpCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const faqs = [
  {
    q: "What services does RH International offer?",
    a: "We provide comprehensive B2B and B2C solutions including government tender consultancy, commercial printing (PVC & bag printing), IT solutions (web development, SEO), travel visa consultation, Dubai office operations, and digital transformation services.",
    category: "General",
  },
  {
    q: "Which countries do you operate in?",
    a: "We have offices and operations in Bangladesh, UAE (Dubai), Portugal, Spain, and Denmark. Our services extend globally through our partner network.",
    category: "General",
  },
  {
    q: "How do I get started with your services?",
    a: "Simply click 'Get a Quote' or contact us through the Contact page. Our team will schedule a consultation to understand your needs and propose a tailored solution within 48 hours.",
    category: "Getting Started",
  },
  {
    q: "Do you handle government tenders internationally?",
    a: "Yes, we specialize in government procurement across multiple jurisdictions. Our team handles tender identification, documentation, compliance, and bid strategy to maximize your success rate.",
    category: "Services",
  },
  {
    q: "What is the typical turnaround time for printing orders?",
    a: "Standard printing orders (PVC cards, business cards) are delivered within 5-7 business days. Bulk orders and custom projects are quoted individually based on scope and quantity.",
    category: "Services",
  },
  {
    q: "Do you offer ongoing support after project delivery?",
    a: "Absolutely. We provide 24/7 support across all time zones. Every client is assigned a dedicated account manager for consistent communication and ongoing assistance.",
    category: "Support",
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="relative z-10 py-16 px-6 overflow-hidden">
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-[radial-gradient(ellipse,hsl(var(--primary)/0.03),transparent_70%)] pointer-events-none -translate-y-1/2" />

      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Left — sticky header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 lg:sticky lg:top-32 lg:self-start"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 mb-6">
              <HelpCircle className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs text-primary font-semibold tracking-wider uppercase">FAQ</span>
            </div>
            <h2
              className="text-4xl md:text-5xl font-bold text-foreground tracking-tight leading-[1.1] mb-5"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Questions?{" "}
              <span className="text-gradient-cyan">Answers.</span>
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed mb-8 max-w-sm">
              Everything you need to know about working with RH International. Can't find what you're looking for?
            </p>

            {/* Contact CTA */}
            <Link
              to="/contact"
              className="group inline-flex items-center gap-3 px-6 py-3.5 rounded-xl border border-primary/20 bg-primary/5 hover:bg-primary/10 hover:border-primary/30 transition-all duration-500"
            >
              <span className="text-sm font-semibold text-foreground" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Contact our team
              </span>
              <div className="w-8 h-8 rounded-full border border-primary/20 flex items-center justify-center group-hover:bg-primary/15 group-hover:border-primary/30 transition-all duration-300">
                <ArrowRight className="w-3.5 h-3.5 text-primary group-hover:translate-x-0.5 transition-transform" />
              </div>
            </Link>

            {/* Quick stats */}
            <div className="mt-10 flex gap-8">
              <div>
                <div
                  className="text-2xl font-bold text-gradient-cyan"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  48h
                </div>
                <div className="text-[10px] text-muted-foreground/60 uppercase tracking-wider mt-1 font-medium">Response Time</div>
              </div>
              <div>
                <div
                  className="text-2xl font-bold text-gradient-cyan"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  24/7
                </div>
                <div className="text-[10px] text-muted-foreground/60 uppercase tracking-wider mt-1 font-medium">Availability</div>
              </div>
            </div>
          </motion.div>

          {/* Right — FAQ items */}
          <div className="lg:col-span-3 space-y-3">
            {faqs.map((faq, i) => {
              const isOpen = openIndex === i;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                >
                  <div
                    className={`group rounded-2xl border overflow-hidden transition-all duration-500 ${isOpen
                        ? "border-primary/20 bg-card/40"
                        : "border-border/15 bg-card/15 hover:border-border/30 hover:bg-card/25"
                      }`}
                  >
                    {/* Left accent bar */}
                    <div className="relative">
                      <div
                        className={`absolute left-0 top-0 bottom-0 w-[3px] rounded-full transition-all duration-500 ${isOpen ? "bg-primary/60" : "bg-transparent"
                          }`}
                      />

                      <button
                        onClick={() => setOpenIndex(isOpen ? null : i)}
                        className="w-full flex items-center gap-4 p-6 text-left"
                      >
                        {/* Number */}
                        <span
                          className={`text-xs font-mono shrink-0 transition-colors duration-300 ${isOpen ? "text-primary" : "text-muted-foreground/30"
                            }`}
                        >
                          0{i + 1}
                        </span>

                        {/* Question */}
                        <span
                          className={`flex-1 text-sm font-semibold tracking-tight transition-colors duration-300 ${isOpen ? "text-foreground" : "text-foreground/75"
                            }`}
                          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                        >
                          {faq.q}
                        </span>

                        {/* Category tag */}
                        <span className="hidden md:block text-[10px] font-medium text-muted-foreground/40 uppercase tracking-wider shrink-0 mr-2">
                          {faq.category}
                        </span>

                        {/* Toggle icon */}
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-all duration-300 ${isOpen
                              ? "bg-primary/15 text-primary rotate-0"
                              : "bg-secondary/30 text-muted-foreground/50"
                            }`}
                        >
                          {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                        </div>
                      </button>

                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                            className="overflow-hidden"
                          >
                            <div className="px-6 pb-6 pl-[52px]">
                              <p className="text-sm text-muted-foreground leading-relaxed">
                                {faq.a}
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
