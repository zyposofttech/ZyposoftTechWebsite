import Link from "next/link";
import { cx } from "@/lib/utils";

type Props = {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  type?: "button" | "submit";
  className?: string;
  ariaLabel?: string;
};

const sizes: Record<string, string> = {
  sm: "h-10 px-4 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-base"
};

const variants: Record<string, string> = {
  primary:
    "bg-[rgb(var(--accent))] text-white hover:bg-[rgba(var(--accent),0.88)]",
  secondary:
    "bg-white text-[rgb(var(--fg))] border border-[rgb(var(--border))] hover:bg-[rgba(11,30,58,0.03)]",
  ghost:
    "bg-transparent text-[rgba(var(--fg),0.75)] hover:bg-[rgba(11,30,58,0.05)]"
};

export default function Button({
  href,
  onClick,
  children,
  variant = "primary",
  size = "md",
  type = "button",
  className,
  ariaLabel
}: Props) {
  const base =
    "inline-flex items-center justify-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(var(--accent),0.7)] focus-visible:ring-offset-2 focus-visible:ring-offset-[rgb(var(--bg))]";
  const cls = cx(base, sizes[size], variants[variant], className);

  if (href) {
    return (
      <Link href={href} className={cls} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={cls} aria-label={ariaLabel}>
      {children}
    </button>
  );
}
