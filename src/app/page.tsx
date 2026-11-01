import type { Metadata } from "next";
import Link from "next/link";
import { FadeIn } from "@/components/motion/fade-in";
import { StaggerItem, StaggerList } from "@/components/motion/stagger-list";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Code, Heading, Kpi, Text, type TextTone } from "@/components/ui/typography";
import { formatINR } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Design system",
};

const tones: TextTone[] = [
  "default",
  "secondary",
  "muted",
  "primary",
  "success",
  "warning",
  "danger",
];

export default function DesignSystemPreviewPage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <FadeIn>
        <header className="flex flex-wrap items-start justify-between gap-4 border-b border-border pb-8">
          <div className="space-y-2">
            <Text variant="overline" tone="primary">
              Design system preview
            </Text>
            <Heading level="display" as="h1">
              Marketing Platform
            </Heading>
            <Text variant="body-lg" tone="secondary" className="max-w-2xl">
              Tokens, typography, buttons and motion primitives. This page exists only to verify the
              foundation in light and dark mode. Feature pages come later.
            </Text>
          </div>
          <ThemeToggle />
        </header>
      </FadeIn>

      {/* Typography */}
      <section aria-labelledby="typography" className="space-y-6 py-10">
        <Heading level="h3" id="typography">
          Typography
        </Heading>
        <div className="space-y-3 rounded-lg border border-border bg-card p-6 shadow-sm">
          <Heading level="display" as="p">
            Display 48 / 56
          </Heading>
          <Heading level="h1" as="p">
            Heading 1 36 / 44
          </Heading>
          <Heading level="h2" as="p">
            Heading 2 30 / 38
          </Heading>
          <Heading level="h3" as="p">
            Heading 3 24 / 32
          </Heading>
          <Heading level="h4" as="p">
            Heading 4 18 / 28
          </Heading>
          <Text variant="body-lg">Body large 16 / 26 for lead paragraphs.</Text>
          <Text variant="body">Body 14 / 22 is the default reading size across the product.</Text>
          <Text variant="small">Small 13 / 20 for secondary table cells and helper copy.</Text>
          <Text variant="caption">Caption 12 / 16 for timestamps and metadata.</Text>
          <Text variant="overline">Overline 11 / 16</Text>
          <Text variant="label" as="span">
            Label 14 / 20 for form fields
          </Text>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2 rounded-lg border border-border bg-card p-6 shadow-sm">
            <Text variant="overline" tone="muted">
              Tones
            </Text>
            {tones.map((tone) => (
              <Text key={tone} tone={tone}>
                {tone} tone — the quick brown fox jumps over the lazy dog.
              </Text>
            ))}
          </div>
          <div
            className="space-y-3 rounded-lg border border-border bg-card p-6 shadow-sm"
            lang="hi"
          >
            <Text variant="overline" tone="muted" lang="en">
              Hindi sample
            </Text>
            <Heading level="h3">अभियान प्रदर्शन रिपोर्ट</Heading>
            <Text>
              इस महीने आपके अभियानों ने ₹12,34,567 का राजस्व उत्पन्न किया। नोटो संस देवनागरी केवल
              तभी लोड होता है जब हिंदी पाठ दिखाई देता है।
            </Text>
            <Text variant="small" tone="muted">
              पंक्ति-ऊँचाई 1.6 मात्राओं के लिए अतिरिक्त स्थान देती है।
            </Text>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2 rounded-lg border border-border bg-card p-6 shadow-sm">
            <Text variant="overline" tone="muted">
              KPI
            </Text>
            <Kpi>{formatINR(4_52_10_395)}</Kpi>
            <Text variant="small" tone="success">
              +12.4% vs last month
            </Text>
          </div>
          <div className="space-y-2 rounded-lg border border-border bg-card p-6 shadow-sm">
            <Text variant="overline" tone="muted">
              Code
            </Text>
            <Text>
              Run <Code>npm run dev</Code> and open <Code>http://localhost:3000</Code>.
            </Text>
          </div>
        </div>
      </section>

      {/* Buttons */}
      <section aria-labelledby="buttons" className="space-y-6 py-10">
        <Heading level="h3" id="buttons">
          Buttons
        </Heading>
        <StaggerList className="space-y-6 rounded-lg border border-border bg-card p-6 shadow-sm">
          <StaggerItem className="space-y-2">
            <Text variant="overline" tone="muted">
              Variants
            </Text>
            <div className="flex flex-wrap items-center gap-3">
              <Button>Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="accent">Accent</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="link">Link</Button>
            </div>
          </StaggerItem>
          <StaggerItem className="space-y-2">
            <Text variant="overline" tone="muted">
              Sizes
            </Text>
            <div className="flex flex-wrap items-center gap-3">
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
              <Button size="icon" aria-label="Icon button">
                <span aria-hidden="true">★</span>
              </Button>
              <Button size="icon-sm" aria-label="Small icon button">
                <span aria-hidden="true">★</span>
              </Button>
            </div>
          </StaggerItem>
          <StaggerItem className="space-y-2">
            <Text variant="overline" tone="muted">
              States
            </Text>
            <div className="flex flex-wrap items-center gap-3">
              <Button loading>Saving</Button>
              <Button disabled>Disabled</Button>
              <Button variant="secondary" asChild>
                <Link href="/">As child (Link)</Link>
              </Button>
            </div>
          </StaggerItem>
        </StaggerList>
      </section>

      <footer className="border-t border-border pt-6">
        <Text variant="small" tone="muted">
          Colors meet WCAG AA in both themes. Motion respects the OS reduced-motion setting.
        </Text>
      </footer>
    </main>
  );
}
