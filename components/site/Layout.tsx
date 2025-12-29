import React from "react";

export function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={["mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8", className].join(" ")}>
      {children}
    </div>
  );
}

export function Section({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={["py-14 sm:py-18 lg:py-22", className].join(" ")}>
      {children}
    </section>
  );
}
