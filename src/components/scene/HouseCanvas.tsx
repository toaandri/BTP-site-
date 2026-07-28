"use client";

import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, ContactShadows } from "@react-three/drei";
import { SceneRoot } from "./SceneRoot";

type Props = {
  scrollProgress: number;
  visible: boolean;
};

export function HouseCanvas({ scrollProgress, visible }: Props) {
  const [dpr, setDpr] = useState(1);

  useEffect(() => {
    setDpr(Math.min(window.devicePixelRatio, 1.75));
  }, []);

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
          <SceneRoot scrollProgress={scrollProgress} />
          <ContactShadows position={[0, 0.01, 0]} opacity={0.45} scale={24} blur={2.2} />
          <Environment preset="city" environmentIntensity={0.35} />
        </Suspense>
      </Canvas>
    </div>
  );
}
