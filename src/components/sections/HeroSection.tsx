import { Html, OrbitControls, Sphere, Stars } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { motion } from "framer-motion";
import { ArrowRight, MousePointer2 } from "lucide-react";
import { Suspense, useEffect, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import * as THREE from "three";

// --- Surface Image Card ---
const SurfaceImageCard = ({
  lat,
  lon,
  url,
  radius,
}: {
  lat: number;
  lon: number;
  url: string;
  radius: number;
}) => {
  const { viewport } = useThree();

  // responsive distance
  const responsiveFactor = Math.min(viewport.width / 10, 1) * 10;

  const position = useMemo(() => {
    const phi = (90 - lat) * (Math.PI / 180);

    const SHIFT_THETA = 0.25;
    const theta = (lon + 180) * (Math.PI / 180) + SHIFT_THETA;

    const offset = 0.015 * Math.sin(lat * 2);

    return [
      -radius * Math.sin(phi) * Math.cos(theta),
      radius * Math.cos(phi) + offset,
      radius * Math.sin(phi) * Math.sin(theta),
    ] as [number, number, number];
  }, [lat, lon, radius]);

  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (groupRef.current) {
      groupRef.current.lookAt(new THREE.Vector3(0, 0, 0));
      groupRef.current.rotateX(Math.PI);
      groupRef.current.rotateZ(Math.PI);
    }
  }, [position]);

  return (
    <group position={position} ref={groupRef}>
      <Html transform occlude distanceFactor={responsiveFactor}>
        <motion.div
          whileHover={{ scale: 1.2 }}
          className="w-8 h-6 sm:w-9 sm:h-6 md:w-10 md:h-7 bg-white/10 backdrop-blur-md border border-white/30 rounded-sm overflow-hidden shadow-[0_0_10px_rgba(0,255,255,0.2)] cursor-pointer group"
        >
          <img
            src={url}
            alt="client"
            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
          />
        </motion.div>
      </Html>
    </group>
  );
};

// --- Globe Scene ---
const GlobeScene = ({ rotationControl }: { rotationControl: any }) => {
  const globeRef = useRef<THREE.Group>(null);
  const ringRefs = useRef<THREE.Mesh[]>([]);
  const { viewport } = useThree();

  const BASE_RADIUS = 3.2;

  // responsive scale
  const sceneScale = Math.min(viewport.width / 5, 1.2);

  const dynamicRadius = BASE_RADIUS * sceneScale;

  useFrame(() => {
    const baseSpeed = viewport.width < 6 ? 0.0015 : 0.0025;

    if (globeRef.current) {
      globeRef.current.rotation.y += baseSpeed + rotationControl.current;
    }

    ringRefs.current.forEach((ring, i) => {
      if (ring) {
        const speeds = [0.002, -0.0025, 0.003, -0.0015, 0.0022];
        const speed = speeds[i] || 0.002;

        ring.rotation.x += speed;
        ring.rotation.y += speed * 0.6;
        ring.rotation.z += speed * 0.4;
      }
    });
  });

  const rows = [
    { lat: 45, count: 14 },
    { lat: 20, count: 20 },
    { lat: -20, count: 20 },
    { lat: -45, count: 14 },
  ];

  const images = useMemo(() => {
    const temp: any[] = [];
    rows.forEach((row, rowIdx) => {
      for (let i = 0; i < row.count; i++) {
        const offset = rowIdx % 2 === 0 ? 0 : (360 / row.count) / 2;
        const lon = (i / row.count) * 360 + offset;
        temp.push({
          lat: row.lat,
          lon: lon,
          url: `https://picsum.photos/seed/${row.lat + i}/100/70`,
        });
      }
    });
    return temp;
  }, []);

  return (
    <group scale={sceneScale}>
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 3, 5]} intensity={2} color="#00ffff" />
      <pointLight position={[-10, -10, -10]} intensity={1} color="#0088ff" />

      <group ref={globeRef}>
        {/* Globe */}
        <Sphere args={[BASE_RADIUS, 64, 64]}>
          <meshStandardMaterial
            color="#010a15"
            emissive="#002233"
            roughness={0.2}
            metalness={0.8}
            transparent
            opacity={0.9}
          />
        </Sphere>

        {/* Grid */}
        <Sphere args={[BASE_RADIUS + 0.01, 32, 32]}>
          <meshBasicMaterial
            color="#00ffff"
            wireframe
            transparent
            opacity={0.06}
            blending={THREE.AdditiveBlending}
          />
        </Sphere>

        {/* Orbit Rings */}
        {[
          { r: BASE_RADIUS + 0.3 },
          { r: BASE_RADIUS + 0.5 },
          { r: BASE_RADIUS + 0.7 },
          { r: BASE_RADIUS + 0.9 },
          { r: BASE_RADIUS + 1.1 },
        ].map((orbit, i) => (
          <mesh
            key={i}
            ref={(el) => (ringRefs.current[i] = el!)}
            rotation={[
              Math.random() * Math.PI,
              Math.random() * Math.PI,
              Math.random() * Math.PI,
            ]}
          >
            <torusGeometry args={[orbit.r, 0.003, 16, 100]} />
            <meshBasicMaterial
              color="#00ffff"
              transparent
              opacity={0.08 + i * 0.04}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        ))}

        {/* Images */}
        {images.map((img, i) => (
          <SurfaceImageCard
            key={i}
            lat={img.lat}
            lon={img.lon}
            url={img.url}
            radius={dynamicRadius + 0.05}
          />
        ))}
      </group>

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI / 2}
        maxPolarAngle={Math.PI / 2}
      />
    </group>
  );
};

