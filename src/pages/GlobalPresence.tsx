import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Building2, Clock, Globe, Mail, MapPin, Phone, TrendingUp, Users } from "lucide-react";
import { useMemo, useRef } from "react";
import { Link } from "react-router-dom";

const offices = [
  {
    city: "Dubai, UAE",
    label: "Regional HQ",
    address: "Business Bay, Dubai, United Arab Emirates",
    phone: "+971 4 XXX XXXX",
    email: "dubai@rhinternational.com",
    highlight: true,
    timezone: "GMT+4",
    established: "2020",
    team: "15+",
    services: ["Corporate Setup Sourcing", "Trade Business Verification"],
    accent: "213 55% 50%",
  },
  {
    city: "Dhaka, Bangladesh",
    label: "Head Office",
    address: "Zahir Uddin Market, Mirer Bazar, Pubail, Gazipur",
    phone: "+880 1319-855960",
    email: "info@rhinternational.com",
    highlight: false,
    timezone: "GMT+6",
    established: "2015",
    team: "50+",
    services: ["e-GP Tenders", "Commercial Print", "IT & Digital Visa Advisory"],
    accent: "200 55% 48%",
  },
];

const countries = [
  { name: "Bangladesh", flag: "🇧🇩", role: "Headquarters & Operations", projects: "80+" },
  { name: "UAE", flag: "🇦🇪", role: "MIDDLE EAST SOURCING HUB", projects: "30+" },
  { name: "Portugal", flag: "🇵🇹", role: "VISA & TRAVEL ADVISORY", projects: "15+" },
  { name: "Spain", flag: "🇪🇸", role: "VISA & TRAVEL ADVISORY", projects: "10+" },
  { name: "Denmark", flag: "🇩🇰", role: "VISA & TRAVEL ADVISORY", projects: "10+" },
];

const stats = [
  { value: "5+", label: "Countries", icon: Globe },
  { value: "65+", label: "Team Members", icon: Users },
  { value: "24/7", label: "Availability", icon: Clock },
  { value: "100+", label: "Projects", icon: TrendingUp },
];

// Floating particles for hero
const HeroParticles = () => {
  const particles = useMemo(
    () => Array.from({ length: 25 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2.5 + 1,
      duration: Math.random() * 12 + 8,
      delay: Math.random() * 4,
    })),
    []
  );
  return (
    <div className="absolute inset-0 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-primary"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
          animate={{ y: [0, -60, -120], opacity: [0, 0.2, 0], scale: [0, 1, 0.5] }}
          transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
};

