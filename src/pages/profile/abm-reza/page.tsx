import { Briefcase, Linkedin, Mail, Globe, ArrowLeft, Download } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useMemo, useRef, useState, useEffect } from "react";

// Particles Component (From Team Page)
const HeroParticles = () => {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

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

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
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

export default function ABMRezaProfile() {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // 3D Tilt calculations
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 30 });

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  
  const handleLeave = () => { 
    x.set(0); 
    y.set(0); 
  };

  const accentColor = "180 60% 45%"; // Primary cyan accent from team page

  return (
    <div className="min-h-screen bg-background text-foreground flex justify-center py-12 px-4 font-sans relative overflow-hidden">
      
      {/* Background Mesh & Particles */}
      <div className="fixed inset-0 mesh-gradient pointer-events-none" />
      <HeroParticles />
      
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-md w-full relative z-10 flex flex-col">
        
        {/* Back Button */}
        <Link to="/team" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6 ml-2 w-fit">
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium">Back to Team</span>
        </Link>

        {/* 3D Tilt Card */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7 }}
          onMouseMove={handleMouse}
          onMouseLeave={handleLeave}
          style={{ rotateX, rotateY, transformPerspective: 1200 }}
          className="w-full group relative"
        >
          {/* Gradient border hover effect */}
          <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-primary/15 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="relative rounded-3xl border border-border/20 bg-card/30 backdrop-blur-md overflow-hidden pb-10">
            
            {/* Top accent line */}
            <motion.div
              className="h-1 w-full"
              style={{ background: `linear-gradient(90deg, transparent, hsl(${accentColor}), transparent)` }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
            />

            {/* Background radial glow */}
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
              style={{ background: `radial-gradient(circle, hsl(${accentColor} / 0.08), transparent 70%)` }}
            />

            <div className="relative pt-10 px-6 sm:px-10 text-center">
              
              {/* Avatar Section */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="mx-auto mb-8 relative w-36 h-36"
              >
                {/* Rotating dashed ring */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute -inset-2 rounded-full border border-dashed border-primary/20"
                />
                
                {/* Image Container */}
                <div 
                  className="w-full h-full rounded-full bg-gradient-to-br from-primary/20 via-primary/10 to-transparent border-2 border-primary/30 flex items-center justify-center group-hover:border-primary/50 transition-all duration-500 relative overflow-hidden"
                  style={{ boxShadow: `0 0 40px hsl(${accentColor} / 0.1)` }}
                >
                  <img 
                    src="/images/team/abm-reza.jpg" 
                    alt="ABM Reza" 
                    className="w-full h-full object-cover"
                    style={{ objectPosition: "center 10%" }}
                  />
                </div>
                
                {/* Online indicator */}
                <motion.div
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-background shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                />
              </motion.div>

              {/* Name */}
              <h1 
                className="text-3xl sm:text-4xl font-bold text-foreground mb-3 tracking-tight" 
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                ABM Reza
              </h1>

              {/* Title Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-8">
                <Briefcase className="w-3.5 h-3.5 text-primary" />
                <span className="text-sm font-semibold text-primary tracking-wide">Managing Director & Co-Founder</span>
              </div>

              {/* Bio */}
              <p className="text-muted-foreground text-[15px] leading-relaxed mb-8 max-w-sm mx-auto">
                As the visionary Managing Director & Co-Founder of RH International, ABM Reza laid the foundation of our company with a focus on trust, excellence, and global service integration. His leadership continues to guide our strategic direction.
              </p>

              {/* Expertise Tags */}
              <div className="flex flex-wrap justify-center gap-2 mb-10">
                {[
                  "Visionary Leadership",
                  "Global Trade",
                  "Strategic Partnerships"
                ].map((skill, idx) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + idx * 0.08 }}
                    whileHover={{ scale: 1.05, borderColor: `hsl(${accentColor} / 0.4)` }}
                    className="px-3 py-1.5 text-[11px] sm:text-xs font-medium text-foreground/70 rounded-full border border-border/25 bg-secondary/15 cursor-default"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>

              {/* Social / Contact Links */}
              <div className="flex justify-center gap-3 mb-8">
                {[
                  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com" },
                  { icon: Mail, label: "Email", href: "mailto:contact@rhinternational.com" },
                  { icon: Globe, label: "Website", href: "https://rhinternational.com" },
                ].map((item, idx) => (
                  <motion.a
                    key={idx}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-12 h-12 rounded-xl border border-border/25 bg-secondary/20 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 hover:bg-primary/10 transition-all duration-300"
                    title={item.label}
                  >
                    <item.icon size={18} />
                  </motion.a>
                ))}
              </div>

              {/* Save Contact Button */}
              <motion.button 
                onClick={() => {
                  const vcard = `BEGIN:VCARD\nVERSION:3.0\nN:Reza;ABM;;;\nFN:ABM Reza\nORG:RH International\nTITLE:Managing Director & Co-Founder\nEMAIL;TYPE=INTERNET:contact@rhinternational.com\nURL:https://rhinternational.com\nEND:VCARD`;
                  const blob = new Blob([vcard], { type: "text/vcard" });
                  const url = URL.createObjectURL(blob);
                  const link = document.createElement("a");
                  link.href = url;
                  link.download = "ABM_Reza.vcf";
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 rounded-xl bg-primary text-primary-foreground font-bold text-base flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,255,255,0.25)] hover:shadow-[0_0_30px_rgba(0,255,255,0.4)] transition-all"
              >
                <Download className="w-5 h-5" />
                Save Contact
              </motion.button>

            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
