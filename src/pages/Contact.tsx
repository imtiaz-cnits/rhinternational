import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { ArrowRight, Building2, Clock, Globe, Mail, MapPin, MessageCircle, Phone, Send } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email address").max(255),
  subject: z.string().trim().min(1, "Subject is required").max(200),
  message: z.string().trim().min(1, "Message is required").max(2000),
});

const contactInfo = [
  { icon: Mail, label: "Email Us", value: "info@rhinternationalsc.com", href: "mailto:info@rhinternationalsc.com", accent: "213 55% 50%" },
  { icon: Phone, label: "Call Us", value: "+880 1319-855960", href: "tel:+8801319855960", accent: "200 55% 48%" },
  { icon: MapPin, label: "Head Office", value: "Zahir Uddin Market, Mirer Bazar, Pubail, Gazipur, Bangladesh", href: undefined, accent: "260 55% 55%" },
  { icon: Clock, label: "Working Hours", value: "Sat - Thu, 9:00 AM - 6:00 PM (GMT+6)", href: undefined, accent: "35 80% 55%" },
];

const offices = [
  { city: "Dhaka, Bangladesh", label: "Head Office", timezone: "GMT+6" },
  { city: "Dubai, UAE", label: "Regional HQ", timezone: "GMT+4" },
];

