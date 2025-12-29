"use client";

import { useEffect, useRef, useState } from "react";

export function useInView<T extends HTMLElement>(opts?: IntersectionObserverInit) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        io.disconnect();
      }
    }, opts ?? { root: null, threshold: 0.15, rootMargin: "0px 0px -10% 0px" });

    io.observe(el);
    return () => io.disconnect();
  }, [opts]);

  return { ref, inView };
}
