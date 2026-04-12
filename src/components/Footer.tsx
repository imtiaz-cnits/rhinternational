import { Link } from "react-router-dom";
import { Mail, Send } from "lucide-react";
import { useState } from "react";

const serviceLinks = [
  { label: "Govt Tender", path: "/services/govt-tender" },
  { label: "Printing Press", path: "/services/printing-press" },
  { label: "IT Solution", path: "/services/it-solution" },
  { label: "Travel Consultation", path: "/services/travel-consultation" },
  { label: "Dubai Office", path: "/services/dubai-office" },
  { label: "Digital Service", path: "/services/digital-service" },
];

const quickLinks = [
  { label: "Home", path: "/" },
  { label: "Services", path: "/services" },
  { label: "E-commerce Shop", path: "/shop" },
  { label: "Global Presence", path: "/global-presence" },
  { label: "Contact", path: "/contact" },
];

const legalLinks = [
  { label: "Privacy Policy", path: "#" },
  { label: "Terms & Conditions", path: "#" },
];

const Footer = () => {
  const [email, setEmail] = useState("");

  return (
    <footer className="relative z-10 border-t border-border/30 bg-card/30 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <p className="text-lg font-bold text-foreground mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              <span className="text-gradient-cyan">RH</span> International
            </p>
            <p className="text-xs text-muted-foreground tracking-widest uppercase mb-4">Sourcing Center</p>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mb-6">
              A multi-service business group delivering excellence across government, technology, travel, and digital solutions.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-3">
              {["LinkedIn", "Twitter", "Facebook"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-8 h-8 rounded-full bg-secondary/40 border border-border/30 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 transition-all text-[10px] font-bold"
                >
                  {social[0]}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-semibold text-foreground mb-4 tracking-widest uppercase">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((l) => (
                <li key={l.path}>
                  <Link to={l.path} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xs font-semibold text-foreground mb-4 tracking-widest uppercase">Services</h4>
            <ul className="space-y-2">
              {serviceLinks.map((s) => (
                <li key={s.path}>
                  <Link to={s.path} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-xs font-semibold text-foreground mb-4 tracking-widest uppercase">Newsletter</h4>
            <p className="text-sm text-muted-foreground mb-4">Subscribe for updates and insights.</p>
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground/50" />
                <input
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 text-sm bg-secondary/30 border border-border/30 rounded-full text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/40 transition-colors"
                />
              </div>
              <button className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-colors shrink-0">
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} RH International Sourcing Center. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {legalLinks.map((l) => (
              <a key={l.label} href={l.path} className="text-xs text-muted-foreground hover:text-primary transition-colors">
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
