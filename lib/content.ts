export type NavItem = { label: string; href: string };
export type CTA = { label: string; href: string };
export type Stat = { label: string; value: string; note?: string };
export type CardItem = { title: string; blurb: string; href?: string };
export type Platform = { tag: string; title: string; blurb: string; bullets: string[]; image: string };
export type Testimonial = { quote: string; name: string; role: string; org: string };
export type Insight = { title: string; date: string; blurb: string; href: string };
export type FAQ = { q: string; a: string };

export const site = {
  company: "ZypoSoft",
  product: "ArogyaSara",
  domain: "https://zyposoft.com",
  accent: "teal",
  nav: [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/company" },
    { label: "Product", href: "/product" },
    { label: "Services", href: "/services" },
    { label: "Solutions", href: "/solutions" },
    // { label: "Contact", href: "/contact" }
  ] satisfies NavItem[],
  ctas: {
    primary: { label: "Contact Us", href: "/contact" },
    secondary: { label: "View Product Modules", href: "/product#modules" }
  } satisfies { primary: CTA; secondary: CTA },
  footer: {
    addressLabel: "Address",
    address: "ZypoSoft Technologies Pvt Ltd",
    addressLine: "#7, Nisarga Layout, Chikkalsandra, Bangalore-560061",
    emailLabel: "Contact",
    email: "contact@zyposoft.com",
    // NEW: Social links
    socialLabel: "Socials",
    socials: {
      linkedin: "https://www.linkedin.com/in/zyposofttech/",
      x: "https://x.com/ZyposoftTech"
    }
  }
};

