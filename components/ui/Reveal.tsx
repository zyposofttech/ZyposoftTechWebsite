"use client";

import { cx } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

export default function Reveal({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setShow(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setShow(true)),
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cx(
        "transition-all duration-700 will-change-transform",
        show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
        className
      )}
    >
      {children}
    </div>
  );
}
