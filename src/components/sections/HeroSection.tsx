import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useMemo } from "react";

// Floating particles component
const Particles = () => {
  const particles = useMemo(
    () =>
      Array.from({ length: 40 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        duration: Math.random() * 15 + 10,
        delay: Math.random() * 5,
        opacity: Math.random() * 0.3 + 0.05,
      })),
    []
  );

  return (
    <div className="absolute inset-0 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-primary"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: [0, -80, -160],
            x: [0, Math.random() > 0.5 ? 30 : -30, 0],
            opacity: [0, p.opacity, 0],
            scale: [0, 1, 0.5],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

// Animated rings
const PulseRings = () => (
  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
    {[0, 1, 2, 3].map((i) => (
      <motion.div
        key={i}
        className="absolute rounded-full border border-primary/10"
        style={{
          width: 300 + i * 200,
          height: 300 + i * 200,
          top: -(150 + i * 100),
          left: -(150 + i * 100),
        }}
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.08 - i * 0.015, 0.15 - i * 0.02, 0.08 - i * 0.015],
          rotate: i % 2 === 0 ? [0, 360] : [360, 0],
        }}
        transition={{
          duration: 20 + i * 5,
          repeat: Infinity,
          ease: "linear",
          delay: i * 0.5,
        }}
      />
    ))}
  </div>
);

// Morphing blob
const MorphingBlob = () => (
  <motion.div
    className="absolute top-[15%] right-[8%] w-[500px] h-[500px] opacity-[0.12]"
    animate={{
      borderRadius: [
        "40% 60% 70% 30% / 40% 50% 60% 50%",
        "70% 30% 50% 50% / 30% 60% 40% 60%",
        "50% 60% 30% 70% / 60% 40% 60% 40%",
        "40% 60% 70% 30% / 40% 50% 60% 50%",
      ],
      rotate: [0, 90, 180, 360],
      scale: [1, 1.15, 0.9, 1],
    }}
    transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
    style={{
      background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--rh-green)), hsl(var(--rh-orange)))",
    }}
  />
);

// Horizontal scanning line
const ScanLine = () => (
  <motion.div
    className="absolute left-0 right-0 h-px"
    style={{
      background: "linear-gradient(90deg, transparent, hsl(var(--primary) / 0.15), transparent)",
    }}
    animate={{
      top: ["-5%", "105%"],
    }}
    transition={{
      duration: 8,
      repeat: Infinity,
      ease: "linear",
      repeatDelay: 3,
    }}
  />
);

