import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type ContactPayload = {
  name: string;
  email: string;
  message: string;
  company?: string;
  phone?: string;
  // Optional honeypot field (should stay empty)
  website?: string;
};

function isValidEmail(email: string) {
  // Simple, safe check
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Very small in-memory rate limit (best-effort).
// If you deploy serverless, this can reset between invocations.
// Still useful to cut spam bursts.
const bucket = new Map<string, { count: number; ts: number }>();
function rateLimit(key: string, limit = 6, windowMs = 60_000) {
  const now = Date.now();
  const cur = bucket.get(key);
  if (!cur || now - cur.ts > windowMs) {
    bucket.set(key, { count: 1, ts: now });
    return { ok: true };
  }
  if (cur.count >= limit) return { ok: false };
  cur.count += 1;
  bucket.set(key, cur);
  return { ok: true };
}

export async function POST(req: Request) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";

    const rl = rateLimit(ip, 6, 60_000);
    if (!rl.ok) {
      return NextResponse.json(
        { ok: false, error: "Too many requests. Please try again shortly." },
        { status: 429 }
      );
    }

    const body = (await req.json()) as Partial<ContactPayload>;

    // Honeypot: if filled, treat as bot
    if (body.website && body.website.trim().length > 0) {
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim();
    const message = String(body.message || "").trim();
    const company = String(body.company || "").trim();
    const phone = String(body.phone || "").trim();

    if (!name || !email || !message) {
      return NextResponse.json(
        { ok: false, error: "Name, email, and message are required." },
        { status: 400 }
      );
    }
    if (!isValidEmail(email)) {
      return NextResponse.json(
        { ok: false, error: "Please enter a valid email address." },
        { status: 400 }
      );
    }
    if (message.length < 10) {
      return NextResponse.json(
        { ok: false, error: "Message is too short." },
        { status: 400 }
      );
    }

    const host = process.env.ZOHO_SMTP_HOST || "smtppro.zoho.com";
    const port = Number(process.env.ZOHO_SMTP_PORT || 465);
    const secure = String(process.env.ZOHO_SMTP_SECURE || "true") === "true";

    const user = process.env.ZOHO_SMTP_USER;
    const pass = process.env.ZOHO_SMTP_PASS;

    const to = process.env.MAIL_TO || user;
    const fromName = process.env.MAIL_FROM_NAME || "Website Contact";

    if (!user || !pass || !to) {
      return NextResponse.json(
        { ok: false, error: "Email service is not configured on the server." },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure, // true for 465, false for 587
      auth: { user, pass },
    });

    const subject = `New enquiry from ${name} ZypoSoft`;
    const text = [
      `New contact form submission`,
      ``,
      `Name: ${name}`,
      `Email: ${email}`,
      company ? `Company: ${company}` : null,
      phone ? `Phone: ${phone}` : null,
      ``,
      `Message:`,
      message,
      ``,
      `IP: ${ip}`,
    ]
      .filter(Boolean)
      .join("\n");

    const html = `
      <div style="font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial; line-height:1.5">
        <h2 style="margin:0 0 12px">New contact form submission</h2>
        <table style="border-collapse:collapse">
          <tr><td style="padding:4px 10px 4px 0;color:#555">Name</td><td style="padding:4px 0">${escapeHtml(
            name
          )}</td></tr>
          <tr><td style="padding:4px 10px 4px 0;color:#555">Email</td><td style="padding:4px 0">${escapeHtml(
            email
          )}</td></tr>
          ${
            company
              ? `<tr><td style="padding:4px 10px 4px 0;color:#555">Company</td><td style="padding:4px 0">${escapeHtml(
                  company
                )}</td></tr>`
              : ""
          }
          ${
            phone
              ? `<tr><td style="padding:4px 10px 4px 0;color:#555">Phone</td><td style="padding:4px 0">${escapeHtml(
                  phone
                )}</td></tr>`
              : ""
          }
        </table>
        <div style="margin-top:14px;padding:12px;border:1px solid #e5e7eb;border-radius:10px;background:#fafafa">
          <div style="color:#555;font-size:12px;margin-bottom:6px">Message</div>
          <div>${escapeHtml(message).replace(/\n/g, "<br/>")}</div>
        </div>
        <div style="margin-top:14px;color:#777;font-size:12px">IP: ${escapeHtml(
          ip
        )}</div>
      </div>
    `;

    // IMPORTANT:
    // - from must be your Zoho mailbox to pass SPF/DKIM
    // - replyTo lets you reply directly to the visitor
    await transporter.sendMail({
      from: `"${fromName}" <${user}>`,
      to,
      subject,
      text,
      html,
      replyTo: email,
    });

    // Optional: send acknowledgement to visitor (uncomment if you want)
    // await transporter.sendMail({
    //   from: `"${fromName}" <${user}>`,
    //   to: email,
    //   subject: "We received your message — ZypoSoft",
    //   text: `Hi ${name},\n\nThanks for contacting ZypoSoft. We received your message and will respond shortly.\n\n— ZypoSoft`,
    // });

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err: any) {
    console.error("CONTACT_ROUTE_ERROR", err);
    return NextResponse.json(
      { ok: false, error: "Failed to send message. Please try again later." },
      { status: 500 }
    );
  }
}

function escapeHtml(s: string) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
