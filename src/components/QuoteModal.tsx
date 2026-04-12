import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, ChevronDown, Sparkles, FileText } from "lucide-react";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";

const quoteSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  phone: z.string().trim().max(30).optional(),
  company: z.string().trim().max(100).optional(),
  service: z.string().min(1, "Please select a service"),
  budget: z.string().optional(),
  message: z.string().trim().min(1, "Please describe your requirements").max(2000),
});

const services = [
  "Govt Tender",
  "Printing Press (PVC / Bag)",
  "IT Solution",
  "Travel Consultation",
  "Dubai Office Services",
  "Digital Service & E-commerce",
  "Other",
];

const budgets = ["Under $500", "$500 – $2,000", "$2,000 – $5,000", "$5,000 – $10,000", "$10,000+", "Not sure yet"];

interface QuoteModalProps {
  open: boolean;
  onClose: () => void;
}

const QuoteModal = ({ open, onClose }: QuoteModalProps) => {
  const { toast } = useToast();
  const [form, setForm] = useState({
    name: "", email: "", phone: "", company: "", service: "", budget: "", message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = quoteSchema.safeParse(form);
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
      toast({ title: "Quote request sent!", description: "We'll get back to you within 24 hours." });
      setForm({ name: "", email: "", phone: "", company: "", service: "", budget: "", message: "" });
      onClose();
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

  const selectClass = (name: string) => `${inputClass(name)} appearance-none cursor-pointer`;

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 30 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-3xl border border-border/15 bg-card/90 backdrop-blur-xl shadow-[0_25px_80px_rgba(0,0,0,0.5)]"
          >
            {/* Top accent line */}
            <motion.div
              className="h-px w-full"
              style={{ background: "linear-gradient(90deg, transparent, hsl(var(--primary)), transparent)" }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />

            {/* Background glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full bg-[radial-gradient(circle,hsl(var(--primary)/0.06),transparent_70%)] blur-3xl pointer-events-none" />

            <div className="relative p-8 md:p-10">
              {/* Close button */}
              <motion.button
                onClick={onClose}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                className="absolute top-5 right-5 w-10 h-10 rounded-xl flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary/50 border border-border/15 transition-colors"
              >
                <X className="w-4 h-4" />
              </motion.button>

              {/* Header */}
              <div className="flex items-center gap-4 mb-8">
                <motion.div
                  initial={{ scale: 0, rotate: -20 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center"
                  style={{ boxShadow: "0 0 30px hsl(var(--primary) / 0.1)" }}
                >
                  <FileText className="w-6 h-6 text-primary" />
                </motion.div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    Get a <span className="text-gradient-cyan">Quote</span>
                  </h2>
                  <p className="text-xs text-muted-foreground mt-0.5">We'll respond within 24 hours</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }}>
                    <label className="block text-[10px] text-muted-foreground font-semibold uppercase tracking-widest mb-1.5">Name *</label>
                    <input
                      name="name" value={form.name} onChange={handleChange} placeholder="Your name"
                      onFocus={() => setFocusedField("name")} onBlur={() => setFocusedField(null)}
                      className={inputClass("name")}
                    />
                    {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
                  </motion.div>
                  <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                    <label className="block text-[10px] text-muted-foreground font-semibold uppercase tracking-widest mb-1.5">Email *</label>
                    <input
                      name="email" value={form.email} onChange={handleChange} placeholder="your@email.com"
                      onFocus={() => setFocusedField("email")} onBlur={() => setFocusedField(null)}
                      className={inputClass("email")}
                    />
                    {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
                  </motion.div>
                </div>

                {/* Phone & Company */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
                    <label className="block text-[10px] text-muted-foreground font-semibold uppercase tracking-widest mb-1.5">Phone</label>
                    <input
                      name="phone" value={form.phone} onChange={handleChange} placeholder="+880 ..."
                      onFocus={() => setFocusedField("phone")} onBlur={() => setFocusedField(null)}
                      className={inputClass("phone")}
                    />
                  </motion.div>
                  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                    <label className="block text-[10px] text-muted-foreground font-semibold uppercase tracking-widest mb-1.5">Company</label>
                    <input
                      name="company" value={form.company} onChange={handleChange} placeholder="Company name"
                      onFocus={() => setFocusedField("company")} onBlur={() => setFocusedField(null)}
                      className={inputClass("company")}
                    />
                  </motion.div>
                </div>

                {/* Service */}
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
                  <label className="block text-[10px] text-muted-foreground font-semibold uppercase tracking-widest mb-1.5">Service Required *</label>
                  <div className="relative">
                    <select
                      name="service" value={form.service} onChange={handleChange}
                      onFocus={() => setFocusedField("service")} onBlur={() => setFocusedField(null)}
                      className={selectClass("service")}
                    >
                      <option value="">Select a service</option>
                      {services.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                    <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50 pointer-events-none" />
                  </div>
                  {errors.service && <p className="text-xs text-destructive mt-1">{errors.service}</p>}
                </motion.div>

                {/* Budget */}
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                  <label className="block text-[10px] text-muted-foreground font-semibold uppercase tracking-widest mb-1.5">Estimated Budget</label>
                  <div className="relative">
                    <select
                      name="budget" value={form.budget} onChange={handleChange}
                      onFocus={() => setFocusedField("budget")} onBlur={() => setFocusedField(null)}
                      className={selectClass("budget")}
                    >
                      <option value="">Select budget range</option>
                      {budgets.map((b) => <option key={b} value={b}>{b}</option>)}
                    </select>
                    <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50 pointer-events-none" />
                  </div>
                </motion.div>

                {/* Message */}
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}>
                  <label className="block text-[10px] text-muted-foreground font-semibold uppercase tracking-widest mb-1.5">Project Details *</label>
                  <textarea
                    name="message" value={form.message} onChange={handleChange} placeholder="Describe your requirements..."
                    rows={4}
                    onFocus={() => setFocusedField("message")} onBlur={() => setFocusedField(null)}
                    className={`${inputClass("message")} resize-none`}
                  />
                  {errors.message && <p className="text-xs text-destructive mt-1">{errors.message}</p>}
                </motion.div>

                <motion.button
                  type="submit"
                  disabled={sending}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full relative px-8 py-4 bg-primary text-primary-foreground rounded-xl text-sm font-semibold hover:bg-primary/90 transition-all duration-300 hover:shadow-[0_0_30px_hsl(var(--primary)/0.3)] flex items-center justify-center gap-2 disabled:opacity-60 mt-2 overflow-hidden"
                >
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-[hsl(0_0%_100%/0.12)] to-transparent"
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                  />
                  <span className="relative flex items-center gap-2">
                    {sending ? "Sending..." : <><Send className="w-4 h-4" /> Submit Request</>}
                  </span>
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default QuoteModal;
