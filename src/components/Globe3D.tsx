import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

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

// ── Continent wireframe ──
function generateContinentWireframe(radius: number): THREE.BufferGeometry[] {
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
    { latRange: [50, 60], lonRange: [-10, 2], prob: 0.1 },
    { latRange: [30, 46], lonRange: [128, 146], prob: 0.22 },
  ];

  return regions.map((region) => {
    const points: THREE.Vector3[] = [];
    const step = 2.2;
    for (let lat = region.latRange[0]; lat <= region.latRange[1]; lat += step * 2.5) {
      let inLand = false;
      for (let lon = region.lonRange[0]; lon <= region.lonRange[1]; lon += step * 0.5) {
        if (Math.random() > region.prob) {
          points.push(toSphere(lat, lon, radius));
          if (!inLand) points.push(toSphere(lat, lon, radius));
          inLand = true;
        } else { if (inLand) points.push(toSphere(lat, lon, radius)); inLand = false; }
      }
    }
    for (let lon = region.lonRange[0]; lon <= region.lonRange[1]; lon += step * 2.5) {
      let inLand = false;
      for (let lat = region.latRange[0]; lat <= region.latRange[1]; lat += step * 0.5) {
        if (Math.random() > region.prob) {
          points.push(toSphere(lat, lon, radius));
          if (!inLand) points.push(toSphere(lat, lon, radius));
          inLand = true;
        } else { if (inLand) points.push(toSphere(lat, lon, radius)); inLand = false; }
      }
    }
    return new THREE.BufferGeometry().setFromPoints(points);
  });
}

// ── Hexagonal grid overlay ──
function HexGrid() {
  const geometry = useMemo(() => {
    const points: THREE.Vector3[] = [];
    const r = 1.008;
    const hexSize = 6; // degrees

    for (let lat = -70; lat <= 70; lat += hexSize * 1.5) {
      const offset = (Math.floor(lat / hexSize) % 2) * hexSize * 0.5;
      for (let lon = -180; lon <= 180; lon += hexSize) {
        const cLon = lon + offset;
        // Draw hexagon
        for (let i = 0; i < 6; i++) {
          const a1 = (Math.PI / 3) * i;
          const a2 = (Math.PI / 3) * (i + 1);
          const lat1 = lat + Math.sin(a1) * hexSize * 0.4;
          const lon1 = cLon + Math.cos(a1) * hexSize * 0.4;
          const lat2 = lat + Math.sin(a2) * hexSize * 0.4;
          const lon2 = cLon + Math.cos(a2) * hexSize * 0.4;
          points.push(toSphere(lat1, lon1, r), toSphere(lat2, lon2, r));
        }
      }
    }
    return new THREE.BufferGeometry().setFromPoints(points);
  }, []);

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        uniforms: { uTime: { value: 0 } },
        vertexShader: `
          varying vec3 vPos;
          void main() {
            vPos = position;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform float uTime;
          varying vec3 vPos;
          void main() {
            float wave = sin(vPos.y * 8.0 + uTime * 1.5) * 0.5 + 0.5;
            float alpha = 0.04 + wave * 0.06;
            vec3 color = vec3(0.024, 0.714, 0.831);
            gl_FragColor = vec4(color, alpha);
          }
        `,
      }),
    []
  );

  useFrame((_, delta) => {
    material.uniforms.uTime.value += delta;
  });

  return <lineSegments geometry={geometry} material={material} />;
}

// ── Orbiting satellites ──
function Satellite({ orbitRadius, speed, tilt, phase }: { orbitRadius: number; speed: number; tilt: number; phase: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const trailPositions = useRef(new Float32Array(90 * 3).fill(0));
  const headIdx = useRef(0);

  const trailGeo = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(90 * 3), 3));
    return geo;
  }, []);

  const trailLine = useMemo(() => {
    const mat = new THREE.LineBasicMaterial({ color: "#4785d1", transparent: true, opacity: 0.12 });
    return new THREE.Line(trailGeo, mat);
  }, [trailGeo]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * speed + phase;
    const x = Math.cos(t) * orbitRadius;
    const y = Math.sin(t * 0.7) * orbitRadius * Math.sin(tilt);
    const z = Math.sin(t) * orbitRadius;

    if (groupRef.current) {
      groupRef.current.position.set(x, y, z);
    }

    const idx = headIdx.current % 90;
    trailPositions.current[idx * 3] = x;
    trailPositions.current[idx * 3 + 1] = y;
    trailPositions.current[idx * 3 + 2] = z;
    headIdx.current++;

    const posAttr = trailLine.geometry.getAttribute("position") as THREE.BufferAttribute;
    posAttr.array.set(trailPositions.current);
    posAttr.needsUpdate = true;
  });

  return (
    <>
      <group ref={groupRef}>
        <mesh>
          <octahedronGeometry args={[0.012, 0]} />
          <meshBasicMaterial color="#6b9fdf" transparent opacity={0.9} wireframe />
        </mesh>
        <mesh>
          <sphereGeometry args={[0.02, 8, 8]} />
          <meshBasicMaterial color="#4785d1" transparent opacity={0.3} />
        </mesh>
      </group>
      <primitive object={trailLine} />
    </>
  );
}

