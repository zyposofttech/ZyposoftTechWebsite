"use client";

import React from "react";

type Props = {
  children: React.ReactNode;
  delayMs?: number;
  className?: string;

  /**
   * How much of the element should be visible before revealing.
   * Higher = reveals later (better for “load on scroll” feel).
   */
  threshold?: number | number[];

  /**
   * Shrink/expand the viewport box used for intersection checks.
   * Example: "0px 0px -35% 0px" means “don’t reveal until the element
   * is well inside the viewport”.
   */
  rootMargin?: string;

  /**
   * If true, reveal once and keep it visible.
   * If false, it will hide again when scrolling away.
   */
  once?: boolean;
};

export function Reveal({
  children,
  delayMs = 0,
  className = "",
  threshold = 0.22,
  rootMargin = "0px 0px -18% 0px",
  once = true,
}: Props) {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect reduced motion: show content immediately.
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

    if (reduced) {
      setInView(true);
      return;
    }

    let didUnobserve = false;

    const obs = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;

        if (entry.isIntersecting) {
          setInView(true);

          if (once && !didUnobserve) {
            obs.unobserve(el);
            didUnobserve = true;
          }
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold, rootMargin }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold, rootMargin, once]);

  return (
    <div
      ref={ref}
      className={[
        "transition-all duration-700 will-change-transform motion-reduce:transition-none",
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
        className,
      ].join(" ")}
      style={{ transitionDelay: `${delayMs}ms` }}
    >
      {children}
    </div>
  );
}