const HeroSection = () => (
  <section className="relative z-10 min-h-screen flex items-center justify-center overflow-hidden">
    {/* Cinematic animated gradient background */}
    <div className="absolute inset-0">
      {/* Bold base gradient with deeper color stops */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-background dark:from-[hsl(222_25%_12%)] dark:via-[hsl(222_22%_10%)] dark:to-[hsl(220_20%_8%)]" />

      {/* Vibrant animated floating orbs — stronger opacity */}
      <motion.div
        animate={{
          x: [0, 80, -40, 60, 0],
          y: [0, -60, 40, -30, 0],
          scale: [1, 1.2, 0.9, 1.1, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[10%] left-[5%] w-[550px] h-[550px] rounded-full bg-[radial-gradient(circle,hsl(var(--primary)/0.25),transparent_65%)] blur-3xl"
      />
      <motion.div
        animate={{
          x: [0, -70, 50, -30, 0],
          y: [0, 50, -40, 60, 0],
          scale: [1, 0.85, 1.15, 0.95, 1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[25%] right-[0%] w-[650px] h-[650px] rounded-full bg-[radial-gradient(circle,hsl(120_55%_38%/0.15),transparent_65%)] blur-3xl"
      />
      <motion.div
        animate={{
          x: [0, 40, -60, 20, 0],
          y: [0, -30, 50, -50, 0],
          scale: [1, 1.1, 0.9, 1.05, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[5%] left-[25%] w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,hsl(30_90%_52%/0.12),transparent_65%)] blur-3xl"
      />

      {/* Morphing blob — stronger */}
      <MorphingBlob />

      {/* Pulse rings */}
      <PulseRings />

      {/* Floating particles */}
      <Particles />

      {/* Scanning line */}
      <ScanLine />

      {/* Sweeping light beams — bolder */}
      <motion.div
        animate={{
          x: ["-20%", "20%", "-20%"],
          opacity: [0.06, 0.18, 0.06],
          rotate: [10, 14, 10],
        }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 left-[10%] w-[600px] h-full bg-gradient-to-b from-primary/20 via-primary/5 to-transparent blur-3xl origin-top"
      />
      <motion.div
        animate={{
          x: ["15%", "-15%", "15%"],
          opacity: [0.04, 0.14, 0.04],
          rotate: [-12, -8, -12],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 right-[15%] w-[500px] h-full bg-gradient-to-b from-[hsl(30_90%_52%/0.14)] via-[hsl(30_90%_52%/0.03)] to-transparent blur-3xl origin-top"
      />

      {/* Mesh grid — more visible */}
      <motion.div
        animate={{ opacity: [0.04, 0.08, 0.04] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--primary)/0.07) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)/0.07) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Grain overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      }} />

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent" />
    </div>

    {/* Content */}
    <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-20 w-full">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        {/* Left — Text */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm mb-8"
          >
            <motion.div
              className="w-2 h-2 rounded-full bg-primary"
              animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-xs text-primary font-semibold tracking-wider uppercase">
              Global Business Solutions
            </span>
          </motion.div>

          <h1
            className="text-5xl md:text-6xl lg:text-[4.5rem] font-bold leading-[1.05] mb-7 tracking-[-0.02em]"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            {"Empowering".split("").map((char, i) => (
              <motion.span
                key={`e-${i}`}
                className="inline-block text-foreground"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.03, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                {char}
              </motion.span>
            ))}
            <br />
            {"Businesses".split("").map((char, i) => (
              <motion.span
                key={`b-${i}`}
                className="inline-block text-foreground"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + i * 0.03, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                {char}
              </motion.span>
            ))}
            <br />
            <motion.span
              className="text-gradient-cyan inline-block"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              Worldwide
            </motion.span>
          </h1>

          <motion.p
            className="text-base md:text-lg text-muted-foreground max-w-lg leading-relaxed mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.7 }}
          >
            From government procurement to digital transformation — RH International delivers integrated B2B & B2C solutions across continents.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-start gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.7 }}
          >
            <Link
              to="/services"
              className="group relative px-7 py-3.5 bg-primary text-primary-foreground rounded-xl text-sm font-semibold hover:bg-primary/90 transition-all duration-300 hover:shadow-[0_0_30px_hsl(var(--primary)/0.25)] flex items-center gap-2 overflow-hidden"
            >
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-transparent via-[hsl(0_0%_100%/0.2)] to-transparent"
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
              />
              <span className="relative">Explore Services</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform relative" />
            </Link>
            <Link
              to="/contact"
              className="px-7 py-3.5 rounded-xl text-sm font-semibold text-muted-foreground hover:text-foreground transition-all border border-border/30 bg-secondary/30 backdrop-blur-sm flex items-center gap-2 hover:border-primary/30"
            >
              Contact Us
            </Link>
          </motion.div>
        </motion.div>

        {/* Right — Metric cards */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="hidden lg:block"
        >
          <div className="grid grid-cols-2 gap-4">
            {[
              { value: "100+", label: "Projects Delivered", delay: 0.4 },
              { value: "5+", label: "Countries Served", delay: 0.5 },
              { value: "7+", label: "Service Verticals", delay: 0.6 },
              { value: "24/7", label: "Client Support", delay: 0.7 },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: stat.delay, duration: 0.6 }}
                whileHover={{
                  scale: 1.03,
                  borderColor: "hsl(var(--primary) / 0.3)",
                  transition: { duration: 0.3 },
                }}
                className="p-6 rounded-2xl border border-border/20 bg-card/30 backdrop-blur-sm transition-all duration-500 group"
              >
                <div
                  className="text-3xl font-bold text-gradient-cyan mb-1"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {stat.value}
                </div>
                <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Video play hint */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            whileHover={{ scale: 1.02, borderColor: "hsl(var(--primary) / 0.25)" }}
            className="mt-6 p-5 rounded-2xl border border-border/20 bg-card/20 backdrop-blur-sm flex items-center gap-4 cursor-pointer"
          >
            <motion.div
              className="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0"
              animate={{ boxShadow: [
                "0 0 0 0 hsl(var(--primary) / 0)",
                "0 0 0 8px hsl(var(--primary) / 0.1)",
                "0 0 0 0 hsl(var(--primary) / 0)",
              ]}}
              transition={{ duration: 2.5, repeat: Infinity }}
            >
              <Play className="w-5 h-5 text-primary ml-0.5" />
            </motion.div>
            <div>
              <p className="text-sm font-semibold text-foreground">Watch Our Story</p>
              <p className="text-xs text-muted-foreground">2 min overview of our services</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  </section>
);

export default HeroSection;
