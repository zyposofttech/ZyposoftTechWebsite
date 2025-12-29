import Link from "next/link";
import Container from "@/components/ui/Container";
import { site } from "@/lib/content";
import { Logo } from "@/components/site/Logo";

function IconLinkedin({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z" />
    </svg>
  );
}

function IconX({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M13.6823 10.6218L20.2391 3H18.6854L12.9921 9.61788L8.44486 3H3.2002L10.0765 13.0074L3.2002 21H4.75404L10.7663 14.0113L15.5685 21H20.8131L13.6819 10.6218H13.6823ZM11.5541 13.0956L10.8574 12.0991L5.31391 4.16971H7.70053L12.1742 10.5689L12.8709 11.5655L18.6861 19.8835H16.2995L11.5541 13.096V13.0956Z" />
    </svg>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="zyposoft-footer" aria-label="Site footer">
      <div className="zyposoft-footer__bg" aria-hidden>
        <div className="zyposoft-footer__mesh" />
        <div className="zyposoft-footer__grid" />
        <div className="zyposoft-footer__noise" />
        <div className="zyposoft-footer__halo" />
      </div>

      <div className="zyposoft-footer__rule" aria-hidden />

      <Container className="relative z-[1] py-14">
        <div className="grid gap-10 md:grid-cols-12">
          {/* Brand */}
          <div className="md:col-span-4 space-y-4">
            <Link href="/" className="inline-flex items-center gap-2">
              <Logo />
            </Link>

            <div className="text-xs text-spaced text-[rgba(167, 55, 27, 0.77)] sm:font-bold mt-[3px]"style={{ marginTop: '3px' }}>
              Innovation • Intelligence • Impact
            </div>

            <p className="text-sm leading-relaxed text-[rgba(11,30,58,0.66)] max-w-sm"style={{ marginTop: '10px' }}>
              ZypoSoft is a software engineering firm built on Innovation, Intelligence, and Impact delivering resilient, high-performance platforms through disciplined architecture, governed data, and pragmatic automation that scale effortlessly.
            </p>
          </div>

          {/* Navigation */}
          <div className="md:col-span-2">
            <div className="zyposoft-footer__kicker">Navigation</div>
            <div className="mt-8 flex flex-col gap-2.5 text-sm">
              {site.nav.map((it) => (
                <Link key={it.href} href={it.href} className="zyposoft-footer__link">
                  {it.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="md:col-span-3 space-y-6">
            <div>
              <div className="zyposoft-footer__kicker">{site.footer.addressLabel}</div>
              <div className="mt-8 text-sm text-[rgba(11,30,58,0.70)] zyposoft-footer__link">
                {site.footer.address}<br /><br />{site.footer.addressLine}
              </div>
            </div>

            <div>
              <div className="zyposoft-footer__kicker">{site.footer.emailLabel}</div>
              <div className="text-sm">
                <a
                  className="zyposoft-footer__link"
                  href={`mailto:${site.footer.email}`}
                >
                  {site.footer.email}
                </a>
              </div>
            </div>
          </div>

          {/* Socials + Legal */}
          <div className="md:col-span-3 space-y-8">
            {/* Social Icons */}
            <div>
              <div className="zyposoft-footer__kicker">{site.footer.socialLabel}</div>
              <div className="mt-8 flex items-center gap-4">
                <a
                  href={site.footer.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[rgba(11,30,58,0.65)] hover:text-[#0A66C2] transition-colors"
                  aria-label="LinkedIn"
                >
                  <IconLinkedin className="h-6 w-6" />
                </a>
                <a
                  href={site.footer.socials.x}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[rgba(11,30,58,0.65)] hover:text-black transition-colors"
                  aria-label="X (Twitter)"
                >
                  <IconX className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Copyright & Links */}
            <div className="space-y-10 mt-12">
              <div className="text-xs text-[rgba(11,30,58,0.52)]">
                © {year} {site.company}. All rights reserved.
              </div>

              <div className="zyposoft-footer__micro">
                <Link href="/privacy" className="mt-3 zyposoft-footer__microLink">
                  Privacy
                </Link>
                <span className="mt-3 sep" aria-hidden>•</span>
                <Link href="/terms" className="mt-3 zyposoft-footer__microLink">
                  Terms
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom rule */}
        <div className="zyposoft-footer__bottomRule" aria-hidden />
      </Container>
    </footer>
  );
}