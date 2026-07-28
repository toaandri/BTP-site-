import * as THREE from "three";

export function createBrickTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext("2d")!;

  ctx.fillStyle = "#c4b8a8";
  ctx.fillRect(0, 0, 256, 256);

  const brickH = 24;
  const brickW = 48;
  const mortar = 3;

  for (let row = 0; row < 256; row += brickH + mortar) {
    const offset = Math.floor(row / (brickH + mortar)) % 2 === 0 ? 0 : brickW / 2;
    for (let col = -offset; col < 256; col += brickW + mortar) {
      const shade = 180 + Math.random() * 50;
      ctx.fillStyle = `rgb(${shade}, ${shade - 10}, ${shade - 20})`;
      ctx.fillRect(col, row, brickW, brickH);
    }
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(2, 2);
  tex.anisotropy = 4;
  return tex;
}

export function createRoofTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext("2d")!;

  ctx.fillStyle = "#4a3a2c";
  ctx.fillRect(0, 0, 128, 128);

  for (let i = 0; i < 128; i += 16) {
    for (let j = 0; j < 128; j += 32) {
      const shade = 60 + Math.random() * 30;
      ctx.fillStyle = `rgb(${shade + 10}, ${shade}, ${shade - 10})`;
      ctx.beginPath();
      ctx.arc(j + 16, i + 8, 14, 0, Math.PI);
      ctx.fill();
    }
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(4, 4);
  return tex;
}

export function createGroundTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext("2d")!;

  ctx.fillStyle = "#5a6b52";
  ctx.fillRect(0, 0, 128, 128);

  for (let i = 0; i < 2000; i++) {
    const x = Math.random() * 128;
    const y = Math.random() * 128;
    const shade = 80 + Math.random() * 40;
    ctx.fillStyle = `rgb(${shade}, ${shade + 10}, ${shade - 10})`;
    ctx.fillRect(x, y, 2, 2);
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(8, 8);
  return tex;
}
