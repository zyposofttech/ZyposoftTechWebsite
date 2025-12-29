"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

type Station = { key: string; label: string; frac: number };

const CYCLE_MS = 14000;

const PHASE_META: Record<string, { color: string; tint: string }> = {
  discover: { color: "rgba(27,89,167,0.92)", tint: "rgba(27,89,167,0.10)" },
  design: { color: "rgba(20,212,177,0.92)", tint: "rgba(20,212,177,0.10)" },
  build: { color: "rgba(141,15,214,0.86)", tint: "rgba(141,15,214,0.10)" },
  test: { color: "rgba(20,212,177,0.88)", tint: "rgba(20,212,177,0.10)" },
  launch: { color: "rgba(27,89,167,0.88)", tint: "rgba(27,89,167,0.10)" },
  operate: { color: "rgba(141,15,214,0.84)", tint: "rgba(141,15,214,0.10)" },
};

export default function DeliveryLifecycleVisual() {
  const pathOuterRef = useRef<SVGPathElement | null>(null);
  const capMainRef = useRef<SVGGElement | null>(null);
  const fillRef = useRef<SVGUseElement | null>(null);

  const [pts, setPts] = useState<Array<{ x: number; y: number }>>([]);
  const [passed, setPassed] = useState<Record<string, boolean>>({});
  const [pingKey, setPingKey] = useState<string | null>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  const stations: Station[] = useMemo(
    () => [
      { key: "discover", label: "Discover", frac: 0.02 },
      { key: "design", label: "Design", frac: 0.18 },
      { key: "build", label: "Build", frac: 0.38 },
      { key: "test", label: "Test", frac: 0.56 },
      { key: "launch", label: "Launch", frac: 0.74 },
      { key: "operate", label: "Operate", frac: 0.92 },
    ],
    []
  );

  useEffect(() => {
    const outer = pathOuterRef.current;
    if (!outer) return;

    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    const reduced = !!mq?.matches;

    const outerLen = outer.getTotalLength();

    // Precompute station positions
    const stationPts = stations.map((s) => {
      const p = outer.getPointAtLength(outerLen * s.frac);
      return { x: p.x, y: p.y };
    });
    setPts(stationPts);

    // Initial fill state (avoid flicker)
    if (fillRef.current) {
      fillRef.current.setAttribute("stroke-dasharray", `0 ${outerLen}`);
      fillRef.current.setAttribute("stroke-dashoffset", `${outerLen}`);
    }

    if (reduced) {
      const p0 = outer.getPointAtLength(outerLen * stations[0].frac);
      capMainRef.current?.setAttribute("transform", `translate(${p0.x} ${p0.y}) rotate(0)`);
      setActiveIdx(0);
      return;
    }

    let raf: number | null = null;
    let lastIdx = -1;

    const step = (now: number) => {
      const prog = (now % CYCLE_MS) / CYCLE_MS; // 0..1
      const a = outerLen * prog;

      // Capsule transform
      const p = outer.getPointAtLength(a);
      const p2 = outer.getPointAtLength(Math.min(outerLen, a + 1.1));
      const ang = (Math.atan2(p2.y - p.y, p2.x - p.x) * 180) / Math.PI;
      capMainRef.current?.setAttribute("transform", `translate(${p.x} ${p.y}) rotate(${ang})`);

      // Current station index
      const idx = stations.reduce((acc, s, i) => (prog >= s.frac ? i : acc), 0);

      // Reset passed flags when loop wraps
      if (idx < lastIdx) setPassed({});

      // Station-to-station fill (point-to-point)
      const startFrac = stations[idx]?.frac ?? 0;
      const nextRaw = stations[(idx + 1) % stations.length]?.frac ?? 1;
      const nextFrac = nextRaw <= startFrac ? nextRaw + 1 : nextRaw;

      let prog2 = prog;
      if (prog2 < startFrac) prog2 += 1; // wrap-safe for last segment

      const segStartLen = outerLen * startFrac;
      const segTotalLen = outerLen * (nextFrac - startFrac);
      const curLen = outerLen * prog2;

      const filled = Math.max(0, Math.min(segTotalLen, curLen - segStartLen));

      if (fillRef.current) {
        // A dash that begins exactly at current station and grows to current position
        fillRef.current.setAttribute("stroke-dasharray", `${filled} ${outerLen}`);
        fillRef.current.setAttribute("stroke-dashoffset", `${outerLen - segStartLen}`);
      }

      // Update active station + ping
      if (idx !== lastIdx) {
        setActiveIdx(idx);
        const k = stations[idx]?.key;
        if (k) {
          setPassed((prev) => ({ ...prev, [k]: true }));
          setPingKey(k);
          window.setTimeout(() => setPingKey((cur) => (cur === k ? null : cur)), 560);
        }
        lastIdx = idx;
      }

      raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);
    return () => {
      if (raf) cancelAnimationFrame(raf);
    };
  }, [stations]);

  const activeKey = stations[activeIdx]?.key ?? "discover";
  const activeLabel = stations[activeIdx]?.label ?? "Discover";
  const meta = PHASE_META[activeKey] ?? PHASE_META.discover;

  return (
    <div className="del-life" aria-hidden>
      <div className="del-life__bg" />

      <svg className="del-life__svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="dlStroke" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="rgba(27,89,167,0.40)" />
            <stop offset="0.55" stopColor="rgba(20,212,177,0.30)" />
            <stop offset="1" stopColor="rgba(141,15,214,0.24)" />
            <animateTransform
              attributeName="gradientTransform"
              type="rotate"
              from="0 0.5 0.5"
              to="360 0.5 0.5"
              dur="18s"
              repeatCount="indefinite"
            />
          </linearGradient>

          <filter id="dlGlow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="0.75" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="dlSoftGlow" x="-70%" y="-70%" width="240%" height="240%">
            <feGaussianBlur stdDeviation="1.35" result="bb" />
            <feColorMatrix
              in="bb"
              type="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.55 0"
              result="g"
            />
            <feMerge>
              <feMergeNode in="g" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <radialGradient id="dlCoreFill" cx="50%" cy="38%" r="70%">
            <stop offset="0" stopColor="rgba(255,255,255,0.96)" />
            <stop offset="0.55" stopColor="rgba(255,255,255,0.84)" />
            <stop offset="1" stopColor="rgba(190,195,203,0.18)" />
          </radialGradient>

          <filter id="dlCoreShadow" x="-60%" y="-60%" width="220%" height="220%">
            <feDropShadow
              dx="0"
              dy="0.8"
              stdDeviation="0.8"
              floodColor="rgba(11,30,58,0.18)"
              floodOpacity="0.22"
            />
          </filter>

          {/* Single lifecycle loop */}
          <path
            id="outerLoop"
            d="M 10 52
               a 40 40 0 1 0 80 0
               a 40 40 0 1 0 -80 0"
          />

          {/* Mask: prevents ring strokes from overlapping station points */}
          <mask id="dlRingMask">
            <rect x="0" y="0" width="100" height="100" fill="white" />
            {pts.length === stations.length &&
              stations.map((s, i) => {
                const p = pts[i];
                return <circle key={s.key} cx={p.x} cy={p.y} r="3.35" fill="black" />;
              })}
          </mask>
        </defs>

        {/* Base rail (masked) */}
        <path
          ref={pathOuterRef}
          d="M 10 52
             a 40 40 0 1 0 80 0
             a 40 40 0 1 0 -80 0"
          mask="url(#dlRingMask)"
          fill="none"
          stroke="rgba(11,30,58,0.10)"
          strokeWidth="3.2"
          strokeLinecap="round"
          opacity="0.78"
        />

        {/* Point-to-point fill (masked) */}
        <use
          ref={fillRef}
          href="#outerLoop"
          mask="url(#dlRingMask)"
          fill="none"
          stroke="url(#dlStroke)"
          strokeWidth="5.0"
          strokeLinecap="round"
          opacity="0.72"
          filter="url(#dlSoftGlow)"
        />

        {/* Subtle micro dashes (masked) */}
        <use
          href="#outerLoop"
          mask="url(#dlRingMask)"
          fill="none"
          stroke="url(#dlStroke)"
          strokeWidth="1.15"
          strokeLinecap="round"
          strokeDasharray="3 14"
          className="del-life__dash"
          opacity="0.50"
        />

        {/* Stations */}
        {pts.length === stations.length &&
          stations.map((s, i) => {
            const p = pts[i];
            const isPassed = !!passed[s.key];
            const isPing = pingKey === s.key;
            const isActive = activeIdx === i;
            const sm = PHASE_META[s.key] ?? PHASE_META.discover;

            return (
              <g
                key={s.key}
                className={[
                  "dl-st",
                  isPassed ? "is-passed" : "",
                  isPing ? "is-ping" : "",
                  isActive ? "is-active" : "",
                ].join(" ")}
                transform={`translate(${p.x} ${p.y})`}
              >
                <circle className="dl-st__halo" r="5.2" />
                <circle
                  className="dl-st__ring"
                  r="2.55"
                  style={{ stroke: isActive ? sm.color : "rgba(11,30,58,0.14)" } as any}
                />
                <circle
                  className="dl-st__core"
                  r="1.15"
                  style={{ fill: isActive ? sm.color : undefined } as any}
                />
                <path className="dl-st__check" d="M -1.1 0.1 L -0.2 1.1 L 1.5 -0.8" fill="none" />
                <text className="dl-st__txt" x="0" y="7.6" textAnchor="middle">
                  {s.label}
                </text>
              </g>
            );
          })}

        {/* Center dial */}
        <g transform="translate(50 52)" filter="url(#dlCoreShadow)">
          <circle r="18.8" fill="url(#dlCoreFill)" stroke="rgba(11,30,58,0.10)" strokeWidth="0.9" />

          <circle
            r="14.9"
            fill="none"
            stroke="rgba(11,30,58,0.10)"
            strokeWidth="0.9"
            strokeDasharray="2.6 4.1"
            opacity="0.9"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 0 0"
              to="360 0 0"
              dur="14s"
              repeatCount="indefinite"
            />
          </circle>

          <text x="0" y="-4.0" textAnchor="middle" className="del-life__coreK">
            DELIVERY
          </text>
          <text x="0" y="0.6" textAnchor="middle" className="del-life__coreT">
            lifecycle
          </text>

          {/* Micro metrics */}
          <g transform="translate(0 5.0)" className="del-life__meters">
            <g transform="translate(-12.0 0)">
              <circle cx="0" cy="0" r="1.0" fill="rgba(27,89,167,0.82)" />
              <text x="2.0" y="1.0" className="del-life__meterTxt">
                Release
              </text>
            </g>
            <g transform="translate(-1.5 0)">
              <circle cx="0" cy="0" r="1.0" fill="rgba(20,212,177,0.80)" />
              <text x="2.0" y="1.0" className="del-life__meterTxt">
                SLOs
              </text>
            </g>
            <g transform="translate(8.5 0)">
              <circle cx="0" cy="0" r="1.0" fill="rgba(141,15,214,0.74)" />
              <text x="2.0" y="1.0" className="del-life__meterTxt">
                Audit
              </text>
            </g>
          </g>

          {/* Now pill OUTSIDE the inner circle */}
          <g transform="translate(0 22.8)">
            <rect
              x="-12.2"
              y="-2.6"
              width="24.4"
              height="5.2"
              rx="2.6"
              fill={meta.tint}
              stroke={meta.color}
              strokeOpacity="0.26"
              strokeWidth="0.6"
            />
            <circle cx="-9.3" cy="0" r="0.9" fill={meta.color} />
            <text x="1.0" y="1.15" textAnchor="middle" className="del-life__phaseTxt">
              Now: {activeLabel}
            </text>
          </g>
        </g>

        {/* Moving capsule */}
        <g ref={capMainRef} filter="url(#dlGlow)" className="dl-cap dl-cap--main">
          <circle r="3.7" fill="url(#dlStroke)" opacity="0.14" />
          <rect x="-3.1" y="-1.6" width="6.2" height="3.2" rx="1.6" fill="url(#dlStroke)" opacity="0.92" />
          <circle r="0.85" fill="rgba(255,255,255,0.88)" />
        </g>
      </svg>

      {/* Note cards */}
      {/* <div className="del-life__note del-life__note--tl">
        <span className="del-life__dot del-life__dot--blue" aria-hidden />
        <div>
          <div className="t">Release confidence</div>
          <div className="s">Staging parity • rollout strategy • rollback readiness</div>
        </div>
      </div>

      <div className="del-life__note del-life__note--tr">
        <span className="del-life__dot del-life__dot--teal" aria-hidden />
        <div>
          <div className="t">Reliability targets</div>
          <div className="s">SLOs • performance budgets • predictable throughput</div>
        </div>
      </div>

      <div className="del-life__note del-life__note--br">
        <span className="del-life__dot del-life__dot--violet" aria-hidden />
        <div>
          <div className="t">Operate with visibility</div>
          <div className="s">Telemetry • audit-ready logs • incident workflows</div>
        </div>
      </div>
      <div className="del-life__note del-life__note--bl">
        <span className="del-life__dot del-life__dot--amber" aria-hidden />
        <div>
          <div className="t">Quality gates</div>
          <div className="s">Automated checks • approvals • predictable delivery</div>
        </div>
      </div> */}
    </div>
  );
}
