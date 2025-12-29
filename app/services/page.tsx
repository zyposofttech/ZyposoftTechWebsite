// app/services/page.tsx
import Link from "next/link";
import {Reveal} from "@/components/site/Reveal";
import { Eyebrow, H2, H3, P } from "@/components/ui/Typography";

type Service = {
  tag: string;
  title: string;
  blurb: string;
  bullets: string[];
};

type Step = { n: string; title: string; blurb: string };
type FAQ = { q: string; a: string };

const SERVICES = {
  hero: {
  eyebrow: "Services",
  strap: "PRODUCT ENGINEERING • AI ENABLEMENT • CLOUD DELIVERY",
  headline: (
    <>
      <span className="studio-gradient-text font-black">Services</span>{" "}
      that move fast now and stay stable later.
    </>
  ),
  body:
    "ZypoSoft delivers end-to-end software services designed to balance immediate velocity with long-term resilience. We execute planning, development, and operations with a focus on intuitive UX, clean architecture, and disciplined delivery. By strategically integrating AI for measurable impact and establishing robust engineering foundations, we ensure your platform remains scalable, reliable, and maintainable as it evolves.",
  // SAME LINKS AS PRODUCT HERO
  ctas: {
    primary: { label: "Contact Us", href: "/contact" },
    secondary: { label: "Explore modules", href: "#modules" },
  },
  proof: [
    { k: "Delivery", v: "Predictable milestones" },
    { k: "Quality", v: "Release-ready standards" },
    { k: "Ownership", v: "Calm long-term ops" },
  ],
  pillars: [
    { t: "Product Engineering", s: "Web & backend delivery squads" },
    { t: "AI Enablement", s: "LLM workflows + safe rollouts" },
    { t: "Data & Analytics", s: "Pipelines, KPIs, dashboards" },
    { t: "Cloud & DevOps", s: "CI/CD, observability, SRE" },
    { t: "Security", s: "RBAC, auditability, hardening" },
  ],
},


  outcomes: {
    eyebrow: "Outcomes",
    title: "What changes after we engage",
    items: [
      {
        title: "Predictable delivery",
        blurb:
          "Clear milestones, scoped releases, and quality gates so teams ship without last-minute chaos.",
      },
      {
        title: "Production confidence",
        blurb:
          "Observability, runbooks, and incident discipline so issues are detected early and fixed fast.",
      },
      {
        title: "AI that’s measurable",
        blurb:
          "AI features shipped with evaluation, guardrails, and rollout control not experiments in production.",
      },
      {
        title: "Maintainable velocity",
        blurb:
          "Architecture standards and engineering hygiene that keep the system evolvable without constant rewrites.",
      },
    ],
  },

  offerings: {
    eyebrow: "Offerings",
    title: "Services across the full lifecycle",
    lead:
      "From discovery to build, and from reliability to AI enablement each engagement is structured, measurable, and ownership-friendly.",
    items: [
      {
        tag: "FOUNDATION",
        title: "Architecture & System Design",
        blurb:
          "Define a foundation that survives scale: clear domains, stable APIs, reliable data flow, and security-by-design.",
        bullets: [
          "System design, domain modeling, API contracts",
          "Performance & scalability planning",
          "Security-by-design patterns and reviews",
          "Technical standards + delivery blueprint",
        ],
      },
      {
        tag: "PRODUCT BUILD",
        title: "Full-Stack Product Engineering",
        blurb:
          "Build production-grade web platforms with strong UX, maintainable code, and steady delivery velocity.",
        bullets: [
          "Next.js/React frontends & design systems",
          "Backend services, integrations, and APIs",
          "Testing strategy, QA automation, review discipline",
          "Documentation and handover that teams can own",
        ],
      },
      {
        tag: "AI ENABLEMENT",
        title: "AI/ML Feature Integration",
        blurb:
          "Add AI capabilities with responsible deployment: evaluation, safety checks, monitoring, and controlled rollout.",
        bullets: [
          "LLM workflows (assist, search, summarize, classify)",
          "Inference APIs, orchestration, and latency planning",
          "Evaluation harness + quality metrics",
          "Human-in-the-loop + audit-ready logging",
        ],
      },
      {
        tag: "DATA",
        title: "Data Engineering & Analytics",
        blurb:
          "Build trusted data pipelines and dashboards that leadership can rely on for real decisions.",
        bullets: [
          "Ingestion, transformation, validation pipelines",
          "Data quality checks and observability",
          "KPI definitions, dashboards, reporting",
          "Governance and access patterns",
        ],
      },
      {
        tag: "CLOUD",
        title: "Cloud, DevOps & Observability",
        blurb:
          "Make delivery repeatable and operations visible with CI/CD, monitoring, SLOs, and incident readiness.",
        bullets: [
          "CI/CD pipelines & environment strategy",
          "Logs, metrics, traces, alerts, and runbooks",
          "Performance budgets, tuning, load readiness",
          "Production readiness reviews and release governance",
        ],
      },
      {
        tag: "SECURITY",
        title: "Security & Compliance Engineering",
        blurb:
          "Embed security controls into the platform as engineering primitives not late-stage checklists.",
        bullets: [
          "RBAC, audit trails, access patterns",
          "Threat modeling and risk reviews",
          "Secure configuration, secrets, hardening",
          "Change controls and approval workflows",
        ],
      },
    ] as Service[],
  },

  method: {
    eyebrow: "Method",
    title: "How we keep delivery controlled",
    steps: [
      {
        n: "01",
        title: "Align scope and success metrics",
        blurb:
          "We define outcomes, constraints, and measurable targets early so execution stays focused and predictable.",
      },
      {
        n: "02",
        title: "Ship with quality gates",
        blurb:
          "Automated checks, reviews, and staged releases reduce regressions and keep rollbacks simple.",
      },
      {
        n: "03",
        title: "Operate with visibility",
        blurb:
          "Observability, incident workflows, and continuous improvement keep the system stable as usage grows.",
      },
    ] as Step[],
  },

  engagement: {
    eyebrow: "Engagement",
    title: "Ways to work with us",
    items: [
      {
        n: "01",
        title: "Discovery & Architecture Sprint",
        blurb:
          "Short engagement to map the system, define standards, and create a delivery plan your team can execute.",
      },
      {
        n: "02",
        title: "Delivery Squad (Build Team)",
        blurb:
          "Dedicated cross-functional team to deliver features end-to-end with clean handover and steady releases.",
      },
      {
        n: "03",
        title: "Modernize & Stabilize",
        blurb:
          "Reduce incidents and tech debt: performance tuning, refactors, observability upgrades, safer pipelines.",
      },
      {
        n: "04",
        title: "Operate & Improve (Retainer)",
        blurb:
          "Ongoing reliability and enhancement: monitoring, incident response, release governance, improvement backlog.",
      },
    ] as Step[],
  },

};

