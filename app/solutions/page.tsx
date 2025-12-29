// app/solutions/page.tsx
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import { Eyebrow, H2, H3, P } from "@/components/ui/Typography";

type Module = {
  tag: string;
  title: string;
  blurb: string;
  bullets: string[];
};

type Step = { n: string; title: string; blurb: string };
type FAQ = { q: string; a: string };

const SOLUTIONS = {
  hero: {
    eyebrow: "Solutions",
    strap: "READY-TO-DEPLOY • CUSTOMIZABLE • PRODUCTION-GRADE",
    headline: (
      <>
        <span className="studio-gradient-text font-black">Solutions</span>{" "}
        built to solve real operational problems.
      </>
    ),
    body:
      "Our solutions are packaged, proven architectures that accelerate delivery without compromising reliability. Each solution can be adopted as-is or tailored to your workflow, data, and compliance needs with clear success metrics and production readiness from day one.",
    // SAME LINKS AS PRODUCT PAGE (per your request)
    ctas: {
      primary: { label: "Contact Us", href: "/contact" },
      secondary: { label: "Explore modules", href: "#modules" },
    },
    proof: [
      { k: "Time-to-value", v: "Weeks, not quarters" },
      { k: "Built for", v: "Uptime & maintainability" },
      { k: "Designed for", v: "Governance & auditability" },
    ],

  },

  modules: {
    eyebrow: "Modules",
    title: "Solution modules you can adopt or tailor",
    lead:
      "Pick one module or combine multiple. Each is built as a clean, maintainable subsystem with clear interfaces and rollout controls.",
    items: [
      {
        tag: "AI COPILOT",
        title: "AI Copilot for Operations",
        blurb:
          "An internal assistant that answers questions, summarizes cases, drafts responses, and accelerates workflows with evaluation, role-based access, and audit-ready logs.",
        bullets: [
          "Secure knowledge retrieval (RAG) over your docs/data",
          "Task workflows: draft, summarize, classify, route",
          "Human-in-the-loop review and approvals",
          "Quality evaluation harness + monitoring",
        ],
      },
      {
        tag: "DOC INTELLIGENCE",
        title: "Document Processing & Verification",
        blurb:
          "Extract and validate data from PDFs, images, forms, invoices, and KYC-like documents using deterministic rules + ML/LLM assist where needed.",
        bullets: [
          "Extraction pipelines + validation checks",
          "Confidence scoring and exception handling",
          "Queue-based processing and retries",
          "Audit trail for each transformation",
        ],
      },
      {
        tag: "WORKFLOW",
        title: "Workflow Automation Engine",
        blurb:
          "A configurable workflow layer to standardize tasks, approvals, escalations, and SLAs making operations measurable and consistent.",
        bullets: [
          "Configurable states, SLAs, and escalations",
          "Approvals, change control, and audit logs",
          "Role-based routing and assignments",
          "Event-driven automation hooks",
        ],
      },
      {
        tag: "ANALYTICS",
        title: "Decision Dashboards & KPIs",
        blurb:
          "A reliable analytics layer that tracks performance, quality, throughput, and risk powered by clean metrics and governance-friendly access.",
        bullets: [
          "KPI definition + metric governance",
          "Dashboards for operations and leadership",
          "Data quality checks and anomaly alerts",
          "Exports, reporting, and scheduled insights",
        ],
      },
      {
        tag: "DATA PLATFORM",
        title: "Modern Data Foundation",
        blurb:
          "A practical data platform blueprint: ingestion, transformation, access patterns, and observability designed for scale and long-term ownership.",
        bullets: [
          "Ingestion and transformation pipelines",
          "Data contracts and validation",
          "Access patterns: APIs, marts, warehouse",
          "Lineage + observability for data health",
        ],
      },
      {
        tag: "RELIABILITY",
        title: "Reliability & Release Governance",
        blurb:
          "Production readiness improvements: CI/CD, observability, SLOs, and incident discipline so releases stay calm as usage grows.",
        bullets: [
          "CI/CD pipelines and staged releases",
          "Logs/metrics/traces with actionable alerts",
          "Runbooks, incident workflow, postmortems",
          "Performance budgets and tuning",
        ],
      },
    ] as Module[],
  },

  outcomes: {
    eyebrow: "Outcomes",
    title: "What you can expect",
    items: [
      {
        title: "Faster delivery with fewer regressions",
        blurb:
          "Structured modules and quality gates reduce rework and stabilize releases as scope grows.",
      },
      {
        title: "Measurable AI (not guesswork)",
        blurb:
          "AI features ship with evaluation, monitoring, and rollback controls to maintain trust in production.",
      },
      {
        title: "Lower operational overhead",
        blurb:
          "Automation, visibility, and reliability practices reduce incident load and manual effort.",
      },
      {
        title: "Cleaner ownership for your team",
        blurb:
          "Clear interfaces, documentation, and runbooks make systems maintainable after handover.",
      },
    ],
  },

  approach: {
    eyebrow: "Approach",
    title: "How we implement solutions safely",
    steps: [
      {
        n: "01",
        title: "Assess and align success metrics",
        blurb:
          "We confirm the workflow, constraints, and measurable targets so delivery remains outcome-driven.",
      },
      {
        n: "02",
        title: "Integrate with clean interfaces",
        blurb:
          "We design stable contracts (APIs/data) and keep changes isolated to reduce blast radius.",
      },
      {
        n: "03",
        title: "Roll out with controls",
        blurb:
          "Staged deployments, feature flags, evaluation, and monitoring ensure safe adoption at scale.",
      },
    ] as Step[],
  },

  engagement: {
    eyebrow: "Engagement",
    title: "Implementation models",
    items: [
      {
        n: "01",
        title: "Module Sprint",
        blurb:
          "A focused engagement to implement one solution module end-to-end with production readiness.",
      },
      {
        n: "02",
        title: "Solution Bundle Delivery",
        blurb:
          "A delivery squad that ships multiple modules with shared architecture, governance, and observability.",
      },
      {
        n: "03",
        title: "Modernize & Stabilize",
        blurb:
          "Upgrade reliability, performance, and release governance for existing systems before adding new capability.",
      },
      {
        n: "04",
        title: "Operate & Improve",
        blurb:
          "Ongoing improvements, monitoring, incident response support, and enhancement roadmap execution.",
      },
    ] as Step[],
  },

  who: {
    eyebrow: "Best fit",
    title: "Where these solutions work best",
    items: [
      "Teams scaling a platform and needing stability without slowing down",
      "Organizations standardizing workflows, approvals, and SLAs",
      "Products adding AI features and needing safe rollout practices",
      "Operations-heavy businesses aiming to reduce manual work and improve visibility",
    ],
  },
  
};

