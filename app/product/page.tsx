// app/product/page.tsx
import Link from "next/link";
import { Reveal } from "@/components/site/Reveal";
import { Eyebrow, H1, H2, H3, P } from "@/components/ui/Typography";

type Module = {
  tag: string;
  title: string;
  blurb: string;
  bullets: string[];
};

type FAQ = { q: string; a: string };

const PRODUCT = {
  name: "ArogyaCore",
  hero: {
    eyebrow: "Product",
    strap: "STATE-GRADE • GOVERNABLE • AI-ENABLED",
    headline: (
      <>
        <span className="studio-gradient-text font-black">ArogyaCore</span>{" "}
        A state-grade health platform built to scale and endure.
      </>
    ),

    body:
      "ArogyaCore is an AI-enabled health infrastructure platform designed for state governments and regulated healthcare ecosystems. It unifies EHR, hospital operations, and citizen care into one governable system built for uptime, auditability, and long-term maintainability.",
    ctas: {
      primary: { label: "Contact Us", href: "/contact" },
      secondary: { label: "Explore modules", href: "#modules" },
    },
    proof: [
      { k: "Built for", v: "High availability" },
      { k: "Designed for", v: "Governance & audit" },
      { k: "Optimized for", v: "Adoption at scale" },
    ],
  },

  outcomes: {
    eyebrow: "Outcomes",
    title: "What governments and health systems get from ArogyaCore",
    items: [
      {
        title: "Reliable operations at scale",
        blurb:
          "Standardized workflows, role clarity, and measurable throughput so adoption does not degrade performance.",
      },
      {
        title: "Governable data access",
        blurb:
          "Policy-aligned access patterns with audit-ready logs so sensitive information remains controlled and traceable.",
      },
      {
        title: "Faster decisions with AI guardrails",
        blurb:
          "Early-warning signals, bottleneck detection, and decision support built to be explainable and oversight-friendly.",
      },
      {
        title: "Continuity for citizens",
        blurb:
          "Follow-ups, reminders, and longitudinal care journeys consistent across mobile, tablets, and desktops.",
      },
    ],
  },

  how: {
    eyebrow: "How it works",
    title: "A simple blueprint: unify → govern → improve",
    steps: [
      {
        n: "01",
        title: "Unify data without breaking operations",
        blurb:
          "Connect facilities, programs, and service points through clean integrations so existing workflows continue while visibility improves.",
      },
      {
        n: "02",
        title: "Run standard workflows with governance",
        blurb:
          "From registration to discharge, workflows are standardized with role-based controls and audit trails so compliance is built-in.",
      },
      {
        n: "03",
        title: "Detect risk early and respond faster",
        blurb:
          "AI-assisted signals highlight hotspots, anomalies, and operational bottlenecks so interventions are timely and measurable.",
      },
    ],
  },

  ai: {
    eyebrow: "Governed AI",
    title: "AI that improves outcomes without sacrificing control",
    items: [
      {
        title: "Hotspot & outbreak early warnings",
        blurb:
          "Trend detection on admissions and regional signals, with thresholds and confidence indicators for decision support.",
      },
      {
        title: "Clinical & documentation assistance",
        blurb:
          "Structured summaries, coding suggestions, and follow-up prompts designed with logging, privacy, and human oversight.",
      },
      {
        title: "Operational intelligence",
        blurb:
          "Queue health, turnaround time, capacity stress, and service throughput so administrators can reduce delays and improve flow.",
      },
      {
        title: "Citizen engagement at scale",
        blurb:
          "Smart nudges for preventive care and continuity aligned to measurable adoption and compliance goals.",
      },
    ],
  },

  modules: [
    {
      tag: "FOUNDATION",
      title: "State-scale HMS",
      blurb:
        "A predictable operating layer for facilities standard workflows, clean roles, and operational clarity.",
      bullets: [
        "OPD/IPD workflows with controlled roles",
        "Queues, TAT tracking, and capacity visibility",
        "Facility administration & service catalog",
        "Audit-ready activity logs",
      ],
    },
    {
      tag: "CARE",
      title: "EHR + Citizen Care",
      blurb:
        "A longitudinal view of care usable by clinicians and accessible to citizens without compromising privacy.",
      bullets: [
        "Longitudinal patient record and care history",
        "Secure citizen profile and follow-up journey",
        "Referrals and continuity notes",
        "Consent-aware access patterns (where applicable)",
      ],
    },
    {
      tag: "INTELLIGENCE",
      title: "AI Surveillance & Hotspot Monitoring",
      blurb:
        "Decision support for public health and administration signals that are explainable, governed, and actionable.",
      bullets: [
        "Region-wise anomaly and hotspot detection",
        "Program and disease trend dashboards",
        "Early-warning alerts with thresholds",
        "Explainability + audit trails",
      ],
    },
    {
      tag: "ACCESS",
      title: "Telemedicine & Continuity",
      blurb:
        "Remote care journeys that feel consistent across devices built for scale, stability, and adoption.",
      bullets: [
        "Tele-consult workflow and prescriptions",
        "Follow-ups, care plans, and reminders",
        "Channel-ready citizen communication",
        "Program reporting views",
      ],
    },
    {
      tag: "OPERATIONS",
      title: "Administration & Compliance",
      blurb:
        "Controls that keep platforms governable as usage grows policy, security, and reliability built in from day one.",
      bullets: [
        "Role-based access control and policy enforcement",
        "Audit trails for critical actions",
        "Observability-ready logs and service health",
        "Release governance and rollback readiness",
      ],
    },
  ] as Module[],

  integration: {
    eyebrow: "Integrations",
    title: "Integrations that work in real environments",
    items: [
      "Facility systems and hospital networks (HMS/EHR connectors)",
      "Labs and diagnostics feeds (controlled ingestion)",
      "Program registries and reporting pipelines",
      "SMS/WhatsApp/email gateways for citizen communication",
      "Exportable reports and controlled APIs for stakeholders",
    ],
  },

  security: {
    eyebrow: "Security & reliability",
    title: "Privacy, governance, and uptime treated as product requirements",
    items: [
      "Role-based access control with audit trails",
      "Consent-aware access patterns for sensitive data",
      "Secure-by-design architecture and logging discipline",
      "Operational readiness: monitoring, incident workflows, rollback plans",
      "Predictable delivery standards (quality gates, release governance)",
    ],
  },

  faq: [
    {
      q: "Is ArogyaCore only for hospitals?",
      a: "No. It is designed as state-grade health infrastructure supporting facilities, programs, administrators, and citizen-facing journeys with governed access across the ecosystem.",
    },
    {
      q: "How do you handle privacy and audit requirements?",
      a: "ArogyaCore is built with role-based controls, consent-aware patterns where applicable, and audit-ready logging so critical actions are traceable and governable in production.",
    },
    {
      q: "Does AI make clinical decisions automatically?",
      a: "No. AI provides decision support and operational intelligence with guardrails. Human oversight remains central, and outputs are designed to be explainable and auditable.",
    },
    {
      q: "Can the platform scale to state-level adoption?",
      a: "Yes performance budgets, observability, and reliability patterns are treated as product requirements so scale does not degrade uptime or user experience.",
    },
    {
      q: "How is this different from typical project delivery?",
      a: "We deliver an operable system: quality gates, release governance, monitoring readiness, documentation, and operational playbooks so teams can run the platform confidently after launch.",
    },
  ] as FAQ[],

  closing: {
    eyebrow: "Next step",
    title: "If you want a platform that lasts, we should talk.",
    body:
      "ArogyaCore is built for long-term ownership and state-scale reliability. If you’re modernizing health infrastructure, we can help you unify workflows, govern access, and improve outcomes without constant rewrites.",
    ctas: {
      primary: { label: "Contact", href: "/#contact" },
      secondary: { label: "Company", href: "/about" },
    },
  },
};

