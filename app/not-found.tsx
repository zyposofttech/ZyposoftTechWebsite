import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { H1, P } from "@/components/ui/Typography";
import  Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <Section className="pt-16">
      <div className="space-y-4">
        <H1>Page not found</H1>
        <P>The page you are looking for does not exist.</P>
        <div className="flex gap-3">
          <Button href="/" variant="secondary">Go home</Button>
          <Link href="/contact" className="text-sm font-semibold text-[rgba(var(--accent),1)] hover:underline">
            Request a demo →
          </Link>
        </div>
      </div>
    </Section>
  );
}
