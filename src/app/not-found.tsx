import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Heading, Text } from "@/components/ui/typography";

export default function NotFound() {
  return (
    <main className="mx-auto flex w-full max-w-lg flex-1 flex-col items-center justify-center gap-4 px-4 py-16 text-center">
      <Text variant="overline" tone="muted">
        404
      </Text>
      <Heading level="h2" as="h1">
        Page not found
      </Heading>
      <Text tone="secondary">The page you are looking for does not exist or has moved.</Text>
      <Button asChild>
        <Link href="/">Back to home</Link>
      </Button>
    </main>
  );
}
