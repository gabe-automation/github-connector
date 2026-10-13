import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, Lightformer, RoundedBox } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

// A clean "browser window" built from soft rounded panels — minimal, airy.
const PANELS: { p: [number, number, number]; s: [number, number, number]; c: string }[] = [
  { p: [0, 0, 0], s: [4.4, 2.8, 0.1], c: "#ffffff" },          // window
  { p: [0, 1.22, 0.08], s: [4.4, 0.36, 0.08], c: "#edf2f3" },  // title bar
  { p: [-1.35, 0.45, 0.12], s: [1.5, 0.9, 0.08], c: "#008A83" }, // hero block
  { p: [0.75, 0.45, 0.12], s: [1.9, 0.28, 0.08], c: "#183238" }, // headline
  { p: [0.55, 0.05, 0.12], s: [1.5, 0.18, 0.08], c: "#cad8dc" }, // text line
  { p: [-1.35, -0.75, 0.12], s: [0.85, 0.7, 0.08], c: "#f2c14e" }, // card
  { p: [-0.3, -0.75, 0.12], s: [0.85, 0.7, 0.08], c: "#e8794a" },  // card
  { p: [0.75, -0.75, 0.12], s: [0.85, 0.7, 0.08], c: "#DCE5E7" },  // card
];

// Floating accent chips around the window
const CHIPS: { p: [number, number, number]; s: [number, number, number]; c: string }[] = [
  { p: [-3.1, 1.1, -0.6], s: [0.9, 0.55, 0.08], c: "#008A83" },
  { p: [3.0, -1.2, -0.4], s: [0.8, 0.5, 0.08], c: "#e8794a" },
  { p: [2.9, 1.4, -0.8], s: [0.6, 0.6, 0.08], c: "#f2c14e" },
];

function Scene() {
  const g = useRef<THREE.Group>(null);
  useFrame(({ pointer }, raw) => {
    const dt = Math.min(raw, 0.05);
    if (!g.current) return;
    const k = 1 - Math.exp(-3 * dt);
    g.current.rotation.y += (pointer.x * 0.22 - g.current.rotation.y) * k;
    g.current.rotation.x += (-pointer.y * 0.14 - g.current.rotation.x) * k;
  });
  return (
    <group ref={g} rotation={[0.06, -0.12, 0]}>
      {PANELS.map((b, i) => (
        <RoundedBox key={i} args={b.s} radius={0.05} smoothness={4} position={b.p} castShadow receiveShadow>
          <meshStandardMaterial color={b.c} roughness={0.5} metalness={0.02} />
        </RoundedBox>
      ))}
      {CHIPS.map((b, i) => (
        <Float key={i} speed={1.6 + i * 0.4} floatIntensity={1.2} rotationIntensity={0.4}>
          <RoundedBox args={b.s} radius={0.06} smoothness={4} position={b.p} castShadow>
            <meshStandardMaterial color={b.c} roughness={0.45} metalness={0.05} />
          </RoundedBox>
        </Float>
      ))}
      {/* cursor dot */}
      <Float speed={2.2} floatIntensity={1.4}>
        <mesh position={[1.9, 0.9, 0.6]}>
          <sphereGeometry args={[0.09, 24, 24]} />
          <meshStandardMaterial color="#008A83" emissive="#008A83" emissiveIntensity={0.4} />
        </mesh>
      </Float>
    </group>
  );
}

export default function HeroScene() {
  return (
    <Canvas dpr={[1, 1.75]} camera={{ position: [0, 0.4, 7.2], fov: 40 }} shadows gl={{ alpha: true }}>
      <ambientLight intensity={0.65} />
      <directionalLight position={[4, 6, 5]} intensity={1.4} castShadow />
      <Scene />
      <Environment>
        <Lightformer intensity={2} position={[0, 5, 0]} scale={[10, 10, 1]} />
        <Lightformer intensity={1} color="#9cd" position={[-5, 1, -1]} rotation-y={Math.PI / 2} scale={[20, 1, 1]} />
      </Environment>
    </Canvas>
  );
}
