import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import type { LucideIcon } from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface Feature {
  title: string;
  description: string;
}

interface ServicePageLayoutProps {
  title: string;
  subtitle: string;
  description: string;
  icon: LucideIcon;
  features: Feature[];
  highlights?: string[];
}

const ServicePageLayout = ({
  title,
  subtitle,
  description,
  icon: Icon,
  features,
  highlights,
}: ServicePageLayoutProps) => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="fixed inset-0 mesh-gradient pointer-events-none" />
      <Navbar />

      {/* Hero */}
      <section className="relative z-10 pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-sm text-[hsl(215_20%_60%)] hover:text-primary transition-colors mb-10 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> All Services
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col md:flex-row md:items-start gap-8"
          >
            <div className="shrink-0">
              <div className="w-18 h-18 w-[72px] h-[72px] rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center glow-cyan-sm">
                <Icon className="w-8 h-8 text-primary icon-glow" />
              </div>
            </div>
            <div>
              <span className="text-primary text-xs font-semibold tracking-[0.25em] uppercase mb-3 block">
                {subtitle}
              </span>
              <h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-5 tracking-tight"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                {title}
              </h1>
              <p className="text-base md:text-lg text-[hsl(215_20%_68%)] leading-relaxed max-w-2xl">
                {description}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative z-10 py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl font-bold text-foreground mb-8 tracking-tight"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            What's Included
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="p-7 rounded-2xl glass-card group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/15 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-primary/20 transition-colors">
                    <span
                      className="text-sm font-bold text-primary"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div>
                    <h3
                      className="text-base font-bold text-foreground mb-2 tracking-tight"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      {feature.title}
                    </h3>
                    <p className="text-sm text-[hsl(215_20%_68%)] leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Highlights */}
      {highlights && (
        <section className="relative z-10 py-16 px-6">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-8 md:p-10 rounded-2xl glass-card"
            >
              <h3
                className="text-xl font-bold text-foreground mb-6 tracking-tight"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Why Choose Us
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {highlights.map((h) => (
                  <div
                    key={h}
                    className="flex items-start gap-3 text-sm text-[hsl(215_20%_72%)]"
                  >
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    {h}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2
              className="text-3xl md:text-4xl font-bold text-foreground mb-4 tracking-tight"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Interested in <span className="text-gradient-cyan">{title}</span>?
            </h2>
            <p className="text-[hsl(215_20%_68%)] mb-8 text-base">
              Get in touch with our team to discuss your requirements and get a tailored proposal.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="mailto:info@rhinternational.com"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary text-primary-foreground rounded-full text-sm font-semibold hover:bg-primary/90 transition-all glow-cyan-sm"
              >
                Contact Us <ArrowRight className="w-4 h-4" />
              </a>
              <Link
                to="/services"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-medium text-[hsl(215_20%_68%)] hover:text-foreground transition-colors glass-card"
              >
                View All Services
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ServicePageLayout;
