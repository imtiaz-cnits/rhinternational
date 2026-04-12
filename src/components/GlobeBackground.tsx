import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// Brand colors
const BLUE = new THREE.Color("hsl(213, 60%, 45%)");
const GREEN = new THREE.Color("hsl(120, 55%, 38%)");
const ORANGE = new THREE.Color("hsl(30, 90%, 52%)");

// ── Helpers ──
const toSphere = (lat: number, lon: number, r: number) => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta)
  );
};

// ── Continent dots ──
function ContinentDots() {
  const { positions, count } = useMemo(() => {
    const regions = [
      { latRange: [25, 70], lonRange: [-130, -60], prob: 0.12 },
      { latRange: [7, 25], lonRange: [-110, -75], prob: 0.4 },
      { latRange: [-55, 12], lonRange: [-80, -35], prob: 0.15 },
      { latRange: [35, 70], lonRange: [-10, 40], prob: 0.08 },
      { latRange: [-35, 37], lonRange: [-18, 52], prob: 0.12 },
      { latRange: [40, 70], lonRange: [40, 180], prob: 0.18 },
      { latRange: [12, 40], lonRange: [25, 65], prob: 0.28 },
      { latRange: [5, 35], lonRange: [65, 100], prob: 0.12 },
      { latRange: [18, 55], lonRange: [100, 145], prob: 0.18 },
      { latRange: [-10, 20], lonRange: [95, 140], prob: 0.3 },
      { latRange: [-40, -10], lonRange: [112, 155], prob: 0.2 },
    ];

    const pts: THREE.Vector3[] = [];
    const step = 2.5;
    regions.forEach((region) => {
      for (let lat = region.latRange[0]; lat <= region.latRange[1]; lat += step) {
        for (let lon = region.lonRange[0]; lon <= region.lonRange[1]; lon += step) {
          if (Math.random() > region.prob) {
            pts.push(toSphere(lat, lon, 1.005));
          }
        }
      }
    });

    const arr = new Float32Array(pts.length * 3);
    pts.forEach((p, i) => { arr[i * 3] = p.x; arr[i * 3 + 1] = p.y; arr[i * 3 + 2] = p.z; });
    return { positions: arr, count: pts.length };
  }, []);

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        vertexShader: `
          void main() {
            vec4 mv = modelViewMatrix * vec4(position, 1.0);
            gl_PointSize = 2.0 / -mv.z;
            gl_Position = projectionMatrix * mv;
          }
        `,
        fragmentShader: `
          void main() {
            float d = length(gl_PointCoord - 0.5);
            if (d > 0.5) discard;
            gl_FragColor = vec4(0.18, 0.55, 0.34, smoothstep(0.5, 0.0, d) * 0.5);
          }
        `,
      }),
    []
  );

  return (
    <points material={material}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
    </points>
  );
}

// ── Glass sphere ──
function GlassSphere() {
  const mat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        side: THREE.FrontSide,
        uniforms: { uTime: { value: 0 } },
        vertexShader: `
          varying vec3 vNormal;
          varying vec3 vPos;
          void main() {
            vNormal = normalize(normalMatrix * normal);
            vPos = position;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform float uTime;
          varying vec3 vNormal;
          varying vec3 vPos;
          void main() {
            float fresnel = pow(1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0))), 2.5);
            
            // Blue edge
            vec3 blueColor = vec3(0.18, 0.42, 0.72);
            // Green tint
            vec3 greenColor = vec3(0.18, 0.55, 0.34);
            // Orange tint
            vec3 orangeColor = vec3(0.85, 0.55, 0.15);
            
            float angle = atan(vPos.z, vPos.x);
            float blend = sin(angle * 2.0 + uTime * 0.3) * 0.5 + 0.5;
            float blend2 = cos(angle * 1.5 - uTime * 0.2) * 0.5 + 0.5;
            
            vec3 color = mix(blueColor, greenColor, blend * 0.4);
            color = mix(color, orangeColor, blend2 * 0.15);
            
            float alpha = fresnel * 0.12;
            gl_FragColor = vec4(color, alpha);
          }
        `,
      }),
    []
  );

  useFrame((_, delta) => { mat.uniforms.uTime.value += delta; });

  return (
    <mesh material={mat}>
      <sphereGeometry args={[1, 64, 64]} />
    </mesh>
  );
}

// ── Atmosphere glow ──
function Atmosphere() {
  const mat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        transparent: true,
        side: THREE.BackSide,
        depthWrite: false,
        uniforms: { uTime: { value: 0 } },
        vertexShader: `
          varying vec3 vNormal;
          void main() {
            vNormal = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform float uTime;
          varying vec3 vNormal;
          void main() {
            float intensity = pow(0.65 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 4.0);
            vec3 blue = vec3(0.18, 0.42, 0.72);
            vec3 green = vec3(0.18, 0.55, 0.34);
            vec3 color = mix(blue, green, sin(uTime * 0.3) * 0.5 + 0.5);
            gl_FragColor = vec4(color, intensity * 0.2);
          }
        `,
      }),
    []
  );

  useFrame((_, delta) => { mat.uniforms.uTime.value += delta; });

  return (
    <mesh material={mat}>
      <sphereGeometry args={[1.15, 64, 64]} />
    </mesh>
  );
}

// ── Wireframe grid ──
function WireframeGrid() {
  const geo = useMemo(() => new THREE.WireframeGeometry(new THREE.SphereGeometry(1.002, 36, 18)), []);

  return (
    <lineSegments geometry={geo}>
      <lineBasicMaterial color="#1a6b3a" transparent opacity={0.04} />
    </lineSegments>
  );
}

