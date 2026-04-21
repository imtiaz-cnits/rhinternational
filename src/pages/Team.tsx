import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Award, Briefcase, Globe, Heart, Linkedin, Mail, Sparkles, Target, Users } from "lucide-react";
import { useMemo, useRef } from "react";
import { Link } from "react-router-dom";

const teamMembers = [
  {
    name: "MD Abu Sama (Kias)",
    role: "Co-Founder & CEO",
    bio: "As the driving force behind RH International, Abu Sama leads with a simple philosophy: build trust through flawless execution. He oversees our global expansion, ensuring that whether it's navigating complex government tenders or delivering high-end digital solutions, our clients always receive world-class results.",
    initials: "MAS",
    expertise: ["Global Strategy", "B2B Growth", "Digital Innovation"],
    accent: "213 55% 50%",
  },
];

const values = [
  {
    icon: Target,
    title: "Result-Oriented",
    description: "We don't just talk about goals; we deliver them. Every decision we make is focused on creating a measurable and positive impact on your business's bottom line.",
  },
  {
    icon: Heart,
    title: "Your Growth is Ours",
    description: "We treat your business like our own. We build lasting partnerships by putting your long-term success above short-term wins.",
  },
  {
    icon: Sparkles,
    title: "Always Adapting",
    description: "The global market moves fast, and so do we. From modern tech stacks (like Next.js) to advanced sourcing strategies, we constantly evolve to keep you ahead of the competition.",
  },
  {
    icon: Award,
    title: "Zero Compromise",
    description: "Whether it's printing half a million PVC cards flawlessly or deploying a secure e-commerce platform, we hold ourselves to the highest standard. No shortcuts, just pure quality.",
  },
];

const highlights = [
  { value: "65+", label: "Team Members" },
  { value: "5+", label: "Countries" },
  { value: "8+", label: "Years Experience" },
  { value: "100+", label: "Projects Delivered" },
];

