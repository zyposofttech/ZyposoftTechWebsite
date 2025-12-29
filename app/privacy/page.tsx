"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { Eyebrow, H2, H3, P } from "@/components/ui/Typography";

type NavItem = { id: string; label: string };

const PRIVACY = {
  meta: {
    title: "Privacy Policy",
    effectiveDate: "26 December 2025",
    scopeNote:
      "This Privacy Policy applies to our website, products, services, solutions, and related communications (collectively, the “Services”).",
  },

  hero: {
    eyebrow: "Privacy",
    strap: "TRANSPARENCY • SECURITY • ACCOUNTABILITY",
    headline: (
      <>
        <span className="studio-gradient-text font-black">Privacy</span> policy
        and data handling.
      </>
    ),
    body:
      "We value trust. This policy explains what information we collect, why we collect it, how it is used, and the choices you can make. If you have questions, contact us and we will respond promptly.",
    ctas: {
      primary: { label: "Contact Us", href: "/contact" },
      secondary: { label: "Read policy", action: "focusPolicy" as const },
    },
    proof: [
      { k: "Effective", v: "26 Dec 2025" },
      { k: "Applies to", v: "Website + Services" },
      { k: "Updates", v: "Notified when material" },
    ],
  },

  nav: [
    { id: "overview", label: "Overview" },
    { id: "info-we-collect", label: "Information we collect" },
    { id: "how-we-use", label: "How we use information" },
    { id: "sharing", label: "Sharing and disclosure" },
    { id: "cookies", label: "Cookies and analytics" },
    { id: "security", label: "Security" },
    { id: "retention", label: "Retention" },
    { id: "rights", label: "Your rights" },
    { id: "children", label: "Children" },
    { id: "international", label: "International transfers" },
    { id: "third-parties", label: "Third-party links" },
    { id: "changes", label: "Policy changes" },
    { id: "contact", label: "Contact" },
  ] satisfies NavItem[],

  content: {
    overview: [
      "This Privacy Policy describes how we collect, use, disclose, and protect personal information when you interact with our Services. “Personal information” means information that identifies, relates to, describes, or can reasonably be linked to an individual.",
      "If you use our Services on behalf of an organization, your organization may control and administer certain settings and integrations. In that case, our processing may also be governed by your organization’s agreement with us.",
    ],

    infoWeCollectIntro:
      "We collect information in three main ways: (1) information you provide, (2) information collected automatically, and (3) information from third parties.",
    infoWeCollectBlocks: [
      {
        h: "Information you provide",
        bullets: [
          "Contact details (such as name, email, phone) when you submit forms or request a demo.",
          "Business details (such as company name, role, industry) when you discuss a project or engagement.",
          "Project information you choose to share (requirements, timelines, documents, datasets, and technical context).",
          "Communications (emails, messages, and meeting notes) when you contact us or collaborate with our team.",
        ],
      },
      {
        h: "Information collected automatically",
        bullets: [
          "Device and usage data (such as pages viewed, navigation paths, timestamps, and referral sources).",
          "Approximate location derived from IP address (city/region-level) for security and analytics.",
          "Log and diagnostic data (such as error reports and performance telemetry).",
        ],
      },
      {
        h: "Information from third parties",
        bullets: [
          "If you use integrations (e.g., calendar scheduling, CRM tools), we may receive limited data necessary to enable those features.",
          "Marketing or analytics providers may provide aggregated or event-level insights (where enabled).",
        ],
      },
    ],
    infoWeCollectNote:
      "We do not intentionally collect sensitive personal information unless you explicitly provide it and it is necessary for the requested purpose. Please avoid sharing sensitive information in free-text fields unless required.",

    howWeUseIntro:
      "We use information to provide and improve Services, communicate with you, and maintain security and compliance.",
    howWeUseBullets: [
      "To respond to inquiries, schedule meetings, and provide requested information.",
      "To deliver services and implement solutions, including configuration, support, and collaboration.",
      "To operate, maintain, and improve the performance, usability, and reliability of our Services.",
      "To provide customer support, troubleshooting, and incident response.",
      "To send administrative messages (such as confirmations, updates, and policy notices).",
      "To send marketing communications where permitted; you can opt out at any time.",
      "To protect against fraud, abuse, and security incidents; enforce our terms; and comply with applicable laws.",
    ],
    aiNoteTitle: "AI and model-related processing",
    aiNoteBody: [
      "If our engagement includes AI enablement (for example, copilots, automation, or document intelligence), we process the information required to build, evaluate, and operate those features. We design implementations to minimize data exposure, use role-based access, and maintain auditability where appropriate.",
      "Where feasible, we implement evaluation, monitoring, and human-in-the-loop controls to ensure outputs are reliable and aligned with your workflow.",
    ],

    sharingIntro:
      "We do not sell personal information. We disclose information only as described below:",
    sharingBlocks: [
      {
        h: "Service providers",
        p: "We may share information with vendors that help us operate our business (hosting, analytics, customer support tooling, communications). These providers are permitted to process information only for delivering services to us and must protect it.",
      },
      {
        h: "Business transfers",
        p: "If we are involved in a merger, acquisition, financing, reorganization, or sale of assets, information may be transferred as part of that transaction, subject to appropriate confidentiality protections.",
      },
      {
        h: "Legal and safety",
        p: "We may disclose information if required by law, regulation, legal process, or to protect the rights, safety, and security of our users, customers, and the public.",
      },
      {
        h: "With your direction",
        p: "We may share information when you request or authorize us to do so (for example, enabling an integration or sharing a deliverable with a partner).",
      },
    ],

    cookies: [
      "We use cookies and similar technologies to operate our website, remember preferences, understand usage, and improve performance. Some cookies are necessary for site functionality, while others are used for analytics and measurement.",
      "You can manage cookies through your browser settings. If you disable cookies, some features may not function properly.",
    ],
    cookiesBullets: [
      "Necessary cookies: enable core site functionality and security features.",
      "Preference cookies: remember settings and choices.",
      "Analytics cookies: help us understand site usage and improve content and performance.",
    ],

    security: [
      "We implement administrative, technical, and organizational safeguards designed to protect information against unauthorized access, loss, misuse, or alteration.",
      "No security program is perfect. We encourage you to use strong passwords, safeguard access credentials, and notify us promptly if you suspect unauthorized access.",
    ],
    securityBullets: [
      "Access controls and least-privilege practices where appropriate.",
      "Monitoring and logging to detect and respond to incidents.",
      "Secure development and change control practices for production systems.",
    ],

    retention: [
      "We retain personal information only as long as necessary for the purposes described in this policy, including providing Services, meeting contractual obligations, resolving disputes, maintaining security, and complying with legal requirements.",
      "Retention periods vary depending on the type of information, the purpose of processing, and applicable legal obligations.",
    ],

    rightsIntro:
      "Depending on your location and applicable law, you may have rights regarding your personal information:",
    rightsBullets: [
      "Access: request information about the personal data we hold about you.",
      "Correction: request correction of inaccurate or incomplete information.",
      "Deletion: request deletion where permitted by law and contract.",
      "Objection / restriction: object to or restrict certain processing activities.",
      "Marketing preferences: opt out of marketing communications at any time.",
    ],
    rightsNote:
      "To exercise rights, contact us via the Contact page. We may need to verify your identity before fulfilling requests.",

    children: [
      "Our Services are not directed to children and we do not knowingly collect personal information from children. If you believe a child has provided personal information to us, please contact us so we can take appropriate action.",
    ],

    international: [
      "Your information may be processed in countries other than your country of residence, where data protection laws may differ. Where required, we use appropriate safeguards to protect information during such transfers.",
    ],

    thirdParties: [
      "Our Services may include links to third-party websites or services. Their privacy practices are governed by their own policies. We are not responsible for the privacy practices of third parties.",
    ],

    changes: [
      "We may update this policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. When we make material changes, we will provide notice through the website or other appropriate means.",
      "The “Effective date” at the top indicates when the latest version takes effect.",
    ],
  },
};

