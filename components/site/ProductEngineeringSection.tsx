"use client";

import React from "react";
import { Eyebrow, H2, P } from "@/components/ui/Typography";
import { Reveal } from "@/components/site/Reveal";
import ProductEngineeringVisual from "@/components/site/ProductEngineeringVisual";

export default function ProductEngineeringSection() {
  return (
    <section id="product-engineering" className="zyposoft-section theme--teal">
      <div className="zyposoft-section__bg" aria-hidden>
        <div className="zyposoft-section__mesh" />
        <div className="zyposoft-section__grid" />
        <div className="zyposoft-section__noise" />
        {/* add sweep so it feels consistent with Delivery + other premium sections */}
        <div className="zyposoft-section__sweep" />
      </div>

      <div className="relative z-[1]">
        <div className="zyposoft-container">
          <Reveal threshold={0.35} rootMargin="0px 0px -35% 0px">
            <div className="grid gap-10 md:grid-cols-12 md:items-start">
              {/* LEFT: narrative (same pattern as About/Technology/Delivery) */}
              <div className="md:col-span-6">
                <div className="eco-tech__eyebrow">
                  <span className="eco-tech__dot" aria-hidden />
                  <Eyebrow>Product Engineering</Eyebrow>
                </div>

                <div className="mt-3 text-xs text-spaced text-[rgba(11,30,58,0.55)]">
                  DISCOVERY • DESIGN • BUILD • LAUNCH • SCALE
                </div>

                <H2 className="mt-4">
                  Build products like a{" "}
                  <span className="studio-gradient-text font-extrabold">repeatable system</span>,{" "}
                  not a one-off project.
                </H2>

                <P className="mt-4 max-w-xl">
                  Great software isn’t a one-off event, it’s a system. We’ve replaced the chaos of custom builds with a unified Product Engineering foundation. By baking scalable architecture, analytics, and governance directly into the core, we ensure that "product-grade" is the starting line, not the finish line.
                </P>

                {/* Optional pill row (same visual language as TechnologyMap) */}
                <div className="mt-6">
                  <div className="eco-pillrow">
                    <span className="zyposoft-pill pill--blue">Roadmap to release</span>
                    <span className="zyposoft-pill pill--teal">Quality built-in</span>
                    <span className="zyposoft-pill pill--violet">Ownership-ready</span>
                  </div>
                </div>

                {/* Dot-lines (match AboutUs/DeliverySection style) */}
                <div className="mt-8">
                  <div className="zyposoft-rule" />
                  <div className="zyposoft-lines mt-4">
                    <div className="eco-lines">
                      <div className="eco-line">
                        <span className="dot dot--blue" aria-hidden />
                        <div>
                          <div className="t">MVP → scale path</div>
                          <div className="s">Clear interfaces, versioned contracts, clean boundaries.</div>
                        </div>
                      </div>

                      <div className="eco-line-green">
                        <span className="dot dot--teal" aria-hidden />
                        <div>
                          <div className="t">Built for iteration</div>
                          <div className="s">Feature flags, telemetry, and experiment-ready releases for safe change.</div>
                        </div>
                      </div>

                      <div className="eco-line-orange">
                        <span className="dot dot--violet" aria-hidden />
                        <div>
                          <div className="t">Engineering quality as a habit</div>
                          <div className="s">CI checks, performance budgets, and reliability targets to prevent drift.</div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
              {/* RIGHT: visual (no extra panel wrapper; the visual already has its own premium frame) */}
              <div className="md:col-span-6">
                <ProductEngineeringVisual />
              </div>


            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
