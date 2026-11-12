import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { trustRecord } from "@/db/trust";
import { TrustStrip } from "./trust-strip";

describe("TrustStrip", () => {
  it("names the section with its title", () => {
    render(<TrustStrip trust={trustRecord} />);

    expect(screen.getByRole("region", { name: trustRecord.title })).toBeInTheDocument();
  });

  it("exposes the customer list once, hiding the looping copy", () => {
    render(<TrustStrip trust={trustRecord} />);

    const list = screen.getByRole("list", { name: "Some of our customers" });
    expect(within(list).getAllByRole("listitem")).toHaveLength(trustRecord.customers.length);
    expect(screen.getAllByRole("list", { name: "Some of our customers" })).toHaveLength(1);
    expect(screen.getAllByText("Sharma Sweets")).toHaveLength(2);
  });

  it("shows initials for each customer", () => {
    render(<TrustStrip trust={trustRecord} />);

    expect(screen.getAllByText("PM")[0]).toBeInTheDocument();
  });

  it("pairs every stat value with its label", () => {
    render(<TrustStrip trust={trustRecord} />);

    for (const stat of trustRecord.stats) {
      const value = screen.getByText(stat.value);
      expect(value.closest("dd")?.previousElementSibling).toHaveTextContent(stat.label);
    }
  });
});