function StatRow({ k, v }: { k: string; v: string }) {
  const tone =
    k.includes("Built") ? "blue" : k.includes("Designed") ? "teal" : "amber";

  const toneMap: Record<string, { bg: string; ring: string; dot: string }> = {
    blue: {
      bg: "bg-[rgba(27,89,167,0.08)]",
      ring: "border-[rgba(27,89,167,0.18)]",
      dot: "bg-[rgba(27,89,167,0.88)]",
    },
    teal: {
      bg: "bg-[rgba(20,212,177,0.10)]",
      ring: "border-[rgba(20,212,177,0.18)]",
      dot: "bg-[rgba(20,212,177,0.92)]",
    },
    amber: {
      bg: "bg-[rgba(245,158,11,0.12)]",
      ring: "border-[rgba(245,158,11,0.22)]",
      dot: "bg-[rgba(245,158,11,0.92)]",
    },
  };

  const t = toneMap[tone];

  return (
    <div className={`flex items-center justify-between gap-4 rounded-2xl border ${t.ring} ${t.bg} px-4 py-3`}>
      <div className="flex items-center gap-3">
        <span className={`h-2.5 w-2.5 rounded-full ${t.dot}`} aria-hidden />
        <div className="text-xs font-extrabold tracking-[0.18em] text-[rgba(11,30,58,0.55)]">
          {k}
        </div>
      </div>
      <div className="text-sm font-extrabold text-[rgba(11,30,58,0.78)]">{v}</div>
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

function ModulesShowcase({ modules }: { modules: Module[] }) {
  const themeFor = (tag: string) => {
    const t = tag.toLowerCase();
    if (t.includes("foundation")) return "blue";
    if (t.includes("care")) return "teal";
    if (t.includes("intelligence")) return "amber";
    if (t.includes("access")) return "violet";
    return "blue";
  };

  const theme = {
    blue: {
      pillBg: "bg-[rgba(27,89,167,0.10)]",
      pillRing: "ring-[rgba(27,89,167,0.24)]",
      dot: "bg-[rgba(27,89,167,0.90)]",
      line: "from-[rgba(27,89,167,0.60)]",
      wash:
        "radial-gradient(420px 220px at 16% 18%, rgba(27,89,167,0.18), transparent 60%)," +
        "radial-gradient(520px 260px at 90% 84%, rgba(27,89,167,0.10), transparent 62%)",
    },
    teal: {
      pillBg: "bg-[rgba(20,212,177,0.12)]",
      pillRing: "ring-[rgba(20,212,177,0.24)]",
      dot: "bg-[rgba(20,212,177,0.92)]",
      line: "from-[rgba(20,212,177,0.60)]",
      wash:
        "radial-gradient(420px 220px at 16% 18%, rgba(20,212,177,0.18), transparent 60%)," +
        "radial-gradient(520px 260px at 90% 84%, rgba(20,212,177,0.10), transparent 62%)",
    },
    amber: {
      pillBg: "bg-[rgba(245,158,11,0.14)]",
      pillRing: "ring-[rgba(245,158,11,0.22)]",
      dot: "bg-[rgba(245,158,11,0.92)]",
      line: "from-[rgba(245,158,11,0.58)]",
      wash:
        "radial-gradient(420px 220px at 16% 18%, rgba(245,158,11,0.18), transparent 60%)," +
        "radial-gradient(520px 260px at 90% 84%, rgba(245,158,11,0.10), transparent 62%)",
    },
    violet: {
      pillBg: "bg-[rgba(141,15,214,0.12)]",
      pillRing: "ring-[rgba(141,15,214,0.20)]",
      dot: "bg-[rgba(141,15,214,0.86)]",
      line: "from-[rgba(141,15,214,0.52)]",
      wash:
        "radial-gradient(420px 220px at 16% 18%, rgba(141,15,214,0.16), transparent 60%)," +
        "radial-gradient(520px 260px at 90% 84%, rgba(141,15,214,0.10), transparent 62%)",
    },
  } as const;

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {modules.map((m) => {
        const key = themeFor(m.tag);
        const t = theme[key];

        return (
          <div
            key={m.title}
            className="relative overflow-hidden rounded-[26px] border border-[rgba(11,30,58,0.10)] bg-[rgba(255,255,255,0.64)] shadow-[0_28px_80px_rgba(11,30,58,0.07)] backdrop-blur-md"
          >
            {/* color wash */}
            <div
              className="pointer-events-none absolute inset-0 opacity-95"
              style={{ background: t.wash }}
              aria-hidden
            />

            {/* top accent line */}
            <div
              className={`absolute left-0 top-0 h-[3px] w-full bg-gradient-to-r ${t.line} to-transparent opacity-70`}
              aria-hidden
            />

            <div className="relative p-5">
              {/* tag pill */}
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
                  <span className="text-xs font-extrabold tracking-[0.22em] text-[rgba(11,30,58,0.62)]">
                    {m.tag}
                  </span>
                </div>

                {/* tiny “module badge” (optional, clean) */}
                <div className="text-[11px] font-extrabold tracking-[0.18em] text-[rgba(11,30,58,0.40)]">
                  MODULE
                </div>
              </div>

              <div className="mt-4 text-lg font-black tracking-[-0.02em] text-[rgba(11,30,58,0.86)]">
                {m.title}
              </div>

              <div className="mt-2 text-sm font-semibold leading-relaxed text-[rgba(11,30,58,0.62)]">
                {m.blurb}
              </div>

              <div className="mt-5 zyposoft-rule" />

              <ul className="mt-4 space-y-2 text-sm font-semibold text-[rgba(11,30,58,0.62)]">
                {m.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <span className={`mt-[7px] h-2 w-2 rounded-full ${t.dot}`} aria-hidden />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
      })}
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

export default function ProductPage() {
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
                    <Eyebrow>{PRODUCT.hero.eyebrow}</Eyebrow>
                  </div>

                  <div className="mt-6 text-xs font-bold tracking-[0.22em] text-[rgba(11,30,58,0.55)]">
                    {PRODUCT.hero.strap}
                  </div>

                  <H2 className="mt-4">{PRODUCT.hero.headline}</H2>

                  <P className="mt-5 max-w-2xl">{PRODUCT.hero.body}</P>

                  <div className="mt-8 flex flex-wrap gap-6">
                    <Link href={PRODUCT.hero.ctas.primary.href} className="zyposoft-linkAccent">
                      {PRODUCT.hero.ctas.primary.label}
                    </Link>
                    <Link href={PRODUCT.hero.ctas.secondary.href} className="zyposoft-linkMuted">
                      {PRODUCT.hero.ctas.secondary.label}
                    </Link>
                  </div>
                </Reveal>
              </div>

              <div className="md:col-span-5">
                <Reveal threshold={0.25} rootMargin="0px 0px -25% 0px">
                  <div className="zyposoft-quote">
                    <div className="zyposoft-quote__bar" aria-hidden />
                    <div className="zyposoft-quote__k">Designed for long-term ownership</div>
                    <div className="zyposoft-quote__t">Governable, audit-ready, and built to survive scale.</div>
                    <div className="zyposoft-quote__s">
                      ArogyaCore is engineered as digital public infrastructure: predictable releases, measurable
                      reliability, and operational clarity so the platform improves over years, not rewrites.
                    </div>
                  </div>

                  <div className="mt-8 grid gap-3">
                    {PRODUCT.hero.proof.map((x) => (
                      <StatRow key={x.k} k={x.k} v={x.v} />
                    ))}
                  </div>
                </Reveal>
              </div>
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
                <Reveal threshold={0.25} rootMargin="0px 0px -25% 0px">
                  <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(27,89,167,0.14)] bg-[rgba(27,89,167,0.06)] px-3 py-2">
                    <Eyebrow>{PRODUCT.outcomes.eyebrow}</Eyebrow>
                  </div>
                  <H2 className="mt-4">{PRODUCT.outcomes.title}</H2>
                  <P className="mt-4 max-w-xl">
                    Built to reduce operational friction, improve visibility, and keep the platform stable as adoption grows.
                  </P>
                </Reveal>
              </div>

              <div className="md:col-span-7">
                <Reveal threshold={0.25} rootMargin="0px 0px -25% 0px">
                  <FeatureList items={PRODUCT.outcomes.items} />
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
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
              <div className="md:col-span-5">
                <Reveal threshold={0.25} rootMargin="0px 0px -25% 0px">
                  <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(27,89,167,0.14)] bg-[rgba(27,89,167,0.06)] px-3 py-2">
                    <Eyebrow>{PRODUCT.how.eyebrow}</Eyebrow>
                  </div>
                  <H2 className="mt-4">{PRODUCT.how.title}</H2>
                  <P className="mt-4 max-w-xl">
                    ArogyaCore is designed as a stable foundation first then improved continuously through measurable delivery standards.
                  </P>
                </Reveal>
              </div>

              <div className="md:col-span-7">
                <Reveal threshold={0.25} rootMargin="0px 0px -25% 0px">
                  <div className="zyposoft-stack">
                    {PRODUCT.how.steps.map((s) => (
                      <div className="row" key={s.n}>
                        <div className="num">{s.n}</div>
                        <div>
                          <div className="h">{s.title}</div>
                          <div className="p">{s.blurb}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GOVERNED AI */}
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
                <Reveal threshold={0.25} rootMargin="0px 0px -25% 0px">
                  <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(27,89,167,0.14)] bg-[rgba(27,89,167,0.06)] px-3 py-2">
                    <Eyebrow>{PRODUCT.ai.eyebrow}</Eyebrow>
                  </div>
                  <H2 className="mt-4">{PRODUCT.ai.title}</H2>
                  <P className="mt-4 max-w-xl">
                    AI is applied where it reduces operational load and improves decisions always with auditability and oversight.
                  </P>
                </Reveal>
              </div>

              <div className="md:col-span-7">
                <Reveal threshold={0.25} rootMargin="0px 0px -25% 0px">
                  <FeatureList items={PRODUCT.ai.items} />
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MODULES */}
     {/* MODULES */}
<section id="modules" className="zyposoft-section theme--violet">
  <div className="zyposoft-section__bg" aria-hidden>
    <div className="zyposoft-section__mesh" />
    <div className="zyposoft-section__grid" />
    <div className="zyposoft-section__noise" />
    <div className="zyposoft-section__sweep" />
  </div>

  <div className="relative z-[1]">
    <div className="zyposoft-container">
      {/* FULL-WIDTH HEADER (no side-by-side) */}
      <div className="max-w-4xl">
        <Reveal threshold={0.25} rootMargin="0px 0px -25% 0px">
          <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(27,89,167,0.14)] bg-[rgba(27,89,167,0.06)] px-3 py-2">
            <Eyebrow>Modules</Eyebrow>
          </div>

          <H2 className="mt-4">A modular platform delivered as one governable system.</H2>

          <P className="mt-4">
            Each module is designed to work independently, but delivers best when unified one
            identity layer, one governance model, and one operational view. This keeps delivery
            predictable and operations calm as adoption grows.
          </P>

          {/* Compact “unified foundation” line (fills whitespace without creating boxes) */}
         

          <div className="mt-8 zyposoft-rule" />
        </Reveal>
      </div>

      {/* FULL-WIDTH CARDS GRID */}
      <div className="mt-8">
        <Reveal threshold={0.25} rootMargin="0px 0px -25% 0px">
          <ModulesShowcase modules={PRODUCT.modules} />
        </Reveal>
      </div>
    </div>
  </div>
</section>


      {/* INTEGRATIONS + SECURITY */}
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
                <Reveal threshold={0.25} rootMargin="0px 0px -25% 0px">
                  <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(27,89,167,0.14)] bg-[rgba(27,89,167,0.06)] px-3 py-2">
                    <Eyebrow>{PRODUCT.integration.eyebrow}</Eyebrow>
                  </div>
                  <H2 className="mt-4">{PRODUCT.integration.title}</H2>

                  <div className="mt-6 zyposoft-rule" />
                  <ul className="mt-5 space-y-3 text-sm font-semibold text-[rgba(11,30,58,0.62)]">
                    {PRODUCT.integration.items.map((x) => (
                      <li key={x} className="flex items-start gap-3">
                        <span className="dot dot--blue mt-[7px]" aria-hidden />
                        <span>{x}</span>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </div>

              <div className="md:col-span-6">
                <Reveal threshold={0.25} rootMargin="0px 0px -25% 0px">
                  <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(27,89,167,0.14)] bg-[rgba(27,89,167,0.06)] px-3 py-2">
                    <Eyebrow>{PRODUCT.security.eyebrow}</Eyebrow>
                  </div>
                  <H2 className="mt-4">{PRODUCT.security.title}</H2>

                  <div className="mt-6 zyposoft-rule" />
                  <ul className="mt-5 space-y-3 text-sm font-semibold text-[rgba(11,30,58,0.62)]">
                    {PRODUCT.security.items.map((x) => (
                      <li key={x} className="flex items-start gap-3">
                        <span className="dot dot--violet mt-[7px]" aria-hidden />
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

      {/* FAQ */}
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
                <Reveal threshold={0.25} rootMargin="0px 0px -25% 0px">
                  <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(27,89,167,0.14)] bg-[rgba(27,89,167,0.06)] px-3 py-2">
                    <Eyebrow>FAQ</Eyebrow>
                  </div>
                  <H2 className="mt-4">Common questions</H2>
                  <P className="mt-4 max-w-xl">
                    Clear answers for stakeholders delivery, governance, AI usage, and state-scale adoption.
                  </P>
                </Reveal>
              </div>

              <div className="md:col-span-7">
                <Reveal threshold={0.25} rootMargin="0px 0px -25% 0px">
                  <FAQList items={PRODUCT.faq} />
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CLOSING CTA */}
      {/* <section className="zyposoft-section theme--teal">
        <div className="zyposoft-section__bg" aria-hidden>
          <div className="zyposoft-section__mesh" />
          <div className="zyposoft-section__grid" />
          <div className="zyposoft-section__noise" />
          <div className="zyposoft-section__sweep" />
        </div>

        <div className="relative z-[1]">
          <div className="zyposoft-container">
            <div className="max-w-3xl">
              <Reveal threshold={0.25} rootMargin="0px 0px -25% 0px">
                <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(27,89,167,0.14)] bg-[rgba(27,89,167,0.06)] px-3 py-2">
                  <Eyebrow>{PRODUCT.closing.eyebrow}</Eyebrow>
                </div>

                <H2 className="mt-4">{PRODUCT.closing.title}</H2>
                <P className="mt-4">{PRODUCT.closing.body}</P>

                <div className="mt-8 flex flex-wrap gap-6">
                  <Link href={PRODUCT.closing.ctas.primary.href} className="zyposoft-linkAccent">
                    {PRODUCT.closing.ctas.primary.label}
                  </Link>
                  <Link href={PRODUCT.closing.ctas.secondary.href} className="zyposoft-linkMuted">
                    {PRODUCT.closing.ctas.secondary.label}
                  </Link>
                </div>

                <div className="mt-10">
                  <div className="zyposoft-rule" />
                  <div className="mt-4 text-xs font-extrabold tracking-[0.22em] text-[rgba(11,30,58,0.55)]">
                    AROGYACORE • PRAVIDHI SOFTTECH • AI-ENABLED DIGITAL HEALTH INFRASTRUCTURE
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section> */}
    </main>
  );
}
