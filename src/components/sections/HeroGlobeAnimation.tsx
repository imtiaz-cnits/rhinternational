import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, MeshDistortMaterial, Float, Html } from "@react-three/drei";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, MousePointer2 } from "lucide-react";

// Individual Client Card on the Globe
const FloatingCard = ({ position, title, image }) => {
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <Html position={position} distanceFactor={10} transform occlude>
        <motion.div 
          whileHover={{ scale: 1.1 }}
          className="w-32 h-32 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-2 flex flex-col items-center justify-center cursor-pointer shadow-2xl"
        >
          <div className="w-16 h-16 bg-white/20 rounded-lg mb-2 overflow-hidden">
             {/* Replace with your image */}
            <img src={image} alt={title} className="w-full h-full object-cover" />
          </div>
          <p className="text-[10px] text-white font-bold uppercase tracking-tighter text-center leading-tight">
            {title}
          </p>
        </motion.div>
      </Html>
    </Float>
  );
};

const GlobeScene = () => {
  const globeRef = useRef();
  
  // Animation loop for rotation
  useFrame((state) => {
    if (globeRef.current) {
      globeRef.current.rotation.y += 0.002;
    }
  });

  const clients = [
    { pos: [4, 2, 0], title: "Company A", img: "https://via.placeholder.com/150" },
    { pos: [-4, -1, 2], title: "Client B", img: "https://via.placeholder.com/150" },
    { pos: [0, 4, -2], title: "Global Win", img: "https://via.placeholder.com/150" },
    { pos: [-3, 3, -3], title: "Tech Corp", img: "https://via.placeholder.com/150" },
    { pos: [2, -3, 4], title: "Future UI", img: "https://via.placeholder.com/150" },
  ];

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      
      <group ref={globeRef}>
        {/* The Central Glowing Globe */}
        <Sphere args={[3, 64, 64]}>
          <MeshDistortMaterial
            color="#0d9488"
            speed={2}
            distort={0.3}
            radius={1}
            wireframe
            opacity={0.3}
            transparent
          />
        </Sphere>

        {/* Orbit Rings */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[4.5, 0.01, 16, 100]} />
            <meshStandardMaterial color="#5eead4" emissive="#2dd4bf" emissiveIntensity={2} />
        </mesh>

        {/* Floating Interactive Cards */}
        {clients.map((client, i) => (
          <FloatingCard key={i} position={client.pos} title={client.title} image={client.img} />
        ))}
      </group>

      <OrbitControls enableZoom={false} autoRotate={false} />
    </>
  );
};

export default function InteractiveClientSection() {
  return (
    <div className="relative w-full h-[700px] bg-[#020617] overflow-hidden flex flex-col items-center justify-center">
      
      {/* Header Info */}
      <div className="absolute top-10 z-10 text-center pointer-events-none">
        <h2 className="text-4xl font-bold text-white mb-2 tracking-tight">Explore Client Wins Globally</h2>
        <div className="flex items-center justify-center gap-2 text-teal-400">
           <MousePointer2 size={16} />
           <span className="text-sm uppercase tracking-widest font-medium">Swipe to Rotate Clients</span>
        </div>
      </div>

      {/* 3D Canvas */}
      <div className="w-full h-full">
        <Canvas camera={{ position: [0, 0, 12], fov: 45 }}>
          <GlobeScene />
        </Canvas>
      </div>

      {/* Bottom Controls */}
      <div className="absolute bottom-10 flex gap-4 z-10">
        <button className="px-6 py-3 bg-teal-500 text-black font-bold rounded-full flex items-center gap-2 hover:bg-teal-400 transition-all">
          <ChevronLeft size={20} /> Next Client
        </button>
        <button className="px-6 py-3 border border-white/20 text-white font-bold rounded-full flex items-center gap-2 hover:bg-white/10 transition-all">
          Previous Client <ChevronRight size={20} />
        </button>
      </div>

      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-teal-500/20 blur-[120px] rounded-full -z-0" />
    </div>
  );
}