import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Landmark, Printer, Monitor, Plane, Lightbulb, ArrowUpRight,
} from "lucide-react";
import { useRef, useState } from "react";

const services = [
  {
    title: "Government Tenders",
    desc: "End-to-end procurement support — tender identification, documentation, bid submission & contract management.",
    icon: Landmark,
    path: "/services/govt-tender",
    number: "01",
    accent: "213 55% 50%",
    tags: ["Procurement", "Compliance", "Strategy"],
  },
  {
    title: "Printing Press",
    desc: "High-quality commercial printing — PVC cards, packaging, and large-format solutions.",
    icon: Printer,
    path: "/services/printing-press",
    number: "02",
    accent: "280 50% 55%",
    tags: ["PVC", "Packaging", "Bulk"],
  },
  {
    title: "IT Solutions",
    desc: "Web development, SEO, cloud infrastructure, and custom software delivery.",
    icon: Monitor,
    path: "/services/it-solution",
    number: "03",
    accent: "165 50% 45%",
    tags: ["Web Dev", "SEO", "Cloud"],
  },
  {
    title: "Travel Consultation",
    desc: "Premium visa advisory and travel facilitation for Portugal, Spain & Denmark.",
    icon: Plane,
    path: "/services/travel-consultation",
    number: "04",
    accent: "35 70% 50%",
    tags: ["Visa", "EU", "Relocation"],
  },
  {
    title: "Digital Services",
    desc: "Strategic digital transformation, branding, and business consultation.",
    icon: Lightbulb,
    path: "/services/digital-service",
    number: "05",
    accent: "340 50% 55%",
    tags: ["Branding", "Consultation", "Digital"],
  },
];

const ServiceCard = ({ service, index }: { service: typeof services[0]; index: number }) => {
  const Icon = service.icon;
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [4, -4]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-4, 4]), { stiffness: 200, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 800,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="will-change-transform"
    >
      <Link
        to={service.path}
        className="group relative block h-full rounded-3xl border border-border/20 bg-card/25 backdrop-blur-sm overflow-hidden transition-all duration-700 hover:border-[hsl(var(--primary)/0.3)]"
      >
        {/* Animated spotlight that follows cursor */}
        <motion.div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: useTransform(
              [mouseX, mouseY],
              ([x, y]: number[]) =>
                `radial-gradient(500px circle at ${(x + 0.5) * 100}% ${(y + 0.5) * 100}%, hsl(${service.accent} / 0.08), transparent 60%)`
            ),
          }}
        />

        {/* Top accent line */}
        <div
          className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `linear-gradient(90deg, transparent, hsl(${service.accent} / 0.6), transparent)`,
          }}
        />

        {/* Large background number */}
        <div
          className="absolute -right-3 -top-6 text-[10rem] font-black text-foreground/[0.015] group-hover:text-foreground/[0.04] transition-colors duration-700 pointer-events-none select-none leading-none"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          {service.number}
        </div>

        <div className="relative z-10 p-8 md:p-9 h-full flex flex-col">
          {/* Top: number + icon */}
          <div className="flex items-start justify-between mb-8">
            <span className="text-xs font-mono text-muted-foreground/30 group-hover:text-muted-foreground/50 transition-colors">
              {service.number}
            </span>
            <motion.div
              animate={isHovered ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className="w-14 h-14 rounded-2xl flex items-center justify-center border transition-all duration-500"
              style={{
                borderColor: isHovered ? `hsl(${service.accent} / 0.3)` : "hsl(var(--border) / 0.2)",
                background: isHovered ? `hsl(${service.accent} / 0.12)` : "hsl(var(--secondary) / 0.3)",
              }}
            >
              <Icon
                className="w-6 h-6 transition-colors duration-500"
                style={{ color: isHovered ? `hsl(${service.accent})` : "hsl(var(--muted-foreground) / 0.5)" }}
              />
            </motion.div>
          </div>

          {/* Title */}
          <h3
            className="text-2xl font-bold text-foreground mb-3 tracking-tight"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            {service.title}
          </h3>

          {/* Description */}
          <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">
            {service.desc}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {service.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-md text-[10px] font-medium border transition-all duration-500"
                style={{
                  borderColor: isHovered ? `hsl(${service.accent} / 0.15)` : "hsl(var(--border) / 0.15)",
                  color: isHovered ? `hsl(${service.accent} / 0.8)` : "hsl(var(--muted-foreground) / 0.5)",
                  background: isHovered ? `hsl(${service.accent} / 0.06)` : "transparent",
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* CTA */}
          <div className="flex items-center justify-between pt-5 border-t border-border/10 group-hover:border-[hsl(var(--primary)/0.15)] transition-colors duration-500">
            <span className="text-sm font-semibold text-muted-foreground/50 group-hover:text-foreground transition-colors duration-300">
              Explore Service
            </span>
            <div
              className="w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-500"
              style={{
                borderColor: isHovered ? `hsl(${service.accent} / 0.4)` : "hsl(var(--border) / 0.2)",
                background: isHovered ? `hsl(${service.accent} / 0.1)` : "transparent",
              }}
            >
              <ArrowUpRight
                className="w-4 h-4 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                style={{ color: isHovered ? `hsl(${service.accent})` : "hsl(var(--muted-foreground) / 0.4)" }}
              />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

const ServicesSection = () => (
  <section id="services" className="relative z-10 py-16 px-6 overflow-hidden">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-[radial-gradient(ellipse,hsl(var(--primary)/0.03),transparent_70%)] pointer-events-none" />

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
            <span className="text-xs text-primary font-semibold tracking-wider uppercase">Core Services</span>
          </div>
          <h2
            className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold tracking-tight leading-[1.1] text-foreground"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Built for contracts,
            <br />
            commerce & <span className="text-gradient-cyan">growth</span>
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-muted-foreground text-sm leading-relaxed max-w-sm lg:text-right"
        >
          Five integrated verticals — one partner. From government procurement to digital transformation.
        </motion.p>
      </div>

      {/* Cards grid — 3 + 2 layout */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {services.slice(0, 3).map((service, i) => (
          <ServiceCard key={service.path} service={service} index={i} />
        ))}
      </div>
      <div className="grid md:grid-cols-2 gap-5 mt-5 lg:max-w-[calc(66.666%-0.42rem)] lg:mx-auto">
        {services.slice(3).map((service, i) => (
          <ServiceCard key={service.path} service={service} index={i + 3} />
        ))}
      </div>
    </div>
  </section>
);

export default ServicesSection;
