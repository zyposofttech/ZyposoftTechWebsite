
import { cx } from "@/lib/utils";

export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cx("text-xs text-[rgba(var(--muted),0.95)] text-spaced", className)}>
      {children}
    </div>
  );
}

export function H1({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <h1 className={cx("text-4xl md:text-6xl font-semibold tracking-tight leading-[1.04]", className)}>
      {children}
    </h1>
  );
}

export function H2({ children, className }: { children: React.ReactNode; className?: string }) {
  return <h2 className={cx("text-2xl md:text-4xl font-semibold tracking-tight", className)}>{children}</h2>;
}

export function H3({ children, className }: { children: React.ReactNode; className?: string }) {
  return <h3 className={cx("text-lg md:text-xl font-semibold tracking-tight", className)}>{children}</h3>;
}

export function P({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={cx("text-[rgba(var(--fg),0.78)] leading-relaxed", className)}>
      {children}
    </p>
  );
}
