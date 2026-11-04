import type { Metadata } from "next";
import { Heading, Text } from "@/components/ui/typography";
import { appHeaderMock } from "@/mocks/app-header";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function DashboardPage() {
  // TODO: greet from the session user once auth exists.
  const firstName = appHeaderMock.user.name.split(" ")[0];

  return (
    <main className="w-full flex-1 px-4 py-6 md:px-6">
      <Heading level="h3" as="h1" className="font-bold">
        Dashboard
      </Heading>
      <Text tone="muted" className="mt-1">
        Good morning, {firstName}. Here is how your business is doing.
      </Text>

      <ul aria-label="Loading summary" className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }, (_, index) => (
          <li
            key={index}
            aria-hidden="true"
            className="space-y-3 rounded-xl border border-border bg-card p-4 shadow-sm"
          >
            <div className="h-2.5 w-20 animate-pulse-soft rounded-full bg-muted" />
            <div className="h-5 w-32 animate-pulse-soft rounded-md bg-muted" />
            <div className="h-2.5 w-14 animate-pulse-soft rounded-full bg-muted" />
          </li>
        ))}
      </ul>
    </main>
  );
}
