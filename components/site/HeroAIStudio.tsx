"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { H2, H3 } from "../ui/Typography";

type Tilt = { rx: number; ry: number; mx: number; my: number };

function cellStyle(i: number): React.CSSProperties {
  const mod = i % 6;
  const variants = [
    { bg: `linear-gradient(135deg, rgba(27,89,167,0.26), rgba(20,212,177,0.22))`, glow: `0 0 0 1px rgba(27,89,167,0.18), 0 12px 34px rgba(27,89,167,0.08)` },
    { bg: `linear-gradient(135deg, rgba(20,212,177,0.22), rgba(245,158,11,0.16))`, glow: `0 0 0 1px rgba(20,212,177,0.16), 0 12px 34px rgba(20,212,177,0.07)` },
    { bg: `radial-gradient(circle at 30% 30%, rgba(27,89,167,0.34), rgba(27,89,167,0.10))`, glow: `0 0 0 1px rgba(27,89,167,0.14), 0 12px 30px rgba(27,89,167,0.06)` },
    { bg: `radial-gradient(circle at 30% 30%, rgba(20,212,177,0.34), rgba(20,212,177,0.10))`, glow: `0 0 0 1px rgba(20,212,177,0.14), 0 12px 30px rgba(20,212,177,0.06)` },
    { bg: `radial-gradient(circle at 30% 30%, rgba(245,158,11,0.26), rgba(245,158,11,0.10))`, glow: `0 0 0 1px rgba(245,158,11,0.12), 0 12px 28px rgba(245,158,11,0.05)` },
    { bg: `linear-gradient(135deg, rgba(27,89,167,0.22), rgba(245,158,11,0.14))`, glow: `0 0 0 1px rgba(27,89,167,0.12), 0 12px 28px rgba(245,158,11,0.05)` },
  ];
  const v = variants[mod];
  return { background: v.bg, boxShadow: v.glow, animationDelay: `${i * 70}ms` };
}

/** Premium auto-loop highlight for background. */
function useAutoLoopVpxVpy(containerRef: React.RefObject<HTMLElement | null>) {
  const target = useRef({ x: 0.6, y: 0.4 });
  const current = useRef({ x: 0.6, y: 0.4 });
  const lastPointerTs = useRef<number>(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    const reduced = !!mq?.matches;

    if (reduced) {
      el.style.setProperty("--vpx", "60%");
      el.style.setProperty("--vpy", "40%");
      return;
    }

    const onPointerMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / Math.max(1, rect.width);
      const ny = (e.clientY - rect.top) / Math.max(1, rect.height);
      target.current.x = Math.min(0.86, Math.max(0.14, nx));
      target.current.y = Math.min(0.80, Math.max(0.20, ny));
      lastPointerTs.current = performance.now();
    };

    el.addEventListener("pointermove", onPointerMove, { passive: true });

    let raf = 0;
    const start = performance.now();

    const tick = () => {
      const now = performance.now();
      const t = (now - start) / 1000;

      // Futuristic, calm “living” path
      const autoX = 0.56 + 0.12 * Math.sin(t * 0.28) + 0.05 * Math.sin(t * 0.9);
      const autoY = 0.44 + 0.10 * Math.cos(t * 0.24) + 0.05 * Math.cos(t * 0.72);

      const pointerActive = now - lastPointerTs.current < 1200;
      const desiredX = pointerActive ? target.current.x : autoX;
      const desiredY = pointerActive ? target.current.y : autoY;

      const ease = pointerActive ? 0.11 : 0.055;
      current.current.x += (desiredX - current.current.x) * ease;
      current.current.y += (desiredY - current.current.y) * ease;

      el.style.setProperty("--vpx", `${(current.current.x * 100).toFixed(2)}%`);
      el.style.setProperty("--vpy", `${(current.current.y * 100).toFixed(2)}%`);

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointermove", onPointerMove as any);
    };
  }, [containerRef]);
}

