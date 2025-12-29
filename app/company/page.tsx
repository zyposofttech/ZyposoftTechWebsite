// app/about/page.tsx
import Link from "next/link";
import { Eyebrow, H2, P } from "@/components/ui/Typography";
import { Reveal } from "@/components/site/Reveal";

const CONTENT = {
  hero: {
    eyebrow: "About  ZypoSoft",
    strap: "TRUSTED ENGINEERING • AI ENABLEMENT • PUBLIC-SCALE DELIVERY",
    headline: (
      <>
        We build{" "}
        <span className="studio-gradient-text font-black">state-grade software</span>{" "}
        that remains reliable long after launch.
      </>
    ),
    body: (
      <>
        ZypoSoft is an AI-first software engineering company focused on delivering
        secure, governable platforms for organizations. We combine rigorous product
        engineering with practical AI to create systems that scale cleanly, operate
        predictably, and earn trust in production.
      </>
    ),
    micro: [
      {
        h: "Built for accountability",
        p: "Clear ownership, auditability, and governance controls so the platform remains operable beyond launch.",
      },
      {
        h: "Designed to survive success",
        p: "Performance budgets, resilience patterns, and observability are planned early no late-stage firefighting.",
      },
      {
        h: "AI that improves operations",
        p: "Automation and decision support tied to measurable KPIs reducing turnaround time and operational load.",
      },
    ],
    positioning: {
      label: "Our positioning",
      quote:
        "“Engineering discipline first. Governed AI where it matters. Outcomes always.”",
      sub:
        "We do not treat AI as decoration. We treat it as an advantage that only works when security, reliability, and measurement are part of the foundation.",
    },
    where: {
      label: "WHERE WE ADD THE MOST VALUE",
      items: [
        {
          t: "State-scale health platforms",
          s: "Systems like ArogyaCore where uptime, privacy, and governance are non-negotiable.",
          dot: "blue",
        },
        {
          t: "Citizen-facing experiences",
          s: "Journeys designed for speed and clarity across mobile, tablet, and desktop interfaces.",
          dot: "teal",
        },
        {
          t: "AI-enabled operations",
          s: "Triage support, anomaly detection, workflow automation, and decision dashboards built with guardrails.",
          dot: "violet",
        },
      ] as const,
    },
  },

  missionVision: {
    eyebrow: "Mission & Vision",
    headline: "Digital infrastructure should be predictable to build and calm to operate.",
    lead:
      "We work best on platforms that must remain stable under real adoption: high availability, controlled data access, measurable performance, and long-term maintainability.",
    mission: {
      k: "Mission",
      t: "Turn Innovation into Intelligence and Intelligence into Impact.",
      s:
        "Our mission is to build software platforms that remain dependable as they grow through rigorous architecture, governed data flows, and production-grade engineering standards. We deliver operational confidence: systems that stay reliable, auditable, and easy to maintain in real environments.",
    },
    vision: {
      k: "Vision",
      t: "Innovation that endures. Intelligence that scales. Impact that compounds.",
      s:
        "We envision a future where software grows without fragility where reliability, auditability, and maintainability are defaults, not upgrades. By advancing disciplined architecture, governed data practices, and production grade engineering, we aim to help organizations operate with confidence and continuously improve their systems over time.",
    },
    principles: [
      {
        num: "01",
        h: "Clarity before complexity",
        p: "We define success metrics (SLOs, outcomes, ownership) before scaling scope so execution stays controlled.",
      },
      {
        num: "02",
        h: "Systems that survive scale",
        p: "Performance, resilience, and observability are built in earlyso adoption does not break the system.",
      },
      {
        num: "03",
        h: "AI with guardrails",
        p: "We deploy AI where it reduces operational load and improves decisions backed by privacy, audit, and governance controls.",
      },
    ],
  },

  values: {
    eyebrow: "Values",
    headline: "Values that show up in the codebase and in production operations.",
    lead:
      "Our values are engineering defaults, not slogans. They dictate the architecture we choose, the quality gates we enforce, the metrics we track, and the production playbooks we deliver. In practice, they translate into secure-by-design decisions, predictable releases, measurable performance targets, and support processes that keep platforms stable as adoption grows.",
    listTitle: "VALUES IN PRACTICE",
    items: [
      {
        k: "Evidence over hype",
        v: "We measure outcomes using real KPIs: latency, uptime, adoption, turnaround time, and operational cost.",
      },
      {
        k: "Reliability is a product feature",
        v: "SLOs, resilience patterns, and observability are built in early so scale doesn’t degrade user experience.",
      },
      {
        k: "Governable AI",
        v: "Audit trails, human oversight, fallbacks, and safe rollout patterns so intelligence remains controllable.",
      },
      {
        k: "Interoperability",
        v: "Clean interfaces and open integration patterns so platforms evolve without fragile dependencies or lock-in.",
      },
    ],
  },
};

