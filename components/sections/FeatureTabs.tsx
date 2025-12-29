"use client";

import React, { useMemo, useState } from "react";

type Item = {
  k: string;
  n: string;       // "01", "02"...
  title: string;
  desc: string;
  img: string;     // path to image in /public
};

export function FeatureTabs({ items }: { items: Item[] }) {
  const [active, setActive] = useState(items[0]?.k ?? "");
  const activeItem = useMemo(() => items.find(i => i.k === active) ?? items[0], [items, active]);

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
      <div className="lg:col-span-5">
        <div className="space-y-2">
          {items.map((it) => {
            const is = it.k === active;
            return (
              <button
                key={it.k}
                onMouseEnter={() => setActive(it.k)}
                onClick={() => setActive(it.k)}
                className={[
                  "group w-full text-left rounded-2xl border transition-all duration-300",
                  "px-5 py-4",
                  is
                    ? "border-[rgba(27,89,167,.35)] bg-white shadow-sm"
                    : "border-[rgba(11,30,58,.10)] bg-white/60 hover:bg-white hover:border-[rgba(27,89,167,.25)]",
                ].join(" ")}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={[
                      "mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-xl text-sm font-semibold",
                      is ? "bg-[rgba(27,89,167,.12)] text-[#1b59a7]" : "bg-[rgba(11,30,58,.06)] text-[#0b1e3a]",
                    ].join(" ")}
                  >
                    {it.n}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="text-[15px] sm:text-base font-semibold text-[#0b1e3a]">
                        {it.title}
                      </h3>
                      <span
                        className={[
                          "h-1.5 w-1.5 rounded-full transition-opacity",
                          is ? "opacity-100 bg-[#1b59a7]" : "opacity-0 bg-[#1b59a7]",
                        ].join(" ")}
                      />
                    </div>
                    <p className="mt-1 text-sm leading-6 text-[rgba(11,30,58,.72)]">
                      {it.desc}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="lg:col-span-7">
        <div className="relative overflow-hidden rounded-3xl border border-[rgba(11,30,58,.10)] bg-white shadow-sm">
          <div className="absolute inset-0 pointer-events-none"
               style={{
                 background:
                   "radial-gradient(800px 400px at 20% 10%, rgba(27,89,167,.10), transparent 60%), radial-gradient(600px 300px at 90% 30%, rgba(11,30,58,.06), transparent 55%)"
               }}
          />
          {/* image crossfade */}
          <div className="relative aspect-[16/10]">
            <img
              key={activeItem?.k}
              src={activeItem?.img}
              alt={activeItem?.title}
              className="h-full w-full object-cover transition-opacity duration-300"
            />
          </div>

          <div className="relative border-t border-[rgba(11,30,58,.08)] p-5 sm:p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-xs font-semibold tracking-wide text-[#1b59a7]">
                  {activeItem?.n} / {String(items.length).padStart(2, "0")}
                </div>
                <div className="mt-1 text-base font-semibold text-[#0b1e3a]">
                  {activeItem?.title}
                </div>
              </div>
              <div className="hidden sm:flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#1b59a7]" />
                <span className="text-xs text-[rgba(11,30,58,.70)]">Interactive preview</span>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-4 text-sm text-[rgba(11,30,58,.62)]">
          Tip: replace images later structure and interactions stay the same.
        </p>
      </div>
    </div>
  );
}