function StatRow({ k, v }: { k: string; v: string }) {
  const tone =
    k.includes("Time") ? "teal" : k.includes("Built") ? "blue" : "amber";

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

function ModulesCompactGrid({ items }: { items: Module[] }) {
  const themeFor = (tag: string) => {
    const t = tag.toLowerCase();
    if (t.includes("ai")) return "violet";
    if (t.includes("doc")) return "amber";
    if (t.includes("workflow")) return "teal";
    if (t.includes("analytics")) return "amber";
    if (t.includes("data")) return "blue";
    if (t.includes("reliability")) return "teal";
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
      {items.map((m) => {
        const key = themeFor(m.tag) as keyof typeof theme;
        const t = theme[key];

        return (
          <div
            key={m.title}
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
                    {m.tag}
                  </span>
                </div>
                <div className="text-[11px] font-extrabold tracking-[0.18em] text-[rgba(11,30,58,0.40)]">
                  SOLUTION
                </div>
              </div>

              <div className="mt-3 text-[15px] font-black tracking-[-0.01em] text-[rgba(11,30,58,0.86)]">
                {m.title}
              </div>
              <div className="mt-2 text-sm font-semibold leading-relaxed text-[rgba(11,30,58,0.62)]">
                {m.blurb}
              </div>

              <div className="mt-4 zyposoft-rule" />

              <details className="mt-3">
                <summary className="cursor-pointer select-none text-xs font-extrabold tracking-[0.18em] text-[rgba(11,30,58,0.58)]">
                  WHAT’S INCLUDED
                </summary>
                <ul className="mt-3 space-y-2 text-sm font-semibold text-[rgba(11,30,58,0.62)]">
                  {m.bullets.map((b) => (
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



export default function SolutionsPage() {
  return (
    <main className="zyposoft-site text-[#0b1e3a]">
      {/* HERO (same structure/buttons as Product) */}
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
                <Reveal>
                  <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(27,89,167,0.14)] bg-[rgba(27,89,167,0.06)] px-3 py-2">
                    <Eyebrow>{SOLUTIONS.hero.eyebrow}</Eyebrow>
                  </div>

                  <div className="mt-6 text-xs font-bold tracking-[0.22em] text-[rgba(11,30,58,0.55)]">
                    {SOLUTIONS.hero.strap}
                  </div>

                  <H2 className="mt-4">{SOLUTIONS.hero.headline}</H2>

                  <P className="mt-5 max-w-2xl">{SOLUTIONS.hero.body}</P>

                  {/* Same link-style buttons as Product */}
                  <div className="mt-8 flex flex-wrap gap-6">
                    <Link href={SOLUTIONS.hero.ctas.primary.href} className="zyposoft-linkAccent">
                      {SOLUTIONS.hero.ctas.primary.label}
                    </Link>
                    <Link href={SOLUTIONS.hero.ctas.secondary.href} className="zyposoft-linkMuted">
                      {SOLUTIONS.hero.ctas.secondary.label}
                    </Link>
                  </div>
                </Reveal>
              </div>

              <div className="md:col-span-5">
                <Reveal>
                  <div className="zyposoft-quote">
                    <div className="zyposoft-quote__bar" aria-hidden />
                    <div className="zyposoft-quote__k">Solution-first delivery</div>
                    <div className="zyposoft-quote__t">Adopt modules that are designed to fit together cleanly.</div>
                    <div className="zyposoft-quote__s">
                      Each module ships with structure: interfaces, rollout controls, monitoring, and documentation 
                      so teams can operate confidently after launch.
                    </div>
                  </div>

                  <div className="mt-8 grid gap-3">
                    {SOLUTIONS.hero.proof.map((x) => (
                      <StatRow key={x.k} k={x.k} v={x.v} />
                    ))}
                  </div>

                  
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MODULES (anchor matches Product secondary CTA) */}
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
                  <Eyebrow>{SOLUTIONS.modules.eyebrow}</Eyebrow>
                </div>
                <H2 className="mt-4">{SOLUTIONS.modules.title}</H2>
                <P className="mt-4">{SOLUTIONS.modules.lead}</P>
                <div className="mt-8 zyposoft-rule" />
              </div>
            </Reveal>

            <div className="mt-8">
              <Reveal>
                <ModulesCompactGrid items={SOLUTIONS.modules.items} />
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
                    <Eyebrow>{SOLUTIONS.outcomes.eyebrow}</Eyebrow>
                  </div>
                  <H2 className="mt-4">{SOLUTIONS.outcomes.title}</H2>
                  <P className="mt-4 max-w-xl">
                    These outcomes are engineered into the modules not bolted on later.
                  </P>
                </Reveal>
              </div>

              <div className="md:col-span-7">
                <Reveal>
                  <FeatureList items={SOLUTIONS.outcomes.items} />
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* APPROACH */}
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
                    <Eyebrow>{SOLUTIONS.approach.eyebrow}</Eyebrow>
                  </div>
                  <H2 className="mt-4">{SOLUTIONS.approach.title}</H2>
                  <P className="mt-4 max-w-xl">
                    A controlled delivery model that protects production while accelerating adoption.
                  </P>
                </Reveal>
              </div>

              <div className="md:col-span-7">
                <Reveal>
                  <StepsStack items={SOLUTIONS.approach.steps} />
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
                    <Eyebrow>{SOLUTIONS.engagement.eyebrow}</Eyebrow>
                  </div>
                  <H2 className="mt-4">{SOLUTIONS.engagement.title}</H2>
                  <P className="mt-4 max-w-xl">
                    Choose a model based on urgency, complexity, and how much you want us to own end-to-end.
                  </P>
                </Reveal>
              </div>

              <div className="md:col-span-7">
                <Reveal>
                  <StepsStack items={SOLUTIONS.engagement.items} />
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BEST FIT */}
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
              <div className="md:col-span-6">
                <Reveal>
                  <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(27,89,167,0.14)] bg-[rgba(27,89,167,0.06)] px-3 py-2">
                    <Eyebrow>{SOLUTIONS.who.eyebrow}</Eyebrow>
                  </div>
                  <H2 className="mt-4">{SOLUTIONS.who.title}</H2>
                  <div className="mt-6 zyposoft-rule" />
                </Reveal>
              </div>

              <div className="md:col-span-6">
                <Reveal>
                  <ul className="mt-2 space-y-3 text-sm font-semibold text-[rgba(11,30,58,0.62)]">
                    {SOLUTIONS.who.items.map((x) => (
                      <li key={x} className="flex items-start gap-3">
                        <span className="dot dot--teal mt-[7px]" aria-hidden />
                        <span>{x}</span>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