function StatRow({ k, v }: { k: string; v: string }) {
  const tone =
    k.includes("Effective") ? "teal" : k.includes("Applies") ? "blue" : "amber";

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
    <div className={["flex items-center justify-between gap-4 rounded-2xl border px-4 py-3", t.ring, t.bg].join(" ")}>
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

function BulletList({ items, dot }: { items: string[]; dot: "teal" | "blue" | "amber" }) {
  const color =
    dot === "teal"
      ? "bg-[rgba(20,212,177,0.92)]"
      : dot === "blue"
      ? "bg-[rgba(27,89,167,0.88)]"
      : "bg-[rgba(245,158,11,0.92)]";

  return (
    <ul className="mt-4 space-y-2 text-sm font-semibold text-[rgba(11,30,58,0.62)]">
      {items.map((x) => (
        <li key={x} className="flex items-start gap-3">
          <span className={`mt-[7px] h-2 w-2 rounded-full ${color}`} aria-hidden />
          <span>{x}</span>
        </li>
      ))}
    </ul>
  );
}

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="zyposoft-quote">
      <div className="zyposoft-quote__bar" aria-hidden />
      <div className="zyposoft-quote__t">{title}</div>
      <div className="zyposoft-quote__s">{children}</div>
    </div>
  );
}

export default function PrivacyPage() {
  const nav = PRIVACY.nav as NavItem[];
  const [activeId, setActiveId] = useState<string>("overview");

  const bodyRef = useRef<HTMLDivElement | null>(null);

  const activeLabel = useMemo(
    () => nav.find((n) => n.id === activeId)?.label ?? "Overview",
    [activeId, nav]
  );

  useEffect(() => {
    // Keep UX tight: when user changes section, bring the content area into view.
    bodyRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [activeId]);

  const c = PRIVACY.content;

  const content = (() => {
    switch (activeId) {
      case "overview":
        return (
          <SectionCard title="Overview">
            {c.overview.map((p) => (
              <p key={p} className="mt-3">
                {p}
              </p>
            ))}
          </SectionCard>
        );

      case "info-we-collect":
        return (
          <SectionCard title="Information we collect">
            <p className="mt-3">{c.infoWeCollectIntro}</p>

            <div className="mt-4 grid gap-4">
              {c.infoWeCollectBlocks.map((b) => (
                <div
                  key={b.h}
                  className="rounded-2xl border border-[rgba(11,30,58,0.10)] bg-[rgba(255,255,255,0.70)] p-4"
                >
                  <div className="text-sm font-extrabold text-[rgba(11,30,58,0.82)]">{b.h}</div>
                  <BulletList items={b.bullets} dot="teal" />
                </div>
              ))}
            </div>

            <p className="mt-4">{c.infoWeCollectNote}</p>
          </SectionCard>
        );

      case "how-we-use":
        return (
          <SectionCard title="How we use information">
            <p className="mt-3">{c.howWeUseIntro}</p>
            <BulletList items={c.howWeUseBullets} dot="blue" />

            <div className="mt-5 rounded-2xl border border-[rgba(11,30,58,0.10)] bg-[rgba(255,255,255,0.70)] p-4">
              <div className="text-sm font-extrabold text-[rgba(11,30,58,0.82)]">
                {c.aiNoteTitle}
              </div>
              {c.aiNoteBody.map((p) => (
                <p key={p} className="mt-3 text-sm font-semibold text-[rgba(11,30,58,0.62)]">
                  {p}
                </p>
              ))}
            </div>
          </SectionCard>
        );

      case "sharing":
        return (
          <SectionCard title="Sharing and disclosure">
            <p className="mt-3">{c.sharingIntro}</p>
            <div className="mt-4 grid gap-4">
              {c.sharingBlocks.map((b) => (
                <div
                  key={b.h}
                  className="rounded-2xl border border-[rgba(11,30,58,0.10)] bg-[rgba(255,255,255,0.70)] p-4"
                >
                  <div className="text-sm font-extrabold text-[rgba(11,30,58,0.82)]">{b.h}</div>
                  <p className="mt-2 text-sm font-semibold text-[rgba(11,30,58,0.62)]">{b.p}</p>
                </div>
              ))}
            </div>
          </SectionCard>
        );

      case "cookies":
        return (
          <SectionCard title="Cookies and analytics">
            {c.cookies.map((p) => (
              <p key={p} className="mt-3">
                {p}
              </p>
            ))}
            <BulletList items={c.cookiesBullets} dot="amber" />
          </SectionCard>
        );

      case "security":
        return (
          <SectionCard title="Security">
            {c.security.map((p) => (
              // FIX: Remove the second 'key={p}' here
              <p key={p} className="mt-3">
                {p}
              </p>
            ))}
            <BulletList items={c.securityBullets} dot="teal" />
          </SectionCard>
        );

      case "retention":
        return (
          <SectionCard title="Retention">
            {c.retention.map((p) => (
              <p key={p} className="mt-3">
                {p}
              </p>
            ))}
          </SectionCard>
        );

      case "rights":
        return (
          <SectionCard title="Your rights">
            <p className="mt-3">{c.rightsIntro}</p>
            <BulletList items={c.rightsBullets} dot="blue" />
            <p className="mt-4">{c.rightsNote}</p>
          </SectionCard>
        );

      case "children":
        return (
          <SectionCard title="Children">
            {c.children.map((p) => (
              <p key={p} className="mt-3">
                {p}
              </p>
            ))}
          </SectionCard>
        );

      case "international":
        return (
          <SectionCard title="International transfers">
            {c.international.map((p) => (
              <p key={p} className="mt-3">
                {p}
              </p>
            ))}
          </SectionCard>
        );

      case "third-parties":
        return (
          <SectionCard title="Third-party links">
            {c.thirdParties.map((p) => (
              <p key={p} className="mt-3">
                {p}
              </p>
            ))}
          </SectionCard>
        );

      case "changes":
        return (
          <SectionCard title="Policy changes">
            {c.changes.map((p) => (
              <p key={p} className="mt-3">
                {p}
              </p>
            ))}
          </SectionCard>
        );

      case "contact":
        return (
          <SectionCard title="Contact">
            <p className="mt-3">
              If you have questions about this Privacy Policy or our data practices, please contact us.
            </p>

            <div className="mt-5 flex flex-wrap gap-6">
              <Link href="/contact" className="zyposoft-linkAccent">
                Go to Contact →
              </Link>
              <Link href="/" className="zyposoft-linkMuted">
                Back to Home
              </Link>
            </div>
          </SectionCard>
        );

      default:
        return null;
    }
  })();

  return (
    <main className="zyposoft-site text-[#0b1e3a]">
      {/* HERO */}
      <section className="zyposoft-section theme--teal relative">
        <div className="zyposoft-section__bg absolute inset-0 pointer-events-none" aria-hidden>
          <div className="zyposoft-section__mesh" />
          <div className="zyposoft-section__grid" />
          <div className="zyposoft-section__noise" />
          <div className="zyposoft-section__sweep" />
        </div>

        <div className="relative z-[1]">
          <div className="zyposoft-container">
            <div className="grid gap-10 md:grid-cols-12 md:items-start">
              <div className="md:col-span-7">
                <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(27,89,167,0.14)] bg-[rgba(27,89,167,0.06)] px-3 py-2">
                  <Eyebrow>{PRIVACY.hero.eyebrow}</Eyebrow>
                </div>

                <div className="mt-6 text-xs font-bold tracking-[0.22em] text-[rgba(11,30,58,0.55)]">
                  {PRIVACY.hero.strap}
                </div>

                <H2 className="mt-4">{PRIVACY.hero.headline}</H2>
                <P className="mt-5 max-w-2xl">{PRIVACY.hero.body}</P>

                <div className="mt-8 flex flex-wrap gap-6">
                  <Link href={PRIVACY.hero.ctas.primary.href} className="zyposoft-linkAccent">
                    {PRIVACY.hero.ctas.primary.label}
                  </Link>

                  <button
                    type="button"
                    className="zyposoft-linkMuted"
                    onClick={() => {
                      setActiveId("overview");
                      bodyRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
                    }}
                  >
                    {PRIVACY.hero.ctas.secondary.label}
                  </button>
                </div>
              </div>

              <div className="md:col-span-5">
                <div className="zyposoft-quote">
                  <div className="zyposoft-quote__bar" aria-hidden />
                  <div className="zyposoft-quote__k">{PRIVACY.meta.title}</div>
                  <div className="zyposoft-quote__t">Effective date: {PRIVACY.meta.effectiveDate}</div>
                  <div className="zyposoft-quote__s">{PRIVACY.meta.scopeNote}</div>
                </div>

                <div className="mt-8 grid gap-3">
                  {PRIVACY.hero.proof.map((x) => (
                    <StatRow key={x.k} k={x.k} v={x.v} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BODY (TAB CONTENT) */}
      <section className="zyposoft-section theme--amber relative">
        <div className="zyposoft-section__bg absolute inset-0 pointer-events-none" aria-hidden>
          <div className="zyposoft-section__mesh" />
          <div className="zyposoft-section__grid" />
          <div className="zyposoft-section__noise" />
          <div className="zyposoft-section__sweep" />
        </div>

        <div className="relative z-[1]">
          <div className="zyposoft-container">
            <div className="grid gap-10 md:grid-cols-[340px_minmax(0,1fr)] md:items-start">
              {/* LEFT MENU */}
              <aside className="md:self-start" ref={bodyRef}>
                <div className="rounded-2xl border border-[rgba(11,30,58,0.10)] bg-[rgba(255,255,255,0.70)] p-5 shadow-[0_18px_60px_rgba(11,30,58,0.06)]">
                  <div className="text-xs font-extrabold tracking-[0.22em] text-[rgba(11,30,58,0.45)]">
                    CONTENTS
                  </div>

                  {/* Mobile selector */}
                  <div className="mt-4 md:hidden">
                    <select
                      value={activeId}
                      onChange={(e) => setActiveId(e.target.value)}
                      className="w-full rounded-xl border border-[rgba(11,30,58,0.14)] bg-[rgba(255,255,255,0.85)] px-3 py-2 text-sm font-bold text-[rgba(11,30,58,0.74)] outline-none"
                    >
                      {nav.map((n) => (
                        <option key={n.id} value={n.id}>
                          {n.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Desktop list */}
                  <div className="mt-4 hidden md:grid md:gap-2">
                    {nav.map((n) => {
                      const active = n.id === activeId;
                      return (
                        <button
                          key={n.id}
                          type="button"
                          onClick={() => setActiveId(n.id)}
                          className={[
                            "text-left rounded-xl px-3 py-2 text-sm font-semibold transition",
                            active
                              ? "border border-[rgba(27,89,167,0.18)] bg-[rgba(27,89,167,0.08)] text-[rgba(11,30,58,0.82)]"
                              : "border border-transparent text-[rgba(11,30,58,0.68)] hover:border-[rgba(11,30,58,0.10)] hover:bg-[rgba(255,255,255,0.75)]",
                          ].join(" ")}
                        >
                          {n.label}
                        </button>
                      );
                    })}
                  </div>

                  <div className="mt-5 zyposoft-rule" />

                  <div className="mt-4 text-xs font-semibold text-[rgba(11,30,58,0.52)]">
                    Selected section:{" "}
                    <span className="font-extrabold text-[rgba(11,30,58,0.72)]">{activeLabel}</span>
                  </div>

                  <div className="mt-3">
                    <Link href="/contact" className="zyposoft-linkAccent">
                      Contact Us →
                    </Link>
                  </div>
                </div>
              </aside>

              {/* RIGHT CONTENT */}
              <div className="min-w-0">
                <div className="grid gap-6">
                  {content}

                  <div className="rounded-2xl border border-[rgba(11,30,58,0.10)] bg-[rgba(255,255,255,0.70)] p-5 shadow-[0_18px_60px_rgba(11,30,58,0.06)]">
                    <H3 className="text-[rgba(11,30,58,0.86)]">Disclaimer</H3>
                    <P className="mt-2">
                      This page is provided for informational purposes and may not address every
                      scenario. For contractual or regulatory requirements, we can provide tailored
                      documentation as part of an engagement.
                    </P>
                  </div>
                </div>
              </div>
              {/* /RIGHT */}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
