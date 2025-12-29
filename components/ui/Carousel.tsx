"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { cx, clamp } from "@/lib/utils";

export default function Carousel({
  items
}: {
  items: Array<{ src: string; alt: string }>;
}) {
  const [i, setI] = useState(0);
  const count = items.length;

  const current = useMemo(() => items[clamp(i, 0, count - 1)], [i, count, items]);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const t = window.setInterval(() => setI((v) => (v + 1) % count), 4500);
    return () => window.clearInterval(t);
  }, [count]);

  return (
    <div className="space-y-3">
      <div className="relative aspect-[16/10] overflow-hidden rounded-xl2 border border-[rgb(var(--border))] bg-[rgba(255,255,255,0.03)]">
        <Image src={current.src} alt={current.alt} fill className="object-cover" />
      </div>

      <div className="flex items-center justify-between gap-3">
        <button
          className="h-10 px-4 rounded-full border border-[rgba(255,255,255,0.10)] hover:bg-[rgba(255,255,255,0.06)]"
          onClick={() => setI((v) => (v - 1 + count) % count)}
          aria-label="Previous"
        >
          Prev
        </button>

        <div className="flex gap-2" aria-label="Carousel position">
          {items.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setI(idx)}
              className={cx(
                "h-2.5 w-2.5 rounded-full border",
                idx === i
                  ? "bg-[rgba(var(--accent),0.95)] border-[rgba(var(--accent),0.95)]"
                  : "bg-transparent border-[rgba(255,255,255,0.18)]"
              )}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        <button
          className="h-10 px-4 rounded-full border border-[rgba(255,255,255,0.10)] hover:bg-[rgba(255,255,255,0.06)]"
          onClick={() => setI((v) => (v + 1) % count)}
          aria-label="Next"
        >
          Next
        </button>
      </div>
    </div>
  );
}
