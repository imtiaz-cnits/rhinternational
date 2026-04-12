import { MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const locations = [
  { city: "Dhaka", country: "Bangladesh", type: "Head Office", address: "Dhaka, Bangladesh" },
  { city: "Dubai", country: "UAE", type: "Regional Office", address: "Dubai, United Arab Emirates" },
];

const Locations = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="fixed inset-0 mesh-gradient pointer-events-none" />
      <Navbar />

      <section className="relative z-10 pt-28 pb-16 px-6">
        <div className="max-w-5xl mx-auto">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 glow-cyan-sm">
              <MapPin className="w-7 h-7 text-primary" />
            </div>
            <p className="text-primary text-sm tracking-[0.3em] uppercase mb-3">Our Presence</p>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Our Locations</h1>
            <p className="text-lg text-muted-foreground max-w-2xl">Strategically positioned across Asia and the Middle East for global reach.</p>
          </motion.div>
        </div>
      </section>

      <section className="relative z-10 py-16 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {locations.map((loc, i) => (
            <motion.div key={loc.city} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15, duration: 0.6 }}
              className="p-8 rounded-2xl bg-card/40 backdrop-blur-sm gradient-border hover:bg-card/60 transition-colors"
            >
              <div className="w-3 h-3 rounded-full bg-primary mb-5 glow-cyan-sm" />
              <h3 className="text-2xl font-bold text-foreground mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{loc.city}</h3>
              <p className="text-primary text-sm mb-3">{loc.type}</p>
              <p className="text-muted-foreground text-sm">{loc.address}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Locations;