// 3D tilt card
const OfficeCard = ({ office, index }: { office: typeof offices[0]; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), { stiffness: 200, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), { stiffness: 200, damping: 30 });

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: index * 0.15 }}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformPerspective: 1200 }}
      className="rounded-2xl relative group"
    >
      {/* Gradient border */}
      <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-primary/15 via-transparent to-rh-green/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className={`relative rounded-2xl border border-border/20 backdrop-blur-sm overflow-hidden ${office.highlight ? "bg-card/40" : "bg-card/25"}`}>
        {/* Top accent line */}
        <motion.div
          className="h-px w-full"
          style={{ background: `linear-gradient(90deg, transparent, hsl(${office.accent}), transparent)` }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 + index * 0.15 }}
        />

        {/* Background glow */}
        <div
          className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          style={{ background: `radial-gradient(circle, hsl(${office.accent} / 0.08), transparent 70%)` }}
        />

        <div className="relative p-8 md:p-10">
          {/* Header */}
          <div className="flex items-start justify-between mb-8">
            <div className="flex items-start gap-4">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className={`w-16 h-16 rounded-2xl flex items-center justify-center border ${office.highlight ? "bg-primary/15 border-primary/25" : "bg-secondary/30 border-border/25"}`}
                style={{ boxShadow: `0 0 30px hsl(${office.accent} / 0.1)` }}
              >
                <Building2 className="w-7 h-7 text-primary" />
              </motion.div>
              <div>
                <h2 className="text-2xl font-bold text-foreground tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {office.city}
                </h2>
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-[10px] font-bold text-primary uppercase tracking-widest px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
                    {office.label}
                  </span>
                  <span className="text-[11px] text-muted-foreground flex items-center gap-1.5">
                    <Clock className="w-3 h-3" /> {office.timezone}
                  </span>
                </div>
              </div>
            </div>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-3 h-3 rounded-full bg-emerald-500/80 mt-2"
              title="Online"
            />
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-2 gap-3 mb-8">
            <div className="p-4 rounded-xl bg-secondary/20 border border-border/10">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Est.</p>
              <p className="text-lg font-bold text-foreground" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{office.established}</p>
            </div>
            <div className="p-4 rounded-xl bg-secondary/20 border border-border/10">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Team</p>
              <p className="text-lg font-bold text-foreground" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{office.team}</p>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-3 mb-8">
            {[
              { icon: MapPin, text: office.address },
              { icon: Phone, text: office.phone },
              { icon: Mail, text: office.email },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + idx * 0.08 }}
                className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors group/item"
              >
                <div className="w-8 h-8 rounded-lg bg-primary/8 border border-primary/10 flex items-center justify-center shrink-0 group-hover/item:bg-primary/15 transition-colors">
                  <item.icon className="w-3.5 h-3.5 text-primary" />
                </div>
                {item.text}
              </motion.div>
            ))}
          </div>

          {/* Services */}
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-widest font-semibold mb-3">Services Available</p>
            <div className="flex flex-wrap gap-2">
              {office.services.map((s, idx) => (
                <motion.span
                  key={s}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + idx * 0.05 }}
                  whileHover={{ scale: 1.05, borderColor: `hsl(${office.accent} / 0.4)` }}
                  className="px-3.5 py-1.5 text-[11px] font-medium text-foreground/70 rounded-full border border-border/25 bg-secondary/15 hover:bg-secondary/30 transition-all cursor-default"
                >
                  {s}
                </motion.span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const GlobalPresence = () => (
  <div className="min-h-screen bg-background relative overflow-hidden">
    <div className="fixed inset-0 mesh-gradient pointer-events-none" />
    <Navbar />

    {/* Hero */}
    <section className="relative z-10 pt-32 pb-24 px-6 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <motion.div
          animate={{ x: [0, 50, -30, 0], y: [0, -40, 30, 0], scale: [1, 1.15, 0.9, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[10%] left-[5%] w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,hsl(var(--primary)/0.08),transparent_60%)] blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -60, 40, 0], y: [0, 30, -50, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[20%] right-[10%] w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,hsl(210_50%_50%/0.06),transparent_60%)] blur-3xl"
        />
        <HeroParticles />
      </div>

      <div className="max-w-6xl mx-auto text-center relative">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full border border-primary/25 bg-primary/5 backdrop-blur-sm mb-8"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <Globe className="w-4 h-4 text-primary" />
            </motion.div>
            <span className="text-xs text-primary font-semibold tracking-wider uppercase">Global Presence</span>
          </motion.div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            {"Our Global".split("").map((char, i) => (
              <motion.span
                key={i}
                className="inline-block text-foreground"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.03, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
            <br />
            <motion.span
              className="text-gradient-cyan inline-block"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              Footprint
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.7 }}
            className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed"
          >
            We don’t just operate globally; we integrate locally. From Asia to the Middle East and Europe, our strategic hubs ensure your business gets the right support, exactly where you need it.
          </motion.p>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.7 }}
          className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              whileHover={{ scale: 1.05, borderColor: "hsl(var(--primary) / 0.3)" }}
              className="p-5 rounded-2xl border border-border/15 bg-card/20 backdrop-blur-sm text-center"
            >
              <stat.icon className="w-5 h-5 text-primary mx-auto mb-2 opacity-60" />
              <div className="text-2xl font-bold text-gradient-cyan" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                {stat.value}
              </div>
              <div className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>

    {/* Office Cards */}
    <section className="relative z-10 px-6 pb-24">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Our <span className="text-gradient-cyan">Strategic Hubs</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">Where global strategy meets local execution. Here are the core hubs powering our worldwide operations.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {offices.map((office, i) => (
            <OfficeCard key={office.city} office={office} index={i} />
          ))}
        </div>
      </div>
    </section>

    {/* Connection lines visual */}
    <section className="relative z-10 px-6 pb-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"
        />
      </div>
    </section>

    {/* Countries We Serve */}
    <section className="relative z-10 px-6 pb-28">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Where We <span className="text-gradient-cyan">Make an Impact</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">Delivering excellence across borders, cultures, and time zones.</p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5">
          {countries.map((c, i) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ scale: 1.06, y: -4 }}
              className="rounded-2xl relative group overflow-hidden"
            >
              {/* Hover glow border */}
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative rounded-2xl border border-border/15 bg-card/25 backdrop-blur-sm p-6 text-center">
                <motion.span
                  className="text-4xl mb-4 block"
                  whileHover={{ scale: 1.2, rotate: [0, -5, 5, 0] }}
                  transition={{ duration: 0.4 }}
                >
                  {c.flag}
                </motion.span>
                <h3 className="text-sm font-bold text-foreground mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {c.name}
                </h3>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-3">{c.role}</p>
                <div className="text-xs font-semibold text-primary">{c.projects} Projects</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Link
            to="/contact"
            className="group inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-xl text-sm font-semibold hover:bg-primary/90 transition-all duration-300 hover:shadow-[0_0_30px_hsl(var(--primary)/0.3)]"
          >
            Get in Touch with Our Team
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>

    <Footer />
  </div>
);

export default GlobalPresence;
