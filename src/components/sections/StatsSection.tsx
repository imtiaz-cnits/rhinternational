import { motion } from "framer-motion";
import { Zap, Globe, Shield } from "lucide-react";

const stats = [
  { value: "7+", label: "Service Verticals", icon: Zap },
  { value: "5+", label: "Countries Served", icon: Globe },
  { value: "100+", label: "Projects Delivered", icon: Shield },
  { value: "24/7", label: "Always Available", icon: Zap },
];

const StatsSection = () => (
  <section className="relative z-10 py-24 px-6">
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="rounded-2xl glass-card"
          >
            <div className="p-6 rounded-2xl text-center h-full">
              <stat.icon className="w-7 h-7 text-primary mx-auto mb-3 icon-glow" />
              <p
                className="text-4xl md:text-5xl font-bold text-gradient-cyan mb-1.5"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                {stat.value}
              </p>
              <p className="text-xs text-muted-foreground tracking-wider uppercase">{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default StatsSection;