// Particles
const HeroParticles = () => {
  const particles = useMemo(
    () => Array.from({ length: 20 }, (_, i) => ({
      id: i, x: Math.random() * 100, y: Math.random() * 100,
      size: Math.random() * 2.5 + 1, duration: Math.random() * 12 + 8, delay: Math.random() * 4,
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

const Contact = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = contactSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setSending(true);
    setTimeout(() => {
      setSending(false);
      toast({ title: "Message sent!", description: "We'll get back to you within 24 hours." });
      setForm({ name: "", email: "", subject: "", message: "" });
    }, 1500);
  };

  const inputClass = (name: string) =>
    `w-full px-4 py-3.5 text-sm rounded-xl bg-secondary/30 border text-foreground placeholder:text-muted-foreground/40 focus:outline-none transition-all duration-300 ${
      focusedField === name
        ? "border-primary/40 shadow-[0_0_20px_hsl(var(--primary)/0.1)] bg-secondary/40"
        : errors[name]
        ? "border-destructive/40"
        : "border-border/25 hover:border-border/40"
    }`;

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="fixed inset-0 mesh-gradient pointer-events-none" />
      <Navbar />

      {/* Hero */}
      <section className="relative z-10 pt-32 pb-24 px-6 overflow-hidden">
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

        <div className="max-w-6xl mx-auto text-center relative">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full border border-primary/25 bg-primary/5 backdrop-blur-sm mb-8"
            >
              <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 3, repeat: Infinity }}>
                <Mail className="w-4 h-4 text-primary" />
              </motion.div>
              <span className="text-xs text-primary font-semibold tracking-wider uppercase">Let's Connect</span>
            </motion.div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              {"Let's Talk".split("").map((char, i) => (
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
                transition={{ delay: 0.7, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                Business
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.7 }}
              className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed"
            >
              Got a major project in mind, or need expert consultancy? Drop us a line. Our team is ready to help you build and scale something extraordinary.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Main content */}
      <section className="relative z-10 px-6 pb-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-3 relative group"
          >
            {/* Gradient border on hover */}
            <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-primary/15 via-transparent to-rh-green/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative rounded-3xl border border-border/15 bg-card/25 backdrop-blur-sm overflow-hidden">
              {/* Top accent */}
              <motion.div
                className="h-px w-full"
                style={{ background: "linear-gradient(90deg, transparent, hsl(var(--primary)), transparent)" }}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3 }}
              />

              <div className="p-8 md:p-10">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <Send className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-foreground tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      Send us a Message
                    </h2>
                    <p className="text-xs text-muted-foreground">Fill out the form below, and our team will get back to you within 24 hours with a tailored response.</p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <motion.div
                      initial={{ opacity: 0, x: -15 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 }}
                    >
                      <label className="block text-[10px] text-muted-foreground font-semibold uppercase tracking-widest mb-2">Name *</label>
                      <input
                        name="name" value={form.name} onChange={handleChange} placeholder="Your full name"
                        onFocus={() => setFocusedField("name")} onBlur={() => setFocusedField(null)}
                        className={inputClass("name")}
                      />
                      {errors.name && <p className="text-xs text-destructive mt-1.5">{errors.name}</p>}
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, x: 15 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.15 }}
                    >
                      <label className="block text-[10px] text-muted-foreground font-semibold uppercase tracking-widest mb-2">Email *</label>
                      <input
                        name="email" value={form.email} onChange={handleChange} placeholder="your.email@example.com"
                        onFocus={() => setFocusedField("email")} onBlur={() => setFocusedField(null)}
                        className={inputClass("email")}
                      />
                      {errors.email && <p className="text-xs text-destructive mt-1.5">{errors.email}</p>}
                    </motion.div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                  >
                    <label className="block text-[10px] text-muted-foreground font-semibold uppercase tracking-widest mb-2">Subject *</label>
                    <input
                      name="subject" value={form.subject} onChange={handleChange} placeholder="How can we help your business grow?"
                      onFocus={() => setFocusedField("subject")} onBlur={() => setFocusedField(null)}
                      className={inputClass("subject")}
                    />
                    {errors.subject && <p className="text-xs text-destructive mt-1.5">{errors.subject}</p>}
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.25 }}
                  >
                    <label className="block text-[10px] text-muted-foreground font-semibold uppercase tracking-widest mb-2">Message *</label>
                    <textarea
                      name="message" value={form.message} onChange={handleChange} placeholder="Tell us a bit about your project, timeline, or specific requirements..."
                      rows={5}
                      onFocus={() => setFocusedField("message")} onBlur={() => setFocusedField(null)}
                      className={`${inputClass("message")} resize-none`}
                    />
                    {errors.message && <p className="text-xs text-destructive mt-1.5">{errors.message}</p>}
                  </motion.div>

                  <motion.button
                    type="submit"
                    disabled={sending}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full sm:w-auto relative px-8 py-3.5 bg-primary text-primary-foreground rounded-xl text-sm font-semibold hover:bg-primary/90 transition-all duration-300 hover:shadow-[0_0_30px_hsl(var(--primary)/0.3)] flex items-center justify-center gap-2 disabled:opacity-60 overflow-hidden"
                  >
                    <motion.span
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-[hsl(0_0%_100%/0.12)] to-transparent"
                      animate={{ x: ["-100%", "200%"] }}
                      transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                    />
                    <span className="relative flex items-center gap-2">
                      {sending ? "Sending..." : <><Send className="w-4 h-4" /> Send Message</>}
                    </span>
                  </motion.button>
                </form>
              </div>
            </div>
          </motion.div>

          {/* Sidebar */}
          <div className="lg:col-span-2 space-y-5">
            {/* Contact Info Cards */}
            {contactInfo.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
                whileHover={{ x: -4, borderColor: `hsl(${item.accent} / 0.3)` }}
                className="rounded-2xl border border-border/15 bg-card/25 backdrop-blur-sm p-5 group/card relative overflow-hidden"
              >
                {/* Hover glow */}
                <div
                  className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-500"
                  style={{ background: `radial-gradient(circle, hsl(${item.accent} / 0.08), transparent 70%)` }}
                />

                {item.href ? (
                  <a href={item.href} className="flex items-start gap-4 relative">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0"
                    >
                      <item.icon className="w-5 h-5 text-primary" />
                    </motion.div>
                    <div>
                      <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold mb-1">{item.label}</p>
                      <p className="text-sm text-foreground font-medium group-hover/card:text-primary transition-colors">{item.value}</p>
                    </div>
                  </a>
                ) : (
                  <div className="flex items-start gap-4 relative">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold mb-1">{item.label}</p>
                      <p className="text-sm text-muted-foreground">{item.value}</p>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}

            {/* WhatsApp CTA */}
            <motion.a
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.45 }}
              whileHover={{ x: -4, scale: 1.01 }}
              href={`https://wa.me/8801234567890?text=${encodeURIComponent("Hi, I'm interested in your services.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-5 rounded-2xl border border-[hsl(142_70%_40%/0.2)] bg-[hsl(142_70%_20%/0.1)] backdrop-blur-sm hover:bg-[hsl(142_70%_20%/0.2)] transition-all group/wa relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-[radial-gradient(circle,hsl(142_70%_40%/0.08),transparent_70%)] blur-2xl opacity-0 group-hover/wa:opacity-100 transition-opacity duration-500" />
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="w-12 h-12 rounded-xl bg-[hsl(142_70%_40%/0.15)] border border-[hsl(142_70%_40%/0.2)] flex items-center justify-center shrink-0"
              >
                <MessageCircle className="w-5 h-5 text-[hsl(142_70%_55%)]" />
              </motion.div>
              <div className="relative">
                <p className="text-[10px] text-[hsl(142_70%_55%)] uppercase tracking-widest font-semibold mb-1">WhatsApp</p>
                <p className="text-sm text-foreground font-medium">Fastest way to reach our support team.</p>
              </div>
            </motion.a>

            {/* Quick office links */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="rounded-2xl border border-border/15 bg-card/20 backdrop-blur-sm p-5"
            >
              <div className="flex items-center gap-2 mb-4">
                <Building2 className="w-4 h-4 text-primary" />
                <p className="text-xs text-muted-foreground uppercase tracking-widest font-semibold">Our Offices</p>
              </div>
              <div className="space-y-3">
                {offices.map((office) => (
                  <div key={office.city} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-foreground">{office.city}</p>
                      <p className="text-[10px] text-muted-foreground">{office.label} · {office.timezone}</p>
                    </div>
                    <motion.div
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"
                    />
                  </div>
                ))}
              </div>
              <Link
                to="/global-presence"
                className="mt-4 flex items-center gap-1.5 text-xs text-primary font-semibold hover:gap-2.5 transition-all"
              >
                View all locations <ArrowRight className="w-3 h-3" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map placeholder / CTA */}
      <section className="relative z-10 px-6 pb-28">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-border/15 bg-card/15 backdrop-blur-sm p-12 md:p-16 text-center relative overflow-hidden"
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1], opacity: [0.04, 0.08, 0.04] }}
              transition={{ duration: 6, repeat: Infinity }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[radial-gradient(circle,hsl(var(--primary)),transparent_60%)] blur-3xl"
            />
            <div className="relative">
              <Globe className="w-12 h-12 text-primary/30 mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Ready to <span className="text-gradient-cyan">Collaborate</span>?
              </h2>
              <p className="text-muted-foreground max-w-lg mx-auto mb-8 leading-relaxed">
                Whether you need flawless e-GP tender support, high-volume commercial printing, or a next-gen digital platform—we have the expertise to make it happen. Let’s start the conversation today.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  to="/services"
                  className="group inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-xl text-sm font-semibold hover:bg-primary/90 transition-all duration-300 hover:shadow-[0_0_30px_hsl(var(--primary)/0.3)]"
                >
                  Explore Services
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
                <Link
                  to="/global-presence"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-sm font-semibold text-muted-foreground hover:text-foreground border border-border/25 bg-secondary/20 hover:border-primary/30 transition-all"
                >
                  Our Locations
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
