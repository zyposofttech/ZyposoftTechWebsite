import type { Metadata } from "next";
import { site } from "@/lib/content";
import "./globals.css";
import {Nav} from "@/components/site/Nav";
import Footer from "@/components/site/Footer";

export const metadata: Metadata = {
  metadataBase: new URL(site.domain),

  title: {
    default: `${site.company}: Innovation • Intelligence • Impact`,
    template: `%s — ${site.company}`,
  },
  description:
    "ZypoSoft: Services that move fast and stay stable. We provide high-impact UX, modular architecture, and AI engineering for sustainable software success.",

  openGraph: {
    title: `${site.company}: Innovation • Intelligence • Impact`,
    description:
      "Secure, scalable systems for public hospitals and state programs. ArogyaSara: EHR, HMS, Telemedicine, analytics, AI surveillance.",
    type: "website",
    url: site.domain,
  },

  robots: { index: true, follow: true },

  // ADD THESE:
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body>
        <Nav/>
        <main className="min-h-[70vh]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
