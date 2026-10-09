"use client";

import React, { useEffect, useRef } from "react";

interface AsciiCanvasProps {
  className?: string;
  density?: "low" | "medium" | "high";
}

export function AsciiCanvas({ className = "w-full h-full", density = "medium" }: AsciiCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Palette of ASCII/Unicode shading glyphs
    const charset = "░▒▓█▀▄▌▐│─┤├┴┬╭╮╰╯·∘○◯";
    let angle = 0;

    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    const stepSize = density === "high" ? 0.12 : density === "low" ? 0.2 : 0.15;

    const render = () => {
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const radius = Math.min(rect.width, rect.height) * 0.48;

      ctx.font = "11px 'JetBrains Mono', monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      type Point = { x: number; y: number; z: number; char: string };
      const points: Point[] = [];

      // 3D mathematical projection of a sphere
      for (let theta = 0; theta < Math.PI * 2; theta += stepSize) {
        for (let phi = 0; phi < Math.PI; phi += stepSize) {
          // Base 3D spherical coordinates
          const x0 = Math.sin(phi) * Math.cos(theta + angle * 0.45);
          const y0 = Math.sin(phi) * Math.sin(theta + angle * 0.45);
          const z0 = Math.cos(phi);

          // Rotate around X & Y axes
          const pitch = angle * 0.3;
          const x1 = x0;
          const y1 = y0 * Math.cos(pitch) - z0 * Math.sin(pitch);
          const z1 = y0 * Math.sin(pitch) + z0 * Math.cos(pitch);

          const yaw = angle * 0.2;
          const x2 = x1 * Math.cos(yaw) + z1 * Math.sin(yaw);
          const y2 = y1;
          const z2 = -x1 * Math.sin(yaw) + z1 * Math.cos(yaw);

          // Map Z-depth to character index
          const charIndex = Math.floor(((z2 + 1) / 2) * (charset.length - 1));
          points.push({
            x: centerX + x2 * radius,
            y: centerY + y2 * radius,
            z: z2,
            char: charset[Math.max(0, Math.min(charIndex, charset.length - 1))],
          });
        }
      }

      // Depth sort so foreground points render over background
      points.sort((a, b) => a.z - b.z);

      points.forEach((p) => {
        // High-contrast, elegant monochrome opacity
        const alpha = 0.08 + (p.z + 1) * 0.32;
        ctx.fillStyle = `rgba(8, 5, 3, ${alpha.toFixed(3)})`;
        ctx.fillText(p.char, p.x, p.y);
      });

      angle += 0.016;
      animFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [density]);

  return <canvas ref={canvasRef} className={className} style={{ display: "block" }} />;
}
