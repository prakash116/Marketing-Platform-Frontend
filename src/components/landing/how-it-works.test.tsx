import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { howItWorksRecord } from "@/db/how-it-works";
import { HowItWorks } from "./how-it-works";

describe("HowItWorks", () => {
  it("names the section with its heading", () => {
    render(<HowItWorks section={howItWorksRecord} />);

    expect(screen.getByRole("region", { name: howItWorksRecord.title })).toBeInTheDocument();
  });

  it("lists the steps in order with their badges", () => {
    render(<HowItWorks section={howItWorksRecord} />);

    const steps = within(screen.getByRole("list", { name: "Steps to get started" })).getAllByRole(
      "listitem",
    );
    expect(steps).toHaveLength(howItWorksRecord.steps.length);
    for (const [index, step] of steps.entries()) {
      const data = howItWorksRecord.steps[index]!;
      expect(within(step).getByRole("heading", { level: 3 })).toHaveTextContent(data.title);
      if (data.badge) expect(step).toHaveTextContent(data.badge);
    }
  });

  it("draws a connector after every step except the last", () => {
    render(<HowItWorks section={howItWorksRecord} />);

    const steps = within(screen.getByRole("list", { name: "Steps to get started" })).getAllByRole(
      "listitem",
    );
    expect(steps.at(0)?.className).toContain("after:border-dashed");
    expect(steps.at(-1)?.className).not.toContain("after:border-dashed");
  });

  it("ends with the signup button and the reassurance note", () => {
    render(<HowItWorks section={howItWorksRecord} />);

    expect(screen.getByRole("link", { name: "Start free" })).toHaveAttribute("href", "/signup");
    expect(screen.getByText("No card needed · Cancel anytime")).toBeInTheDocument();
  });
});
