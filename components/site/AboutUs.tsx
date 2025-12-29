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
import AutoRotatingGlobe from "@/components/site/AutoRotatingGlobe";
export default function AboutUs() {

  return (
    <section id="about" className="zyposoft-section theme--violet">
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
              {/* Left: statement + numbers (no cards) */}
              <div className="md:col-span-6">
                 <AutoRotatingGlobe points={120} maxLinks={3} speed={1} />
              </div>
              {/* Right: statement + numbers (no cards) */}
              <div className="md:col-span-6">
                <div className="eco-tech__eyebrow">
                  <span className="eco-tech__dot" aria-hidden />
                  <Eyebrow>About ZypoSoft</Eyebrow>
                </div>
                {/* <Eyebrow>About ZypoSoft</Eyebrow> */}
                <div className="mt-3 text-xs text-spaced text-[rgba(11,30,58,0.55)]">
                  ENGINEERING • AI • PRECISION DELIVERY
                </div>

                <H2 className="mt-4">
                  We build{" "}
                  <span className="studio-gradient-text font-extrabold">trusted digital systems</span>{" "}
                  that are secure, scalable, and governable.
                </H2>

                <P className="mt-4 max-w-xl">
                  ZypoSoft is a product engineering company built on Innovation, Intelligence, and Impact. We innovate with modern architecture and design, engineer intelligence through governed data flows and automation, and deliver impact through reliable, scalable platforms that perform in real-world conditions. The result is software that scales cleanly and drives measurable outcomes.
                </P>
                {/* Subtle colored tags (pills, not boxes) */}
                <div className="mt-7 flex flex-wrap gap-2">
                  <span className="zyposoft-pill pill--blue">Public-sector systems</span>
                  <span className="zyposoft-pill pill--teal">Secure data flows</span>
                  <span className="zyposoft-pill pill--violet">AI enablement</span>
                  <span className="zyposoft-pill pill--amber">Long-term maintainability</span>
                </div>
                {/* Minimal, colorful “principles” (no cards) */}
                <div className="mt-8">
                  <div className="zyposoft-rule" />
                  <div className="zyposoft-lines mt-4">
                    <div className="eco-lines">
                    <div className="eco-line">
                      <span className="dot dot--blue" aria-hidden />
                      <div>
                        <div className="t">Delivery discipline</div>
                        <div className="s">Milestones, acceptance criteria, and operational readiness.</div>
                      </div>
                    </div>

                    <div className="eco-line-green">
                      <span className="dot dot--teal" aria-hidden />
                      <div>
                        <div className="t">Security-first architecture</div>
                        <div className="s">Least-privilege access, auditability, controlled integrations.</div>
                      </div>
                    </div>

                    <div className="eco-line-orange">
                      <span className="dot dot--violet" aria-hidden />
                      <div>
                        <div className="t">Practical AI</div>
                        <div className="s">Automation and insights tied to real operational KPIs.</div>
                      </div>
                    </div>
                  </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
