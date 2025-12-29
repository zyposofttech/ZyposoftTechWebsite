"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  Brain,
  Database,
  Cloud,
  ShieldCheck,
  Code2,
  PlugZap,
  ChevronRight,
} from "lucide-react";
import { Eyebrow, H2, P } from "../ui/Typography";
import { Reveal } from "@/components/site/Reveal";
type StackNode = {
  key: string;
  title: string;
  tagline: string;
  bullets: string[];
  Icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
  px: number; // position in percent (0..100)
  py: number; // position in percent (0..100)
  tone: "blue" | "slate" | "indigo" | "teal" | "violet" | "amber";
};

export default function TechnologySection() {
  const nodes: StackNode[] = useMemo(
    () => [
      {
        key: "ai",
        title: "AI & Intelligence",
        tagline: " Decision-support, automation, copilots",
        bullets: ["LLM orchestration", "Agent workflows", "Model serving & evaluation"],
        Icon: Brain,
        px: 74,
        py: 30,
        tone: "indigo",
      },
      {
        key: "data",
        title: "Data & Analytics",
        tagline: " Trusted data pipelines and insights",
        bullets: ["Warehousing & ETL", "Real-time analytics", "Search + vector retrieval"],
        Icon: Database,
        px: 78,
        py: 68,
        tone: "violet",
      },
      {
        key: "cloud",
        title: "Cloud & DevOps",
        tagline: " Reliable delivery at scale",
        bullets: ["CI/CD pipelines", "Container platforms", "Observability & SRE"],
        Icon: Cloud,
        px: 50,
        py: 86,
        tone: "teal",
      },
      {
        key: "security",
        title: "Security & Governance",
        tagline: " Compliance-ready by design",
        bullets: ["Access control & audit", "Policy enforcement", "Data protection"],
        Icon: ShieldCheck,
        px: 22,
        py: 68,
        tone: "amber",
      },
      {
        key: "engineering",
        title: "Product Engineering",
        tagline: " Fast builds, maintainable systems",
        bullets: ["Web & mobile apps", "API-first architecture", "Performance budgets"],
        Icon: Code2,
        px: 22,
        py: 32,
        tone: "blue",
      },
      {
        key: "integration",
        title: "Integrations",
        tagline: " Systems that connect cleanly",
        bullets: ["Versioned contracts", "Event-driven flows", "Third-party connectors"],
        Icon: PlugZap,
        px: 50,
        py: 14,
        tone: "slate",
      },
    ],
    []
  );

  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  // Auto-cycle focus (paused on hover/focus). Respects reduced motion.
  useEffect(() => {
    const mq =
      typeof window !== "undefined"
        ? window.matchMedia("(prefers-reduced-motion: reduce)")
        : null;

    if (mq?.matches) return;

    if (paused) return;
    const id = window.setInterval(() => {
      setActive((v) => (v + 1) % nodes.length);
    }, 3600);

    return () => window.clearInterval(id);
  }, [nodes.length, paused]);

  const A = nodes[active];

  return (
    <section id="technology" className="eco-tech">
      <Reveal threshold={0.35} rootMargin="0px 0px -35% 0px">
        {/* Background */}
        <div className="eco-tech__bg" aria-hidden>
          <div className="eco-tech__grid" />
          <div className="eco-tech__sweep" />
          <div className="eco-tech__noise" />
        </div>

        <div className="relative z-[1]">
          <div className="zyposoft-container">
            <div className="eco-tech__container">
              {/* Left: animated ecosystem map */}
              <div
                className="eco-map"
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}
                onFocusCapture={() => setPaused(true)}
                onBlurCapture={() => setPaused(false)}
              >
                {/* Animated connectors */}
                <svg
                  className="eco-map__svg"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                  aria-hidden
                >
                  <defs>
                    <linearGradient id="ecoLine" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0" stopColor="rgba(27,89,167,0.40)" />
                      <stop offset="1" stopColor="rgba(11,30,58,0.10)" />
                    </linearGradient>
                  </defs>

                  {/* Hub ring */}
                  <circle cx="50" cy="50" r="18" fill="none" stroke="rgba(11,30,58,0.10)" />
                  <circle
                    cx="50"
                    cy="50"
                    r="18"
                    fill="none"
                    stroke="rgba(27,89,167,0.18)"
                    className="eco-dash"
                  />

                  {/* Lines from hub to nodes */}
                  {nodes.map((n) => (
                    <line
                      key={n.key}
                      x1="50"
                      y1="50"
                      x2={n.px}
                      y2={n.py}
                      stroke="url(#ecoLine)"
                      strokeWidth="0.8"
                      className={n.key === A.key ? "eco-link eco-link--active" : "eco-link"}
                    />
                  ))}
                </svg>

                {/* Core */}
                <div className="eco-core" aria-label="zyposoft technology core">
                  <div className="eco-core__badge">zyposoft CORE</div>
                  <div className="eco-core__title">Ecosystem Stack</div>
                  <div className="eco-core__meta">
                    Governable delivery • Secure data flows • AI enablement
                  </div>
                </div>

                {/* Nodes */}
                {/* Nodes (DESKTOP: colorful floating cards) */}
                {nodes.map((n, idx) => {
                  const isActive = idx === active;
                  const Icon = n.Icon;

                  return (
                    <button
                      key={n.key}
                      type="button"
                      className={
                        (isActive ? "eco-node eco-node--active" : "eco-node") +
                        ` eco-node--${n.tone} eco-node--desktop`
                      }
                      style={{ left: `${n.px}%`, top: `${n.py}%` } as React.CSSProperties}
                      onMouseEnter={() => setActive(idx)}
                      onFocus={() => setActive(idx)}
                      onClick={() => setActive(idx)}
                      aria-label={n.title}
                    >
                      <span className="eco-node__icon" aria-hidden>
                        <Icon size={18} strokeWidth={2.5} />
                      </span>
                      <span className="eco-node__text">
                        <span className="eco-node__t">{n.title}</span>
                        <span className="eco-node__s">{n.tagline}</span>
                      </span>
                    </button>
                  );
                })}

                {/* Nodes (MOBILE: small dots on map no overlap) */}
                {nodes.map((n, idx) => (
                  <button
                    key={`${n.key}-dot`}
                    type="button"
                    className={
                      (idx === active ? "eco-dot eco-dot--active" : "eco-dot") + ` eco-dot--${n.tone}`
                    }
                    style={{ left: `${n.px}%`, top: `${n.py}%` } as React.CSSProperties}
                    onClick={() => setActive(idx)}
                    aria-label={`Select ${n.title}`}
                  />
                ))}

                {/* MOBILE: swipeable colorful cards (clean, no clumps) */}
                <div className="eco-mstrip" aria-label="Technology stack cards">
                  {nodes.map((n, idx) => {
                    const Icon = n.Icon;
                    const isActive = idx === active;

                    return (
                      <button
                        key={`${n.key}-mcard`}
                        type="button"
                        className={
                          (isActive ? "eco-mcard eco-mcard--active" : "eco-mcard") + ` eco-mcard--${n.tone}`
                        }
                        onClick={() => setActive(idx)}
                        aria-label={n.title}
                      >
                        <div className="eco-mcard__row">
                          <span className="eco-mcard__icon" aria-hidden>
                            <Icon size={18} strokeWidth={2.5} />
                          </span>
                          <div className="eco-mcard__text">
                            <div className="eco-mcard__t">{n.title}</div>
                            <div className="eco-mcard__s">{n.tagline}</div>
                          </div>
                        </div>

                        <div className="eco-mcard__chips">
                          {n.bullets.map((b) => (
                            <span key={b} className="eco-mchip">
                              {b}
                            </span>
                          ))}
                        </div>
                      </button>
                    );
                  })}
                </div>


                {/* HUD panel (minimal detail, changes with active node) */}


                {/* small floating metric chip */}

              </div>
              {/* RIGHT: narrative */}
              <div>
                <div className="eco-tech__eyebrow">
                  <span className="eco-tech__dot" aria-hidden />
                  <Eyebrow>zyposoft Ecosystem</Eyebrow>
                </div>
                <div className="mt-3 text-xs text-spaced text-[rgba(11,30,58,0.55)]">
                  ARCHITECTURE • EXPERIENCE • ANALYTICS • SECURITY
                </div>
                <H2 className="mt-4">
                  A technology stack designed for{" "}
                  <span className="studio-gradient-text font-extrabold">trust</span>,{" "}
                  <span className="studio-gradient-text font-extrabold">scale</span>, and{" "}
                  <span className="studio-gradient-text font-extrabold">AI enablement</span>.
                </H2>

                <P className="mt-4 max-w-xl">
                  We assemble modern engineering building blocks into a coherent ecosystem so
                  delivery stays predictable, systems stay governable, and AI features remain
                  measurable and safe to operate.
                </P>
                <div className="mt-6">

                  <div className="eco-pillrow">
                    <span className="zyposoft-pill pill--blue">Architecture-first</span>
                    <span className="zyposoft-pill pill--teal">Security by default</span>
                    <span className="zyposoft-pill pill--violet">Observability built-in</span>
                  </div>
                </div>
                <div className="mt-8">
                  <div className="zyposoft-rule" />
                  <div className="zyposoft-lines mt-4">
                  <div className="eco-lines">
                    <div className="eco-line">
                      <span className="dot dot--blue" aria-hidden />
                      <div>
                        <div className="t">Modular foundations</div>
                        <div className="s">Clear interfaces, versioned contracts, clean boundaries.</div>
                      </div>
                    </div>

                    <div className="eco-line-green">
                      <span className="dot dot--teal" aria-hidden />
                      <div>
                        <div className="t">AI-ready pipelines</div>
                        <div className="s">Data quality, lineage, evaluation, and lifecycle management.</div>
                      </div>
                    </div>

                    <div className="eco-line-orange">
                      <span className="dot dot--violet" aria-hidden />
                      <div>
                        <div className="t">Operate with confidence</div>
                        <div className="s">Monitoring, audit trails, performance budgets, reliability targets.</div>
                      </div>
                    </div>
                  </div>
                  </div>
                </div>

              </div>


            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
