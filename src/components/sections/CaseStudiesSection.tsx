import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, TrendingUp, BarChart3, Award, Printer, Monitor, Plane } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const caseStudies = [
  {
    id: 1,
    title: "National Infrastructure Procurement Contract",
    client: "Ministry of Public Works",
    industry: "Government",
    icon: Award,
    metrics: [
      { label: "Contract Value", value: "$2.4M" },
      { label: "Success Rate", value: "98%" },
    ],
    description: "Secured a major infrastructure procurement contract through strategic bidding, compliance documentation, and competitive pricing analysis.",
    tags: ["Procurement", "Strategy", "Documentation"],
    result: "Won against 12 competing firms",
  },
  {
    id: 2,
    title: "500K+ Unit Retail Printing Rollout",
    client: "National Retail Group",
    industry: "Printing",
    icon: Printer,
    metrics: [
      { label: "Units Delivered", value: "500K+" },
      { label: "Time Saved", value: "40%" },
    ],
    description: "Delivered branded PVC cards and custom tote bags for a nationwide retail rollout — zero defects, ahead of schedule.",
    tags: ["PVC Cards", "Bag Printing", "Bulk"],
    result: "Delivered 2 weeks early",
  },
  {
    id: 3,
    title: "E-Commerce Digital Transformation",
    client: "Tech Startup Inc.",
    industry: "Digital",
    icon: Monitor,
    metrics: [
      { label: "Traffic Growth", value: "320%" },
      { label: "Revenue Boost", value: "185%" },
    ],
    description: "Built a high-performance e-commerce platform with SEO optimization — 3x traffic and nearly doubled revenue in 6 months.",
    tags: ["Web Dev", "SEO", "E-Commerce"],
    result: "ROI in under 4 months",
  },
  {
    id: 4,
    title: "200+ Professional Visa Processing",
    client: "Global Consulting Firm",
    industry: "Travel",
    icon: Plane,
    metrics: [
      { label: "Applications", value: "200+" },
      { label: "Approval Rate", value: "99%" },
    ],
    description: "Managed visa applications and relocation logistics across Portugal, Spain, and Denmark with near-perfect approval.",
    tags: ["Visa", "Relocation", "EU"],
    result: "99% first-attempt approval",
  },
];

const CaseStudiesSection = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section className="relative z-10 py-16 px-6 overflow-hidden">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-[radial-gradient(ellipse,hsl(var(--primary)/0.03),transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 mb-6">
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span className="text-xs text-primary font-semibold tracking-wider uppercase">Success Stories</span>
            </div>
            <h2
              className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-foreground tracking-tight leading-[1.1]"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Real Impact,{" "}
              <span className="text-gradient-cyan">Proven Results</span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-sm leading-relaxed max-w-sm lg:text-right"
          >
            From government contracts to digital platforms — see how we've delivered extraordinary outcomes for our clients.
          </motion.p>
        </div>

        {/* Case studies — stacked interactive cards */}
        <div className="space-y-4">
          {caseStudies.map((study, i) => {
            const Icon = study.icon;
            const isHovered = hoveredId === study.id;

            return (
              <motion.div
                key={study.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                onMouseEnter={() => setHoveredId(study.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="group relative rounded-2xl border border-border/20 bg-card/30 backdrop-blur-sm overflow-hidden hover:border-primary/25 transition-all duration-600 cursor-default"
              >
                {/* Top accent line */}
                <div className="absolute top-0 left-0 h-full w-[3px] bg-primary/0 group-hover:bg-primary/60 transition-all duration-500" />

                {/* Hover background */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/[0.04] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                <div className="relative z-10 p-6 md:p-8">
                  {/* Main row */}
                  <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                    {/* Left: Number + Icon + Title */}
                    <div className="flex items-center gap-5 flex-1 min-w-0">
                      <div className="hidden md:flex items-center gap-4 shrink-0">
                        <span className="text-sm font-mono text-muted-foreground/30 w-6">0{study.id}</span>
                        <div className="w-13 h-13 rounded-2xl border border-primary/15 bg-primary/8 flex items-center justify-center group-hover:bg-primary/15 group-hover:scale-105 transition-all duration-500">
                          <Icon className="w-5.5 h-5.5 text-primary" />
                        </div>
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-3 mb-1.5">
                          <span className="text-[10px] font-bold text-primary/70 uppercase tracking-wider">{study.industry}</span>
                          <span className="text-muted-foreground/30">·</span>
                          <span className="text-[11px] text-muted-foreground/60">{study.client}</span>
                        </div>
                        <h3
                          className="text-lg md:text-xl font-bold text-foreground tracking-tight"
                          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                        >
                          {study.title}
                        </h3>
                      </div>
                    </div>

                    {/* Center: Metrics */}
                    <div className="flex items-center gap-6 shrink-0">
                      {study.metrics.map((metric) => (
                        <div key={metric.label} className="text-center min-w-[90px]">
                          <div
                            className="text-2xl font-bold text-gradient-cyan leading-none"
                            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                          >
                            {metric.value}
                          </div>
                          <div className="text-[10px] text-muted-foreground/60 uppercase tracking-wider mt-1 font-medium">
                            {metric.label}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Right: Arrow */}
                    <div className="hidden lg:flex items-center shrink-0">
                      <div className="w-11 h-11 rounded-full border border-border/20 flex items-center justify-center group-hover:border-primary/40 group-hover:bg-primary/10 transition-all duration-500">
                        <ArrowUpRight className="w-4.5 h-4.5 text-muted-foreground/40 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                      </div>
                    </div>
                  </div>

                  {/* Expandable details on hover */}
                  <motion.div
                    initial={false}
                    animate={{
                      height: isHovered ? "auto" : 0,
                      opacity: isHovered ? 1 : 0,
                    }}
                    transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="pt-6 mt-6 border-t border-border/15 flex flex-col md:flex-row md:items-end gap-5">
                      <p className="text-sm text-muted-foreground leading-relaxed flex-1 max-w-2xl">
                        {study.description}
                      </p>
                      <div className="flex items-center gap-4 shrink-0">
                        <div className="flex flex-wrap gap-1.5">
                          {study.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2.5 py-1 rounded-md bg-primary/8 border border-primary/10 text-[10px] font-medium text-primary/80"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <div className="hidden md:block h-8 w-px bg-border/20" />
                        <div className="flex items-center gap-1.5 text-xs font-semibold text-primary/70">
                          <TrendingUp className="w-3.5 h-3.5" />
                          {study.result}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-14"
        >
          <Link
            to="/contact"
            className="group inline-flex items-center gap-2 px-8 py-3.5 text-sm font-semibold bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-all duration-300 hover:shadow-[0_0_30px_hsl(var(--primary)/0.4)]"
          >
            Start Your Success Story
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default CaseStudiesSection;
