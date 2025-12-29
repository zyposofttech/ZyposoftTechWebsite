"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { site } from "@/lib/content";
import { cx as cn } from "@/lib/utils";
import Button from "@/components/ui/Button";
import { Logo } from "@/components/site/Logo";

export function Nav() {
  const items = useMemo(() => site.nav, []);
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("overflow-hidden", open);
    return () => document.documentElement.classList.remove("overflow-hidden");
  }, [open]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname?.startsWith(href);
  };

  return (
    <header className="zyposoft-navWrap" role="banner">
      <div className="zyposoft-navContainer">
        <div className="zyposoft-navBar">
          {/* Left: Logo */}
          <div className="zyposoft-navLeft">
            <Link href="/" className="zyposoft-navLogo" aria-label="ZypoSoft home">
              <Logo />
            </Link>
          </div>

          {/* Center: Links */}
          <nav className="zyposoft-navLinks" aria-label="Primary">
            {items.map((it) => (
              <Link
                key={it.href}
                href={it.href}
                className={cn("zyposoft-navLink", isActive(it.href) && "is-active")}
              >
                {it.label}
              </Link>
            ))}
          </nav>

          {/* Right: CTA + mobile toggle */}
          <div className="zyposoft-navRight">
            <div className="hidden md:block">
              <Button href={site.ctas.primary.href} className="zyposoft-navBtn" size="sm">
                {site.ctas.primary.label}
              </Button>
            </div>

            <button
              className="md:hidden pravil-navBurger"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              <span className="sr-only">{open ? "Close" : "Menu"}</span>
              <span className={cn("line", open && "open a")} />
              <span className={cn("line", open && "open b")} />
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        <div className={cn("zyposoft-navMobile", open ? "open" : "")}>
          <div className="zyposoft-navMobilePanel">
            {items.map((it) => (
              <Link
                key={it.href}
                href={it.href}
                onClick={() => setOpen(false)}
                className={cn("zyposoft-navMobileLink", isActive(it.href) && "is-active")}
              >
                {it.label}
              </Link>
            ))}
            <div className="pt-2">
              <Button
                href={site.ctas.primary.href}
                onClick={() => setOpen(false)}
                className="zyposoft-navBtn w-full justify-center"
              >
                {site.ctas.primary.label}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
