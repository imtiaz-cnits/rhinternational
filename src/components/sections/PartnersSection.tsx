import { motion } from "framer-motion";
import { Building2, Landmark, Globe2, Ship, Cpu, Plane, ShoppingBag, Network } from "lucide-react";

const partners = [
  { name: "Ministry of Commerce", icon: Landmark },
  { name: "Dubai Chamber", icon: Building2 },
  { name: "Bangladesh Trade Corp", icon: Globe2 },
  { name: "EuroVisa Partners", icon: Plane },
  { name: "Gulf Logistics", icon: Ship },
  { name: "Nordic Business Hub", icon: Network },
  { name: "Asia Pacific Trade", icon: ShoppingBag },
  { name: "Digital Commerce Alliance", icon: Cpu },
];

const PartnersSection = () => (
  <section className="relative z-10 py-16 px-6">
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14"
      >
        <p className="text-xs text-muted-foreground/60 font-semibold tracking-[0.25em] uppercase mb-3">
          Trusted By Leading Organizations
        </p>
        <div className="w-12 h-[2px] bg-primary/30 mx-auto rounded-full" />
      </motion.div>

      {/* Infinite scroll marquee — two rows */}
      <div className="space-y-4 overflow-hidden">
        {/* Row 1 — scrolls left */}
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
          <div className="flex animate-[marquee_40s_linear_infinite] whitespace-nowrap">
            {[...Array(3)].map((_, rep) => (
              <div key={rep} className="flex items-center gap-4 px-2">
                {partners.slice(0, 4).map((partner) => (
                  <div
                    key={`${rep}-${partner.name}`}
                    className="group flex items-center gap-3 px-6 py-4 rounded-xl border border-border/15 bg-card/20 backdrop-blur-sm hover:border-primary/25 hover:bg-card/40 transition-all duration-500 cursor-default"
                  >
                    <div className="w-9 h-9 rounded-lg bg-primary/8 border border-primary/10 flex items-center justify-center group-hover:bg-primary/15 transition-colors duration-500">
                      <partner.icon className="w-4 h-4 text-primary/50 group-hover:text-primary/80 transition-colors duration-500" />
                    </div>
                    <span
                      className="text-sm font-semibold text-muted-foreground/50 group-hover:text-foreground/80 transition-colors duration-500 tracking-tight"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      {partner.name}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 — scrolls right */}
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
          <div className="flex animate-[marquee-reverse_45s_linear_infinite] whitespace-nowrap">
            {[...Array(3)].map((_, rep) => (
              <div key={rep} className="flex items-center gap-4 px-2">
                {partners.slice(4).map((partner) => (
                  <div
                    key={`${rep}-${partner.name}`}
                    className="group flex items-center gap-3 px-6 py-4 rounded-xl border border-border/15 bg-card/20 backdrop-blur-sm hover:border-primary/25 hover:bg-card/40 transition-all duration-500 cursor-default"
                  >
                    <div className="w-9 h-9 rounded-lg bg-primary/8 border border-primary/10 flex items-center justify-center group-hover:bg-primary/15 transition-colors duration-500">
                      <partner.icon className="w-4 h-4 text-primary/50 group-hover:text-primary/80 transition-colors duration-500" />
                    </div>
                    <span
                      className="text-sm font-semibold text-muted-foreground/50 group-hover:text-foreground/80 transition-colors duration-500 tracking-tight"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      {partner.name}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default PartnersSection;
