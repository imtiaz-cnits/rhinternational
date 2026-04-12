import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Landmark, Printer, Monitor, Plane, Building2, Lightbulb,
  ArrowRight, Globe,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const services = [
  {
    title: "Govt Tender",
    desc: "Professional support and consultancy for government procurement and tenders across multiple sectors.",
    icon: Landmark,
    path: "/services/govt-tender",
    tag: "Procurement",
  },
  {
    title: "Printing Press",
    desc: "Industrial-grade PVC card, bag, and commercial printing with precision machinery and fast turnaround.",
    icon: Printer,
    path: "/services/printing-press",
    tag: "Manufacturing",
  },
  {
    title: "IT Solution",
    desc: "Full-stack web development, cloud infrastructure, SEO, and cybersecurity services.",
    icon: Monitor,
    path: "/services/it-solution",
    tag: "Technology",
  },
  {
    title: "Travel Consultation",
    desc: "Expert visa guidance and immigration advisory for Portugal, Spain, and Denmark.",
    icon: Plane,
    path: "/services/travel-consultation",
    tag: "Immigration",
  },
  {
    title: "Dubai Office",
    desc: "Company formation, trade facilitation, and market entry support for the UAE and GCC region.",
    icon: Building2,
    path: "/services/dubai-office",
    tag: "UAE Operations",
  },
  {
    title: "Digital Service & E-commerce",
    desc: "Strategic digital transformation, e-commerce development, and ongoing platform optimization.",
    icon: Lightbulb,
    path: "/services/digital-service",
    tag: "Digital",
  },
];

const ServicesIndex = () => (
  <div className="min-h-screen bg-background relative overflow-hidden">
    <div className="fixed inset-0 mesh-gradient pointer-events-none" />
    <Navbar />

    {/* Hero */}
    <section className="relative z-10 pt-32 pb-20 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/25 bg-primary/8 mb-6">
            <Globe className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs text-primary font-semibold tracking-wider uppercase">Our Services</span>
          </div>
          <h1
            className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            <span className="text-gradient-white">What We</span>{" "}
            <span className="text-gradient-cyan">Deliver</span>
          </h1>
          <p className="text-[hsl(215_20%_68%)] text-lg max-w-2xl mx-auto leading-relaxed">
            Comprehensive B2B & B2C solutions spanning procurement, manufacturing,
            technology, immigration, and digital transformation across 5+ countries.
          </p>
        </motion.div>
      </div>
    </section>

    {/* Services Grid */}
    <section className="relative z-10 pb-28 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {services.map((service, i) => (
          <motion.div
            key={service.path}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 + i * 0.08 }}
          >
            <Link
              to={service.path}
              className="group relative block p-8 rounded-2xl glass-card h-full overflow-hidden"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-transparent" />
              </div>

              <div className="relative flex flex-col h-full">
                {/* Tag */}
                <span className="self-start text-[10px] font-semibold text-primary uppercase tracking-wider px-2.5 py-1 rounded-full bg-primary/10 border border-primary/15 mb-6">
                  {service.tag}
                </span>

                {/* Icon */}
                <div className="w-16 h-16 rounded-xl bg-primary/10 border border-primary/15 flex items-center justify-center mb-6 group-hover:bg-primary/20 group-hover:border-primary/30 group-hover:shadow-[0_0_24px_hsl(var(--primary)/0.25)] transition-all duration-500">
                  <service.icon className="w-7 h-7 text-primary icon-glow" />
                </div>

                {/* Title */}
                <h2
                  className="text-xl font-bold text-foreground mb-3 tracking-tight"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {service.title}
                </h2>

                {/* Description */}
                <p className="text-sm text-[hsl(215_20%_68%)] leading-relaxed mb-6 flex-1">
                  {service.desc}
                </p>

                {/* CTA */}
                <div className="flex items-center gap-2 text-sm text-primary font-semibold group-hover:gap-3 transition-all duration-300">
                  View Details <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>

    {/* CTA Banner */}
    <section className="relative z-10 pb-28 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-10 md:p-14 rounded-3xl glass-card text-center"
        >
          <h2
            className="text-3xl md:text-4xl font-bold text-foreground mb-4 tracking-tight"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Need a <span className="text-gradient-cyan">custom solution</span>?
          </h2>
          <p className="text-[hsl(215_20%_68%)] mb-8 max-w-lg mx-auto">
            Our team is ready to discuss your specific requirements and create a tailored plan for your business.
          </p>
          <a
            href="mailto:info@rhinternational.com"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary text-primary-foreground rounded-full text-sm font-semibold hover:bg-primary/90 transition-all glow-cyan-sm"
          >
            Get a Quote <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>

    <Footer />
  </div>
);

export default ServicesIndex;
