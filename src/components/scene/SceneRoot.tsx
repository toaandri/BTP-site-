"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { getSceneState, withAutoTour } from "@/lib/sceneTimeline";
import { House } from "./House";
import { BlueprintTransition } from "./BlueprintTransition";

type Props = {
  scrollProgress: number;
};

export function SceneRoot({ scrollProgress }: Props) {
  const { camera } = useThree();
  const autoRef = useRef(0);
  const lastScroll = useRef(scrollProgress);
  const doorOpen = useRef(0);
  const opacity = useRef(1);
  const look = useRef(new THREE.Vector3(0, 1.6, 0));

  useFrame((_, delta) => {
    if (scrollProgress >= 0.42 && scrollProgress < 0.86) {
      const stalled = Math.abs(scrollProgress - lastScroll.current) < 0.0008;
      autoRef.current = stalled
        ? Math.min(1, autoRef.current + delta * 0.18)
        : Math.max(0, autoRef.current - delta * 0.08);
    } else if (scrollProgress < 0.42) {
      autoRef.current = 0;
    }
    lastScroll.current = scrollProgress;

    const t = withAutoTour(scrollProgress, autoRef.current);
    const state = getSceneState(t);

    doorOpen.current = THREE.MathUtils.damp(doorOpen.current, state.door, 6, delta);
    opacity.current = THREE.MathUtils.damp(opacity.current, state.opacity, 4, delta);

    camera.position.lerp(state.position, 1 - Math.exp(-4.5 * delta));
    look.current.lerp(state.lookAt, 1 - Math.exp(-4.5 * delta));
    camera.lookAt(look.current);
  });

  return (
    <>
      <House doorOpen={doorOpen} opacity={opacity} />
      <BlueprintTransition active={scrollProgress > 0.92} progress={scrollProgress} />
    </>
  );
}
