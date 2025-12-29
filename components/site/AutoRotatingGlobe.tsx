"use client";

import React, { useEffect, useMemo, useRef } from "react";
import { CheckCircle2, ShieldCheck, Sparkles, Layers, Settings2 } from "lucide-react";

type Pt3 = { x: number; y: number; z: number };

function clamp(v: number, a: number, b: number) {
  return Math.max(a, Math.min(b, v));
}

function fibonacciSphere(n: number): Pt3[] {
  const pts: Pt3[] = [];
  const phi = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = phi * i;
    const x = Math.cos(theta) * r;
    const z = Math.sin(theta) * r;
    pts.push({ x, y, z });
  }
  return pts;
}

function rotY(p: Pt3, a: number): Pt3 {
  const ca = Math.cos(a);
  const sa = Math.sin(a);
  return { x: p.x * ca + p.z * sa, y: p.y, z: -p.x * sa + p.z * ca };
}
function rotX(p: Pt3, a: number): Pt3 {
  const ca = Math.cos(a);
  const sa = Math.sin(a);
  return { x: p.x, y: p.y * ca - p.z * sa, z: p.y * sa + p.z * ca };
}

type Card = {
  key: string;
  tone: "blue" | "teal" | "violet" | "amber" | "slate";
  title: string;
  desc: string;
  Icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
  x: number; // %
  y: number; // %
};

