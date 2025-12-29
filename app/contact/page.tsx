"use client";

import { useState } from "react";
import Link from "next/link";

import { contact, site } from "@/lib/content";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/site/Reveal";
import { Card, CardBody } from "@/components/ui/Card";
import { Eyebrow, H2, H3, P } from "@/components/ui/Typography";
import Button from "@/components/ui/Button";

type Field = (typeof contact.form.fields)[number];

function FieldLabel({
  htmlFor,
  label,
  required,
}: {
  htmlFor: string;
  label: string;
  required?: boolean;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="flex items-baseline justify-between gap-3 text-sm font-semibold text-[rgba(11,30,58,0.72)]"
    >
      <span>
        {label}{" "}
        {required ? (
          <span className="font-extrabold text-[rgba(var(--accent),0.95)]">*</span>
        ) : null}
      </span>
      {required ? (
        <span className="text-[11px] font-extrabold tracking-[0.16em] text-[rgba(11,30,58,0.38)]">
          REQUIRED
        </span>
      ) : (
        <span className="text-[11px] font-extrabold tracking-[0.16em] text-[rgba(11,30,58,0.28)]">
          OPTIONAL
        </span>
      )}
    </label>
  );
}

function baseInputClass() {
  return [
    "w-full",
    "rounded-xl",
    "border",
    "border-[rgba(11,30,58,0.14)]",
    "bg-[rgba(255,255,255,0.75)]",
    "px-4",
    "text-sm",
    "font-semibold",
    "text-[rgba(11,30,58,0.78)]",
    "placeholder:text-[rgba(11,30,58,0.35)]",
    "outline-none",
    "transition",
    "focus:border-[rgba(var(--accent),0.55)]",
    "focus:ring-4",
    "focus:ring-[rgba(var(--accent),0.12)]",
  ].join(" ");
}
function StatRow({ k, v }: { k: string; v: string }) {
  const tone =
    k.includes("Response") ? "teal" : k.includes("Privacy") ? "blue" : "amber";

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

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState<string>("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError("");

    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload: Record<string, string> = {};
    fd.forEach((v, k) => (payload[k] = String(v)));

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j?.error || "Request failed");
      }

      setStatus("sent");
      form.reset();
    } catch (err: any) {
      setStatus("error");
      setError(err?.message || "Something went wrong");
    }
  }

  return (
    <>
      {/* HERO (match other pages) */}
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
              {/* LEFT */}
              <div className="md:col-span-7">
                <Reveal>
                  <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(27,89,167,0.14)] bg-[rgba(27,89,167,0.06)] px-3 py-2">
                    <Eyebrow>Contact</Eyebrow>
                  </div>

                  <div className="mt-6 text-xs font-bold tracking-[0.22em] text-[rgba(11,30,58,0.55)]">
                    START A CONVERSATION • SHARE CONTEXT • GET A PRACTICAL PLAN
                  </div>

                  <H2 className="mt-4">
                    <span className="studio-gradient-text font-black">Contact</span>{" "}
                    us to discuss scope, timelines, and delivery.
                  </H2>

                  <P className="mt-5 max-w-2xl">
                    Tell us what you’re building and what “success” looks like. We’ll respond with a clear
                    approach, suitable engagement model, and next steps.
                  </P>
                </Reveal>
              </div>

              {/* RIGHT */}
              <div className="md:col-span-5">
                <Reveal>
                  <div className="zyposoft-quote">
                    <div className="zyposoft-quote__bar" aria-hidden />
                    <div className="zyposoft-quote__k">What happens next</div>
                    <div className="zyposoft-quote__t">
                      We clarify requirements and propose a delivery plan.
                    </div>
                    <div className="zyposoft-quote__s">
                      You’ll get a structured response: scope options, timeline ranges, dependencies,
                      and the best-fit engagement model.
                    </div>
                  </div>

                  <div className="mt-8 grid gap-3">
                    <StatRow k="Response" v="1 business day" />
                    <StatRow k="Privacy" v="Context stays confidential" />
                    <StatRow k="Next step" v="Plan + milestones" />
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* CONTENT */}
      <Section>
        <div className="grid gap-6 md:grid-cols-12">
          {/* FORM */}
          <div className="md:col-span-7">
            <Card>
              <CardBody className="relative overflow-hidden">
                {/* subtle premium wash */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-100"
                  style={{
                    background:
                      "radial-gradient(520px 260px at 12% 10%, rgba(20,212,177,0.12), transparent 62%)," +
                      "radial-gradient(520px 260px at 90% 80%, rgba(27,89,167,0.10), transparent 64%)",
                  }}
                  aria-hidden
                />

                <div className="relative">
                  <div className="flex items-start justify-between gap-6">
                    <div>
                      <div className="text-xs font-extrabold tracking-[0.22em] text-[rgba(11,30,58,0.45)]">
                        CONTACT
                      </div>
                      <H3 className="mt-2 text-[rgba(11,30,58,0.88)]">
                        Send us a message
                      </H3>
                      <P className="mt-2 max-w-xl text-sm">
                        Share a short overview. We’ll respond with next steps, timeline, and the most
                        suitable engagement model.
                      </P>
                    </div>
                  </div>

                  <div className="mt-6 h-px w-full bg-[rgba(11,30,58,0.10)]" />

                  <form
                    onSubmit={onSubmit}
                    className="mt-6 grid gap-5 sm:grid-cols-2"
                    aria-label="Contact form"
                  >
                    {contact.form.fields.map((f: Field) => {
                      const isTextArea = f.type === "textarea";
                      // Create a safe reference to the field allowing loose access
                      const fieldData = f as any;

                      return (
                        <div
                          key={f.name}
                          className={["grid gap-2", isTextArea ? "sm:col-span-2" : ""].join(" ")}
                        >
                          <FieldLabel htmlFor={f.name} label={f.label} required={f.required} />

                          {isTextArea ? (
                            <textarea
                              id={f.name}
                              name={f.name}
                              required={f.required}
                              rows={6}
                              className={[baseInputClass(), "py-3"].join(" ")}
                              // FIX: Use fieldData or cast (f as any)
                              placeholder={fieldData.placeholder ?? "Type your message…"}
                            />
                          ) : (
                            <input
                              id={f.name}
                              name={f.name}
                              type={f.type}
                              required={f.required}
                              className={[baseInputClass(), "h-11"].join(" ")}
                              // FIX: Use fieldData or cast (f as any)
                              placeholder={fieldData.placeholder ?? ""}
                            />
                          )}
                        </div>
                      );
                    })}

                    {/* ACTIONS */}
                    <div className="sm:col-span-2">
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                          <Button
                            type="submit"
                            size="lg"
                            ariaLabel="Submit request"
                            className="zyposoft-navBtn w-full justify-center"
                          >
                            {status === "sending" ? "Sending..." : "Submit"}
                          </Button>
                        </div>
                        <div className="text-xs font-semibold text-[rgba(11,30,58,0.48)]">
                          Typically replies within 1 business day.
                        </div>
                      </div>

                      {/* STATUS */}
                      {status === "sent" ? (
                        <div className="mt-4 rounded-xl border border-[rgba(20,212,177,0.22)] bg-[rgba(20,212,177,0.10)] px-4 py-3 text-sm font-semibold text-[rgba(11,30,58,0.72)]">
                          Thank you. We’ll get back to you shortly.
                        </div>
                      ) : null}

                      {status === "error" ? (
                        <div className="mt-4 rounded-xl border border-[rgba(239,68,68,0.22)] bg-[rgba(239,68,68,0.08)] px-4 py-3 text-sm font-semibold text-[rgba(120,20,20,0.92)]">
                          Error: {error}
                        </div>
                      ) : null}
                    </div>

                    {/* Mobile calendly quick link */}
                    <div className="sm:col-span-2 sm:hidden">
                      <Button href={contact.calendly.href} variant="secondary" className="w-full">
                        {contact.calendly.label}
                      </Button>
                    </div>
                  </form>
                </div>
              </CardBody>
            </Card>
          </div>

          {/* RIGHT RAIL */}
          <div className="md:col-span-5 space-y-4">
            <Card>
              <CardBody className="space-y-3">
                <div className="text-xs font-extrabold tracking-[0.22em] text-[rgba(11,30,58,0.45)]">
                  QUICK CONTACT
                </div>
                <P className="text-sm">
                  Prefer email? Reach us directly and include a short overview plus timeline.
                </P>
                <div className="rounded-xl border border-[rgba(11,30,58,0.10)] bg-[rgba(255,255,255,0.70)] px-4 py-3 text-sm font-bold text-[rgba(11,30,58,0.72)]">
                  {site.footer.email}
                </div>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="space-y-3">
                <div className="text-xs font-extrabold tracking-[0.22em] text-[rgba(11,30,58,0.45)]">
                  WHAT TO SHARE
                </div>
                <ul className="space-y-2 text-sm font-semibold text-[rgba(11,30,58,0.62)]">
                  <li className="flex items-start gap-3">
                    <span className="mt-[7px] h-2 w-2 rounded-full bg-[rgba(20,212,177,0.92)]" aria-hidden />
                    <span>Your product or project overview</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-[7px] h-2 w-2 rounded-full bg-[rgba(27,89,167,0.88)]" aria-hidden />
                    <span>Timeline and delivery expectations</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-[7px] h-2 w-2 rounded-full bg-[rgba(245,158,11,0.92)]" aria-hidden />
                    <span>Any compliance/security constraints</span>
                  </li>
                </ul>
              </CardBody>
            </Card>
          </div>
        </div>
      </Section>
    </>
  );
}
