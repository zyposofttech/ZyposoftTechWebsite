"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

type StepKey = "signals" | "features" | "train" | "eval" | "release";

type Step = {
  key: StepKey;
  title: string;
  sub: string;
  dot: "blue" | "indigo" | "teal" | "violet" | "slate";
};

const STEP_MS = 2600; // how long each hop runs
const FLOW_PAD = 0.08; // avoid painting exactly on endpoints (prevents overlap with nodes)

function easeInOut(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function clamp01(n: number) {
  return Math.max(0, Math.min(1, n));
}

function curvePath(a: { x: number; y: number }, b: { x: number; y: number }) {
  // Clean, designer curve (not random): gentle arc based on direction
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const c1 = { x: a.x + dx * 0.35, y: a.y + dy * 0.05 - Math.sign(dx) * 2.2 };
  const c2 = { x: a.x + dx * 0.65, y: a.y + dy * 0.95 + Math.sign(dx) * 2.2 };
  return `M ${a.x.toFixed(2)} ${a.y.toFixed(2)} C ${c1.x.toFixed(2)} ${c1.y.toFixed(
    2
  )}, ${c2.x.toFixed(2)} ${c2.y.toFixed(2)}, ${b.x.toFixed(2)} ${b.y.toFixed(2)}`;
}

export default function ProductEngineeringVisual() {
  const steps: Step[] = useMemo(
    () => [
      { key: "signals", title: "Signals", sub: "events • EHR • ops data", dot: "blue" },
      { key: "features", title: "Feature layer", sub: "schemas • quality • reuse", dot: "teal" },
      { key: "train", title: "Train pipeline", sub: "versioning • HPO • tracking", dot: "violet" },
      { key: "eval", title: "Eval gate", sub: "safety • bias • checks", dot: "indigo" },
      { key: "release", title: "Release & observe", sub: "canary • drift • SLOs", dot: "slate" },
    ],
    []
  );

  const wrapRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<Record<StepKey, HTMLDivElement | null>>({
    signals: null,
    features: null,
    train: null,
    eval: null,
    release: null,
  });

  const activePathRef = useRef<SVGPathElement | null>(null);
  const fillRef = useRef<SVGPathElement | null>(null);
  const capRef = useRef<SVGGElement | null>(null);

  const [pts, setPts] = useState<Record<StepKey, { x: number; y: number }>>({
    signals: { x: 18, y: 30 },
    features: { x: 82, y: 30 },
    train: { x: 50, y: 52 },
    eval: { x: 28, y: 76 },
    release: { x: 72, y: 76 },
  });

  const [activeKey, setActiveKey] = useState<StepKey>("signals");
  const [pingKey, setPingKey] = useState<StepKey | null>(null);

  // Tilt interaction (subtle + premium)
  const onTiltMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;

    const rx = (0.5 - py) * 6; // degrees
    const ry = (px - 0.5) * 6;

    el.style.setProperty("--rx", `${rx}deg`);
    el.style.setProperty("--ry", `${ry}deg`);
    el.style.setProperty("--mx", `${px * 100}%`);
    el.style.setProperty("--my", `${py * 100}%`);
  };

  const onTiltLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    el.style.setProperty("--rx", `0deg`);
    el.style.setProperty("--ry", `0deg`);
  };

  // Measure card centers into SVG (0..100 coords)
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const measure = () => {
      const wr = wrap.getBoundingClientRect();
      const next: any = {};

      (Object.keys(cardRefs.current) as StepKey[]).forEach((k) => {
        const el = cardRefs.current[k];
        if (!el) return;
        const r = el.getBoundingClientRect();
        const cx = (r.left + r.width / 2 - wr.left) / wr.width;
        const cy = (r.top + r.height / 2 - wr.top) / wr.height;
        next[k] = { x: cx * 100, y: cy * 100 };
      });

      // Only set if we got most points
      if (Object.keys(next).length >= 3) setPts((p) => ({ ...p, ...next }));
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(wrap);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  // Animate: move from card to card (pipeline feel, not infinity)
  useEffect(() => {
    const pathEl = activePathRef.current;
    const fillEl = fillRef.current;
    const capEl = capRef.current;
    if (!pathEl || !fillEl || !capEl) return;

    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    const reduced = !!mq?.matches;

    const order: StepKey[] = ["signals", "features", "train", "eval", "release"];

    let raf: number | null = null;
    let lastStep = -1;

    const tick = (now: number) => {
      const total = order.length * STEP_MS;
      const tAll = now % total;

      const step = Math.floor(tAll / STEP_MS);
      const local = (tAll % STEP_MS) / STEP_MS;

      const from = order[step] as StepKey;
      const to = order[(step + 1) % order.length] as StepKey;

      // Update active/ping on step boundaries
      if (step !== lastStep) {
        setActiveKey(from);
        setPingKey(from);
        window.setTimeout(() => setPingKey((cur) => (cur === from ? null : cur)), 520);
        lastStep = step;

        // Update the segment path only when step changes
        const d = curvePath(pts[from], pts[to]);
        pathEl.setAttribute("d", d);
        fillEl.setAttribute("d", d);
      }

      if (reduced) {
        // Static placement for reduced motion
        const d = curvePath(pts[from], pts[to]);
        pathEl.setAttribute("d", d);
        fillEl.setAttribute("d", d);

        const len = pathEl.getTotalLength();
        const p = pathEl.getPointAtLength(len * 0.15);
        capEl.setAttribute("transform", `translate(${p.x} ${p.y}) rotate(0)`);
        return;
      }

      const len = pathEl.getTotalLength();

      // Avoid painting directly on node circles
      const t = clamp01(FLOW_PAD + (1 - 2 * FLOW_PAD) * easeInOut(local));

      // Moving capsule
      const a = len * t;
      const p = pathEl.getPointAtLength(a);
      const p2 = pathEl.getPointAtLength(Math.min(len, a + 1.2));
      const ang = (Math.atan2(p2.y - p.y, p2.x - p.x) * 180) / Math.PI;
      capEl.setAttribute("transform", `translate(${p.x} ${p.y}) rotate(${ang})`);

      // “Fill” behind capsule (point-to-point segment)
      const filled = Math.max(0.001, len * (t - FLOW_PAD));
      fillEl.style.strokeDasharray = `${filled} ${len}`;
      fillEl.style.strokeDashoffset = `${len * FLOW_PAD}`;

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => {
      if (raf) cancelAnimationFrame(raf);
    };
  }, [pts]);

  const meta = useMemo(() => {
    const m: Record<StepKey, Step> = {
      signals: steps[0],
      features: steps[1],
      train: steps[2],
      eval: steps[3],
      release: steps[4],
    };
    return m;
  }, [steps]);

  return (
    <div className="pe-cards" aria-hidden>
      <div className="pe-cards__bg" />
      <div className="pe-cards__wrap" ref={wrapRef}>
        <div className="pe-cards__head">
          <span className="pe-cards__headDot" />
          <span className="pe-cards__headTxt">AI PRODUCT ENGINEERING</span>
        </div>

        <div className="pe-cards__grid">
          <div className="tilt-wrap pe-cardSlot pe-cardSlot--signals">
            <div
              ref={(el) => { cardRefs.current.signals = el; }}
              className={[
                "tilt-card pe-card",
                `pe-tone--${meta.signals.dot}`,
                activeKey === "signals" ? "is-active" : "",
                pingKey === "signals" ? "is-ping" : "",
              ].join(" ")}
              onMouseMove={onTiltMove}
              onMouseLeave={onTiltLeave}
            >
              <div className="tilt-sheen" />
              <div className="pe-card__row">
                <span className={`dot dot--${meta.signals.dot}`} />
                <div className="pe-card__k">{meta.signals.title}</div>
              </div>
              <div className="pe-card__s">{meta.signals.sub}</div>
              <div className="pe-card__mini">
                <span />
                <span />
                <span />
                <span />
              </div>
            </div>
          </div>

          <div className="tilt-wrap pe-cardSlot pe-cardSlot--features">
            <div
              ref={(el) => { cardRefs.current.features = el; }}
              className={[
                "tilt-card pe-card",
                `pe-tone--${meta.features.dot}`,
                activeKey === "features" ? "is-active" : "",
                pingKey === "features" ? "is-ping" : "",
              ].join(" ")}
              onMouseMove={onTiltMove}
              onMouseLeave={onTiltLeave}
            >
              <div className="tilt-sheen" />
              <div className="pe-card__row">
                <span className={`dot dot--${meta.features.dot}`} />
                <div className="pe-card__k">{meta.features.title}</div>
              </div>
              <div className="pe-card__s">{meta.features.sub}</div>
              <div className="pe-card__chips">
                <span className="pe-chip">Schemas</span>
                <span className="pe-chip">Quality</span>
                <span className="pe-chip">Lineage</span>
              </div>
            </div>
          </div>

          <div className="tilt-wrap pe-cardSlot pe-cardSlot--train">
            <div
              ref={(el) => { cardRefs.current.train = el; }}
              className={[
                "tilt-card pe-card pe-card--hero",
                `pe-tone--${meta.train.dot}`,
                activeKey === "train" ? "is-active" : "",
                pingKey === "train" ? "is-ping" : "",
              ].join(" ")}
              onMouseMove={onTiltMove}
              onMouseLeave={onTiltLeave}
            >
              <div className="tilt-sheen" />
              <div className="pe-card__row">
                <span className={`dot dot--${meta.train.dot}`} />
                <div className="pe-card__k">{meta.train.title}</div>
                <div className="pe-badge">v{activeKey === "train" ? "3.0" : "2.0"}</div>
              </div>
              <div className="pe-card__s">{meta.train.sub}</div>

              <div className="pe-card__lanes">
                <div className="lane">
                  <span className="l" />
                  <span className="l" />
                  <span className="l" />
                </div>
                <div className="lane">
                  <span className="l" />
                  <span className="l" />
                  <span className="l" />
                </div>
              </div>

              <div className="pe-card__footer">
                <span className="pe-foot">runs • artifacts • audit</span>
                <span className="pe-footDot" />
              </div>
            </div>
          </div>

          <div className="tilt-wrap pe-cardSlot pe-cardSlot--eval">
            <div
              ref={(el) => { cardRefs.current.eval = el; }}
              className={[
                "tilt-card pe-card",
                `pe-tone--${meta.eval.dot}`,
                activeKey === "eval" ? "is-active" : "",
                pingKey === "eval" ? "is-ping" : "",
              ].join(" ")}
              onMouseMove={onTiltMove}
              onMouseLeave={onTiltLeave}
            >
              <div className="tilt-sheen" />
              <div className="pe-card__row">
                <span className={`dot dot--${meta.eval.dot}`} />
                <div className="pe-card__k">{meta.eval.title}</div>
              </div>
              <div className="pe-card__s">{meta.eval.sub}</div>
              <div className="pe-card__checks">
                <span className="c" />
                <span className="c" />
                <span className="c" />
              </div>
            </div>
          </div>

          <div className="tilt-wrap pe-cardSlot pe-cardSlot--release">
            <div
              ref={(el) => { cardRefs.current.release = el; }}
              className={[
                "tilt-card pe-card",
                `pe-tone--${meta.release.dot}`,
                activeKey === "release" ? "is-active" : "",
                pingKey === "release" ? "is-ping" : "",
              ].join(" ")}
              onMouseMove={onTiltMove}
              onMouseLeave={onTiltLeave}
            >
              <div className="tilt-sheen" />
              <div className="pe-card__row">
                <span className={`dot dot--${meta.release.dot}`} />
                <div className="pe-card__k">{meta.release.title}</div>
              </div>
              <div className="pe-card__s">{meta.release.sub}</div>
              <div className="pe-card__spark">
                <span />
                <span />
                <span />
                <span />
              </div>
            </div>
          </div>
        </div>

        <svg className="pe-cards__svg" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id="peFlowGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="rgba(27,89,167,0.55)" />
              <stop offset="0.45" stopColor="rgba(20,212,177,0.45)" />
              <stop offset="1" stopColor="rgba(141,15,214,0.35)" />
            </linearGradient>

            <filter id="peFlowGlow" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="1.0" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <path
            d={curvePath(pts.signals, pts.features)}
            fill="none"
            stroke="rgba(11,30,58,0.10)"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
          <path
            d={curvePath(pts.features, pts.train)}
            fill="none"
            stroke="rgba(11,30,58,0.10)"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
          <path
            d={curvePath(pts.train, pts.eval)}
            fill="none"
            stroke="rgba(11,30,58,0.10)"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
          <path
            d={curvePath(pts.eval, pts.release)}
            fill="none"
            stroke="rgba(11,30,58,0.10)"
            strokeWidth="1.4"
            strokeLinecap="round"
          />

          <path
            ref={activePathRef}
            d={curvePath(pts.signals, pts.features)}
            fill="none"
            stroke="rgba(11,30,58,0.12)"
            strokeWidth="2.2"
            strokeLinecap="round"
          />

          <path
            ref={fillRef}
            d={curvePath(pts.signals, pts.features)}
            fill="none"
            stroke="url(#peFlowGrad)"
            strokeWidth="4.6"
            strokeLinecap="round"
            opacity="0.72"
            filter="url(#peFlowGlow)"
          />

          <g ref={capRef} className="pe-flowCap" filter="url(#peFlowGlow)">
            <circle r="3.3" fill="url(#peFlowGrad)" opacity="0.16" />
            <rect x="-2.9" y="-1.45" width="5.8" height="2.9" rx="1.45" fill="url(#peFlowGrad)" opacity="0.92" />
            <circle r="0.78" fill="rgba(255,255,255,0.90)" />
          </g>
        </svg>

        <div className="pe-cards__now">
          <span className="dotT dot--teal" />
          <span>Now: {steps.find((s) => s.key === activeKey)?.title ?? "Signals"}</span>
        </div>
      </div>
    </div>
  );
}