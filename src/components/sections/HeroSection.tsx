import { motion } from "framer-motion";
import { MousePointer2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useMemo, useRef, Suspense, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Sphere, Html, Stars } from "@react-three/drei";
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

// --- Hero Section ---
const HeroSection = () => {
  const rotationControl = useRef(0);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#020611]">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-cyan-900/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full pt-20 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 items-center">

          {/* LEFT */}
          <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs font-bold uppercase mb-6">
              <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse" />
              Global Business Solutions
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
              Empowering <br />
              <span className="text-cyan-400">Businesses</span> <br />
              Worldwide
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-slate-400 mb-8">
              Join our network of global clients with 24/7 support.
            </p>

            <Link to="/services" className="px-6 py-3 bg-cyan-500 text-black rounded-full">
              Explore Services
            </Link>
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
            <div className="absolute bottom-0 sm:bottom-4 left-1/2 -translate-x-1/2 flex gap-3 z-20">
              <button
                onClick={() => (rotationControl.current += 0.01)}
                className="px-4 sm:px-6 py-2 bg-emerald-400 text-black rounded-full text-xs"
              >
                Next
              </button>

              <button
                onClick={() => (rotationControl.current -= 0.01)}
                className="px-4 sm:px-6 py-2 bg-white/10 text-white rounded-full text-xs"
              >
                Prev
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;