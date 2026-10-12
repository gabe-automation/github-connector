import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, Lightformer, RoundedBox } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

const PANELS: { p: [number, number, number]; s: [number, number, number]; c: string }[] = [
  { p: [0, 0, 0], s: [3.2, 2.1, 0.12], c: "#f4efe6" },
  { p: [-0.55, 0.55, 0.2], s: [1.7, 0.35, 0.1], c: "#008A83" },
  { p: [0.85, -0.2, 0.25], s: [1.0, 1.0, 0.12], c: "#e8794a" },
  { p: [-0.75, -0.4, 0.18], s: [1.3, 0.7, 0.1], c: "#1f2a2e" },
  { p: [1.9, 0.9, 0.6], s: [0.7, 0.45, 0.1], c: "#f2c14e" },
  { p: [-2.0, -1.0, 0.5], s: [0.8, 0.5, 0.1], c: "#008A83" },
];

function Stack() {
  const g = useRef<THREE.Group>(null);
  useFrame(({ pointer }, raw) => {
    const dt = Math.min(raw, 0.05);
    if (!g.current) return;
    const k = 1 - Math.exp(-3 * dt);
    g.current.rotation.y += (pointer.x * 0.45 - 0.35 - g.current.rotation.y) * k;
    g.current.rotation.x += (-pointer.y * 0.3 + 0.12 - g.current.rotation.x) * k;
  });
  return (
    <group ref={g}>
      {PANELS.map((b, i) => (
        <Float key={i} speed={1.4 + i * 0.25} floatIntensity={i === 0 ? 0.3 : 1.1} rotationIntensity={i === 0 ? 0.1 : 0.5}>
          <RoundedBox args={b.s} radius={0.05} smoothness={4} position={b.p} castShadow>
            <meshStandardMaterial color={b.c} roughness={0.45} metalness={0.05} />
          </RoundedBox>
        </Float>
      ))}
      <Float speed={2} floatIntensity={1.5}>
        <mesh position={[1.4, 1.3, 0.9]}>
          <coneGeometry args={[0.12, 0.3, 3]} />
          <meshStandardMaterial color="#e8794a" />
        </mesh>
      </Float>
    </group>
  );
}

export default function HeroScene() {
  return (
    <Canvas dpr={[1, 1.75]} camera={{ position: [0, 0, 6.5], fov: 42 }} shadows>
      <ambientLight intensity={0.5} />
      <directionalLight position={[4, 6, 5]} intensity={1.6} castShadow />
      <Stack />
      <Environment>
        <Lightformer intensity={2} position={[0, 5, 0]} scale={[10, 10, 1]} />
        <Lightformer intensity={1} color="#9cd" position={[-5, 1, -1]} rotation-y={Math.PI / 2} scale={[20, 1, 1]} />
      </Environment>
    </Canvas>
  );
}
