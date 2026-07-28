"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { createBrickTexture, createRoofTexture, createGroundTexture } from "@/lib/textures";

type HouseProps = {
  doorOpen: React.MutableRefObject<number>;
  opacity: React.MutableRefObject<number>;
};

export function House({ doorOpen, opacity }: HouseProps) {
  const doorRef = useRef<THREE.Group>(null);
  const rootRef = useRef<THREE.Group>(null);

  const brickTex = useMemo(() => createBrickTexture(), []);
  const roofTex = useMemo(() => createRoofTexture(), []);
  const groundTex = useMemo(() => createGroundTexture(), []);

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
      {/* Terrain */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]} receiveShadow>
        <circleGeometry args={[14, 48]} />
        <meshStandardMaterial map={groundTex} roughness={1} />
      </mesh>

      {/* Allée d'entrée */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.03, 5]} receiveShadow>
        <planeGeometry args={[1.8, 3]} />
        <meshStandardMaterial color="#8a8078" roughness={0.9} />
      </mesh>
      {/* Dallage allée */}
      {[-0.5, 0, 0.5].map((x) =>
        [4.0, 4.7, 5.4, 6.1].map((z) => (
          <mesh key={`${x}${z}`} position={[x, -0.02, z]}>
            <planeGeometry args={[0.45, 0.55]} />
            <meshStandardMaterial color="#8a8078" roughness={0.85} />
          </mesh>
        )),
      )}

      {/* ===== MUR RDC ===== */}
      {/* Mur avant gauche */}
      <mesh position={[-2.0, 1.3, 2.8]} castShadow receiveShadow>
        <boxGeometry args={[2.2, 2.6, 0.18]} />
        <meshStandardMaterial map={brickTex} roughness={0.85} />
      </mesh>
      {/* Mur avant droit */}
      <mesh position={[2.0, 1.3, 2.8]} castShadow receiveShadow>
        <boxGeometry args={[2.2, 2.6, 0.18]} />
        <meshStandardMaterial map={brickTex} roughness={0.85} />
      </mesh>
      {/* Mur arrière */}
      <mesh position={[0, 1.3, -2.8]} castShadow receiveShadow>
        <boxGeometry args={[5.6, 2.6, 0.18]} />
        <meshStandardMaterial map={brickTex} roughness={0.85} />
      </mesh>
      {/* Mur gauche */}
      <mesh position={[-2.8, 1.3, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.18, 2.6, 5.6]} />
        <meshStandardMaterial color="#d4ccc0" roughness={0.85} />
      </mesh>
      {/* Mur droit */}
      <mesh position={[2.8, 1.3, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.18, 2.6, 5.6]} />
        <meshStandardMaterial color="#d4ccc0" roughness={0.85} />
      </mesh>

      {/* ===== MUR ÉTAGE ===== */}
      <mesh position={[0, 3.9, 2.6]} castShadow>
        <boxGeometry args={[5.6, 2.4, 0.18]} />
        <meshStandardMaterial map={brickTex} roughness={0.85} />
      </mesh>
      <mesh position={[0, 3.9, -2.6]} castShadow>
        <boxGeometry args={[5.6, 2.4, 0.18]} />
        <meshStandardMaterial map={brickTex} roughness={0.85} />
      </mesh>
      <mesh position={[-2.6, 3.9, 0]} castShadow>
        <boxGeometry args={[0.18, 2.4, 5.2]} />
        <meshStandardMaterial color="#d4ccc0" roughness={0.85} />
      </mesh>
      <mesh position={[2.6, 3.9, 0]} castShadow>
        <boxGeometry args={[0.18, 2.4, 5.2]} />
        <meshStandardMaterial color="#d4ccc0" roughness={0.85} />
      </mesh>

      {/* ===== DALLE ÉTAGE ===== */}
      <mesh position={[0, 2.7, 0]} receiveShadow>
        <boxGeometry args={[5.6, 0.1, 5.6]} />
        <meshStandardMaterial color="#b8b0a4" roughness={0.7} />
      </mesh>

      {/* ===== TOITURE ===== */}
      {/* Pan avant */}
      <mesh position={[0, 5.8, 1.6]} rotation={[-0.55, 0, 0]} castShadow>
        <boxGeometry args={[6.2, 0.08, 3.8]} />
        <meshStandardMaterial map={roofTex} roughness={0.9} />
      </mesh>
      {/* Pan arrière */}
      <mesh position={[0, 5.8, -1.6]} rotation={[0.55, 0, 0]} castShadow>
        <boxGeometry args={[6.2, 0.08, 3.8]} />
        <meshStandardMaterial map={roofTex} roughness={0.9} />
      </mesh>
      {/* Pan gauche */}
      <mesh position={[-2.6, 5.0, 0]} rotation={[0, 0, 0.55]} castShadow>
        <boxGeometry args={[0.08, 3.2, 5.6]} />
        <meshStandardMaterial map={roofTex} roughness={0.9} />
      </mesh>
      {/* Pan droit */}
      <mesh position={[2.6, 5.0, 0]} rotation={[0, 0, -0.55]} castShadow>
        <boxGeometry args={[0.08, 3.2, 5.6]} />
        <meshStandardMaterial map={roofTex} roughness={0.9} />
      </mesh>
      {/* Faîtage */}
      <mesh position={[0, 6.6, 0]} rotation={[0, 0, 0]} castShadow>
        <boxGeometry args={[6.4, 0.12, 0.3]} />
        <meshStandardMaterial color="#4a3a2c" roughness={0.85} />
      </mesh>

      {/* ===== FENÊTRES RDC ===== */}
      {[[-1.6, 1.4, 2.82], [1.6, 1.4, 2.82]].map((pos, i) => (
        <group key={`f${i}`}>
          <mesh position={pos as [number, number, number]}>
            <boxGeometry args={[0.7, 0.9, 0.1]} />
            <meshStandardMaterial color="#3a4a5a" roughness={0.6} />
          </mesh>
          <mesh position={[pos[0], pos[1], pos[2] + 0.05]}>
            <boxGeometry args={[0.62, 0.82, 0.03]} />
            <meshPhysicalMaterial color="#8ab4c8" transparent opacity={0.45} metalness={0.1} roughness={0.05} />
          </mesh>
          <mesh position={[pos[0], pos[1], pos[2] + 0.06]}>
            <boxGeometry args={[0.64, 0.03, 0.04]} />
            <meshStandardMaterial color="#5a6a7a" />
          </mesh>
          <mesh position={[pos[0], pos[1], pos[2] + 0.06]}>
            <boxGeometry args={[0.03, 0.84, 0.04]} />
            <meshStandardMaterial color="#5a6a7a" />
          </mesh>
          <mesh position={[pos[0], pos[1] - 0.5, pos[2] + 0.05]}>
            <boxGeometry args={[0.8, 0.04, 0.12]} />
            <meshStandardMaterial color="#8a8280" roughness={0.8} />
          </mesh>
        </group>
      ))}
      {/* Fenêtres arrière RDC */}
      {[[-1.6, 1.4, -2.82], [1.6, 1.4, -2.82]].map((pos, i) => (
        <group key={`b${i}`}>
          <mesh position={pos as [number, number, number]}>
            <boxGeometry args={[0.7, 0.9, 0.1]} />
            <meshStandardMaterial color="#3a4a5a" roughness={0.6} />
          </mesh>
          <mesh position={[pos[0], pos[1], pos[2] - 0.05]}>
            <boxGeometry args={[0.62, 0.82, 0.03]} />
            <meshPhysicalMaterial color="#8ab4c8" transparent opacity={0.45} metalness={0.1} roughness={0.05} />
          </mesh>
        </group>
      ))}
      {/* Fenêtre latérale garage */}
      <mesh position={[-2.82, 1.4, -1.2]}>
        <boxGeometry args={[0.1, 0.7, 0.7]} />
        <meshStandardMaterial color="#3a4a5a" roughness={0.6} />
      </mesh>
      <mesh position={[-2.84, 1.4, -1.2]}>
        <boxGeometry args={[0.03, 0.62, 0.62]} />
        <meshPhysicalMaterial color="#8ab4c8" transparent opacity={0.45} metalness={0.1} roughness={0.05} />
      </mesh>

      {/* ===== FENÊTRES ÉTAGE ===== */}
      {[[-1.6, 3.9, 2.62], [1.6, 3.9, 2.62]].map((pos, i) => (
        <group key={`e${i}`}>
          <mesh position={pos as [number, number, number]}>
            <boxGeometry args={[0.7, 0.9, 0.1]} />
            <meshStandardMaterial color="#3a4a5a" roughness={0.6} />
          </mesh>
          <mesh position={[pos[0], pos[1], pos[2] + 0.05]}>
            <boxGeometry args={[0.62, 0.82, 0.03]} />
            <meshPhysicalMaterial color="#8ab4c8" transparent opacity={0.45} metalness={0.1} roughness={0.05} />
          </mesh>
          <mesh position={[pos[0], pos[1], pos[2] + 0.06]}>
            <boxGeometry args={[0.64, 0.03, 0.04]} />
            <meshStandardMaterial color="#5a6a7a" />
          </mesh>
          <mesh position={[pos[0], pos[1], pos[2] + 0.06]}>
            <boxGeometry args={[0.03, 0.84, 0.04]} />
            <meshStandardMaterial color="#5a6a7a" />
          </mesh>
          <mesh position={[pos[0], pos[1] - 0.5, pos[2] + 0.05]}>
            <boxGeometry args={[0.8, 0.04, 0.12]} />
            <meshStandardMaterial color="#8a8280" roughness={0.8} />
          </mesh>
        </group>
      ))}

      {/* ===== PORTE D'ENTRÉE ===== */}
      {/* Encadrement */}
      <mesh position={[0, 1.1, 2.85]}>
        <boxGeometry args={[1.2, 2.3, 0.12]} />
        <meshStandardMaterial color="#3a4a5a" roughness={0.6} />
      </mesh>
      {/* Seuil */}
      <mesh position={[0, 0.05, 2.88]}>
        <boxGeometry args={[1.3, 0.08, 0.2]} />
        <meshStandardMaterial color="#6a625a" roughness={0.8} />
      </mesh>
      {/* Porte */}
      <group ref={doorRef} position={[-0.5, 1.0, 2.92]}>
        <mesh position={[0.5, 0, 0]} castShadow>
          <boxGeometry args={[1.05, 2.1, 0.06]} />
          <meshStandardMaterial color="#6a4a2a" roughness={0.7} />
        </mesh>
        <mesh position={[0.5, 0.5, 0.03]}>
          <boxGeometry args={[0.7, 0.65, 0.02]} />
          <meshStandardMaterial color="#5a3a1a" roughness={0.8} />
        </mesh>
        <mesh position={[0.5, -0.5, 0.03]}>
          <boxGeometry args={[0.7, 0.85, 0.02]} />
          <meshStandardMaterial color="#5a3a1a" roughness={0.8} />
        </mesh>
        <mesh position={[0.85, -0.15, 0.04]}>
          <sphereGeometry args={[0.04, 12, 12]} />
          <meshStandardMaterial color="#c9a227" metalness={0.8} roughness={0.3} />
        </mesh>
        <mesh position={[0.85, -0.15, 0.02]}>
          <circleGeometry args={[0.07, 12]} />
          <meshStandardMaterial color="#8a7a5a" metalness={0.4} roughness={0.5} />
        </mesh>
      </group>

      {/* ===== CHEMINÉE ===== */}
      <mesh position={[1.8, 4.8, -1.8]} castShadow>
        <boxGeometry args={[0.6, 1.8, 0.6]} />
        <meshStandardMaterial map={brickTex} roughness={0.9} />
      </mesh>
      <mesh position={[1.8, 5.8, -1.8]} castShadow>
        <boxGeometry args={[0.7, 0.1, 0.7]} />
        <meshStandardMaterial color="#5a4a3a" roughness={0.9} />
      </mesh>

      {/* ===== AUVENT ===== */}
      <mesh position={[0, 2.6, 2.92]}>
        <boxGeometry args={[1.8, 0.06, 0.5]} />
        <meshStandardMaterial color="#4a3a2c" roughness={0.8} />
      </mesh>
      <mesh position={[-0.7, 1.3, 2.95]}>
        <boxGeometry args={[0.08, 2.5, 0.08]} />
        <meshStandardMaterial color="#5a4a3a" roughness={0.85} />
      </mesh>
      <mesh position={[0.7, 1.3, 2.95]}>
        <boxGeometry args={[0.08, 2.5, 0.08]} />
        <meshStandardMaterial color="#5a4a3a" roughness={0.85} />
      </mesh>

      {/* ===== GARAGE ===== */}
      <mesh position={[-3.2, 0.65, -2.0]}>
        <boxGeometry args={[0.8, 1.3, 1.8]} />
        <meshStandardMaterial map={brickTex} roughness={0.85} />
      </mesh>
      <mesh position={[-3.2, 1.35, -2.0]}>
        <boxGeometry args={[0.8, 0.04, 1.8]} />
        <meshStandardMaterial map={roofTex} roughness={0.8} />
      </mesh>
      <mesh position={[-3.24, 0.65, -1.2]}>
        <boxGeometry args={[0.06, 1.1, 0.9]} />
        <meshStandardMaterial color="#5a5a52" roughness={0.7} />
      </mesh>

      {/* ===== ESCALIER ===== */}
      <mesh position={[0.0, -0.02, 3.2]}>
        <boxGeometry args={[1.0, 0.06, 0.3]} />
        <meshStandardMaterial color="#8a8078" roughness={0.9} />
      </mesh>
      <mesh position={[0.0, 0.12, 3.05]}>
        <boxGeometry args={[1.0, 0.06, 0.3]} />
        <meshStandardMaterial color="#8a8078" roughness={0.9} />
      </mesh>

      {/* ===== HAIE ===== */}
      <mesh position={[-3.5, 0.3, 3.5]}>
        <boxGeometry args={[0.15, 0.6, 0.15]} />
        <meshStandardMaterial color="#4a6b3a" roughness={0.95} />
      </mesh>
      <mesh position={[-4.0, 0.3, 3.5]}>
        <boxGeometry args={[0.15, 0.6, 0.15]} />
        <meshStandardMaterial color="#4a6b3a" roughness={0.95} />
      </mesh>
      <mesh position={[-3.75, 0.4, 3.5]}>
        <boxGeometry args={[0.35, 0.05, 0.15]} />
        <meshStandardMaterial color="#5a7b4a" roughness={0.95} />
      </mesh>
    </group>
  );
}