export const home = {
  hero: {
    topLineSpaced: "B U I L D I N G  D I G I T A L  H E A L T H",
    headline: "Unlock statewide health outcomes through AI-powered platforms.",
    subhead:
      "ZypoSoft builds secure, scalable software for Indian State Governments and public hospitals—combining modern engineering with explainable AI for monitoring, operations, and care delivery.",
    ctas: [
      site.ctas.primary,
      { label: "Explore ArogyaSara", href: "/product" } satisfies CTA
    ],
    heroImage: "/images/hero-1.svg",
    heroImageAlt: "Premium product visual placeholder"
  },

  backedBy: {
    label: "Trusted by (placeholders)",
    logos: ["State Health Mission", "Public Hospitals", "Medical Colleges", "NHM Program", "District Admin", "Health Dept"]
  },

  intro: {
    kicker: "Introduction",
    titleSpaced: "T R A N S F O R M I N G   P U B L I C   H E A L T H   D E L I V E R Y",
    title: "Transform public health delivery with systems designed for scale and governance.",
    body:
      "We combine UX clarity, audit-ready architecture, and AI that explains itself—so officials and clinicians can act with confidence.",
    cta: { label: "Get to Know Us", href: "/company" } satisfies CTA,
    image: "/images/hero-2.svg",
    imageAlt: "Abstract health placeholder"
  },

  platforms: {
    kicker: "Our Technology",
    titleSpaced: "O U R  P L A T F O R M",
    title: "ArogyaSara modules designed for government execution.",
    body:
      "EHR, HMS, Telemedicine, analytics, and AI surveillance—delivered as a unified platform with strong security posture and operational support.",
    cta: { label: "Explore Modules", href: "/product#modules" } satisfies CTA,
    items: [
      {
        tag: "EHR",
        title: "Clinical-grade records",
        blurb: "Structured notes, orders, diagnostics, and longitudinal patient history.",
        bullets: ["OPD/IPD workflows", "eRx & diagnostics", "Discharge summaries", "Consent + access trails"],
        image: "/images/panel-1.svg"
      },
      {
        tag: "HMS",
        title: "Hospital operations",
        blurb: "Throughput, inventory, scheduling, billing, and administrative controls.",
        bullets: ["Registration & queues", "Bed/OT management", "Inventory & pharmacy", "Admin dashboards"],
        image: "/images/panel-2.svg"
      },
      {
        tag: "Telemedicine",
        title: "Access at scale",
        blurb: "Remote consultations, follow-ups, and citizen programs with continuity of care.",
        bullets: ["Video/voice workflows", "Follow-up programs", "Care reminders", "Provider onboarding"],
        image: "/images/panel-3.svg"
      },
      {
        tag: "AI Surveillance",
        title: "Explainable monitoring",
        blurb: "Hotspots, early warnings, and operational optimization—explained in plain language.",
        bullets: ["Hotspot detection", "Outbreak early warning", "Resource optimization", "Fraud/waste signals"],
        image: "/images/panel-4.svg"
      }
    ] satisfies Platform[]
  },
  featureTabs: {
    kicker: "Outcome Platform",
    titleSpaced: "L I V E  B E T T E R",
    title: "From facility signals to government action—without complexity.",
    body:
      "ArogyaSara turns routine operational and clinical data into explainable insights. Officials see what changed, why it matters, and what to do next.",
    items: [
      {
        n: "01",
        title: "Detect hotspots early",
        blurb:
          "Find unusual rises in symptoms/cases by geography and facility type—so response teams can intervene sooner.",
        image: "/images/panel-1.svg",
        alt: "Hotspot detection visual placeholder"
      },
      {
        n: "02",
        title: "Strengthen hospital operations",
        blurb:
          "Track throughput, bed utilization, queues, and stock risk—then prioritize actions for the highest-impact bottlenecks.",
        image: "/images/panel-2.svg",
        alt: "Hospital operations visual placeholder"
      },
      {
        n: "03",
        title: "Scale telemedicine programs",
        blurb:
          "Run consistent follow-up programs with reminders and care pathways—especially for chronic care and post-discharge continuity.",
        image: "/images/panel-3.svg",
        alt: "Telemedicine workflows visual placeholder"
      },
      {
        n: "04",
        title: "Improve accountability & audits",
        blurb:
          "Role-based workflows, audit trails, and anomaly signals that support governance and reduce waste (placeholders).",
        image: "/images/panel-4.svg",
        alt: "Governance and audit visual placeholder"
      }
    ]
  },
  outcomes: {
    stats: [
      { label: "Facilities supported", value: "100+", note: "placeholder" },
      { label: "Audit-ready events", value: "100%", note: "core design" },
      { label: "Role-based workflows", value: "50+", note: "configurable" },
      { label: "Time-to-pilot", value: "6–10 weeks", note: "placeholder" }
    ] satisfies Stat[]
  },

  compliance: {
    title: "Trust & compliance (placeholders)",
    items: [
      "DPDP Act readiness posture",
      "RBAC & segregation of duties",
      "Immutable audit logs",
      "Encryption at rest and in transit",
      "Data retention & policy controls",
      "Secure APIs and governance"
    ]
  },

  team: {
    titleSpaced: "O U R  T E A M",
    title: "Delivery partners for complex public systems.",
    body:
      "We align stakeholders, define phased rollouts, train users, and provide operational support—so programs remain sustainable after go-live.",
    cta: { label: "View Company", href: "/company" } satisfies CTA
  },

  testimonials: {
    titleSpaced: "T E S T I M O N I A L S",
    items: [
      {
        quote:
          "The platform approach makes statewide monitoring practical—clear workflows, governance-first design, and actionable dashboards.",
        name: "Placeholder Name",
        role: "Program Director",
        org: "State Health Mission"
      },
      {
        quote:
          "Audit trails and role controls are thoughtfully built-in, making operations more accountable and measurable.",
        name: "Placeholder Name",
        role: "Hospital Administrator",
        org: "Public Hospital"
      },
      {
        quote:
          "AI insights are presented in plain language, which makes decision-making faster for non-technical stakeholders.",
        name: "Placeholder Name",
        role: "Health Official",
        org: "District Administration"
      },
      {
        quote:
          "Telemedicine workflows are designed around real field constraints, not just features on paper.",
        name: "Placeholder Name",
        role: "Medical Officer",
        org: "Primary Care Network"
      }
    ] satisfies Testimonial[]
  },

  insights: {
    kicker: "Insights",
    titleSpaced: "R E C E N T  U P D A T E S",
    cta: { label: "View All", href: "#" } satisfies CTA,
    items: [
      { title: "Digitizing public hospitals: practical rollout phases", date: "03.04.2026", blurb: "A deployment playbook for large facilities.", href: "#" },
      { title: "Early warning systems for outbreaks: what actually works", date: "02.16.2026", blurb: "Signals, thresholds, and governance.", href: "#" }
    ] satisfies Insight[]
  },

  finalCta: {
    titleSpaced: "Accelerate your vision",
    title: "Start Scaling with ZypoSoft.",
    cta: site.ctas.primary,
    bg: "/images/cta-bg.svg"
  }
};

