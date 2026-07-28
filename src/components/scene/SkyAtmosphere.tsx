"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

export function SkyAtmosphere() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime() * 0.015;
    const hue = 0.58 + Math.sin(t) * 0.03;
    const color = new THREE.Color().setHSL(hue, 0.25, 0.12 + Math.sin(t * 0.7) * 0.04);
    (meshRef.current.material as THREE.MeshBasicMaterial).color.copy(color);
  });

  return (
    <mesh ref={meshRef} scale={[80, 80, 80]}>
      <sphereGeometry args={[1, 16, 16]} />
      <meshBasicMaterial side={THREE.BackSide} />
    </mesh>
  );
}
