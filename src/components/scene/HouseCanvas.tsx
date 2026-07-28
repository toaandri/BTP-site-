"use client";

import { Suspense, useState, useCallback } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, ContactShadows } from "@react-three/drei";
import { SceneRoot } from "./SceneRoot";
import { SkyAtmosphere } from "./SkyAtmosphere";

type Props = {
  scrollProgress: number;
  visible: boolean;
  onReady?: () => void;
};

export function HouseCanvas({ scrollProgress, visible, onReady }: Props) {
  const [dpr] = useState(() => {
    if (typeof window === "undefined") return 1;
    const d = Math.min(window.devicePixelRatio, 1.75);
    return navigator.hardwareConcurrency <= 4 ? Math.min(d, 1.25) : d;
  });
  const [ready, setReady] = useState(false);

  const handleCreated = useCallback(() => {
    if (!ready) {
      setReady(true);
      onReady?.();
    }
  }, [ready, onReady]);

  const lowPerf = typeof navigator !== "undefined" && navigator.hardwareConcurrency <= 4;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-700"
      style={{ opacity: visible ? 1 : 0 }}
      aria-hidden
    >
      <Canvas
        shadows
        dpr={dpr}
        camera={{ position: [8.5, 3.2, 12], fov: 42, near: 0.1, far: 80 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ background: "transparent" }}
        onCreated={handleCreated}
      >
        <color attach="background" args={["#0f1c28"]} />
        <fog attach="fog" args={["#0f1c28", 14, 38]} />
        <ambientLight intensity={0.45} />
        <directionalLight
          castShadow
          position={[8, 14, 6]}
          intensity={1.35}
          shadow-mapSize={[1024, 1024]}
        />
        <hemisphereLight args={["#c5d4e0", "#3d4a3c", 0.55]} />
        <Suspense fallback={null}>
          <SkyAtmosphere />
          <SceneRoot scrollProgress={scrollProgress} />
          <ContactShadows position={[0, 0.01, 0]} opacity={0.45} scale={24} blur={2.2} />
          {!lowPerf && <Environment preset="city" environmentIntensity={0.6} />}
        </Suspense>
      </Canvas>
    </div>
  );
}
