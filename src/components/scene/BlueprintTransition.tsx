"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

type BlueprintProps = {
  active: boolean;
  progress: number;
};

export function BlueprintTransition({ active, progress }: BlueprintProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const bpProgress = useRef(0);
  const [show, setShow] = useState(false);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    const target = active ? Math.min(1, (progress - 0.92) / 0.04) : 0;
    bpProgress.current = THREE.MathUtils.damp(bpProgress.current, target, 6, delta);
    const p = bpProgress.current;

    meshRef.current.scale.setScalar(1 + p * 0.05);
    (meshRef.current.material as THREE.MeshBasicMaterial).opacity = p * 0.6;
    (meshRef.current.material as THREE.MeshBasicMaterial).color.setHSL(
      0.58,
      0.6,
      0.5 + p * 0.2,
    );

    if (p > 0.01 && !show) setShow(true);
    else if (!active && p < 0.005 && show) setShow(false);
  });

  if (!active && !show) return null;

  return (
    <mesh ref={meshRef} position={[0, 2.5, 0]} renderOrder={10}>
      <boxGeometry args={[6.5, 5.5, 6.5]} />
      <meshBasicMaterial
        transparent
        opacity={0}
        wireframe
        depthWrite={false}
      />
    </mesh>
  );
}