function MissionVisionInfographic() {
  return (
    <figure className="mt-8">
      <div className="mv-card">
        {/* soft wash background */}
        <div className="mv-wash" aria-hidden />

        <div className="mv-inner">
          {/* header */}
          <div className="mv-head">
            <div className="mv-pill">
              <span className="mv-pillDot" aria-hidden />
              <span>MISSION → VISION</span>
            </div>
            <div className="mv-headNote">Blueprint: build → operate → improve</div>
          </div>

          {/* main track */}
          <div className="mv-track" aria-label="Mission to Vision blueprint">
            {/* Track line */}
            <div className="mv-line" aria-hidden />

            {/* Left: Mission */}
            <div className="mv-end mv-left">
              <div className="mv-node mv-node--blue" aria-hidden />
              <div className="mv-endText">
                <div className="mv-endK">Mission</div>
                <div className="mv-endS">End “launch & rewrite”</div>
              </div>
            </div>

            {/* Center: Standards */}
            <div className="mv-core" aria-hidden={false}>
              <div className="mv-coreRing" aria-hidden />
              <div className="mv-coreTitle">Engineering Standards</div>
              <div className="mv-coreSub">architecture • governance • quality</div>
            </div>

            {/* Right: Vision */}
            <div className="mv-end mv-right">
              <div className="mv-endText mv-endText--right">
                <div className="mv-endK">Vision</div>
                <div className="mv-endS">Predictable software delivery</div>
              </div>
              <div className="mv-node mv-node--violet" aria-hidden />
            </div>
          </div>

          {/* Pillars (clean, evenly sized) */}
          <div className="mv-pillars">
            <div className="mv-pillar">
              <span className="mv-dot mv-dot--blue" aria-hidden />
              <div>
                <div className="mv-pillarT">Rigorous architecture</div>
                <div className="mv-pillarS">Clear boundaries, scalable foundations.</div>
              </div>
            </div>

            <div className="mv-pillar">
              <span className="mv-dot mv-dot--teal" aria-hidden />
              <div>
                <div className="mv-pillarT">Automated governance</div>
                <div className="mv-pillarS">Security, audits, and policy by default.</div>
              </div>
            </div>

            <div className="mv-pillar">
              <span className="mv-dot mv-dot--violet" aria-hidden />
              <div>
                <div className="mv-pillarT">Quality gates</div>
                <div className="mv-pillarS">Predictable releases, rollback-ready.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </figure>
  );
}


