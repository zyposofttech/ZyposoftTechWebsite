import Container from "./Container";
import { cx } from "@/lib/utils";

export function Section({
  className,
  children,
  id
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={cx("py-14 md:py-20", className)}>
      <Container>{children}</Container>
    </section>
  );
}