// Floating particles component
const Particles = () => {
  const particles = useMemo(
    () =>
      Array.from({ length: 40 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        duration: Math.random() * 15 + 10,
        delay: Math.random() * 5,
        opacity: Math.random() * 0.3 + 0.05,
      })),
    []
  );

  return (
    <div className="absolute inset-0 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-primary"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: [0, -80, -160],
            x: [0, Math.random() > 0.5 ? 30 : -30, 0],
            opacity: [0, p.opacity, 0],
            scale: [0, 1, 0.5],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

// Animated rings
const PulseRings = () => (
  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
    {[0, 1, 2, 3].map((i) => (
      <motion.div
        key={i}
        className="absolute rounded-full border border-primary/10"
        style={{
          width: 300 + i * 200,
          height: 300 + i * 200,
          top: -(150 + i * 100),
          left: -(150 + i * 100),
        }}
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.08 - i * 0.015, 0.15 - i * 0.02, 0.08 - i * 0.015],
          rotate: i % 2 === 0 ? [0, 360] : [360, 0],
        }}
        transition={{
          duration: 20 + i * 5,
          repeat: Infinity,
          ease: "linear",
          delay: i * 0.5,
        }}
      />
    ))}
  </div>
);

// Morphing blob
const MorphingBlob = () => (
  <motion.div
    className="absolute top-[15%] right-[8%] w-[500px] h-[500px] opacity-[0.12]"
    animate={{
      borderRadius: [
        "40% 60% 70% 30% / 40% 50% 60% 50%",
        "70% 30% 50% 50% / 30% 60% 40% 60%",
        "50% 60% 30% 70% / 60% 40% 60% 40%",
        "40% 60% 70% 30% / 40% 50% 60% 50%",
      ],
      rotate: [0, 90, 180, 360],
      scale: [1, 1.15, 0.9, 1],
    }}
    transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
    style={{
      background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--rh-green)), hsl(var(--rh-orange)))",
    }}
  />
);

