"use client";

import React from "react";
import Link from "next/link";
import { Eyebrow, H2, P } from "@/components/ui/Typography";
import { Reveal } from "@/components/site/Reveal";
import DeliveryLifecycleVisual from "@/components/site/DeliveryLifecycleVisual";


export default function DeliverySection() {
  return (
    <section id="deliver" className="zyposoft-section theme--violet">
      <div className="zyposoft-section__bg" aria-hidden>
        <div className="zyposoft-section__mesh" />
        <div className="zyposoft-section__grid" />
        <div className="zyposoft-section__noise" />
        <div className="zyposoft-section__sweep" />
      </div>

      <div className="relative z-[1]">
        <div className="zyposoft-container">
          <Reveal threshold={0.35} rootMargin="0px 0px -35% 0px">
            <div className="grid gap-10 md:grid-cols-12 md:items-start">
              {/* Left: narrative (same pattern as About/Technology) */}
              <div className="md:col-span-6">
                <div className="eco-tech__eyebrow">
                  <span className="eco-tech__dot" aria-hidden />
                  <Eyebrow>Delivery</Eyebrow>
                </div>

                <div className="mt-3 text-xs text-spaced text-[rgba(11,30,58,0.55)]">
                  OUTCOMES • RELIABILITY • LONG-TERM OWNERSHIP
                </div>

                <H2 className="mt-4">
                  From{" "}
                  <span className="studio-gradient-text font-extrabold">launch</span>{" "}
                  to{" "}
                  <span className="studio-gradient-text font-extrabold">lasting</span>{" "}
                  with stability built-in.
                </H2>

                <P className="mt-4 max-w-xl">
                  We ship systems that hold up under real-world load, evolve safely, and stay
                  maintainable for internal teams especially where governance and uptime matter.
                </P>

                {/* Dot-lines (same style language as AboutUs/TechnologyMap) */}
                <div className="mt-8">
                  <div className="zyposoft-rule" />
                  <div className="zyposoft-lines mt-4">
                    <div className="eco-lines">
                    <div className="eco-line">
                      <span className="dot dot--blue" aria-hidden />
                      <div>
                        <div className="t">Release confidence</div>
                        <div className="s">Staging parity, rollout strategy, rollback readiness.</div>
                      </div>
                    </div>

                    <div className="eco-line-green">
                      <span className="dot dot--teal" aria-hidden />
                      <div>
                        <div className="t">Reliability targets</div>
                        <div className="s">SLOs, performance budgets, predictable throughput.</div>
                      </div>
                    </div>

                    <div className="eco-line-orange">
                      <span className="dot dot--violet" aria-hidden />
                      <div>
                        <div className="t">Operate with visibility</div>
                        <div className="s">Telemetry, audit-ready logs, incident workflows.</div>
                      </div>
                    </div>
                    </div>
                  </div>
                </div>

                {/* Pills (consistent with other sections) */}
                <div className="mt-7 flex flex-wrap gap-2">
                  <span className="zyposoft-pill pill--blue">SLOs & performance</span>
                  <span className="zyposoft-pill pill--teal">Observability</span>
                  <span className="zyposoft-pill pill--violet">Governance-ready</span>
                  <span className="zyposoft-pill pill--amber">Safe change</span>
                </div>

                
              </div>
              {/* Right: animation (matches AboutUs left visual weight) */}
              <div className="md:col-span-6">
                 <DeliveryLifecycleVisual />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
