"use client";

import { useId, useState } from "react";
import { cn } from "@/lib/utils";

export function Accordion({
  items
}: {
  items: { q: string; a: string }[];
}) {
  const baseId = useId();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="divide-y divide-[rgb(var(--border))] rounded-xl2 border border-[rgb(var(--border))] bg-[rgba(var(--card),0.65)]">
      {items.map((it, idx) => {
        const isOpen = open === idx;
        const btnId = `${baseId}-btn-${idx}`;
        const panelId = `${baseId}-panel-${idx}`;
        return (
          <div key={idx} className="p-4 md:p-5">
            <button
              id={btnId}
              aria-controls={panelId}
              aria-expanded={isOpen}
              className={cn(
                "flex w-full items-center justify-between gap-4 text-left",
                "rounded-lg px-2 py-2 hover:bg-[rgba(var(--fg),0.04)]"
              )}
              onClick={() => setOpen(isOpen ? null : idx)}
            >
              <span className="text-sm font-semibold tracking-tight">{it.q}</span>
              <span
                className={cn(
                  "inline-flex h-7 w-7 items-center justify-center rounded-full border border-[rgb(var(--border))]",
                  "text-[rgba(var(--fg),0.70)] transition-transform",
                  isOpen && "rotate-45"
                )}
                aria-hidden="true"
              >
                +
              </span>
            </button>

            <div
              id={panelId}
              role="region"
              aria-labelledby={btnId}
              className={cn("grid transition-[grid-template-rows] duration-300", isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}
            >
              <div className="overflow-hidden px-2">
                <p className="pt-2 text-sm leading-relaxed text-[rgba(var(--fg),0.70)]">
                  {it.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