/** Deterministic PRNG */
function mulberry32(seed: number) {
  return () => {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Neural mesh canvas background */
function useNeuralMesh(canvasRef: React.RefObject<HTMLCanvasElement | null>, hostRef: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const canvas = canvasRef.current;
    const host = hostRef.current;
    if (!canvas || !host) return;

    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    const reduced = !!mq?.matches;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;

    const rand = mulberry32(1337);

    const state = {
      w: 0,
      h: 0,
      dpr: 1,
      points: [] as Array<{
        x: number; y: number; vx: number; vy: number;
        r: number; c: number; tw: number;
      }>,
      pulses: [] as Array<{ a: number; b: number; t: number; sp: number; life: number; }>,
      lastPulseAt: 0,
    };

    const theme = {
      // keep it on-brand
      blue: "27,89,167",
      teal: "20,212,177",
      amber: "245,158,11",
      ink: "8,12,20",
    };

    const resize = () => {
      const rect = host.getBoundingClientRect();
      const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
      state.w = Math.max(1, Math.floor(rect.width));
      state.h = Math.max(1, Math.floor(rect.height));
      state.dpr = dpr;

      canvas.width = Math.floor(state.w * dpr);
      canvas.height = Math.floor(state.h * dpr);
      canvas.style.width = `${state.w}px`;
      canvas.style.height = `${state.h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const isMobile = state.w < 740;
      const density = isMobile ? 0.00008 : 0.00006; // points per px²
      const count = Math.max(26, Math.min(70, Math.floor(state.w * state.h * density)));

      state.points = Array.from({ length: count }).map(() => {
        const x = rand() * state.w;
        const y = rand() * state.h;
        const speed = (isMobile ? 0.12 : 0.14) + rand() * (isMobile ? 0.18 : 0.22);
        const ang = rand() * Math.PI * 2;
        return {
          x, y,
          vx: Math.cos(ang) * speed,
          vy: Math.sin(ang) * speed,
          r: 1.1 + rand() * 1.6,
          c: rand() < 0.52 ? 0 : (rand() < 0.85 ? 1 : 2), // 0 blue, 1 teal, 2 amber
          tw: rand() * Math.PI * 2,
        };
      });

      state.pulses = [];
      state.lastPulseAt = 0;
    };

    const colorFor = (idx: number, a: number) => {
      const rgb = idx === 0 ? theme.blue : idx === 1 ? theme.teal : theme.amber;
      return `rgba(${rgb},${a})`;
    };

    const draw = (time: number) => {
      const t = time / 1000;

      // Background clear (transparent; CSS handles wash)
      ctx.clearRect(0, 0, state.w, state.h);

      // Pull highlight position from CSS vars (for “smart” lighting)
      const cs = getComputedStyle(host);
      const vpx = parseFloat(cs.getPropertyValue("--vpx")) || 60;
      const vpy = parseFloat(cs.getPropertyValue("--vpy")) || 40;
      const hx = (vpx / 100) * state.w;
      const hy = (vpy / 100) * state.h;

      // Soft “spotlight” to unify everything
      const grad = ctx.createRadialGradient(hx, hy, 0, hx, hy, Math.max(state.w, state.h) * 0.65);
      grad.addColorStop(0, `rgba(${theme.teal},0.08)`);
      grad.addColorStop(0.45, `rgba(${theme.blue},0.04)`);
      grad.addColorStop(1, `rgba(${theme.ink},0)`);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, state.w, state.h);

      if (reduced) {
        // Static crisp nodes + a few lines (no motion)
        const maxDist = Math.min(220, Math.max(160, state.w * 0.18));
        for (let i = 0; i < state.points.length; i++) {
          const p = state.points[i];
          for (let j = i + 1; j < state.points.length; j++) {
            const q = state.points[j];
            const dx = p.x - q.x;
            const dy = p.y - q.y;
            const d = Math.hypot(dx, dy);
            if (d < maxDist) {
              const a = (1 - d / maxDist) * 0.12;
              ctx.strokeStyle = `rgba(${theme.blue},${a})`;
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(q.x, q.y);
              ctx.stroke();
            }
          }
        }
        for (const p of state.points) {
          ctx.fillStyle = colorFor(p.c, 0.34);
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fill();
        }
        return;
      }

      // Update points
      for (const p of state.points) {
        // slight drift modulation to avoid “screensaver” feel
        p.tw += 0.015;
        p.x += p.vx + Math.sin(p.tw + t * 0.6) * 0.08;
        p.y += p.vy + Math.cos(p.tw + t * 0.6) * 0.08;

        // wrap edges
        if (p.x < -20) p.x = state.w + 20;
        if (p.x > state.w + 20) p.x = -20;
        if (p.y < -20) p.y = state.h + 20;
        if (p.y > state.h + 20) p.y = -20;
      }

      // Connection threshold scales with size
      const maxDist = Math.min(260, Math.max(170, state.w * 0.20));

      // Lines
      for (let i = 0; i < state.points.length; i++) {
        const p = state.points[i];
        for (let j = i + 1; j < state.points.length; j++) {
          const q = state.points[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const d = Math.hypot(dx, dy);
          if (d >= maxDist) continue;

          const baseA = (1 - d / maxDist);
          // subtle “breathing” brightness
          const wave = 0.55 + 0.45 * Math.sin(t * 0.9 + (i + j) * 0.07);
          const a = baseA * 0.10 * wave;

          // Gradient line (blue->teal bias)
          const lg = ctx.createLinearGradient(p.x, p.y, q.x, q.y);
          lg.addColorStop(0, `rgba(${theme.blue},${a})`);
          lg.addColorStop(1, `rgba(${theme.teal},${a})`);
          ctx.strokeStyle = lg;
          ctx.lineWidth = 1;

          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.stroke();
        }
      }

      // Pulses (energy packets)
      if (time - state.lastPulseAt > 750 + rand() * 700) {
        state.lastPulseAt = time;
        const a = Math.floor(rand() * state.points.length);
        let b = Math.floor(rand() * state.points.length);
        if (b === a) b = (b + 7) % state.points.length;
        state.pulses.push({ a, b, t: 0, sp: 0.010 + rand() * 0.014, life: 1.0 });
        if (state.pulses.length > 10) state.pulses.shift();
      }

      for (const pulse of state.pulses) {
        pulse.t += pulse.sp;
        pulse.life *= 0.995;
      }
      state.pulses = state.pulses.filter((p) => p.t < 1.0 && p.life > 0.12);

      for (const pulse of state.pulses) {
        const a = state.points[pulse.a];
        const b = state.points[pulse.b];
        const px = a.x + (b.x - a.x) * pulse.t;
        const py = a.y + (b.y - a.y) * pulse.t;

        // glow dot
        const glow = ctx.createRadialGradient(px, py, 0, px, py, 26);
        glow.addColorStop(0, `rgba(${theme.teal},0.22)`);
        glow.addColorStop(0.4, `rgba(${theme.blue},0.10)`);
        glow.addColorStop(1, `rgba(${theme.blue},0)`);
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(px, py, 18, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `rgba(${theme.teal},${0.62 * pulse.life})`;
        ctx.beginPath();
        ctx.arc(px, py, 2.3, 0, Math.PI * 2);
        ctx.fill();
      }

      // Nodes on top
      for (const p of state.points) {
        const tw = 0.35 + 0.65 * (0.5 + 0.5 * Math.sin(p.tw + t * 1.1));
        const a = 0.22 + 0.18 * tw;
        ctx.fillStyle = colorFor(p.c === 2 ? 2 : (p.c === 1 ? 1 : 0), a);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };

    resize();
    raf = requestAnimationFrame(draw);

    const onResize = () => resize();
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, [canvasRef, hostRef]);
}

export function HeroAIStudio() {
  // IMPORTANT: background auto-loop MUST be attached to section ref
  const heroRef = useRef<HTMLElement | null>(null);
  useAutoLoopVpxVpy(heroRef);

  const meshCanvasRef = useRef<HTMLCanvasElement | null>(null);
  useNeuralMesh(meshCanvasRef, heroRef);

  const [tilt, setTilt] = useState<Tilt>({ rx: 0, ry: 0, mx: 50, my: 50 });

  const setVars = (xPct: number, yPct: number) => {
    const el = heroRef.current;
    if (!el) return;
    el.style.setProperty("--px", `${xPct}%`);
    el.style.setProperty("--py", `${yPct}%`);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const xPct = Math.max(0, Math.min(100, (x / rect.width) * 100));
    const yPct = Math.max(0, Math.min(100, (y / rect.height) * 100));

    const rx = ((yPct - 50) / 50) * 6;
    const ry = ((50 - xPct) / 50) * 8;

    setTilt({ rx, ry, mx: xPct, my: yPct });
    setVars(xPct, yPct);
  };

  const resetTilt = () => {
    setTilt({ rx: 0, ry: 0, mx: 50, my: 50 });
    setVars(50, 50);
  };

  useEffect(() => {
    // Ensure these exist even if user never hovers.
    setVars(50, 50);
    const el = heroRef.current;
    if (!el) return;
    if (!el.style.getPropertyValue("--vpx")) el.style.setProperty("--vpx", "60%");
    if (!el.style.getPropertyValue("--vpy")) el.style.setProperty("--vpy", "40%");
  }, []);

  return (
    <section ref={heroRef as any} className="zyposoft-hero zyposoft-hero--futuristic" aria-label="Hero">
      {/* FUTURISTIC BACKGROUND */}
      <div className="zyposoft-hero__bg" aria-hidden="true">
        <div className="zyposoft-hero__aurora" />
        <div className="zyposoft-hero__grid" />
        <canvas ref={meshCanvasRef} className="zyposoft-hero__meshCanvas" />
        <div className="zyposoft-hero__vignette" />
        <div className="zyposoft-hero__noise" />
      </div>

      {/* CONTENT */}
      <div className="zyposoft-hero__content">
        <div>
          <div className="zyposoft-hero__badge">
            <span className="zyposoft-hero__dot" />
            <span className="zyposoft-hero__badgeText">AI-Enabled Systems</span>
          </div>

          <h1 className="zyposoft-hero__title">
            ZypoSoft
            <H3 className="mt-6">
              <span className="studio-gradient-text font-extrabold">Innovation that ships. Intelligence that performs. Impact that lasts.</span>
            </H3>
          </h1>

          <p className="zyposoft-hero__subtitle mt-4">
            <b>ArogyaSara</b> - A next-generation health platform that unifies clinical workflows, hospital operations, and citizen services with secure foundations and decision-ready intelligence.
          </p>

          <div className="zyposoft-hero__miniGrid" role="list">
            <div className="zyposoft-hero__miniCard_V" role="listitem">
              <div className="miniK">Intelligence</div>
              <div className="miniV">Predictive signals for decisions</div>
            </div>
            <div className="zyposoft-hero__miniCard_G" role="listitem">
              <div className="miniK">Operations</div>
              <div className="miniV">Workflows, uptime, governance</div>
            </div>
            <div className="zyposoft-hero__miniCard_O" role="listitem">
              <div className="miniK">Delivery</div>
              <div className="miniV">Build, ship, and continuously improve</div>
            </div>
          </div>
        </div>

        {/* DEVICE / SHOWCASE */}
        <div className="zyposoft-hero__showcaseWrap">
          <div
            className="zyposoft-tilt"
            onMouseMove={handleMouseMove}
            onMouseLeave={resetTilt}
            style={
              {
                ["--rx" as any]: `${tilt.rx}deg`,
                ["--ry" as any]: `${tilt.ry}deg`,
                ["--mx" as any]: `${tilt.mx}%`,
                ["--my" as any]: `${tilt.my}%`,
              } as React.CSSProperties
            }
          >
            <div className="zyposoft-device">
              <div className="zyposoft-device__topbar">
                <div className="dots">
                  <span className="d d1" />
                  <span className="d d2" />
                  <span className="d d3" />
                </div>
                <div className="url">arogyasara.com/dashboard</div>
                <div className="pill">LIVE</div>
              </div>

              <div className="zyposoft-device__body">
                <div className="leftnav">
                  <div className="navBrand">ArogyaSara</div>
                  <div className="navItem active">Command Center</div>
                  <div className="navItem">Facilities</div>
                  <div className="navItem">Surveillance</div>
                  <div className="navItem">Telemedicine</div>
                  <div className="navItem">Reports</div>
                </div>

                <div className="main">
                  <div className="kpiRow">
                    <div className="kpi">
                      <div className="kLabel">Hotspot Risk</div>
                      <div className="kValue">Moderate</div>
                      <div className="kSub">AI confidence trending up</div>
                    </div>
                    <div className="kpi">
                      <div className="kLabel">Admissions</div>
                      <div className="kValue">+12.8%</div>
                      <div className="kSub">Last 7 days</div>
                    </div>
                    <div className="kpi">
                      <div className="kLabel">Bed Availability</div>
                      <div className="kValue">74%</div>
                      <div className="kSub">Statewide</div>
                    </div>
                  </div>

                  <div className="panelRow">
                    <div className="panel">
                      <div className="pTitle">AI Signal Stream</div>
                      <svg className="signal" viewBox="0 0 600 140" preserveAspectRatio="xMidYMid slice">
                        <path
                          className="signalLine"
                          d="M0,90 C60,40 120,130 180,80 C240,35 300,120 360,70 C420,25 480,120 540,65 C570,40 585,55 600,50"
                          fill="none"
                        />
                        <path
                          className="signalGlow"
                          d="M0,90 C60,40 120,130 180,80 C240,35 300,120 360,70 C420,25 480,120 540,65 C570,40 585,55 600,50"
                          fill="none"
                        />
                      </svg>

                      <div className="chips">
                        <span className="chip1">Outbreak early-warning</span>
                        <span className="chip2">Bed load forecast</span>
                        <span className="chip3">Supply anomaly</span>
                      </div>
                    </div>

                    <div className="panel panel--map">
                      <div className="pTitle">District Pulse</div>
                      <div className="mapGrid">
                        {Array.from({ length: 18 }).map((_, i) => (
                          <span key={i} className="cell" style={cellStyle(i)} />
                        ))}
                      </div>
                      <div className="legend">
                        <span className="lgDot" /> Emerging <span className="lgDot lgDot2" /> Stable
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="zyposoft-device__sheen" aria-hidden="true" />
              <div className="zyposoft-device__rim" aria-hidden="true" />
              <div className="zyposoft-device__scanline" aria-hidden="true" />
            </div>

            <div className="zyposoft-floatCard" aria-hidden="true">
              <div className="fcIcon">✓</div>
              <div>
                <div className="fcT">Actionable Insight</div>
                <div className="fcS">AI flags a rising cluster</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