// ── Data streams — vertical rising data lines from cities ──
function DataStream({ lat, lon }: { lat: number; lon: number }) {
  const ref = useRef<THREE.Group>(null);
  const pos = useMemo(() => toSphere(lat, lon, 1.02), [lat, lon]);
  const normal = useMemo(() => pos.clone().normalize(), [pos]);

  const particles = useMemo(() => {
    const count = 12;
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = 0;
      positions[i * 3 + 1] = Math.random() * 0.3;
      positions[i * 3 + 2] = 0;
      speeds[i] = 0.3 + Math.random() * 0.5;
    }
    return { positions, speeds, count };
  }, []);

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        uniforms: { uTime: { value: 0 } },
        vertexShader: `
          uniform float uTime;
          varying float vAlpha;
          void main() {
            vec3 pos = position;
            float t = fract(pos.y * 3.0 + uTime * 0.8);
            pos.y = t * 0.35;
            vAlpha = 1.0 - t;
            vec4 mv = modelViewMatrix * vec4(pos, 1.0);
            gl_PointSize = 3.0 / -mv.z;
            gl_Position = projectionMatrix * mv;
          }
        `,
        fragmentShader: `
          varying float vAlpha;
          void main() {
            float d = length(gl_PointCoord - 0.5);
            if (d > 0.5) discard;
            gl_FragColor = vec4(0.024, 0.9, 0.95, smoothstep(0.5, 0.0, d) * vAlpha * 0.6);
          }
        `,
      }),
    []
  );

  useFrame((_, delta) => {
    material.uniforms.uTime.value += delta;
  });

  // Orient group along sphere normal
  const quaternion = useMemo(() => {
    const q = new THREE.Quaternion();
    q.setFromUnitVectors(new THREE.Vector3(0, 1, 0), normal);
    return q;
  }, [normal]);

  return (
    <group position={pos} quaternion={quaternion}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={particles.count} array={particles.positions} itemSize={3} />
        </bufferGeometry>
        <primitive object={material} attach="material" />
      </points>
    </group>
  );
}

// ── Scan rings ──
function ScanRing({ radius, speed, axis }: { radius: number; speed: number; axis: "x" | "y" | "z" }) {
  const ref = useRef<THREE.Mesh>(null);
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        transparent: true,
        side: THREE.DoubleSide,
        depthWrite: false,
        uniforms: { uTime: { value: 0 }, uColor: { value: new THREE.Color("#4785d1") } },
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
            float ring = smoothstep(0.42, 0.48, length(vUv - 0.5)) * smoothstep(0.52, 0.48, length(vUv - 0.5));
            float alpha = ring * (0.35 + 0.2 * sin(uTime * 3.0));
            gl_FragColor = vec4(uColor, alpha);
          }
        `,
      }),
    []
  );

  useFrame((_, delta) => {
    material.uniforms.uTime.value += delta;
    if (ref.current) {
      if (axis === "y") ref.current.position.y = Math.sin(material.uniforms.uTime.value * speed) * 0.85;
      if (axis === "x") ref.current.rotation.z += delta * speed * 0.3;
      if (axis === "z") ref.current.rotation.x += delta * speed * 0.2;
    }
  });

  const rot: [number, number, number] =
    axis === "y" ? [Math.PI / 2, 0, 0] : axis === "x" ? [0, 0, Math.PI / 4] : [Math.PI / 3, 0, 0];

  return (
    <mesh ref={ref} rotation={rot} material={material}>
      <ringGeometry args={[radius - 0.012, radius + 0.012, 128]} />
    </mesh>
  );
}

// ── Holographic particles ──
function HoloParticles() {
  const count = 500;
  const { positions, sizes } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sz = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const r = 1.15 + Math.random() * 1.0;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
      sz[i] = Math.random() * 0.01 + 0.002;
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
            float offset = length(pos) * 4.0;
            pos.x += sin(uTime * 0.3 + offset) * 0.015;
            pos.y += cos(uTime * 0.2 + offset * 1.3) * 0.015;
            pos.z += sin(uTime * 0.25 + offset * 0.7) * 0.015;
            vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
            gl_PointSize = size * 280.0 / -mvPosition.z;
            gl_Position = projectionMatrix * mvPosition;
            vAlpha = 0.15 + 0.4 * sin(uTime * 1.5 + offset);
          }
        `,
        fragmentShader: `
          varying float vAlpha;
          void main() {
            float d = length(gl_PointCoord - 0.5);
            if (d > 0.5) discard;
            float alpha = smoothstep(0.5, 0.0, d) * vAlpha;
            gl_FragColor = vec4(0.024, 0.714, 0.831, alpha);
          }
        `,
      }),
    []
  );

  useFrame((_, delta) => { material.uniforms.uTime.value += delta; });

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-size" count={count} array={sizes} itemSize={1} />
      </bufferGeometry>
      <primitive object={material} attach="material" />
    </points>
  );
}

