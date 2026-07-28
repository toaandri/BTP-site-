"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

type HouseProps = {
  doorOpen: React.MutableRefObject<number>;
  opacity: React.MutableRefObject<number>;
};

export function House({ doorOpen, opacity }: HouseProps) {
  const doorRef = useRef<THREE.Group>(null);
  const rootRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (doorRef.current) {
      doorRef.current.rotation.y = -doorOpen.current * Math.PI * 0.72;
    }
    const o = opacity.current;
    rootRef.current?.traverse((obj) => {
      const mesh = obj as THREE.Mesh;
      const mat = mesh.material as THREE.MeshStandardMaterial | THREE.MeshStandardMaterial[];
      if (!mat) return;
      const apply = (m: THREE.MeshStandardMaterial) => {
        m.transparent = o < 0.98;
        m.opacity = o;
        m.depthWrite = o > 0.2;
      };
      if (Array.isArray(mat)) mat.forEach(apply);
      else if (mat) apply(mat);
    });
  });

  return (
    <group ref={rootRef}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <circleGeometry args={[18, 48]} />
        <meshStandardMaterial color="#6b7c6a" roughness={1} />
      </mesh>

      <Wall args={[6, 2.6, 0.2]} position={[0, 1.3, 3]} color="#d8d2c8" />
      <Wall args={[6, 2.6, 0.2]} position={[0, 1.3, -3]} color="#d8d2c8" />
      <Wall args={[0.2, 2.6, 6]} position={[-3, 1.3, 0]} color="#d8d2c8" />
      <Wall args={[0.2, 2.6, 6]} position={[3, 1.3, 0]} color="#d8d2c8" />

      <mesh position={[0, 0.05, 0]} receiveShadow>
        <boxGeometry args={[5.8, 0.1, 5.8]} />
        <meshStandardMaterial color="#c4b49a" roughness={0.7} />
      </mesh>
      <mesh position={[0, 2.7, 0]} receiveShadow>
        <boxGeometry args={[5.8, 0.12, 5.8]} />
        <meshStandardMaterial color="#c4b49a" roughness={0.7} />
      </mesh>

      <Wall args={[6, 2.4, 0.2]} position={[0, 3.9, 3]} color="#d8d2c8" />
      <Wall args={[6, 2.4, 0.2]} position={[0, 3.9, -3]} color="#d8d2c8" />
      <Wall args={[0.2, 2.4, 6]} position={[-3, 3.9, 0]} color="#d8d2c8" />
      <Wall args={[0.2, 2.4, 6]} position={[3, 3.9, 0]} color="#d8d2c8" />

      <Wall args={[0.12, 2.4, 4]} position={[0.8, 1.25, -0.5]} color="#ebe6dc" />
      <Wall args={[0.12, 2.2, 3.5]} position={[-0.6, 3.85, -0.3]} color="#ebe6dc" />

      <mesh position={[0, 5.55, 0]} rotation={[0, Math.PI / 4, 0]} castShadow>
        <coneGeometry args={[5.2, 1.8, 4]} />
        <meshStandardMaterial color="#4a5560" roughness={0.75} />
      </mesh>

      {[
        [-1.6, 1.5, 3.05],
        [1.6, 1.5, 3.05],
        [-1.6, 3.9, 3.05],
        [1.6, 3.9, 3.05],
      ].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]}>
          <boxGeometry args={[0.9, 1.1, 0.08]} />
          <meshStandardMaterial color="#a8c4d4" transparent opacity={0.55} metalness={0.2} roughness={0.15} />
        </mesh>
      ))}

      <mesh position={[0, 1.15, 3.02]}>
        <boxGeometry args={[1.15, 2.2, 0.08]} />
        <meshStandardMaterial color="#3d4f5f" />
      </mesh>

      <group ref={doorRef} position={[-0.5, 1.1, 3.08]}>
        <mesh position={[0.5, 0, 0]} castShadow>
          <boxGeometry args={[1, 2.05, 0.06]} />
          <meshStandardMaterial color="#8b6914" roughness={0.55} />
        </mesh>
        <mesh position={[0.85, 0, 0.04]}>
          <sphereGeometry args={[0.04, 12, 12]} />
          <meshStandardMaterial color="#c9a227" metalness={0.8} roughness={0.3} />
        </mesh>
      </group>

      {[0, 1, 2, 3, 4, 5].map((i) => (
        <mesh key={i} position={[-2.1, 0.2 + i * 0.4, -1.8 - i * 0.05]} castShadow>
          <boxGeometry args={[1.2, 0.12, 0.55]} />
          <meshStandardMaterial color="#9a8b72" />
        </mesh>
      ))}

      <mesh position={[1.6, 0.45, -1.5]} castShadow>
        <boxGeometry args={[1.4, 0.7, 0.7]} />
        <meshStandardMaterial color="#5c6b5a" />
      </mesh>
      <mesh position={[-1.5, 3.05, -1.8]} castShadow>
        <boxGeometry args={[1.6, 0.5, 0.7]} />
        <meshStandardMaterial color="#6a5a48" />
      </mesh>
    </group>
  );
}

function Wall({
  args,
  position,
  color,
}: {
  args: [number, number, number];
  position: [number, number, number];
  color: string;
}) {
  return (
    <mesh position={position} castShadow receiveShadow>
      <boxGeometry args={args} />
      <meshStandardMaterial color={color} roughness={0.85} />
    </mesh>
  );
}
