import { motion } from "framer-motion";
import { Building2, MapPin, Phone, Mail, Globe, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const offices = [
  {
    city: "Dubai, UAE",
    label: "Regional HQ",
    address: "Business Bay, Dubai, UAE",
    phone: "+971 4 XXX XXXX",
    email: "dubai@rhinternational.com",
    highlight: true,
    timezone: "GMT+4",
    services: ["Company Formation", "Trade Facilitation", "PRO Services"],
    x: 590,
    y: 215,
  },
  {
    city: "Dhaka, Bangladesh",
    label: "Head Office",
    address: "Gulshan, Dhaka, Bangladesh",
    phone: "+880 1234 567890",
    email: "info@rhinternational.com",
    highlight: false,
    timezone: "GMT+6",
    services: ["Govt Tenders", "Printing Press", "IT Solutions", "Travel"],
    x: 665,
    y: 230,
  },
];

const presencePoints = [
  { name: "Portugal", flag: "🇵🇹", role: "Immigration Services", x: 390, y: 185 },
  { name: "Spain", flag: "🇪🇸", role: "Immigration Services", x: 400, y: 192 },
  { name: "Denmark", flag: "🇩🇰", role: "Immigration Services", x: 430, y: 155 },
];

const worldMapPaths = [
  "M120,120 L130,100 L160,90 L200,85 L230,95 L250,110 L260,130 L250,150 L235,170 L220,185 L200,195 L185,200 L170,210 L155,220 L140,210 L125,195 L115,180 L110,160 L112,140 Z",
  "M195,250 L210,245 L225,255 L235,275 L240,300 L235,330 L225,355 L215,375 L200,390 L190,380 L185,360 L180,340 L175,310 L178,285 L185,265 Z",
  "M410,100 L425,90 L445,85 L465,90 L480,100 L485,115 L475,130 L460,140 L445,150 L430,155 L415,150 L405,140 L400,125 L405,110 Z",
  "M420,180 L440,175 L460,180 L480,190 L490,210 L495,240 L490,270 L480,300 L465,320 L445,330 L425,325 L415,310 L410,285 L405,260 L408,235 L412,210 L415,195 Z",
  "M500,80 L540,70 L580,65 L620,60 L660,65 L700,75 L730,90 L740,110 L735,135 L720,155 L700,170 L680,180 L660,185 L640,190 L620,195 L600,200 L580,205 L560,200 L540,190 L520,175 L505,155 L498,135 L495,115 L497,95 Z",
  "M610,195 L630,200 L645,215 L650,235 L640,255 L625,265 L610,260 L600,245 L598,225 L602,210 Z",
  "M680,230 L700,225 L720,230 L740,240 L735,255 L720,260 L700,258 L685,250 L678,240 Z",
  "M720,310 L750,300 L780,305 L800,315 L805,335 L795,355 L775,365 L750,360 L730,350 L720,335 L718,320 Z",
  "M540,185 L560,180 L580,185 L590,200 L585,215 L570,225 L555,220 L545,210 L538,198 Z",
];

const connections = [
  { from: offices[1], to: offices[0] },
  { from: offices[1], to: presencePoints[0] },
  { from: offices[1], to: presencePoints[1] },
  { from: offices[1], to: presencePoints[2] },
  { from: offices[0], to: presencePoints[2] },
];

const generateCurvedPath = (x1: number, y1: number, x2: number, y2: number) => {
  const midX = (x1 + x2) / 2;
  const midY = Math.min(y1, y2) - Math.abs(x2 - x1) * 0.18;
  return `M${x1},${y1} Q${midX},${midY} ${x2},${y2}`;
};

const GlobalPresenceSection = () => {
  const [activePoint, setActivePoint] = useState<string | null>(null);
  const [activeOffice, setActiveOffice] = useState<number>(0);

  const allPoints = [
    ...offices.map((o) => ({ name: o.city, x: o.x, y: o.y, isOffice: true })),
    ...presencePoints.map((p) => ({ name: p.name, x: p.x, y: p.y, isOffice: false })),
  ];

  return (
    <section id="global-presence" className="relative z-10 pt-10 pb-10 px-6 overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-[radial-gradient(ellipse,hsl(var(--primary)/0.03),transparent_70%)] pointer-events-none" />

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
              <Globe className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs text-primary font-semibold tracking-wider uppercase">Global Presence</span>
            </div>
            <h2
              className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-foreground tracking-tight leading-[1.1]"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Offices Across{" "}
              <span className="text-gradient-cyan">Continents</span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-sm leading-relaxed max-w-sm lg:text-right"
          >
            Strategically positioned in Asia, the Middle East, and Europe — delivering local expertise with global reach.
          </motion.p>
        </div>

        {/* Map + Office detail — side by side on desktop */}
        <div className="grid lg:grid-cols-5 gap-6 mb-12">
          {/* SVG Map — spans 3 cols */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-3 relative rounded-3xl border border-border/15 bg-card/20 backdrop-blur-sm p-5 md:p-8 overflow-hidden"
          >
            {/* Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_65%_45%,hsl(var(--primary)/0.05),transparent)] pointer-events-none" />

            <svg
              viewBox="50 40 800 380"
              className="w-full h-auto relative z-10"
              style={{ maxHeight: "420px" }}
            >
              {/* Dot grid instead of lines */}
              {[...Array(12)].map((_, row) =>
                [...Array(16)].map((_, col) => (
                  <circle
                    key={`dot-${row}-${col}`}
                    cx={80 + col * 50}
                    cy={55 + row * 33}
                    r="0.8"
                    fill="hsl(var(--border))"
                    fillOpacity="0.25"
                  />
                ))
              )}

              {/* Continents */}
              {worldMapPaths.map((d, i) => (
                <motion.path
                  key={i}
                  d={d}
                  fill="hsl(var(--muted))"
                  fillOpacity="0.3"
                  stroke="hsl(var(--border))"
                  strokeOpacity="0.3"
                  strokeWidth="0.6"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 + i * 0.04 }}
                />
              ))}

              {/* Connection lines */}
              {connections.map((conn, i) => {
                const path = generateCurvedPath(conn.from.x, conn.from.y, conn.to.x, conn.to.y);
                return (
                  <g key={`conn-${i}`}>
                    <motion.path
                      d={path}
                      fill="none"
                      stroke="hsl(var(--primary))"
                      strokeOpacity="0.06"
                      strokeWidth="6"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.8, delay: 0.4 + i * 0.15, ease: "easeInOut" }}
                    />
                    <motion.path
                      d={path}
                      fill="none"
                      stroke="hsl(var(--primary))"
                      strokeOpacity="0.35"
                      strokeWidth="1"
                      strokeDasharray="5 4"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.8, delay: 0.4 + i * 0.15, ease: "easeInOut" }}
                    />
                  </g>
                );
              })}

              {/* Location points */}
              {allPoints.map((point, i) => (
                <g
                  key={point.name}
                  onMouseEnter={() => setActivePoint(point.name)}
                  onMouseLeave={() => setActivePoint(null)}
                  className="cursor-pointer"
                >
                  {/* Pulse */}
                  <motion.circle
                    cx={point.x}
                    cy={point.y}
                    r={point.isOffice ? 16 : 11}
                    fill="none"
                    stroke="hsl(var(--primary))"
                    strokeOpacity="0.15"
                    strokeWidth="1"
                    animate={{
                      scale: [1, 1.6, 1],
                      opacity: [0.25, 0, 0.25],
                    }}
                    transition={{
                      duration: 3.5,
                      repeat: Infinity,
                      delay: i * 0.5,
                      ease: "easeInOut",
                    }}
                  />
                  {/* Glow ring */}
                  <circle
                    cx={point.x}
                    cy={point.y}
                    r={point.isOffice ? 9 : 6}
                    fill="hsl(var(--primary))"
                    fillOpacity={activePoint === point.name ? 0.25 : 0.1}
                    className="transition-all duration-300"
                  />
                  {/* Core */}
                  <motion.circle
                    cx={point.x}
                    cy={point.y}
                    r={point.isOffice ? 4.5 : 3}
                    fill="hsl(var(--primary))"
                    fillOpacity={activePoint === point.name ? 1 : 0.75}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.6 + i * 0.1, type: "spring" }}
                  />

                  {/* Tooltip */}
                  {activePoint === point.name && (
                    <motion.g
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.15 }}
                    >
                      <rect
                        x={point.x - 52}
                        y={point.y - 40}
                        width="104"
                        height="28"
                        rx="6"
                        fill="hsl(var(--card))"
                        stroke="hsl(var(--primary))"
                        strokeOpacity="0.25"
                        strokeWidth="1"
                      />
                      <text
                        x={point.x}
                        y={point.y - 22}
                        textAnchor="middle"
                        fill="hsl(var(--foreground))"
                        fontSize="9.5"
                        fontWeight="600"
                        fontFamily="'Space Grotesk', sans-serif"
                      >
                        {point.name}
                      </text>
                    </motion.g>
                  )}
                </g>
              ))}
            </svg>

            {/* Legend */}
            <div className="flex flex-wrap items-center justify-center gap-5 mt-4 pt-4 border-t border-border/10">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-primary/80" />
                <span className="text-[11px] text-muted-foreground">Office</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary/50" />
                <span className="text-[11px] text-muted-foreground">Service Region</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-[1px] border-t border-dashed border-primary/40" />
                <span className="text-[11px] text-muted-foreground">Connection</span>
              </div>
            </div>
          </motion.div>

          {/* Office detail panel — spans 2 cols */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {/* Office tabs */}
            <div className="flex gap-2 p-1 rounded-xl bg-card/30 border border-border/15">
              {offices.map((office, i) => (
                <button
                  key={office.city}
                  onClick={() => setActiveOffice(i)}
                  className={`flex-1 px-4 py-2.5 rounded-lg text-xs font-semibold transition-all duration-300 ${activeOffice === i
                    ? "bg-primary/15 text-primary border border-primary/20"
                    : "text-muted-foreground hover:text-foreground border border-transparent"
                    }`}
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {office.city}
                </button>
              ))}
            </div>

            {/* Active office detail */}
            <motion.div
              key={activeOffice}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="flex-1 rounded-2xl border border-border/15 bg-card/20 backdrop-blur-sm p-7 flex flex-col"
            >
              {/* Header */}
              <div className="flex items-start gap-4 mb-6">
                <div className={`w-13 h-13 rounded-2xl flex items-center justify-center border ${offices[activeOffice].highlight
                  ? "bg-primary/15 border-primary/20"
                  : "bg-secondary/30 border-border/20"
                  }`}>
                  <Building2 className="w-5.5 h-5.5 text-primary" />
                </div>
                <div>
                  <h3
                    className="text-xl font-bold text-foreground"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    {offices[activeOffice].city}
                  </h3>
                  <div className="flex items-center gap-2.5 mt-1">
                    <span className="text-[10px] font-bold text-primary uppercase tracking-wider px-2 py-0.5 rounded-full bg-primary/10 border border-primary/15">
                      {offices[activeOffice].label}
                    </span>
                    <span className="text-[11px] text-muted-foreground/60">{offices[activeOffice].timezone}</span>
                  </div>
                </div>
              </div>

              {/* Contact details */}
              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-3 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4 text-primary/50 mt-0.5 shrink-0" />
                  {offices[activeOffice].address}
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Phone className="w-4 h-4 text-primary/50 shrink-0" />
                  {offices[activeOffice].phone}
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Mail className="w-4 h-4 text-primary/50 shrink-0" />
                  {offices[activeOffice].email}
                </div>
              </div>

              {/* Services at this office */}
              <div className="mt-auto">
                <p className="text-[10px] text-muted-foreground/50 uppercase tracking-wider font-semibold mb-3">Services Available</p>
                <div className="flex flex-wrap gap-2">
                  {offices[activeOffice].services.map((s) => (
                    <span key={s} className="px-3 py-1.5 text-[11px] font-medium text-muted-foreground rounded-lg border border-border/20 bg-secondary/20">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Contact CTA */}
            <Link
              to="/contact"
              className="group flex items-center justify-between p-4 rounded-xl border border-border/15 bg-card/20 hover:border-primary/25 hover:bg-primary/5 transition-all duration-500"
            >
              <span className="text-sm font-semibold text-foreground" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Get in Touch
              </span>
              <div className="w-9 h-9 rounded-full border border-border/20 flex items-center justify-center group-hover:border-primary/40 group-hover:bg-primary/10 transition-all duration-300">
                <ArrowUpRight className="w-4 h-4 text-muted-foreground/50 group-hover:text-primary transition-colors" />
              </div>
            </Link>
          </div>
        </div>

        {/* Countries strip */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap items-center justify-center gap-3"
        >
          {presencePoints.map((c, i) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group px-5 py-3 rounded-xl border border-border/20 bg-card/20 backdrop-blur-sm flex items-center gap-3 hover:border-primary/25 hover:bg-primary/5 transition-all duration-500"
            >
              <span className="text-xl">{c.flag}</span>
              <div>
                <span className="text-sm font-semibold text-foreground block" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {c.name}
                </span>
                <span className="text-[10px] text-muted-foreground/60 uppercase tracking-wider">{c.role}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default GlobalPresenceSection;