function StatRow({ k, v }: { k: string; v: string }) {
  const tone =
    k.includes("Delivery") ? "teal" : k.includes("Quality") ? "blue" : "amber";

  const map: Record<string, { bg: string; ring: string; dot: string }> = {
    blue: {
      bg: "bg-[rgba(27,89,167,0.07)]",
      ring: "border-[rgba(27,89,167,0.16)]",
      dot: "bg-[rgba(27,89,167,0.88)]",
    },
    teal: {
      bg: "bg-[rgba(20,212,177,0.09)]",
      ring: "border-[rgba(20,212,177,0.16)]",
      dot: "bg-[rgba(20,212,177,0.92)]",
    },
    amber: {
      bg: "bg-[rgba(245,158,11,0.10)]",
      ring: "border-[rgba(245,158,11,0.18)]",
      dot: "bg-[rgba(245,158,11,0.92)]",
    },
  };
  const t = map[tone];

  return (
    <div
      className={[
        "flex items-center justify-between gap-4 rounded-2xl border px-4 py-3",
        t.ring,
        t.bg,
      ].join(" ")}
    >
      <div className="flex items-center gap-3">
        <span className={`h-2.5 w-2.5 rounded-full ${t.dot}`} aria-hidden />
        <div className="text-xs font-extrabold tracking-[0.18em] text-[rgba(11,30,58,0.55)]">
          {k}
        </div>
      </div>
      <div className="text-sm font-extrabold text-[rgba(11,30,58,0.78)]">
        {v}
      </div>
    </div>
  );
}

