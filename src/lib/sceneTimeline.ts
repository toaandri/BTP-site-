import * as THREE from "three";

export type CameraKeyframe = {
  t: number;
  position: THREE.Vector3Tuple;
  lookAt: THREE.Vector3Tuple;
  door: number;
  opacity: number;
};

/** Timeline caméra : façade → zoom → porte → intérieur → étage → disparition */
export const CAMERA_KEYS: CameraKeyframe[] = [
  { t: 0, position: [8.5, 3.2, 12], lookAt: [0, 1.6, 0], door: 0, opacity: 1 },
  { t: 0.18, position: [5.2, 2.4, 8], lookAt: [0, 1.5, 0], door: 0, opacity: 1 },
  { t: 0.32, position: [2.4, 1.7, 5.2], lookAt: [0, 1.35, 0.2], door: 0, opacity: 1 },
  { t: 0.4, position: [0.15, 1.45, 3.4], lookAt: [0, 1.35, 0], door: 0.15, opacity: 1 },
  { t: 0.48, position: [0.1, 1.4, 1.2], lookAt: [0, 1.4, -1], door: 1, opacity: 1 },
  { t: 0.58, position: [0.2, 1.45, -0.8], lookAt: [0, 1.5, -2.5], door: 1, opacity: 1 },
  { t: 0.68, position: [-0.4, 2.1, -1.2], lookAt: [0.2, 2.6, -2.2], door: 1, opacity: 1 },
  { t: 0.78, position: [0.3, 3.4, -1.5], lookAt: [0, 3.5, -2.8], door: 1, opacity: 1 },
  { t: 0.88, position: [1.2, 3.6, -0.4], lookAt: [0, 3.4, -2], door: 1, opacity: 0.85 },
  { t: 0.95, position: [4, 4.5, 6], lookAt: [0, 2, 0], door: 1, opacity: 0.25 },
  { t: 1, position: [7, 5.5, 10], lookAt: [0, 1.5, 0], door: 1, opacity: 0 },
];

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function sampleKeys(t: number) {
  const keys = CAMERA_KEYS;
  if (t <= keys[0].t) return { a: keys[0], b: keys[0], u: 0 };
  if (t >= keys[keys.length - 1].t)
    return { a: keys[keys.length - 1], b: keys[keys.length - 1], u: 0 };

  for (let i = 0; i < keys.length - 1; i++) {
    const a = keys[i];
    const b = keys[i + 1];
    if (t >= a.t && t <= b.t) {
      const u = (t - a.t) / (b.t - a.t || 1);
      return { a, b, u };
    }
  }
  return { a: keys[keys.length - 1], b: keys[keys.length - 1], u: 0 };
}

export type SceneState = {
  position: THREE.Vector3;
  lookAt: THREE.Vector3;
  door: number;
  opacity: number;
};

const _pos = new THREE.Vector3();
const _look = new THREE.Vector3();

export function getSceneState(t: number): SceneState {
  const clamped = Math.min(1, Math.max(0, t));
  const { a, b, u } = sampleKeys(clamped);
  const ease = u * u * (3 - 2 * u);

  _pos.set(
    lerp(a.position[0], b.position[0], ease),
    lerp(a.position[1], b.position[1], ease),
    lerp(a.position[2], b.position[2], ease),
  );
  _look.set(
    lerp(a.lookAt[0], b.lookAt[0], ease),
    lerp(a.lookAt[1], b.lookAt[1], ease),
    lerp(a.lookAt[2], b.lookAt[2], ease),
  );

  return {
    position: _pos.clone(),
    lookAt: _look.clone(),
    door: lerp(a.door, b.door, ease),
    opacity: lerp(a.opacity, b.opacity, ease),
  };
}

/** Après ouverture de porte (~0.42), avance légèrement même sans scroll. */
export function withAutoTour(scrollT: number, autoBoost: number): number {
  const doorThreshold = 0.42;
  if (scrollT < doorThreshold) return scrollT;
  const boost = Math.min(0.12, autoBoost * 0.12);
  return Math.min(0.86, scrollT + boost);
}
