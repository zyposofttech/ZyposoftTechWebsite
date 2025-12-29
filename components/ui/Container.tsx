import { cx } from "@/lib/utils";

export default function Container({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cx("mx-auto w-full max-w-6xl px-5 md:px-8", className)}>{children}</div>;
}