export default function AboutPage() {
  return (
    <main className="zyposoft-site text-[#0b1e3a]">
      {/* HERO / INTRO */}
      <section className="zyposoft-section theme--teal">
        <div className="zyposoft-section__bg" aria-hidden>
          <div className="zyposoft-section__mesh" />
          <div className="zyposoft-section__grid" />
          <div className="zyposoft-section__noise" />
          <div className="zyposoft-section__sweep" />
        </div>

        <div className="relative z-[1]">
          <div className="zyposoft-container">
            <div className="grid gap-10 md:grid-cols-12 md:items-start">
              {/* Left column */}
              <div className="md:col-span-7">
                <Reveal threshold={0.25} rootMargin="0px 0px -25% 0px">
                  <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(27,89,167,0.14)] bg-[rgba(27,89,167,0.06)] px-3 py-2">
                    <Eyebrow>{CONTENT.hero.eyebrow}</Eyebrow>
                  </div>

                  <div className="mt-6 text-xs font-extrabold tracking-[0.22em] text-[rgba(11,30,58,0.55)]">
                    {CONTENT.hero.strap}
                  </div>

                  <H2 className="mt-4">{CONTENT.hero.headline}</H2>

                  <P className="mt-5 max-w-2xl">{CONTENT.hero.body}</P>

                  <div className="mt-8">
                    <div className="zyposoft-rule" />
                    <div className="mt-5 grid gap-4 md:grid-cols-3 zyposoft-micro">
                      {CONTENT.hero.micro.map((m) => (
                        <div key={m.h}>
                          <div className="h">{m.h}</div>
                          <div className="p">{m.p}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Reveal>
              </div>

              {/* Right column */}
              <div className="md:col-span-5">
                <Reveal threshold={0.25} rootMargin="0px 0px -25% 0px">
                  <div className="zyposoft-quote">
                    <div className="zyposoft-quote__bar" aria-hidden />
                    <div className="zyposoft-quote__k">{CONTENT.hero.positioning.label}</div>
                    <div className="zyposoft-quote__t">{CONTENT.hero.positioning.quote}</div>
                    <div className="zyposoft-quote__s">{CONTENT.hero.positioning.sub}</div>
                  </div>

                  <div className="mt-8">
                    <div className="zyposoft-rule" />
                  </div>

                  <div className="mt-6">
                    <div className="text-xs font-extrabold tracking-[0.22em] text-[rgba(11,30,58,0.55)]">
                      {CONTENT.hero.where.label}
                    </div>

                    <div className="mt-4 zyposoft-lines">
                      {CONTENT.hero.where.items.map((it) => (
                        <div className="zyposoft-line" key={it.t}>
                          <span className={`dot dot--${it.dot}`} aria-hidden />
                          <div>
                            <div className="t">{it.t}</div>
                            <div className="s">{it.s}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MISSION + VISION */}
      <section className="zyposoft-section theme--violet">
        <div className="zyposoft-section__bg" aria-hidden>
          <div className="zyposoft-section__mesh" />
          <div className="zyposoft-section__grid" />
          <div className="zyposoft-section__noise" />
          <div className="zyposoft-section__sweep" />
        </div>

        <div className="relative z-[1]">
          <div className="zyposoft-container">
            <div className="grid gap-10 md:grid-cols-12 md:items-start">
              {/* Left column */}
              <div className="md:col-span-5">
                <Reveal threshold={0.25} rootMargin="0px 0px -25% 0px">
                  <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(27,89,167,0.14)] bg-[rgba(27,89,167,0.06)] px-3 py-2">
                    <Eyebrow>{CONTENT.missionVision.eyebrow}</Eyebrow>
                  </div>

                  <H2 className="mt-4">{CONTENT.missionVision.headline}</H2>
                  <P className="mt-4 max-w-xl">{CONTENT.missionVision.lead}</P>

                  {/* NEW: infographic fills the empty space (static, premium, minimal) */}
                  <MissionVisionInfographic />
                </Reveal>
              </div>

              {/* Right column */}
              <div className="md:col-span-7">
                <Reveal threshold={0.25} rootMargin="0px 0px -25% 0px">
                  <div className="grid gap-8 md:grid-cols-2">
                    <div className="zyposoft-quote">
                      <div className="zyposoft-quote__bar" aria-hidden />
                      <div className="zyposoft-quote__k">{CONTENT.missionVision.mission.k}</div>
                      <div className="zyposoft-quote__t">{CONTENT.missionVision.mission.t}</div>
                      <div className="zyposoft-quote__s">{CONTENT.missionVision.mission.s}</div>
                    </div>

                    <div className="zyposoft-quote">
                      <div className="zyposoft-quote__bar" aria-hidden />
                      <div className="zyposoft-quote__k">{CONTENT.missionVision.vision.k}</div>
                      <div className="zyposoft-quote__t">{CONTENT.missionVision.vision.t}</div>
                      <div className="zyposoft-quote__s">{CONTENT.missionVision.vision.s}</div>
                    </div>
                  </div>

                  <div className="mt-10">
                    <div className="zyposoft-rule" />
                    <div className="mt-5 zyposoft-stack">
                      {CONTENT.missionVision.principles.map((p) => (
                        <div className="row" key={p.num}>
                          <div className="num">{p.num}</div>
                          <div>
                            <div className="h">{p.h}</div>
                            <div className="p">{p.p}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="zyposoft-section theme--teal">
        <div className="zyposoft-section__bg" aria-hidden>
          <div className="zyposoft-section__mesh" />
          <div className="zyposoft-section__grid" />
          <div className="zyposoft-section__noise" />
          <div className="zyposoft-section__sweep" />
        </div>

        <div className="relative z-[1]">
          <div className="zyposoft-container">
            <div className="grid gap-10 md:grid-cols-12 md:items-start">
              {/* Left column */}
              <div className="md:col-span-5">
                <Reveal threshold={0.25} rootMargin="0px 0px -25% 0px">
                  <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(27,89,167,0.14)] bg-[rgba(27,89,167,0.06)] px-3 py-2">
                    <Eyebrow>{CONTENT.values.eyebrow}</Eyebrow>
                  </div>

                  <H2 className="mt-4">{CONTENT.values.headline}</H2>
                  <P className="mt-4 max-w-xl">{CONTENT.values.lead}</P>
                </Reveal>
              </div>

              {/* Right column */}
              <div className="md:col-span-7">
                <Reveal threshold={0.25} rootMargin="0px 0px -25% 0px">
                  <div className="zyposoft-worklist">
                    <div className="title">{CONTENT.values.listTitle}</div>

                    {CONTENT.values.items.map((it) => (
                      <div className="item" key={it.k}>
                        <div className="k">{it.k}</div>
                        <div className="v">{it.v}</div>
                      </div>
                    ))}
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