export default function AboutGlobeScatter({
  points = 140,
  maxLinks = 3,
  speed = 1,
}: {
  points?: number;
  maxLinks?: number;
  speed?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);

  // Cards scattered around the globe (safe positions inside panel)
 const cards: Card[] = useMemo(
  () => [
    {
      key: "public",
      tone: "blue",
      title: "Public-sector readiness",
      desc: "Auditability, SOPs, SLA mind-set.",
      Icon: Layers,
      x: 22,
      y: 28,
    },
    {
      key: "data",
      tone: "violet",
      title: "Data governance",
      desc: "Quality, lineage, controlled access.",
      Icon: Settings2,
      x: 78,
      y: 28,
    },
    {
      key: "ops",
      tone: "teal",
      title: "Operational excellence",
      desc: "Observability, runbooks, incident flows.",
      Icon: ShieldCheck,
      x: 18,
      y: 60,
    },
    {
      key: "integration",
      tone: "amber",
      title: "Clean integrations",
      desc: "Versioned APIs, event-ready design.",
      Icon: CheckCircle2,
      x: 82,
      y: 60,
    },
    {
      key: "maintain",
      tone: "slate",
      title: "Maintainable builds",
      desc: "Modular systems, clear ownership.",
      Icon: Sparkles,
      x: 50,
      y: 86,
    },
  ],
  []
);

  const basePts = useMemo(() => fibonacciSphere(points), [points]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    const reducedMotion = !!mq?.matches;

    const resize = () => {
      const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
      const rect = canvas.getBoundingClientRect();
      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); // draw in CSS pixels
    };

    resize();
    const ro = new ResizeObserver(() => resize());
    ro.observe(canvas);

    // Precompute nearest neighbors for stable lines
    const neighbors: number[][] = [];
    for (let i = 0; i < basePts.length; i++) {
      const a = basePts[i];
      const dists: Array<{ j: number; d: number }> = [];
      for (let j = 0; j < basePts.length; j++) {
        if (i === j) continue;
        const b = basePts[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dz = a.z - b.z;
        dists.push({ j, d: dx * dx + dy * dy + dz * dz });
      }
      dists.sort((u, v) => u.d - v.d);
      neighbors[i] = dists.slice(0, maxLinks).map((k) => k.j);
    }

    let t0 = performance.now();
    let angY = 0;
    let angX = 0;
    let hue = 210; // start near brand blue

    const draw = (now: number) => {
      const dt = Math.min(0.05, (now - t0) / 1000);
      t0 = now;

      if (!reducedMotion) {
        angY += dt * 0.60 * speed;
        angX += dt * 0.22 * speed;
        hue = (hue + dt * 16) % 360; // slow hue shift (color-changing)
      }

      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;

      ctx.clearRect(0, 0, w, h);

      // Globe center (slightly below center to leave space for label)
      const cx = w * 0.50;
      const cy = h * 0.54;

      // BIG globe
      const radius = Math.min(w, h) * 0.39;

      // Perspective
      const persp = 2.55;
      const zClip = 0.08;

      // Dynamic color
      const lineColor = `hsla(${hue}, 70%, 48%,`; // alpha appended later
      const dotColor = `hsla(${hue}, 78%, 50%,`;

      // Project points
      const pts2 = basePts.map((p) => {
        let q = rotY(p, angY);
        q = rotX(q, angX);

        const z = q.z; // -1..1
        const k = 1 / (persp - z);

        const x2 = cx + q.x * radius * k;
        const y2 = cy + q.y * radius * k;

        const front = (z + 1) / 2;
        const vis = clamp((z - (-zClip)) / (1 - (-zClip)), 0, 1);
        const aDot = 0.14 + front * 0.70 * vis;

        return { x2, y2, z, front, vis, aDot };
      });

      // subtle silhouette ring
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 1.02, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(11,30,58,0.06)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // lines
      for (let i = 0; i < pts2.length; i++) {
        const a = pts2[i];
        if (a.vis < 0.16) continue;

        for (const j of neighbors[i]) {
          const b = pts2[j];
          if (b.vis < 0.16) continue;

          const dx = a.x2 - b.x2;
          const dy = a.y2 - b.y2;
          const d = Math.sqrt(dx * dx + dy * dy);

          // keep it clean
          if (d > radius * 0.78) continue;

          const alpha = 0.05 + 0.22 * Math.min(a.front, b.front) * Math.min(a.vis, b.vis);
          ctx.strokeStyle = `${lineColor}${alpha})`;
          ctx.lineWidth = 1;

          ctx.beginPath();
          ctx.moveTo(a.x2, a.y2);
          ctx.lineTo(b.x2, b.y2);
          ctx.stroke();
        }
      }

      // dots: back-to-front
      const order = pts2
        .map((p, idx) => ({ idx, z: p.z }))
        .sort((u, v) => u.z - v.z);

      for (const o of order) {
        const p = pts2[o.idx];

        const r = 1.15 + p.front * 2.35;

        // halo
        ctx.beginPath();
        ctx.arc(p.x2, p.y2, 3.2 + p.front * 5.0, 0, Math.PI * 2);
        ctx.fillStyle = `${dotColor}${0.08 * p.aDot})`;
        ctx.fill();

        // dot
        ctx.beginPath();
        ctx.arc(p.x2, p.y2, r, 0, Math.PI * 2);
        ctx.fillStyle = `${dotColor}${p.aDot})`;
        ctx.fill();

        // core
        ctx.beginPath();
        ctx.arc(p.x2, p.y2, Math.max(0.8, r * 0.44), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(11,30,58,${0.10 + 0.18 * p.front})`;
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, [basePts, maxLinks, speed]);

  // Center used for connector SVG (match canvas center ratio)
  const center = { x: 50, y: 54 };

  return (
    <div className="aboutg">
      <div className="aboutg__bg" aria-hidden>
        <div className="aboutg__mesh" />
        <div className="aboutg__grid" />
        <div className="aboutg__noise" />
      </div>
      {/* Connectors behind cards (so cards look like they come from globe) */}
     

      <div className="aboutg__stage" aria-hidden>
        <canvas ref={canvasRef} className="aboutg__canvas" />
        <div className="aboutg__ring" />
        <div className="aboutg__ring aboutg__ring--inner" />
      </div>

      {/* Scattered cards */}
      {cards.map((c, idx) => {
        const Icon = c.Icon;
        return (
          <div
            key={c.key}
            className={`aboutg__card aboutg__card--${c.tone}`}
            style={
              {
                left: `${c.x}%`,
                top: `${c.y}%`,
                "--d": `${idx * 0.6}s`,
              } as React.CSSProperties
            }
          >
            <span className="ic" aria-hidden>
              <Icon size={18} strokeWidth={2.5} />
            </span>
            <div className="tx">
              <div className="ct">{c.title}</div>
              <div className="cs">{c.desc}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
