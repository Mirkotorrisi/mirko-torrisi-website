'use client';

import { useEffect, useRef } from 'react';

type Rgb = [number, number, number];

const STONE_LIGHT: Rgb = [226, 227, 222];
const STONE_DARK: Rgb = [207, 209, 202];
const LAVA: Rgb = [23, 25, 27];
const MAJOLICA: Rgb = [31, 79, 216];

const JOINT = 4;
const COOL_DOWN_MS = 1200;
const SWEEP_DELAY_MS = 350;
const SWEEP_MS = 1300;

type Block = {
  x: number;
  y: number;
  w: number;
  h: number;
  base: Rgb;
  heat: number;
  fired: boolean;
};

const mix = (a: Rgb, b: Rgb, t: number) =>
  `rgb(${Math.round(a[0] + (b[0] - a[0]) * t)} ${Math.round(a[1] + (b[1] - a[1]) * t)} ${Math.round(a[2] + (b[2] - a[2]) * t)})`;

// Stable pseudo-random shade per block, so the wall doesn't change on resize.
const shade = (row: number, col: number) => {
  const n = Math.sin(row * 127.1 + col * 311.7) * 43758.5453;
  return n - Math.floor(n);
};

/**
 * A wall of limestone blocks laid in staggered courses. On load a wave of lava
 * stone sweeps across it; afterwards blocks darken where the pointer passes and
 * cool down again. One block is a majolica tile.
 */
export default function Ashlar() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let blocks: Block[] = [];
    let width = 0;
    let height = 0;
    let raf = 0;
    let running = false;
    let startedAt = 0;
    let lastFrame = 0;
    let pointer: { x: number; y: number } | null = null;

    const layout = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const cols = width < 340 ? 3 : 4;
      const bw = width / cols;
      const bh = bw * 0.5;
      const rows = Math.ceil(height / bh);

      blocks = [];
      for (let r = 0; r < rows; r++) {
        const offset = r % 2 ? -bw / 2 : 0;
        for (let c = 0; c <= cols; c++) {
          const x = offset + c * bw;
          if (x + bw <= 0 || x >= width) continue;
          const isTile = r === 3 && c === 2;
          const s = shade(r, c);
          blocks.push({
            x,
            y: r * bh,
            w: bw,
            h: bh,
            base: isTile
              ? MAJOLICA
              : [
                  STONE_DARK[0] + (STONE_LIGHT[0] - STONE_DARK[0]) * s,
                  STONE_DARK[1] + (STONE_LIGHT[1] - STONE_DARK[1]) * s,
                  STONE_DARK[2] + (STONE_LIGHT[2] - STONE_DARK[2]) * s,
                ],
            heat: 0,
            fired: startedAt !== 0,
          });
        }
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      for (const b of blocks) {
        const e = b.heat * b.heat * (3 - 2 * b.heat);
        ctx.fillStyle = mix(b.base, LAVA, e);
        ctx.fillRect(
          b.x + JOINT / 2,
          b.y + JOINT / 2,
          b.w - JOINT,
          b.h - JOINT
        );
      }
    };

    const frame = (now: number) => {
      if (!startedAt) startedAt = now;
      const dt = lastFrame ? now - lastFrame : 16;
      lastFrame = now;

      // Diagonal wave from the top left corner.
      const reach = width + height * 0.8;
      const sweep =
        ((now - startedAt - SWEEP_DELAY_MS) / SWEEP_MS) * (reach + width * 0.5);
      const sweeping = sweep < reach + width * 0.5;

      let active = sweeping;
      const radius = (blocks[0]?.w ?? 100) * 1.1;

      for (const b of blocks) {
        const cx = b.x + b.w / 2;
        const cy = b.y + b.h / 2;

        if (!b.fired && cx + cy * 0.8 <= sweep) {
          b.fired = true;
          b.heat = 1;
        }

        if (pointer) {
          const d = Math.hypot(cx - pointer.x, (cy - pointer.y) * 1.6);
          if (d < radius) b.heat = Math.max(b.heat, 1 - d / radius);
        }

        if (b.heat > 0) {
          b.heat = Math.max(0, b.heat - dt / COOL_DOWN_MS);
          active = true;
        }
      }

      draw();

      if (active || pointer) {
        raf = requestAnimationFrame(frame);
      } else {
        running = false;
      }
    };

    const kick = () => {
      if (running) return;
      running = true;
      lastFrame = 0;
      raf = requestAnimationFrame(frame);
    };

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const margin = 40;
      const inside =
        x > -margin && x < width + margin && y > -margin && y < height + margin;
      pointer = inside ? { x, y } : null;
      if (inside) kick();
    };

    const onPointerLeave = () => {
      pointer = null;
    };

    layout();
    draw();

    if (!reduced) {
      window.addEventListener('pointermove', onPointerMove, { passive: true });
      document.addEventListener('pointerleave', onPointerLeave);
      kick();
    }

    const observer = new ResizeObserver(() => {
      layout();
      draw();
      if (!reduced) kick();
    });
    observer.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('pointerleave', onPointerLeave);
    };
  }, []);

  return (
    <canvas ref={canvasRef} aria-hidden className="block h-full w-full" />
  );
}
