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
    const { container } = render(<TrustStrip trust={trustRecord} />);

    const list = screen.getByRole("list", { name: "Some of our customers" });
    expect(within(list).getAllByRole("listitem")).toHaveLength(trustRecord.customers.length);
    expect(screen.getAllByRole("list", { name: "Some of our customers" })).toHaveLength(1);
    const lists = container.querySelectorAll("ul");
    expect(lists).toHaveLength(2);
    expect(lists[1]).toHaveAttribute("aria-hidden", "true");
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

  it("shows the customer story with its result", () => {
    render(<TrustStrip trust={trustRecord} />);

    const story = screen.getByRole("figure");
    expect(within(story).getByText(/Got 3× more orders/)).toBeInTheDocument();
    expect(within(story).getByText("3× orders in 2 months")).toBeInTheDocument();
  });

  it("spreads the stats over 4 columns when there is no story", () => {
    const { container } = render(<TrustStrip trust={{ ...trustRecord, testimonial: undefined }} />);

    expect(screen.queryByRole("figure")).not.toBeInTheDocument();
    expect(container.querySelector("dl")).toHaveClass("lg:grid-cols-4");
  });
});
