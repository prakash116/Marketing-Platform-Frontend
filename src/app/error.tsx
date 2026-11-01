"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Heading, Text } from "@/components/ui/typography";

export default function ErrorPage({ error, retry }: { error: unknown; retry: () => void }) {
  useEffect(() => {
    // Hook up an error reporter (e.g. Sentry) here when it is added.
    console.error(error);
  }, [error]);

  const digest =
    typeof error === "object" && error !== null && "digest" in error
      ? String((error as { digest?: string }).digest ?? "")
      : "";

  return (
    <main className="mx-auto flex w-full max-w-lg flex-1 flex-col items-center justify-center gap-4 px-4 py-16 text-center">
      <Text variant="overline" tone="danger">
        Something went wrong
      </Text>
      <Heading level="h2" as="h1">
        We could not load this page
      </Heading>
      <Text tone="secondary">
        The error has been logged. Please try again, and contact support if it keeps happening.
      </Text>
      {digest ? (
        <Text variant="caption" tone="muted">
          Reference: {digest}
        </Text>
      ) : null}
      <Button onClick={() => retry()}>Try again</Button>
    </main>
  );
}
