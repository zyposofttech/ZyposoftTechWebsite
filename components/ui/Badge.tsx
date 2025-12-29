import { cx } from "@/lib/utils";

export default function Badge({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cx(
        "inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs border border-[rgba(255,255,255,0.10)] bg-[rgba(255,255,255,0.04)]",
        className
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-[rgba(var(--accent),0.95)]" />
      {children}
    </span>
  );
}
