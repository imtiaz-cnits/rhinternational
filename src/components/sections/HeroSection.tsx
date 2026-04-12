import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { ArrowRight, Play, Database, Globe as GlobeIcon, UserPlus, MousePointer2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useMemo, useRef, Suspense } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Sphere, Html, Float, Stars, Line } from "@react-three/drei";
import * as THREE from "three";

// --- 3D Globe Sub-Components ---

const RealGlobe = () => {
  const [dayMap, nightMap] = useLoader(THREE.TextureLoader, [
    "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg",
    "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_lights_2048.png"
  ]);

  return (
    <group>
      <Sphere args={[3, 64, 64]}>
        <meshStandardMaterial map={dayMap} roughness={0.7} metalness={0.2} />
      </Sphere>
      <Sphere args={[3.015, 64, 64]}>
        <meshStandardMaterial 
          map={nightMap} 
          transparent 
          opacity={0.5} 
          blending={THREE.AdditiveBlending} 
        />
      </Sphere>
    </group>
  );
};

const OrbitRings = () => {
  const orbits = useMemo(() => {
    const data = [];
    for (let i = 0; i < 4; i++) {
      const points = [];
      const radius = 3.8 + i * 0.5;
      for (let j = 0; j <= 64; j++) {
        const angle = (j / 64) * Math.PI * 2;
        points.push(new THREE.Vector3(Math.cos(angle) * radius, Math.sin(angle) * radius, 0));
      }
      data.push(points);
    }
    return data;
  }, []);

  return (
    <group rotation={[Math.PI / 3, 0.2, 0]}>
      {orbits.map((pts, i) => (
        <Line key={i} points={pts} color="#2dd4bf" lineWidth={0.5} opacity={0.2} transparent dashed dashSize={0.2} />
      ))}
    </group>
  );
};

const MetricTag = ({ position, label, value, Icon }: any) => (
  <Html position={position} center distanceFactor={10}>
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      className="px-4 py-2 rounded-xl bg-black/40 backdrop-blur-md border border-primary/30 flex items-center gap-3 shadow-2xl"
    >
      <div className="text-primary"><Icon size={16} /></div>
      <div className="whitespace-nowrap">
        <div className="text-sm font-bold text-white">{value}</div>
        <div className="text-[8px] text-gray-400 uppercase tracking-widest font-bold">{label}</div>
      </div>
    </motion.div>
  </Html>
);

const GlobeScene = () => {
  const groupRef = useRef<any>();
  useFrame(() => { if (groupRef.current) groupRef.current.rotation.y += 0.0015; });

  return (
    <group ref={groupRef}>
      <RealGlobe />
      <OrbitRings />
      <MetricTag position={[4.2, 2.5, 0]} label="Projects" value="100+" Icon={Database} />
      <MetricTag position={[-4.2, -1.8, 2]} label="Countries" value="5+" Icon={GlobeIcon} />
      <MetricTag position={[0, 4.5, -2]} label="Verticals" value="7+" Icon={UserPlus} />
    </group>
  );
};

// --- Background Components (Original) ---

const Particles = () => {
  const particles = useMemo(() => Array.from({ length: 40 }, (_, i) => ({
    id: i, x: Math.random() * 100, y: Math.random() * 100,
    size: Math.random() * 3 + 1, duration: Math.random() * 15 + 10,
    delay: Math.random() * 5, opacity: Math.random() * 0.3 + 0.05,
  })), []);
  return (
    <div className="absolute inset-0 overflow-hidden">
      {particles.map((p) => (
        <motion.div key={p.id} className="absolute rounded-full bg-primary"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
          animate={{ y: [0, -80, -160], x: [0, Math.random() > 0.5 ? 30 : -30, 0], opacity: [0, p.opacity, 0], scale: [0, 1, 0.5] }}
          transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
};

const HeroSection = () => {
  return (
    <section className="relative z-10 min-h-screen flex items-center justify-center overflow-hidden">
      {/* Cinematic Backgrounds */}
      <div className="absolute inset-0 bg-background dark:bg-[#020617]">
        <Particles />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(45,212,191,0.08),transparent_70%)]" />
        <motion.div 
            animate={{ opacity: [0.04, 0.08, 0.04] }} 
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute inset-0"
            style={{ backgroundImage: `linear-gradient(hsl(var(--primary)/0.07) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)/0.07) 1px, transparent 1px)`, backgroundSize: "80px 80px" }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-20 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Side Content (Keeping your original) */}
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
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-xs text-primary font-semibold tracking-wider uppercase">Global Business Solutions</span>
            </motion.div>

            <h1 className="text-5xl md:text-6xl lg:text-[4.5rem] font-bold leading-[1.05] mb-7 tracking-[-0.02em] text-foreground">
              Empowering<br />Businesses<br />
              <span className="text-gradient-cyan">Worldwide</span>
            </h1>

            <p className="text-base md:text-lg text-muted-foreground max-w-lg leading-relaxed mb-10">
              From government procurement to digital transformation — RH International delivers integrated B2B & B2C solutions across continents.
            </p>

            <div className="flex flex-col sm:flex-row items-start gap-4">
              <Link to="/services" className="px-7 py-3.5 bg-primary text-primary-foreground rounded-xl text-sm font-semibold hover:bg-primary/90 transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(45,212,191,0.3)]">
                Explore Services <ArrowRight size={16} />
              </Link>
              <Link to="/contact" className="px-7 py-3.5 rounded-xl text-sm font-semibold text-muted-foreground border border-border/30 bg-secondary/30 backdrop-blur-sm hover:text-foreground transition-all">
                Contact Us
              </Link>
            </div>
          </motion.div>

          {/* Right Side - Realistic 3D Globe */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.5 }}
            className="relative h-[500px] lg:h-[700px] w-full"
          >
            <Suspense fallback={
              <div className="w-full h-full flex items-center justify-center text-primary/50 text-xs font-bold tracking-[0.2em] animate-pulse">
                INITIALIZING GLOBAL INTEL...
              </div>
            }>
              <Canvas camera={{ position: [0, 0, 12], fov: 45 }} dpr={[1, 2]}>
                <ambientLight intensity={0.6} />
                <directionalLight position={[5, 3, 5]} intensity={1.5} color="#ffffff" />
                <pointLight position={[-5, -5, -5]} intensity={0.5} color="#2dd4bf" />
                <Stars radius={100} depth={50} count={5000} factor={4} fade speed={1} />
                
                <GlobeScene />
                <OrbitControls enableZoom={false} autoRotate={false} />
              </Canvas>
            </Suspense>

            {/* Interaction Hint */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-4">
               <div className="flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-md rounded-full border border-white/10">
                  <MousePointer2 size={14} className="text-primary" />
                  <span className="text-[10px] text-white/70 uppercase tracking-widest font-bold">Drag to explore globe</span>
               </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;