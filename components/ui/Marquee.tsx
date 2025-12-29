"use client";

import { cx } from "@/lib/utils";
import { useEffect, useRef } from "react";

export default function Marquee({
  items,
  className
}: {
  items: string[];
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const prefersReduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduce) return;
    el.animate([{ transform: "translateX(0)" }, { transform: "translateX(-50%)" }], {
      duration: 24000,
      iterations: Infinity
    });
  }, []);

  const doubled = [...items, ...items];

  return (
    <div className={cx("overflow-hidden rounded-full border border-[rgba(255,255,255,0.10)] bg-[rgba(255,255,255,0.04)]", className)}>
      <div ref={ref} className="flex w-[200%] gap-3 px-5 py-2">
        {doubled.map((it, i) => (
          <div
            key={`${it}-${i}`}
            className="whitespace-nowrap text-xs text-[rgba(var(--fg),0.72)]"
          >
            {it}
          </div>
        ))}
      </div>
    </div>
  );
}