// ── Connection arcs ──
function ConnectionArc({ start, end, color, speed = 1 }: {
  start: [number, number]; end: [number, number]; color: string; speed?: number;
}) {
  const curve = useMemo(() => {
    const p1 = toSphere(start[0], start[1], 1.01);
    const p2 = toSphere(end[0], end[1], 1.01);
    const mid = new THREE.Vector3().addVectors(p1, p2).multiplyScalar(0.5);
    mid.normalize().multiplyScalar(1 + p1.distanceTo(p2) * 0.55);
    return new THREE.QuadraticBezierCurve3(p1, mid, p2);
  }, [start, end]);

  const geometry = useMemo(() => new THREE.TubeGeometry(curve, 80, 0.004, 6, false), [curve]);

  const mat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        uniforms: { uTime: { value: 0 }, uColor: { value: new THREE.Color(color) } },
        vertexShader: `
          varying vec2 vUv;
          void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
        `,
        fragmentShader: `
          uniform float uTime;
          uniform vec3 uColor;
          varying vec2 vUv;
          void main() {
            float p = fract(uTime);
            float d = abs(vUv.x - p);
            float trail = smoothstep(0.3, 0.0, d) * 0.7;
            float head = smoothstep(0.012, 0.0, d) * 3.0;
            float base = 0.06;
            vec3 col = uColor + vec3(0.4, 0.5, 0.6) * head * 0.3;
            gl_FragColor = vec4(col, trail + head + base);
          }
        `,
      }),
    [color]
  );

  useFrame((_, delta) => { mat.uniforms.uTime.value += delta * speed * 0.22; });
  return <mesh geometry={geometry} material={mat} />;
}

// ── City node with pulse ──
function CityNode({ lat, lon }: { lat: number; lon: number }) {
  const ref = useRef<THREE.Mesh>(null);
  const outerRef = useRef<THREE.Mesh>(null);
  const pos = useMemo(() => toSphere(lat, lon, 1.015), [lat, lon]);
  const normal = useMemo(() => pos.clone().normalize(), [pos]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (ref.current) ref.current.scale.setScalar(0.8 + Math.sin(t * 3) * 0.3);
    if (outerRef.current) {
      const pulse = (t * 0.5) % 1;
      outerRef.current.scale.setScalar(1 + pulse * 2.5);
      (outerRef.current.material as THREE.MeshBasicMaterial).opacity = 0.5 * (1 - pulse);
    }
  });

  // Orient beam along sphere normal
  const quaternion = useMemo(() => {
    const q = new THREE.Quaternion();
    q.setFromUnitVectors(new THREE.Vector3(0, 1, 0), normal);
    return q;
  }, [normal]);

  return (
    <group position={pos}>
      <mesh ref={ref}>
        <sphereGeometry args={[0.02, 16, 16]} />
        <meshBasicMaterial color="#6b9fdf" transparent opacity={0.95} />
      </mesh>
      <mesh ref={outerRef}>
        <sphereGeometry args={[0.02, 16, 16]} />
        <meshBasicMaterial color="#4785d1" transparent opacity={0.4} wireframe />
      </mesh>
      {/* Vertical beam along normal */}
      <group quaternion={quaternion}>
        <mesh position={[0, 0.08, 0]}>
          <cylinderGeometry args={[0.001, 0.004, 0.16, 6]} />
          <meshBasicMaterial color="#4785d1" transparent opacity={0.3} />
        </mesh>
      </group>
    </group>
  );
}

