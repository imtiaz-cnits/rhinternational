import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, ChevronDown, ArrowRight, Landmark, Printer, Monitor, Plane, Building2, Lightbulb, ShoppingBag, Globe, Users, Mail, LogIn, LogOut, User, LayoutDashboard, Package, ShoppingCart, Ticket } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import QuoteModal from "./QuoteModal";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import ThemeToggle from "@/components/ThemeToggle";
import logo from "@/assets/logo.png";

const adminLinks = [
  { label: "Overview", path: "/admin", icon: LayoutDashboard },
  { label: "Products", path: "/admin/products", icon: Package },
  { label: "Orders", path: "/admin/orders", icon: ShoppingCart },
  { label: "Tickets", path: "/admin/tickets", icon: Ticket },
  { label: "CRM Leads", path: "/admin/leads", icon: Users },
];

const megaMenuCategories = [
  {
    title: "Business",
    items: [
      { label: "Govt Tender", path: "/services/govt-tender", icon: Landmark, desc: "Procurement & consultancy" },
      { label: "Printing Press", path: "/services/printing-press", icon: Printer, desc: "PVC & bag printing" },
    ],
  },
  {
    title: "Technology",
    items: [
      { label: "IT Solution", path: "/services/it-solution", icon: Monitor, desc: "Web dev, SEO & infrastructure" },
      { label: "Digital Service", path: "/services/digital-service", icon: Lightbulb, desc: "Digital transformation" },
    ],
  },
  {
    title: "International",
    items: [
      { label: "Travel Consultation", path: "/services/travel-consultation", icon: Plane, desc: "Visa & travel advisory" },
      { label: "Dubai Office", path: "/services/dubai-office", icon: Building2, desc: "UAE operations hub" },
    ],
  },
];

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Services", path: "/services", mega: true },
  { label: "Shop", path: "/shop" },
  { label: "Global Presence", path: "/global-presence" },
  { label: "Team", path: "/team" },
  { label: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  useEffect(() => {
    if (!user) { setIsAdmin(false); return; }
    supabase.from("profiles").select("role").eq("id", user.id).maybeSingle()
      .then(({ data }) => setIsAdmin(data?.role === "admin" || data?.role === "editor"));
  }, [user]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setMegaOpen(false);
    setMobileServicesOpen(false);
    setAdminOpen(false);
  }, [location.pathname]);

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "border-b border-border/40 shadow-sm"
            : "border-b border-transparent"
        }`}
      >
        <div
          className={`absolute inset-0 transition-all duration-500 ${
            scrolled ? "bg-background/80 backdrop-blur-2xl" : "bg-background/40 backdrop-blur-xl"
          }`}
        />
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-6 h-[72px] flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <img src={logo} alt="RH International" className="h-[60px] w-auto" />
            <span className="text-lg font-bold text-foreground tracking-tight hidden sm:inline" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              RH International
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) =>
              link.mega ? (
                <div
                  key={link.path}
                  className="relative"
                  onMouseEnter={() => setMegaOpen(true)}
                  onMouseLeave={() => setMegaOpen(false)}
                >
                  <button
                    className={`flex items-center gap-1 px-3.5 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                      location.pathname.startsWith("/services")
                        ? "text-primary bg-primary/5"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary/40"
                    }`}
                  >
                    {link.label}
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${megaOpen ? "rotate-180" : ""}`} />
                  </button>

                  {/* Mega Menu */}
                  <AnimatePresence>
                    {megaOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.97 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className="absolute top-full -left-32 pt-3"
                      >
                        <div className="w-[720px] rounded-2xl border border-border/50 bg-card shadow-xl overflow-hidden">
                          {/* Top accent */}
                          <div className="h-[2px] bg-gradient-to-r from-rh-blue/60 via-rh-green/40 to-rh-orange/40" />

                          <div className="p-6 flex gap-6">
                            {/* Service categories */}
                            {megaMenuCategories.map((category) => (
                              <div key={category.title} className="flex-1">
                                <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.15em] mb-3 px-2">
                                  {category.title}
                                </h4>
                                <div className="space-y-1">
                                  {category.items.map((item) => {
                                    const Icon = item.icon;
                                    return (
                                      <Link
                                        key={item.path}
                                        to={item.path}
                                        className={`group/item flex items-start gap-3 p-3 rounded-xl transition-all duration-200 ${
                                          isActive(item.path)
                                            ? "bg-primary/10 border border-primary/20"
                                            : "hover:bg-secondary/50 border border-transparent"
                                        }`}
                                      >
                                        <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-all duration-300 ${
                                          isActive(item.path)
                                            ? "bg-primary/20 text-primary"
                                            : "bg-secondary/60 text-muted-foreground group-hover/item:bg-primary/15 group-hover/item:text-primary"
                                        }`}>
                                          <Icon className="w-4 h-4" />
                                        </div>
                                        <div className="min-w-0">
                                          <span className={`text-sm font-semibold block transition-colors ${
                                            isActive(item.path) ? "text-primary" : "text-foreground"
                                          }`}>
                                            {item.label}
                                          </span>
                                          <span className="text-xs text-muted-foreground leading-tight">{item.desc}</span>
                                        </div>
                                      </Link>
                                    );
                                  })}
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* Footer */}
                          <div className="px-6 py-4 border-t border-border/20 bg-secondary/20 flex items-center justify-between">
                            <Link
                              to="/services"
                              className="group/all flex items-center gap-2 text-sm font-semibold text-foreground hover:text-primary transition-colors"
                            >
                              View all services
                              <ArrowRight className="w-3.5 h-3.5 group-hover/all:translate-x-1 transition-transform" />
                            </Link>
                            <button
                              onClick={() => { setMegaOpen(false); setQuoteOpen(true); }}
                              className="px-4 py-2 text-xs font-semibold bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all hover:shadow-[0_0_15px_hsl(var(--primary)/0.2)]"
                            >
                              Get a Quote
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative px-3.5 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                    isActive(link.path)
                      ? "text-primary bg-primary/5"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/40"
                  }`}
                >
                  {isActive(link.path) && (
                    <motion.div
                      layoutId="nav-active"
                      className="absolute bottom-0 left-3 right-3 h-[2px] bg-primary rounded-full"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  {link.label}
                </Link>
              )
            )}

            {/* Admin Dropdown (desktop) */}
            {isAdmin && (
              <div
                className="relative"
                onMouseEnter={() => setAdminOpen(true)}
                onMouseLeave={() => setAdminOpen(false)}
              >
                <button
                  className={`flex items-center gap-1 px-3.5 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                    location.pathname.startsWith("/admin")
                      ? "text-primary bg-primary/5"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/40"
                  }`}
                >
                  <LayoutDashboard className="w-3.5 h-3.5 mr-1" />
                  Admin
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${adminOpen ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {adminOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.97 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute top-full right-0 pt-2"
                    >
                      <div className="w-52 rounded-xl border border-border/50 bg-card shadow-xl overflow-hidden">
                        <div className="h-[2px] bg-gradient-to-r from-primary/60 via-primary/30 to-transparent" />
                        <div className="p-2">
                          {adminLinks.map((item) => {
                            const Icon = item.icon;
                            const active = item.path === "/admin" ? location.pathname === "/admin" : location.pathname.startsWith(item.path);
                            return (
                              <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                                  active
                                    ? "text-primary bg-primary/10"
                                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                                }`}
                              >
                                <Icon className="w-4 h-4" />
                                {item.label}
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>

          {/* CTA + Auth + Mobile toggle */}
           <div className="flex items-center gap-3">
            <ThemeToggle />
            {user ? (
              <button
                onClick={async () => { await signOut(); navigate("/"); }}
                className="hidden lg:flex items-center gap-2 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground border border-border/30 rounded-xl hover:bg-secondary/40 transition-all"
              >
                <LogOut className="w-3.5 h-3.5" />
                Sign Out
              </button>
            ) : (
              <Link
                to="/auth"
                className="hidden lg:flex items-center gap-2 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground border border-border/30 rounded-xl hover:bg-secondary/40 transition-all"
              >
                <LogIn className="w-3.5 h-3.5" />
                Sign In
              </Link>
            )}
            <button
              onClick={() => setQuoteOpen(true)}
              className="hidden lg:flex items-center gap-2 px-5 py-2.5 text-sm font-semibold bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-all duration-300 hover:shadow-[0_0_25px_hsl(var(--primary)/0.3)] hover:scale-[1.02] active:scale-[0.98]"
            >
              Get a Quote
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden relative z-10 p-2 rounded-lg hover:bg-secondary/50 transition-colors"
            >
              <AnimatePresence mode="wait">
                {open ? (
                  <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <X size={22} className="text-foreground" />
                  </motion.div>
                ) : (
                  <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <Menu size={22} className="text-foreground" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="lg:hidden relative border-t border-border/20 bg-background/98 backdrop-blur-2xl overflow-hidden"
            >
              <div className="px-6 py-5 flex flex-col gap-1">
                {navLinks.map((link) =>
                  link.mega ? (
                    <div key={link.path}>
                      <button
                        onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                          location.pathname.startsWith("/services")
                            ? "text-primary bg-primary/5"
                            : "text-muted-foreground hover:text-foreground hover:bg-secondary/40"
                        }`}
                      >
                        {link.label}
                        <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${mobileServicesOpen ? "rotate-180" : ""}`} />
                      </button>
                      <AnimatePresence>
                        {mobileServicesOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="pl-2 pt-1 space-y-3">
                              {megaMenuCategories.map((cat) => (
                                <div key={cat.title}>
                                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.15em] px-4 mb-1 block">{cat.title}</span>
                                  {cat.items.map((item) => {
                                    const Icon = item.icon;
                                    return (
                                      <Link
                                        key={item.path}
                                        to={item.path}
                                        onClick={() => setOpen(false)}
                                        className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-colors ${
                                          isActive(item.path) ? "text-primary font-medium" : "text-muted-foreground hover:text-foreground"
                                        }`}
                                      >
                                        <Icon className="w-4 h-4" />
                                        {item.label}
                                      </Link>
                                    );
                                  })}
                                </div>
                              ))}
                              <Link
                                to="/services"
                                onClick={() => setOpen(false)}
                                className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-primary"
                              >
                                All Services <ArrowRight className="w-3.5 h-3.5" />
                              </Link>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setOpen(false)}
                      className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                        isActive(link.path)
                          ? "text-primary bg-primary/5"
                          : "text-muted-foreground hover:text-foreground hover:bg-secondary/40"
                      }`}
                    >
                      {link.label}
                    </Link>
                  )
                )}
                {/* Admin links (mobile) */}
                {isAdmin && (
                  <div className="pt-2 mt-2 border-t border-border/20">
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.15em] px-4 mb-1 block">Admin</span>
                    {adminLinks.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.path}
                          to={item.path}
                          onClick={() => setOpen(false)}
                          className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                            (item.path === "/admin" ? location.pathname === "/admin" : location.pathname.startsWith(item.path))
                              ? "text-primary bg-primary/5"
                              : "text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                          {item.label}
                        </Link>
                      );
                    })}
                  </div>
                )}
                <div className="pt-3 mt-2 border-t border-border/20">
                  <button
                    onClick={() => { setOpen(false); setQuoteOpen(true); }}
                    className="w-full flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold bg-primary text-primary-foreground rounded-xl"
                  >
                    Get a Quote <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      <QuoteModal open={quoteOpen} onClose={() => setQuoteOpen(false)} />
    </>
  );
};

export default Navbar;