// Particles
const HeroParticles = () => {
  const particles = useMemo(
    () => Array.from({ length: 20 }, (_, i) => ({
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

// 3D tilt card for team member
const TeamCard = ({ member, index }: { member: typeof teamMembers[0]; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 30 });

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
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: index * 0.15 }}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformPerspective: 1200 }}
      className="w-full max-w-lg group"
    >
      {/* Gradient border */}
      <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-primary/15 via-transparent to-rh-green/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative rounded-3xl border border-border/20 bg-card/30 backdrop-blur-sm overflow-hidden">
        {/* Top accent */}
        <motion.div
          className="h-1 w-full"
          style={{ background: `linear-gradient(90deg, transparent, hsl(${member.accent}), transparent)` }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
        />

        {/* Background glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          style={{ background: `radial-gradient(circle, hsl(${member.accent} / 0.08), transparent 70%)` }}
        />

        <div className="relative p-10 md:p-12 text-center">
          {/* Avatar */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="mx-auto mb-8 relative"
          >
            {/* Rotating ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-2 rounded-full border border-dashed border-primary/20"
            />
            <div className="w-36 h-36 rounded-full bg-gradient-to-br from-primary/20 via-primary/10 to-transparent border-2 border-primary/30 flex items-center justify-center group-hover:border-primary/50 transition-all duration-500 relative"
              style={{ boxShadow: `0 0 40px hsl(${member.accent} / 0.1)` }}
            >
              <span
                className="text-4xl font-bold text-gradient-cyan"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                {member.initials}
              </span>
            </div>
            {/* Online indicator */}
            <motion.div
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-emerald-500/80 border-2 border-background"
            />
          </motion.div>

          {/* Name & Role */}
          <h3
            className="text-3xl font-bold text-foreground mb-2 tracking-tight"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            {member.name}
          </h3>
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold mb-6">
            <Briefcase className="w-3.5 h-3.5" />
            {member.role}
          </span>
          <p className="text-muted-foreground text-base leading-relaxed mb-8 max-w-sm mx-auto">
            {member.bio}
          </p>

          {/* Expertise tags */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {member.expertise.map((skill, idx) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + idx * 0.08 }}
                whileHover={{ scale: 1.05, borderColor: `hsl(${member.accent} / 0.4)` }}
                className="px-3.5 py-1.5 text-xs font-medium text-foreground/70 rounded-full border border-border/25 bg-secondary/15"
              >
                {skill}
              </motion.span>
            ))}
          </div>

          {/* Social Links */}
          <div className="flex justify-center gap-3">
            {[
              { icon: Linkedin, label: "LinkedIn" },
              { icon: Mail, label: "Email" },
              { icon: Globe, label: "Website" },
            ].map((item, idx) => (
              <motion.button
                key={idx}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="w-11 h-11 rounded-xl border border-border/25 bg-secondary/20 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 hover:bg-primary/10 transition-all duration-300"
                title={item.label}
              >
                <item.icon size={16} />
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Team = () => {
  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      <div className="fixed inset-0 mesh-gradient pointer-events-none" />
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0">
          <motion.div
            animate={{ x: [0, 50, -30, 0], y: [0, -40, 30, 0], scale: [1, 1.15, 0.9, 1] }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[10%] left-[10%] w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,hsl(var(--primary)/0.08),transparent_60%)] blur-3xl"
          />
          <motion.div
            animate={{ x: [0, -60, 40, 0], y: [0, 30, -50, 0] }}
            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[20%] right-[10%] w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,hsl(210_50%_50%/0.06),transparent_60%)] blur-3xl"
          />
          <HeroParticles />
        </div>

        <div className="max-w-6xl mx-auto relative text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full border border-primary/25 bg-primary/5 backdrop-blur-sm mb-8"
          >
            <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 3, repeat: Infinity }}>
              <Users className="w-4 h-4 text-primary" />
            </motion.div>
            <span className="text-xs text-primary font-semibold tracking-wider uppercase">Our Team</span>
          </motion.div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            {"The Minds Behind".split("").map((char, i) => (
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
              RH International
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.7 }}
            className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed"
          >
            We are more than just a multi-service company. We are a dedicated team of problem-solvers, tech innovators, and global strategists working together to turn your most ambitious business goals into reality.
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.7 }}
            className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
          >
            {highlights.map((stat) => (
              <motion.div
                key={stat.label}
                whileHover={{ scale: 1.05, borderColor: "hsl(var(--primary) / 0.3)" }}
                className="p-5 rounded-2xl border border-border/15 bg-card/20 backdrop-blur-sm text-center"
              >
                <div className="text-2xl font-bold text-gradient-cyan" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {stat.value}
                </div>
                <div className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Leadership */}
      <section className="relative z-10 px-6 pb-24">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Leadership <span className="text-gradient-cyan">Team</span>
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">Driving our global strategy with hands-on expertise and a passion for excellence</p>
          </motion.div>

          <div className="flex justify-center">
            {teamMembers.map((member, i) => (
              <TeamCard key={member.name} member={member} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"
        />
      </div>

      {/* Our Values */}
      <section className="relative z-10 px-6 py-24">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Our <span className="text-gradient-cyan">Values</span>
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">The core principles that define how we work, how we build software, and how we treat our clients.</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 25, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -6, borderColor: "hsl(var(--primary) / 0.3)" }}
                className="rounded-2xl border border-border/15 bg-card/25 backdrop-blur-sm p-7 group relative overflow-hidden"
              >
                {/* Hover glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-40 rounded-full bg-[radial-gradient(circle,hsl(var(--primary)/0.06),transparent_70%)] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-5"
                  >
                    <value.icon className="w-6 h-6 text-primary" />
                  </motion.div>
                  <h3 className="text-lg font-bold text-foreground mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    {value.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Join CTA */}
      <section className="relative z-10 px-6 pb-28">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-border/15 bg-card/20 backdrop-blur-sm p-12 md:p-16 text-center relative overflow-hidden"
          >
            {/* Background orb */}
            <motion.div
              animate={{ scale: [1, 1.1, 1], opacity: [0.04, 0.08, 0.04] }}
              transition={{ duration: 6, repeat: Infinity }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[radial-gradient(circle,hsl(var(--primary)),transparent_60%)] blur-3xl"
            />

            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Want to Build the <span className="text-gradient-cyan">Future with Us?</span>
              </h2>
              <p className="text-muted-foreground max-w-lg mx-auto mb-8 leading-relaxed">
                We are always on the lookout for bold thinkers, tech enthusiasts, and global strategists. If you're passionate about making a real impact, we’d love to hear from you.
              </p>
              <Link
                to="/contact"
                className="group inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-xl text-sm font-semibold hover:bg-primary/90 transition-all duration-300 hover:shadow-[0_0_30px_hsl(var(--primary)/0.3)]"
              >
                Get in Touch
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Team;