// ── Latitude/longitude lines ──
function GraticulesLines() {
  const geo = useMemo(() => {
    const points: THREE.Vector3[] = [];
    const r = 1.003;
    // Latitude lines
    for (let lat = -60; lat <= 60; lat += 30) {
      for (let lon = -180; lon <= 180; lon += 2) {
        points.push(toSphere(lat, lon, r));
        points.push(toSphere(lat, lon + 2, r));
      }
    }
    // Longitude lines
    for (let lon = -180; lon <= 180; lon += 30) {
      for (let lat = -80; lat <= 80; lat += 2) {
        points.push(toSphere(lat, lon, r));
        points.push(toSphere(lat + 2, lon, r));
      }
    }
    return new THREE.BufferGeometry().setFromPoints(points);
  }, []);

  return (
    <lineSegments geometry={geo}>
      <lineBasicMaterial color="#2d7db8" transparent opacity={0.06} />
    </lineSegments>
  );
}

// ── Orbiting ring (swoosh effect like the logo) ──
function OrbitalRing({ color, radius, tiltX, tiltZ, speed }: {
  color: THREE.Color; radius: number; tiltX: number; tiltZ: number; speed: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const mat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        transparent: true,
        side: THREE.DoubleSide,
        depthWrite: false,
        uniforms: { uTime: { value: 0 }, uColor: { value: color } },
        vertexShader: `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform float uTime;
          uniform vec3 uColor;
          varying vec2 vUv;
          void main() {
            float ring = smoothstep(0.44, 0.48, length(vUv - 0.5)) * smoothstep(0.52, 0.48, length(vUv - 0.5));
            float sweep = smoothstep(0.0, 1.0, fract(atan(vUv.y - 0.5, vUv.x - 0.5) / 6.283 + uTime * 0.15));
            float alpha = ring * sweep * 0.2;
            gl_FragColor = vec4(uColor, alpha);
          }
        `,
      }),
    [color]
  );

  useFrame((_, delta) => {
    mat.uniforms.uTime.value += delta * speed;
    if (ref.current) ref.current.rotation.z += delta * speed * 0.02;
  });

  return (
    <mesh ref={ref} rotation={[tiltX, 0, tiltZ]} material={mat}>
      <ringGeometry args={[radius - 0.015, radius + 0.015, 128]} />
    </mesh>
  );
}

// ── Floating particles ──
function FloatingParticles() {
  const count = 200;
  const { positions, sizes } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sz = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const r = 1.1 + Math.random() * 0.8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
      sz[i] = Math.random() * 0.008 + 0.002;
    }
    return { positions: pos, sizes: sz };
  }, []);

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        uniforms: { uTime: { value: 0 } },
        vertexShader: `
          attribute float size;
          uniform float uTime;
          varying float vAlpha;
          void main() {
            vec3 pos = position;
            float offset = length(pos) * 3.0;
            pos.x += sin(uTime * 0.2 + offset) * 0.01;
            pos.y += cos(uTime * 0.15 + offset * 1.2) * 0.01;
            vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
            gl_PointSize = size * 200.0 / -mvPosition.z;
            gl_Position = projectionMatrix * mvPosition;
            vAlpha = 0.1 + 0.25 * sin(uTime * 1.0 + offset);
          }
        `,
        fragmentShader: `
          varying float vAlpha;
          void main() {
            float d = length(gl_PointCoord - 0.5);
            if (d > 0.5) discard;
            // Mix blue and green
            vec3 color = mix(vec3(0.18, 0.42, 0.72), vec3(0.18, 0.55, 0.34), gl_PointCoord.y);
            gl_FragColor = vec4(color, smoothstep(0.5, 0.0, d) * vAlpha);
          }
        `,
      }),
    []
  );

  useFrame((_, delta) => { material.uniforms.uTime.value += delta; });

  return (
    <points material={material}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-size" count={count} array={sizes} itemSize={1} />
      </bufferGeometry>
    </points>
  );
}

// ── Main Globe Group ──
function GlobeGroup() {
  const ref = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.03;
  });

  return (
    <group ref={ref}>
      <GlassSphere />
      <WireframeGrid />
      <GraticulesLines />
      <ContinentDots />
      <Atmosphere />

      {/* Logo-inspired orbital rings in brand colors */}
      <OrbitalRing color={ORANGE} radius={1.18} tiltX={Math.PI * 0.45} tiltZ={0.2} speed={0.8} />
      <OrbitalRing color={GREEN} radius={1.25} tiltX={Math.PI * 0.5} tiltZ={-0.15} speed={0.6} />
      <OrbitalRing color={BLUE} radius={1.32} tiltX={Math.PI * 0.38} tiltZ={0.3} speed={0.5} />

      <FloatingParticles />
    </group>
  );
}

// ── Camera ──
function CameraSetup() {
  const { camera } = useThree();
  useEffect(() => {
    camera.position.set(0, 0.2, 2.8);
    camera.lookAt(0, 0, 0);
  }, [camera]);
  return null;
}

// ── Exported Component ──
const GlobeBackground = () => (
  <div className="fixed inset-0 z-0 pointer-events-none" style={{ opacity: 0.35 }}>
    <Canvas
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      dpr={[1, 1.5]}
      style={{ background: "transparent" }}
    >
      <CameraSetup />
      <ambientLight intensity={0.08} />
      <directionalLight position={[5, 3, 5]} intensity={0.1} color="#a8c4e0" />
      <pointLight position={[-3, 2, -3]} intensity={0.12} color={BLUE} />
      <pointLight position={[2, -1, 3]} intensity={0.06} color={GREEN} />
      <pointLight position={[0, 3, -2]} intensity={0.04} color={ORANGE} />
      <GlobeGroup />
    </Canvas>
  </div>
);

export default GlobeBackground;