export const product = {
  hero: {
    titleSpaced: "A R O G Y A S A R A",
    title: "A unified platform for care delivery and government health monitoring.",
    body:
      "ArogyaSara combines EHR, HMS, Telemedicine, analytics, and AI surveillance—supporting clinical workflows and state-level decision-making."
  },
  howItWorks: {
    title: "How it works",
    steps: [
      { title: "Data", blurb: "Facility workflows, programs, and citizen touchpoints feed a governed data layer." },
      { title: "AI insights", blurb: "Models detect patterns and anomalies—explained in simple language with context." },
      { title: "Government action", blurb: "Dashboards and alerts support interventions, allocation, and measurement." }
    ]
  },
  ai: {
    title: "AI capabilities (simple language)",
    items: [
      { title: "Disease hotspot detection", blurb: "Highlights unusual increases in symptoms/cases by area so teams can respond faster." },
      { title: "Outbreak early warning", blurb: "Detects early patterns across facilities before they become obvious." },
      { title: "Resource optimization", blurb: "Suggests staffing/supply actions based on load and utilization trends." },
      { title: "Fraud & waste signals", blurb: "Flags anomalies in claims, prescriptions, or inventory movement to support audits." },
      { title: "Clinical decision support", blurb: "Guideline-based prompts with human control and traceability." }
    ]
  },
  modules: home.platforms.items,
  screenshots: [
    { src: "/images/panel-1.svg", alt: "Screenshot placeholder 1" },
    { src: "/images/panel-2.svg", alt: "Screenshot placeholder 2" },
    { src: "/images/panel-3.svg", alt: "Screenshot placeholder 3" },
    { src: "/images/panel-4.svg", alt: "Screenshot placeholder 4" }
  ],
  integrations: {
    title: "Integrations & API (placeholders)",
    items: ["ABDM-ready (placeholder)", "FHIR/HL7-style exchange (placeholder)", "Secure APIs for data lakes", "Facility and lab integrations"]
  },
  security: {
    title: "Security & governance (placeholders)",
    items: ["Least-privilege RBAC", "Tamper-evident audit logs", "TLS + encryption at rest", "Configurable retention", "Monitoring and incident readiness"]
  },
  faq: [
    { q: "Is ArogyaSara suitable for statewide rollout?", a: "Yes—designed for multi-facility deployments with centralized governance and configurable workflows (validate in implementation)." },
    { q: "Can it integrate with existing systems?", a: "Yes—via secure APIs and data mappings. The plan depends on your current stack and standards." },
    { q: "Does AI replace human decisions?", a: "No—AI provides signals and recommendations. Authorized officials/clinicians remain in control." }
  ] satisfies FAQ[]
};

