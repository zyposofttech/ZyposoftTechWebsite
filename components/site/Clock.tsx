"use client";

import { useEffect, useState } from "react";

function formatTime(d: Date, tz: string) {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: tz,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  }).format(d);
}

export default function Clock({ tz }: { tz: string }) {
  const [now, setNow] = useState<string>("");

  useEffect(() => {
    const tick = () => setNow(formatTime(new Date(), tz));
    tick();
    const t = window.setInterval(tick, 1000);
    return () => window.clearInterval(t);
  }, [tz]);

  return <span>{now || "—:—:—"}</span>;
}
