"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { Eyebrow, H2, H3, P } from "@/components/ui/Typography";

type NavItem = { id: string; label: string };

const TERMS = {
  meta: {
    title: "Terms of Service",
    effectiveDate: "26 December 2025",
    scopeNote:
      "These Terms govern your access to and use of our website, products, services, solutions, and related communications (collectively, the “Services”).",
  },

  hero: {
    eyebrow: "Terms",
    strap: "USAGE • RESPONSIBILITIES • LIMITATIONS",
    headline: (
      <>
        <span className="studio-gradient-text font-black">Terms</span> of
        Service.
      </>
    ),
    body:
      "These Terms explain the rules for using our Services and outline rights, responsibilities, and limitations. If you have questions, contact us before using the Services.",
    ctas: {
      primary: { label: "Contact", href: "/contact" },
      secondary: { label: "Read terms", action: "focusTerms" as const },
    },
    proof: [
      { k: "Effective", v: "26 Dec 2025" },
      { k: "Applies to", v: "Website + Services" },
      { k: "Updates", v: "Notified when material" },
    ],
  },

  nav: [
    { id: "overview", label: "Overview" },
    { id: "eligibility", label: "Eligibility" },
    { id: "accounts", label: "Accounts" },
    { id: "acceptable-use", label: "Acceptable use" },
    { id: "services", label: "Services and deliverables" },
    { id: "fees", label: "Trials, subscriptions, fees" },
    { id: "ip", label: "Intellectual property" },
    { id: "customer-data", label: "Customer data" },
    { id: "ai", label: "AI features" },
    { id: "confidentiality", label: "Confidentiality" },
    { id: "third-parties", label: "Third-party services" },
    { id: "warranties", label: "Disclaimers" },
    { id: "liability", label: "Limitation of liability" },
    { id: "indemnity", label: "Indemnification" },
    { id: "termination", label: "Termination" },
    { id: "changes", label: "Changes to terms" },
    { id: "law", label: "Governing law" },
    { id: "contact", label: "Contact" },
  ] satisfies NavItem[],

  content: {
    overview: [
      "By accessing or using the Services, you agree to these Terms. If you do not agree, you must not use the Services.",
      "If you are using the Services on behalf of an organization, you represent that you are authorized to bind that organization to these Terms, and “you” refers to that organization.",
      "Certain features may be subject to additional terms (for example, a Statement of Work, order form, or support policy). If there is a conflict, the signed commercial agreement will control for the relevant scope.",
    ],

    eligibility: [
      "You must be legally capable of entering into a contract to use the Services.",
      "You must comply with applicable laws, regulations, and third-party rights when using the Services.",
    ],

    accounts: [
      "If the Services require an account, you are responsible for maintaining the confidentiality of credentials and for activities conducted under your account.",
      "You must provide accurate information and promptly update it if it changes.",
      "We may suspend or terminate access if we reasonably believe your account has been compromised or used in violation of these Terms.",
    ],

    acceptableUseIntro:
      "You agree not to misuse the Services. Misuse includes, but is not limited to:",
    acceptableUseBullets: [
      "Attempting to gain unauthorized access to systems, networks, or data.",
      "Uploading or transmitting malware, harmful code, or destructive content.",
      "Interfering with, disrupting, or degrading the integrity or performance of the Services.",
      "Using the Services to violate privacy rights, intellectual property rights, or other legal rights.",
      "Reverse engineering, decompiling, or attempting to extract source code except where permitted by law.",
      "Using the Services for unlawful, deceptive, or harmful purposes.",
    ],

    services: [
      "We provide software development, product engineering, AI enablement, and related services. Specific deliverables, timelines, and acceptance criteria may be defined in a separate written agreement (e.g., Statement of Work).",
      "We may modify, improve, or discontinue parts of the Services. We will use reasonable efforts to communicate material changes where appropriate.",
    ],

    fees: [
      "If fees apply, pricing and payment terms will be described in an order form, invoice, or written agreement.",
      "If you receive a trial, it may be limited in duration and functionality and may end automatically unless converted to a paid engagement.",
      "Unless otherwise stated, fees are non-refundable except as required by law or explicitly agreed in writing.",
    ],

    ipIntro:
      "The Services and related materials are protected by intellectual property laws.",
    ipBlocks: [
      {
        h: "Our IP",
        p: "We retain all rights, title, and interest in our pre-existing materials, frameworks, templates, libraries, and general know-how used to deliver the Services.",
      },
      {
        h: "Customer IP",
        p: "You retain all rights in your pre-existing materials and content you provide to us. You grant us a limited license to use such materials solely to deliver the Services.",
      },
      {
        h: "Deliverables",
        p: "Ownership of project-specific deliverables will be governed by the applicable written agreement. If no agreement exists, deliverables are provided for your internal use, and we retain rights in underlying components and general methods.",
      },
    ],

    customerData: [
      "“Customer Data” means data you submit or make available to the Services. You are responsible for obtaining all necessary rights and permissions to provide Customer Data.",
      "We will process Customer Data in accordance with our Privacy Policy and any applicable data processing agreement or contract.",
    ],

    aiTitle: "AI features and output",
    aiBody: [
      "If the Services include AI functionality (such as copilots, automation, or document intelligence), outputs are generated based on input data and model behavior and may not always be accurate or complete.",
      "You are responsible for reviewing and validating outputs before relying on them, especially for high-impact decisions.",
      "Where applicable, we may provide evaluation, monitoring, and human-in-the-loop controls, but these do not eliminate the need for customer oversight.",
    ],

    confidentiality: [
      "If we exchange confidential information, both parties must protect it using reasonable care and use it only for the purpose of the engagement.",
      "Confidential information does not include information that is publicly available, independently developed without reference to the other party’s confidential information, or rightfully obtained from a third party without restriction.",
      "If required by law, a party may disclose confidential information to the extent legally required, provided it gives notice when permitted.",
    ],

    thirdParties: [
      "The Services may integrate with third-party tools or platforms. Your use of third-party services is governed by their terms and policies.",
      "We are not responsible for third-party services, outages, or data handling practices outside our control.",
    ],

    warranties: [
      "The Services are provided on an “as is” and “as available” basis unless otherwise stated in a written agreement.",
      "We disclaim all warranties, whether express, implied, or statutory, including implied warranties of merchantability, fitness for a particular purpose, and non-infringement, to the maximum extent permitted by law.",
    ],

    liability: [
      "To the maximum extent permitted by law, we will not be liable for indirect, incidental, special, consequential, or punitive damages, or any loss of profits, revenue, data, or goodwill.",
      "To the maximum extent permitted by law, our total liability for claims relating to the Services will not exceed the amount paid by you to us for the Services in the three (3) months preceding the event giving rise to the claim, unless a written agreement states otherwise.",
    ],

    indemnity: [
      "You agree to indemnify and hold us harmless from claims arising out of your misuse of the Services, your violation of these Terms, or your violation of applicable law or third-party rights.",
      "We will promptly notify you of any such claim and reasonably cooperate at your expense.",
    ],

    termination: [
      "We may suspend or terminate your access to the Services if you materially breach these Terms or if required for security, legal, or operational reasons.",
      "You may stop using the Services at any time. If a written agreement exists, termination rights will be governed by that agreement.",
      "Upon termination, sections that by their nature should survive will survive, including IP, disclaimers, limitation of liability, and indemnity.",
    ],

    changes: [
      "We may update these Terms from time to time. When we make material changes, we will provide notice through the website or other appropriate means.",
      "The “Effective date” indicates when the latest version takes effect.",
    ],

    law: [
      "These Terms are governed by the laws applicable in the jurisdiction where our principal place of business is located, unless a written agreement states otherwise.",
      "Any disputes will be resolved in the courts of competent jurisdiction as determined by applicable law and any relevant written agreement.",
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

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="mt-4 space-y-2 text-sm font-semibold text-[rgba(11,30,58,0.62)]">
      {items.map((x) => (
        <li key={x} className="flex items-start gap-3">
          <span className="mt-[7px] h-2 w-2 rounded-full bg-[rgba(27,89,167,0.88)]" aria-hidden />
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

export default function TermsPage() {
  const nav = TERMS.nav as NavItem[];
  const [activeId, setActiveId] = useState<string>("overview");

  const bodyRef = useRef<HTMLDivElement | null>(null);

  const activeLabel = useMemo(
    () => nav.find((n) => n.id === activeId)?.label ?? "Overview",
    [activeId, nav]
  );

  useEffect(() => {
    bodyRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [activeId]);

  const c = TERMS.content;

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

      case "eligibility":
        return (
          <SectionCard title="Eligibility">
            {c.eligibility.map((p) => (
              <p key={p} className="mt-3">
                {p}
              </p>
            ))}
          </SectionCard>
        );

      case "accounts":
        return (
          <SectionCard title="Accounts">
            {c.accounts.map((p) => (
              <p key={p} className="mt-3">
                {p}
              </p>
            ))}
          </SectionCard>
        );

      case "acceptable-use":
        return (
          <SectionCard title="Acceptable use">
            <p className="mt-3">{c.acceptableUseIntro}</p>
            <BulletList items={c.acceptableUseBullets} />
          </SectionCard>
        );

      case "services":
        return (
          <SectionCard title="Services and deliverables">
            {c.services.map((p) => (
              <p key={p} className="mt-3">
                {p}
              </p>
            ))}
          </SectionCard>
        );

      case "fees":
        return (
          <SectionCard title="Trials, subscriptions, fees">
            {c.fees.map((p) => (
              <p key={p} className="mt-3">
                {p}
              </p>
            ))}
          </SectionCard>
        );

      case "ip":
        return (
          <SectionCard title="Intellectual property">
            <p className="mt-3">{c.ipIntro}</p>
            <div className="mt-4 grid gap-4">
              {c.ipBlocks.map((b) => (
                <div
                  key={b.h}
                  className="rounded-2xl border border-[rgba(11,30,58,0.10)] bg-[rgba(255,255,255,0.70)] p-4"
                >
                  <div className="text-sm font-extrabold text-[rgba(11,30,58,0.82)]">
                    {b.h}
                  </div>
                  <p className="mt-2 text-sm font-semibold text-[rgba(11,30,58,0.62)]">
                    {b.p}
                  </p>
                </div>
              ))}
            </div>
          </SectionCard>
        );

      case "customer-data":
        return (
          <SectionCard title="Customer data">
            {c.customerData.map((p) => (
              <p key={p} className="mt-3">
                {p}
              </p>
            ))}
          </SectionCard>
        );

      case "ai":
        return (
          <SectionCard title={c.aiTitle}>
            {c.aiBody.map((p) => (
              <p key={p} className="mt-3">
                {p}
              </p>
            ))}
          </SectionCard>
        );

      case "confidentiality":
        return (
          <SectionCard title="Confidentiality">
            {c.confidentiality.map((p) => (
              <p key={p} className="mt-3">
                {p}
              </p>
            ))}
          </SectionCard>
        );

      case "third-parties":
        return (
          <SectionCard title="Third-party services">
            {c.thirdParties.map((p) => (
              <p key={p} className="mt-3">
                {p}
              </p>
            ))}
          </SectionCard>
        );

      case "warranties":
        return (
          <SectionCard title="Disclaimers">
            {c.warranties.map((p) => (
              <p key={p} className="mt-3">
                {p}
              </p>
            ))}
          </SectionCard>
        );

      case "liability":
        return (
          <SectionCard title="Limitation of liability">
            {c.liability.map((p) => (
              <p key={p} className="mt-3">
                {p}
              </p>
            ))}
          </SectionCard>
        );

      case "indemnity":
        return (
          <SectionCard title="Indemnification">
            {c.indemnity.map((p) => (
              <p key={p} className="mt-3">
                {p}
              </p>
            ))}
          </SectionCard>
        );

      case "termination":
        return (
          <SectionCard title="Termination">
            {c.termination.map((p) => (
              <p key={p} className="mt-3">
                {p}
              </p>
            ))}
          </SectionCard>
        );

      case "changes":
        return (
          <SectionCard title="Changes to terms">
            {c.changes.map((p) => (
              <p key={p} className="mt-3">
                {p}
              </p>
            ))}
          </SectionCard>
        );

      case "law":
        return (
          <SectionCard title="Governing law">
            {c.law.map((p) => (
              <p key={p} className="mt-3">
                {p}
              </p>
            ))}
          </SectionCard>
        );

      case "contact":
        return (
          <SectionCard title="Contact">
            <p className="mt-3">If you have questions about these Terms, please contact us.</p>
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
                  <Eyebrow>{TERMS.hero.eyebrow}</Eyebrow>
                </div>

                <div className="mt-6 text-xs font-bold tracking-[0.22em] text-[rgba(11,30,58,0.55)]">
                  {TERMS.hero.strap}
                </div>

                <H2 className="mt-4">{TERMS.hero.headline}</H2>
                <P className="mt-5 max-w-2xl">{TERMS.hero.body}</P>

                <div className="mt-8 flex flex-wrap gap-6">
                  <Link href={TERMS.hero.ctas.primary.href} className="zyposoft-linkAccent">
                    {TERMS.hero.ctas.primary.label}
                  </Link>
                  <button
                    type="button"
                    className="zyposoft-linkMuted"
                    onClick={() => {
                      setActiveId("overview");
                      bodyRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
                    }}
                  >
                    {TERMS.hero.ctas.secondary.label}
                  </button>
                </div>
              </div>

              <div className="md:col-span-5">
                <div className="zyposoft-quote">
                  <div className="zyposoft-quote__bar" aria-hidden />
                  <div className="zyposoft-quote__k">{TERMS.meta.title}</div>
                  <div className="zyposoft-quote__t">Effective date: {TERMS.meta.effectiveDate}</div>
                  <div className="zyposoft-quote__s">{TERMS.meta.scopeNote}</div>
                </div>

                <div className="mt-8 grid gap-3">
                  {TERMS.hero.proof.map((x) => (
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