export const services = {
  hero: { titleSpaced: "S E R V I C E S", title: "Engineering that delivers outcomes at scale.", body: "Full-stack delivery for public systems—platform build, integrations, security, and operations." },
  offerings: [
    { title: "Custom software development", blurb: "Web/mobile platforms and resilient backends for public programs." },
    { title: "AI/ML engineering", blurb: "Explainable models, anomaly detection, and decision support." },
    { title: "Data platforms", blurb: "Pipelines, governance, quality controls, analytics." },
    { title: "Cloud & DevOps", blurb: "CI/CD, observability, HA, scaling, DR planning." },
    { title: "Cybersecurity", blurb: "Threat modeling, hardening, audit readiness." },
    { title: "Managed support", blurb: "Monitoring, SLAs, incident response, upgrades." }
  ] satisfies CardItem[],
  models: [
    { title: "Fixed bid", blurb: "Defined scope, milestones, and acceptance criteria." },
    { title: "Dedicated team", blurb: "A stable squad embedded with your program." },
    { title: "Tender support", blurb: "Documentation, compliance mapping, implementation planning." }
  ] satisfies CardItem[],
  caseStudies: [
    { title: "District hospital digitization", blurb: "OPD/IPD workflows + audit-ready access controls (placeholder)." },
    { title: "Telemedicine rollout", blurb: "Provider onboarding + follow-up programs across facilities (placeholder)." },
    { title: "State monitoring dashboards", blurb: "Governed analytics with actionable KPIs (placeholder)." }
  ] satisfies CardItem[]
};

export const solutions = {
  hero: { titleSpaced: "S O L U T I O N S", title: "Blueprinted systems for public health execution.", body: "Workflow-driven solutions aligned to how government programs operate in reality." },
  items: [
    { title: "Government health monitoring", blurb: "Hotspots, KPIs, interventions, cross-facility visibility." },
    { title: "Public hospital digitization", blurb: "EHR + operations with measurable throughput improvements." },
    { title: "Disease surveillance", blurb: "Early warnings and cluster detection with explainable signals." },
    { title: "Telemedicine rollout", blurb: "Remote consults, continuity of care, citizen follow-ups." },
    { title: "Insurance/claims (optional)", blurb: "Anomaly detection and audit support (placeholder)." }
  ] satisfies CardItem[]
};

export const company = {
  hero: { titleSpaced: "C O M P A N Y", title: "Built for public impact.", body: "We focus on secure engineering, usable workflows, and AI that supports accountable governance." },
  mission: "Enable better health outcomes through reliable, secure, and human-centered digital systems—built for government scale.",
  values: [
    { title: "Outcome-first", blurb: "Measurable improvements over vanity metrics." },
    { title: "Security by design", blurb: "Governance, privacy, and auditability are foundational." },
    { title: "Clarity", blurb: "Simple explanations for complex systems." },
    { title: "Operational empathy", blurb: "Workflows shaped around hospital realities." }
  ] satisfies CardItem[],
  leadership: [
    { title: "Placeholder Leader", blurb: "Founder / CEO • Public-sector engineering leadership." },
    { title: "Placeholder Leader", blurb: "Head of Product • Clinical workflows and rollout scale." },
    { title: "Placeholder Leader", blurb: "Head of Security • Governance, risk controls, audit readiness." }
  ] satisfies CardItem[]
};

export const contact = {
  hero: { titleSpaced: "C O N T A C T", title: "Request a Government Demo", body: "Share your scope and context. We’ll respond with a structured demo and rollout approach." },
  form: {
    fields: [
      { name: "name", label: "Full name", type: "text", required: true },
      { name: "email", label: "Official email", type: "email", required: true },
      { name: "phone", label: "Phone (optional)", type: "tel", required: false },
      { name: "department", label: "Department", type: "text", required: true },
      { name: "state", label: "State / UT", type: "text", required: true },
      { name: "org", label: "Organization", type: "text", required: true },
      { name: "scope", label: "Project scope (brief)", type: "text", required: true },
      { name: "message", label: "Additional details (optional)", type: "textarea", required: false }
    ] as const
  },
  calendly: { label: "Calendly (placeholder)", href: "#" } satisfies CTA
};
