import { motion } from "framer-motion";
import { ArrowRight, Mail, Phone, MapPin, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";

const contactMethods = [
  { icon: Mail, label: "Email Us", value: "info@rhinternationalsc.com", href: "mailto:info@rhinternationalsc.com" },
  { icon: Phone, label: "Call Us", value: "+880 1319-855960", href: "tel:+8801319855960" },
  { icon: MapPin, label: "Visit Us", value: "Zahir Uddin Market, Mirer Bazar, Pubail, Gazipur", href: "/global-presence" },
];

const CTASection = () => (
  <section id="contact" className="relative z-10 pb-20 px-6 overflow-hidden">
    {/* Background effects */}
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_100%,hsl(var(--primary)/0.06),transparent)] pointer-events-none" />

    <div className="max-w-7xl mx-auto">
      <div className="relative rounded-3xl border border-border/15 bg-card/20 backdrop-blur-sm overflow-hidden">
        {/* Top glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[radial-gradient(ellipse,hsl(var(--primary)/0.08),transparent_70%)] pointer-events-none" />
        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-32 h-32 border-t border-l border-primary/10 rounded-tl-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-32 h-32 border-b border-r border-primary/10 rounded-br-3xl pointer-events-none" />

        <div className="relative z-10 p-8 md:p-14 lg:p-20">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            {/* Left — CTA content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 mb-6">
                <MessageSquare className="w-3.5 h-3.5 text-primary" />
                <span className="text-xs text-primary font-semibold tracking-wider uppercase">Get in Touch</span>
              </div>

              <h2
                className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-foreground tracking-tight leading-[1.1] mb-5"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Let's Build{" "}
                <span className="text-gradient-cyan">Something Together</span>
              </h2>

              <p className="text-muted-foreground text-base leading-relaxed mb-10 max-w-lg">
                Whether you need support with a complex government tender, bulk commercial printing, or a highly scalable digital platform—we are ready. Let's discuss your goals and get you a tailored proposal within 48 hours.
              </p>

              {/* CTA buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mb-12">
                <Link
                  to="/contact"
                  className="group px-8 py-4 bg-primary text-primary-foreground rounded-xl text-sm font-semibold hover:bg-primary/90 transition-all duration-300 hover:shadow-[0_0_40px_hsl(var(--primary)/0.3)] flex items-center justify-center gap-2"
                >
                  Get a Free Quote
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
                <Link
                  to="/services"
                  className="px-8 py-4 rounded-xl text-sm font-semibold text-muted-foreground hover:text-foreground border border-border/25 bg-secondary/20 hover:border-primary/25 hover:bg-primary/5 transition-all duration-300 flex items-center justify-center"
                >
                  Explore Services
                </Link>
              </div>

              {/* Trust line */}
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full border-2 border-background bg-secondary/60 flex items-center justify-center"
                    >
                      <span className="text-[10px] font-bold text-muted-foreground/60">
                        {["A", "B", "R", "K"][i]}
                      </span>
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-xs font-semibold text-foreground/80">Trusted by 100+ clients</p>
                  <p className="text-[10px] text-muted-foreground/60">Across 5+ countries worldwide</p>
                </div>
              </div>
            </motion.div>

            {/* Right — Contact methods */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="space-y-4"
            >
              {contactMethods.map((method, i) => {
                const Icon = method.icon;
                const isLink = method.href.startsWith("/");
                const Wrapper = isLink ? Link : "a";
                const wrapperProps = isLink
                  ? { to: method.href }
                  : { href: method.href };

                return (
                  <motion.div
                    key={method.label}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.08 }}
                  >
                    <Wrapper
                      {...(wrapperProps as any)}
                      className="group flex items-center gap-5 p-5 rounded-2xl border border-border/15 bg-card/15 hover:border-primary/25 hover:bg-primary/5 transition-all duration-500"
                    >
                      <div className="w-13 h-13 rounded-xl border border-primary/15 bg-primary/8 flex items-center justify-center shrink-0 group-hover:bg-primary/15 group-hover:scale-105 transition-all duration-500">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] text-muted-foreground/50 uppercase tracking-wider font-semibold mb-1">
                          {method.label}
                        </p>
                        <p
                          className="text-sm font-semibold text-foreground truncate"
                          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                        >
                          {method.value}
                        </p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-muted-foreground/30 group-hover:text-primary group-hover:translate-x-1 transition-all duration-300 shrink-0" />
                    </Wrapper>
                  </motion.div>
                );
              })}

              {/* Working hours */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="p-5 rounded-2xl border border-border/10 bg-card/10"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-xs font-semibold text-foreground/80" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    We're Online Now
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-[10px] text-muted-foreground/50 uppercase tracking-wider font-medium mb-0.5">Dhaka Office</p>
                    <p className="text-xs text-muted-foreground">Sat - Thu • 9AM - 6PM</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground/50 uppercase tracking-wider font-medium mb-0.5">Dubai Office</p>
                    <p className="text-xs text-muted-foreground">Mon - Fri • 9AM - 6PM</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default CTASection;
