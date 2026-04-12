import { motion } from "framer-motion";
import { Shield, Users, Clock, Award, Headphones, Globe, CheckCircle2 } from "lucide-react";

const reasons = [
  {
    icon: Shield,
    title: "End-to-End Solutions",
    desc: "From procurement to digital services, we handle the entire value chain so you can focus on growth.",
    stat: "7+",
    statLabel: "Service Verticals",
  },
  {
    icon: Globe,
    title: "Global Reach, Local Expertise",
    desc: "Operations spanning 5+ countries with deep local knowledge in every market we serve.",
    stat: "5+",
    statLabel: "Countries",
  },
  {
    icon: Users,
    title: "Dedicated Account Teams",
    desc: "Every client gets a dedicated team ensuring personalized service and consistent communication.",
    stat: "100%",
    statLabel: "Dedicated Support",
  },
  {
    icon: Award,
    title: "Proven Track Record",
    desc: "Successfully delivered projects with high client satisfaction across all verticals.",
    stat: "100+",
    statLabel: "Projects Delivered",
  },
  {
    icon: Clock,
    title: "Fast Turnaround",
    desc: "Industry-leading delivery timelines without compromising on quality or compliance.",
    stat: "2x",
    statLabel: "Faster Delivery",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    desc: "Round-the-clock availability across time zones ensures your business never slows down.",
    stat: "24/7",
    statLabel: "Availability",
  },
];

const trustBadges = ["ISO Certified Processes", "Government-Approved Vendor", "Multi-Currency Operations"];

const WhyChooseUsSection = () => (
  <section className="relative z-10 py-10 px-6 overflow-hidden">
    {/* Ambient background */}
    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[radial-gradient(ellipse,hsl(var(--primary)/0.03),transparent_70%)] pointer-events-none" />

    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-xs text-primary font-semibold tracking-wider uppercase">Why Us</span>
          </div>
          <h2
            className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-foreground tracking-tight leading-[1.1]"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Why Businesses Choose{" "}
            <span className="text-gradient-cyan">RH International</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="flex flex-col gap-2.5 max-w-sm"
        >
          {trustBadges.map((item) => (
            <div key={item} className="flex items-center gap-3">
              <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
              <span className="text-sm text-foreground/80 font-medium">{item}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bento grid — 3 columns, first two are tall */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {reasons.map((reason, i) => {
          const Icon = reason.icon;
          const isLarge = i < 2;
          return (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className={`group relative rounded-2xl border border-border/20 bg-card/30 backdrop-blur-sm overflow-hidden hover:border-primary/25 transition-all duration-600 ${isLarge ? "md:row-span-2 lg:row-span-1" : ""
                }`}
            >
              {/* Hover gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

              <div className="relative z-10 p-7 h-full flex flex-col">
                {/* Top row: icon + stat */}
                <div className="flex items-start justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl border border-primary/15 bg-primary/8 flex items-center justify-center group-hover:bg-primary/15 group-hover:border-primary/25 group-hover:scale-105 transition-all duration-500">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="text-right">
                    <div
                      className="text-2xl font-bold text-gradient-cyan leading-none"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      {reason.stat}
                    </div>
                    <div className="text-[10px] text-muted-foreground/60 uppercase tracking-wider mt-1 font-medium">
                      {reason.statLabel}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <h3
                  className="text-lg font-bold text-foreground mb-2.5 tracking-tight"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {reason.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                  {reason.desc}
                </p>

                {/* Bottom accent line */}
                <div className="mt-6 h-[2px] w-0 group-hover:w-full bg-gradient-to-r from-primary/40 to-transparent transition-all duration-700 rounded-full" />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
);

export default WhyChooseUsSection;