function FeatureList({ items }: { items: { title: string; blurb: string }[] }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {items.map((it) => (
        <div key={it.title} className="zyposoft-quote">
          <div className="zyposoft-quote__bar" aria-hidden />
          <div className="zyposoft-quote__t">{it.title}</div>
          <div className="zyposoft-quote__s">{it.blurb}</div>
        </div>
      ))}
    </div>
  );
}

/**
 * Compact offerings: avoids “big cards”.
 * - Smaller padding
 * - Less glass/blur
 * - Optional details disclosure for bullets
 */
function ServicesCompactGrid({ items }: { items: Service[] }) {
  const themeFor = (tag: string) => {
    const t = tag.toLowerCase();
    if (t.includes("foundation")) return "blue";
    if (t.includes("product")) return "teal";
    if (t.includes("ai")) return "violet";
    if (t.includes("data")) return "amber";
    if (t.includes("cloud")) return "teal";
    if (t.includes("security")) return "blue";
    return "blue";
  };

  const theme = {
    blue: {
      pillBg: "bg-[rgba(27,89,167,0.08)]",
      pillRing: "ring-[rgba(27,89,167,0.18)]",
      dot: "bg-[rgba(27,89,167,0.88)]",
      wash:
        "radial-gradient(360px 200px at 18% 18%, rgba(27,89,167,0.14), transparent 62%)," +
        "radial-gradient(420px 220px at 92% 84%, rgba(27,89,167,0.08), transparent 64%)",
    },
    teal: {
      pillBg: "bg-[rgba(20,212,177,0.10)]",
      pillRing: "ring-[rgba(20,212,177,0.18)]",
      dot: "bg-[rgba(20,212,177,0.92)]",
      wash:
        "radial-gradient(360px 200px at 18% 18%, rgba(20,212,177,0.15), transparent 62%)," +
        "radial-gradient(420px 220px at 92% 84%, rgba(20,212,177,0.08), transparent 64%)",
    },
    amber: {
      pillBg: "bg-[rgba(245,158,11,0.12)]",
      pillRing: "ring-[rgba(245,158,11,0.18)]",
      dot: "bg-[rgba(245,158,11,0.92)]",
      wash:
        "radial-gradient(360px 200px at 18% 18%, rgba(245,158,11,0.14), transparent 62%)," +
        "radial-gradient(420px 220px at 92% 84%, rgba(245,158,11,0.08), transparent 64%)",
    },
    violet: {
      pillBg: "bg-[rgba(141,15,214,0.10)]",
      pillRing: "ring-[rgba(141,15,214,0.16)]",
      dot: "bg-[rgba(141,15,214,0.84)]",
      wash:
        "radial-gradient(360px 200px at 18% 18%, rgba(141,15,214,0.12), transparent 62%)," +
        "radial-gradient(420px 220px at 92% 84%, rgba(141,15,214,0.07), transparent 64%)",
    },
  } as const;

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {items.map((s) => {
        const key = themeFor(s.tag);
        const t = theme[key];

        return (
          <div
            key={s.title}
            className="relative overflow-hidden rounded-2xl border border-[rgba(11,30,58,0.10)] bg-[rgba(255,255,255,0.70)] shadow-[0_18px_60px_rgba(11,30,58,0.06)]"
          >
            <div
              className="pointer-events-none absolute inset-0 opacity-95"
              style={{ background: t.wash }}
              aria-hidden
            />
            <div className="relative p-4">
              <div className="flex items-center justify-between gap-3">
                <div
                  className={[
                    "inline-flex items-center gap-2 rounded-full px-3 py-2",
                    "ring-1",
                    t.pillRing,
                    t.pillBg,
                  ].join(" ")}
                >
                  <span className={`h-2.5 w-2.5 rounded-full ${t.dot}`} aria-hidden />
                  <span className="text-[11px] font-extrabold tracking-[0.22em] text-[rgba(11,30,58,0.62)]">
                    {s.tag}
                  </span>
                </div>
                <div className="text-[11px] font-extrabold tracking-[0.18em] text-[rgba(11,30,58,0.40)]">
                  SERVICE
                </div>
              </div>

              <div className="mt-3 text-[15px] font-black tracking-[-0.01em] text-[rgba(11,30,58,0.86)]">
                {s.title}
              </div>
              <div className="mt-2 text-sm font-semibold leading-relaxed text-[rgba(11,30,58,0.62)]">
                {s.blurb}
              </div>

              <div className="mt-4 zyposoft-rule" />

              <details className="mt-3">
                <summary className="cursor-pointer select-none text-xs font-extrabold tracking-[0.18em] text-[rgba(11,30,58,0.58)]">
                  WHAT’S INCLUDED
                </summary>
                <ul className="mt-3 space-y-2 text-sm font-semibold text-[rgba(11,30,58,0.62)]">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-3">
                      <span className={`mt-[7px] h-2 w-2 rounded-full ${t.dot}`} aria-hidden />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </details>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function StepsStack({ items }: { items: Step[] }) {
  return (
    <div className="zyposoft-stack">
      {items.map((s) => (
        <div className="row" key={s.n}>
          <div className="num">{s.n}</div>
          <div>
            <div className="h">{s.title}</div>
            <div className="p">{s.blurb}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function FAQList({ items }: { items: FAQ[] }) {
  return (
    <div className="space-y-4">
      {items.map((f) => (
        <div key={f.q} className="zyposoft-quote">
          <div className="zyposoft-quote__bar" aria-hidden />
          <div className="zyposoft-quote__t">{f.q}</div>
          <div className="zyposoft-quote__s">{f.a}</div>
        </div>
      ))}
    </div>
  );
}

function PillarsList({
  items,
}: {
  items: { t: string; s: string }[];
}) {
  return (
    <div className="grid gap-3">
      {items.map((x) => (
        <div
          key={x.t}
          className="rounded-2xl border border-[rgba(11,30,58,0.10)] bg-[rgba(255,255,255,0.65)] px-4 py-3 shadow-[0_16px_44px_rgba(11,30,58,0.05)]"
        >
          <div className="text-sm font-extrabold text-[rgba(11,30,58,0.82)]">
            {x.t}
          </div>
          <div className="mt-1 text-sm font-semibold text-[rgba(11,30,58,0.58)]">
            {x.s}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function ServicesPage() {
  return (
    <main className="zyposoft-site text-[#0b1e3a]">
      {/* HERO */}
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
        <div className="md:col-span-7">
          <Reveal threshold={0.25} rootMargin="0px 0px -25% 0px">
            <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(27,89,167,0.14)] bg-[rgba(27,89,167,0.06)] px-3 py-2">
              <Eyebrow>{SERVICES.hero.eyebrow}</Eyebrow>
            </div>

            <div className="mt-6 text-xs font-bold tracking-[0.22em] text-[rgba(11,30,58,0.55)]">
              {SERVICES.hero.strap}
            </div>

            <H2 className="mt-4">{SERVICES.hero.headline}</H2>

            <P className="mt-5 max-w-2xl">{SERVICES.hero.body}</P>

            {/* SAME BUTTON STYLES AS PRODUCT */}
            <div className="mt-8 flex flex-wrap gap-6">
              <Link href={SERVICES.hero.ctas.primary.href} className="zyposoft-linkAccent">
                {SERVICES.hero.ctas.primary.label}
              </Link>
              <Link href={SERVICES.hero.ctas.secondary.href} className="zyposoft-linkMuted">
                {SERVICES.hero.ctas.secondary.label}
              </Link>
            </div>
          </Reveal>
        </div>

        <div className="md:col-span-5">
          <Reveal threshold={0.25} rootMargin="0px 0px -25% 0px">
            <div className="zyposoft-quote">
              <div className="zyposoft-quote__bar" aria-hidden />
              <div className="zyposoft-quote__k">Designed for long-term ownership</div>
              <div className="zyposoft-quote__t">Delivery discipline, operational clarity, and stable foundations.</div>
              <div className="zyposoft-quote__s">
                We deliver systems that are easy to evolve: predictable releases, quality gates, and
                production readiness so teams don’t get trapped in rewrites after launch.
              </div>
            </div>

            <div className="mt-8 grid gap-3">
              {SERVICES.hero.proof.map((x) => (
                <StatRow key={x.k} k={x.k} v={x.v} />
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  </div>
</section>


      {/* OFFERINGS */}
      <section id="modules" className="zyposoft-section theme--teal">
        <div className="zyposoft-section__bg" aria-hidden>
          <div className="zyposoft-section__mesh" />
          <div className="zyposoft-section__grid" />
          <div className="zyposoft-section__noise" />
          <div className="zyposoft-section__sweep" />
        </div>

        <div className="relative z-[1]">
          <div className="zyposoft-container">
            <Reveal>
              <div className="max-w-4xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(27,89,167,0.14)] bg-[rgba(27,89,167,0.06)] px-3 py-2">
                  <Eyebrow>{SERVICES.offerings.eyebrow}</Eyebrow>
                </div>
                <H2 className="mt-4">{SERVICES.offerings.title}</H2>
                <P className="mt-4">{SERVICES.offerings.lead}</P>
                <div className="mt-8 zyposoft-rule" />
              </div>
            </Reveal>

            <div className="mt-8">
              <Reveal>
                <ServicesCompactGrid items={SERVICES.offerings.items} />
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* OUTCOMES */}
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
              <div className="md:col-span-5">
                <Reveal>
                  <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(27,89,167,0.14)] bg-[rgba(27,89,167,0.06)] px-3 py-2">
                    <Eyebrow>{SERVICES.outcomes.eyebrow}</Eyebrow>
                  </div>
                  <H2 className="mt-4">{SERVICES.outcomes.title}</H2>
                  <P className="mt-4 max-w-xl">
                    Practical engineering outcomes that improve delivery, reliability,
                    and long-term maintainability.
                  </P>
                </Reveal>
              </div>

              <div className="md:col-span-7">
                <Reveal>
                  <FeatureList items={SERVICES.outcomes.items} />
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* METHOD */}
      <section className="zyposoft-section theme--amber">
        <div className="zyposoft-section__bg" aria-hidden>
          <div className="zyposoft-section__mesh" />
          <div className="zyposoft-section__grid" />
          <div className="zyposoft-section__noise" />
          <div className="zyposoft-section__sweep" />
        </div>

        <div className="relative z-[1]">
          <div className="zyposoft-container">
            <div className="grid gap-10 md:grid-cols-12 md:items-start">
              <div className="md:col-span-5">
                <Reveal>
                  <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(27,89,167,0.14)] bg-[rgba(27,89,167,0.06)] px-3 py-2">
                    <Eyebrow>{SERVICES.method.eyebrow}</Eyebrow>
                  </div>
                  <H2 className="mt-4">{SERVICES.method.title}</H2>
                  <P className="mt-4 max-w-xl">
                    A structured approach that keeps execution fast, releases safe,
                    and operations visible.
                  </P>
                </Reveal>
              </div>

              <div className="md:col-span-7">
                <Reveal>
                  <StepsStack items={SERVICES.method.steps} />
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ENGAGEMENT */}
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
              <div className="md:col-span-5">
                <Reveal>
                  <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(27,89,167,0.14)] bg-[rgba(27,89,167,0.06)] px-3 py-2">
                    <Eyebrow>{SERVICES.engagement.eyebrow}</Eyebrow>
                  </div>
                  <H2 className="mt-4">{SERVICES.engagement.title}</H2>
                  <P className="mt-4 max-w-xl">
                    Choose a model that matches your stage: prototype, scale-up,
                    modernization, or long-term operations.
                  </P>
                </Reveal>
              </div>

              <div className="md:col-span-7">
                <Reveal>
                  <StepsStack items={SERVICES.engagement.items} />
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
