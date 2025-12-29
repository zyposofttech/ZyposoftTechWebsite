export function cn(...classes: Array<string | undefined | false | null>) {
  return classes.filter(Boolean).join(" ");
}

// keep existing name too (backwards-compatible)
export const cx = cn;

export function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}