// Horizontal scanning line
const ScanLine = () => (
  <motion.div
    className="absolute left-0 right-0 h-px"
    style={{
      background: "linear-gradient(90deg, transparent, hsl(var(--primary) / 0.15), transparent)",
    }}
    animate={{
      top: ["-5%", "105%"],
    }}
    transition={{
      duration: 8,
      repeat: Infinity,
      ease: "linear",
      repeatDelay: 3,
    }}
  />
);

// Hero Section
const HeroSection = () => {
  const rotationControl = useRef(0);

  return (
    <section className="relative z-10 min-h-screen flex items-center justify-center overflow-hidden bg-transparent backdrop-blur-[4px]">
      {/* Cinematic animated gradient background */}


      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 w-full pt-20 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 items-center">

          {/* Left — Text */}
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
              <motion.div
                className="w-2 h-2 rounded-full bg-primary"
                animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-xs text-primary font-semibold tracking-wider uppercase">
                YOUR GLOBAL SOURCING PARTNER
              </span>
            </motion.div>

            <h1
              className="text-5xl md:text-6xl lg:text-[4.5rem] font-bold leading-[1.05] mb-7 tracking-[-0.02em]"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              {"We Make".split(" ").map((char, i) => (
                <motion.span
                  key={`e-${i}`}
                  className="inline-block text-foreground"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.03, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  {char}
                </motion.span>
              ))}
              <br />
              <motion.span
                className="text-gradient-cyan inline-block"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                Global Business 
              </motion.span>
              <br />
              {"Easy for You.".split("").map((char, i) => (
                <motion.span
                  key={`b-${i}`}
                  className="inline-block text-foreground"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + i * 0.03, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  {char}
                </motion.span>
              ))}
              
            </h1>

            <motion.p
              className="text-base md:text-lg text-muted-foreground max-w-lg leading-relaxed mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3, duration: 0.7 }}
            >
             Whether you need to win government tenders, source premium commercial printing, or build a scalable digital brand, we’ve got you covered. We simplify complex challenges so you can focus on growing your business.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row items-start gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.7 }}
            >
              <Link
                to="/services"
                className="group relative px-7 py-3.5 bg-primary text-primary-foreground rounded-xl text-sm font-semibold hover:bg-primary/90 transition-all duration-300 hover:shadow-[0_0_30px_hsl(var(--primary)/0.25)] flex items-center gap-2 overflow-hidden"
              >
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-[hsl(0_0%_100%/0.2)] to-transparent"
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                />
                <span className="relative">Explore Our Services</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform relative" />
              </Link>
              <Link
                to="/contact"
                className="px-7 py-3.5 rounded-xl text-sm font-semibold text-muted-foreground hover:text-foreground transition-all border border-border/30 bg-secondary/30 backdrop-blur-sm flex items-center gap-2 hover:border-primary/30"
              >
                Let's Talk
              </Link>
            </motion.div>
          </motion.div>

          {/* RIGHT */}
          <div className="relative w-full h-[350px] sm:h-[450px] md:h-[550px] lg:h-[650px]">

            {/* Cursor */}
            <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
              <div className="flex flex-col items-center">
                <MousePointer2 className="text-cyan-400 animate-bounce w-4 h-4 sm:w-6 sm:h-6" />
                <span className="text-[10px] sm:text-xs text-white">GLOBAL CLIENTS</span>
              </div>
            </div>

            <Canvas className="z-0" camera={{ position: [0, 0, 18], fov: 35 }}>
              <Suspense fallback={null}>
                <GlobeScene rotationControl={rotationControl} />
                <Stars radius={100} depth={50} count={1500} factor={4} fade />
              </Suspense>
            </Canvas>

            {/* Buttons */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-3 z-20">
              <button
                onClick={() => (rotationControl.current -= 0.01)}
                className="px-4 sm:px-6 py-2 bg-white/10 text-white rounded-full text-xs"
              >
                Prev
              </button>

              <button
                onClick={() => (rotationControl.current += 0.01)}
                className="px-4 sm:px-6 py-2 bg-emerald-400 text-black rounded-full text-xs"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