// ── Orbit ring (visible orbit path) ──
function OrbitPath({ radius, tilt }: { radius: number; tilt: number }) {
  const lineObj = useMemo(() => {
    const points: THREE.Vector3[] = [];
    for (let i = 0; i <= 128; i++) {
      const a = (i / 128) * Math.PI * 2;
      points.push(new THREE.Vector3(Math.cos(a) * radius, Math.sin(a * 0.7) * radius * Math.sin(tilt), Math.sin(a) * radius));
    }
    const geo = new THREE.BufferGeometry().setFromPoints(points);
    const mat = new THREE.LineBasicMaterial({ color: "#4785d1", transparent: true, opacity: 0.08 });
    return new THREE.Line(geo, mat);
  }, [radius, tilt]);

  return <primitive object={lineObj} />;
}

// ══════════════════════════════════════════════════
// ██  MAIN GLOBE
// ══════════════════════════════════════════════════
function Globe3D() {
  const globeRef = useRef<THREE.Group>(null);

  const continentGeos = useMemo(() => generateContinentWireframe(1.012), []);

  const sphereWireGeo = useMemo(() => {
    return new THREE.WireframeGeometry(new THREE.SphereGeometry(1, 48, 24));
  }, []);

  // Atmosphere
  const atmosphereMat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        transparent: true, side: THREE.BackSide, depthWrite: false,
        uniforms: { uTime: { value: 0 } },
        vertexShader: `
          varying vec3 vNormal;
          void main() { vNormal = normalize(normalMatrix * normal); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
        `,
        fragmentShader: `
          uniform float uTime;
          varying vec3 vNormal;
          void main() {
            float intensity = pow(0.72 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 5.0);
            vec3 c1 = vec3(0.024, 0.714, 0.831);
            vec3 c2 = vec3(0.12, 0.46, 0.95);
            vec3 color = mix(c1, c2, sin(uTime * 0.4) * 0.5 + 0.5);
            gl_FragColor = vec4(color, intensity * 0.5);
          }
        `,
      }),
    []
  );

  // Inner holographic surface with scan lines
  const innerMat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        transparent: true, depthWrite: false,
        uniforms: { uTime: { value: 0 } },
        vertexShader: `
          varying vec3 vNormal;
          varying vec3 vPos;
          void main() { vNormal = normalize(normalMatrix * normal); vPos = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
        `,
        fragmentShader: `
          uniform float uTime;
          varying vec3 vNormal;
          varying vec3 vPos;
          void main() {
            float fresnel = pow(1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0))), 3.0);
            float scan = smoothstep(0.48, 0.5, abs(sin(vPos.y * 30.0 + uTime * 2.0)));
            float scan2 = smoothstep(0.46, 0.5, abs(sin(vPos.y * 80.0 - uTime * 4.0))) * 0.3;
            vec3 color = vec3(0.015, 0.06, 0.12);
            color += vec3(0.024, 0.714, 0.831) * fresnel * 0.25;
            color += vec3(0.01, 0.04, 0.06) * (scan + scan2);
            gl_FragColor = vec4(color, 0.88 + fresnel * 0.1);
          }
        `,
      }),
    []
  );

  useFrame((_, delta) => {
    if (globeRef.current) globeRef.current.rotation.y += delta * 0.05;
    atmosphereMat.uniforms.uTime.value += delta;
    innerMat.uniforms.uTime.value += delta;
  });

  const connections = [
    { start: [23.8, 90.4] as [number, number], end: [25.2, 55.3] as [number, number], color: "#4785d1", speed: 0.8 },
    { start: [25.2, 55.3] as [number, number], end: [40.4, -3.7] as [number, number], color: "#6b9fdf", speed: 1.0 },
    { start: [23.8, 90.4] as [number, number], end: [38.7, -9.1] as [number, number], color: "#4785d1", speed: 0.9 },
    { start: [25.2, 55.3] as [number, number], end: [55.7, 12.6] as [number, number], color: "#6b9fdf", speed: 1.1 },
    { start: [23.8, 90.4] as [number, number], end: [1.3, 103.8] as [number, number], color: "#6b9fdf", speed: 0.7 },
    { start: [40.4, -3.7] as [number, number], end: [55.7, 12.6] as [number, number], color: "#4785d1", speed: 1.2 },
    { start: [23.8, 90.4] as [number, number], end: [51.5, -0.1] as [number, number], color: "#6b9fdf", speed: 0.85 },
    { start: [25.2, 55.3] as [number, number], end: [48.9, 2.35] as [number, number], color: "#6b9fdf", speed: 0.95 },
  ];

  const cities = [
    { lat: 23.8, lon: 90.4 },
    { lat: 25.2, lon: 55.3 },
    { lat: 38.7, lon: -9.1 },
    { lat: 40.4, lon: -3.7 },
    { lat: 55.7, lon: 12.6 },
    { lat: 1.3, lon: 103.8 },
    { lat: 51.5, lon: -0.1 },
    { lat: 48.9, lon: 2.35 },
  ];

  return (
    <group ref={globeRef}>
      {/* Dark inner sphere */}
      <mesh material={innerMat}>
        <sphereGeometry args={[0.99, 80, 80]} />
      </mesh>

      {/* Hexagonal grid overlay */}
      <HexGrid />

      {/* Base wireframe sphere */}
      <lineSegments geometry={sphereWireGeo}>
        <lineBasicMaterial color="#315281" transparent opacity={0.12} />
      </lineSegments>

      {/* Continent wireframe outlines */}
      {continentGeos.map((geo, i) => (
        <lineSegments key={i} geometry={geo}>
          <lineBasicMaterial color="#4785d1" transparent opacity={0.6} />
        </lineSegments>
      ))}

      {/* Atmosphere glow */}
      <mesh material={atmosphereMat}>
        <sphereGeometry args={[1.22, 80, 80]} />
      </mesh>

      {/* Second atmosphere layer */}
      <mesh>
        <sphereGeometry args={[1.35, 64, 64]} />
        <meshBasicMaterial color="#4785d1" transparent opacity={0.02} side={THREE.BackSide} />
      </mesh>

      {/* Scan rings */}
      <ScanRing radius={1.12} speed={0.4} axis="y" />
      <ScanRing radius={1.25} speed={0.15} axis="x" />
      <ScanRing radius={1.35} speed={0.25} axis="z" />

      {/* Orbiting satellites */}
      <Satellite orbitRadius={1.45} speed={0.6} tilt={0.4} phase={0} />
      <Satellite orbitRadius={1.55} speed={0.45} tilt={0.7} phase={Math.PI * 0.7} />
      <Satellite orbitRadius={1.65} speed={0.35} tilt={0.25} phase={Math.PI * 1.3} />

      {/* Orbit path visualizations */}
      <OrbitPath radius={1.45} tilt={0.4} />
      <OrbitPath radius={1.55} tilt={0.7} />
      <OrbitPath radius={1.65} tilt={0.25} />

      {/* Connection arcs */}
      {connections.map((conn, i) => (
        <ConnectionArc key={i} {...conn} />
      ))}

      {/* City nodes */}
      {cities.map((c, i) => (
        <CityNode key={i} {...c} />
      ))}

      {/* Data streams rising from key cities */}
      <DataStream lat={23.8} lon={90.4} />
      <DataStream lat={25.2} lon={55.3} />
      <DataStream lat={51.5} lon={-0.1} />
      <DataStream lat={40.4} lon={-3.7} />

      {/* Floating particles */}
      <HoloParticles />
    </group>
  );
}

function CameraRig() {
  const { camera } = useThree();
  useEffect(() => {
    camera.position.set(0, 0.3, 2.4);
    camera.lookAt(0, 0, 0);
  }, [camera]);
  return null;
}

const Globe3DScene = () => (
  <div className="relative w-full" style={{ height: "min(85vh, 750px)" }}>
    <Canvas
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      dpr={[1, 2]}
      style={{ background: "transparent" }}
    >
      <CameraRig />
      <ambientLight intensity={0.06} />
      <directionalLight position={[5, 3, 5]} intensity={0.12} color="#dbeafe" />
      <pointLight position={[-3, 2, -3]} intensity={0.2} color="#4785d1" />
      <pointLight position={[2, -2, 4]} intensity={0.08} color="#4785d1" />
      <pointLight position={[0, 3, 0]} intensity={0.05} color="#6b9fdf" />
      <Globe3D />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate={false}
        minPolarAngle={Math.PI * 0.3}
        maxPolarAngle={Math.PI * 0.7}
        rotateSpeed={0.3}
      />
    </Canvas>
    <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
  </div>
);

export default Globe3DScene;
