import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { servicesRecord } from "@/db/services";
import { ServicesSection } from "./services-section";

describe("ServicesSection", () => {
  it("names the section with its heading", () => {
    render(<ServicesSection section={servicesRecord} />);

    // Cheaper than getByRole("region"), which computes every accessible name in the tree.
    const heading = screen.getByText(servicesRecord.title, { selector: "h2" });
    expect(heading.closest("section")).toHaveAttribute("aria-labelledby", heading.id);
  });

  it("lists the engagement steps in order", () => {
    render(<ServicesSection section={servicesRecord} />);

    const steps = within(screen.getByRole("list", { name: "How it works" })).getAllByRole(
      "listitem",
    );
    expect(steps).toHaveLength(servicesRecord.steps.length);
    for (const [index, step] of steps.entries()) {
      expect(step).toHaveTextContent(servicesRecord.steps[index]!.title);
    }
  });

  it("renders the five services with what each one includes", () => {
    render(<ServicesSection section={servicesRecord} />);

    const services = within(screen.getByRole("list", { name: "Our services" }));
    expect(services.getAllByRole("heading", { level: 3 }).map((h) => h.textContent)).toEqual([
      "SEO automation",
      "WhatsApp automation",
      "Ads automation",
      "Tech consulting",
      "Tech build",
    ]);
    expect(
      within(screen.getByRole("list", { name: "What you get with Tech build" })).getAllByRole(
        "listitem",
      ),
    ).toHaveLength(3);
  });

  it("has no links inside the cards, only the section's calls to action", () => {
    render(<ServicesSection section={servicesRecord} />);

    for (const card of screen.getAllByRole("article")) {
      expect(within(card).queryByRole("link")).not.toBeInTheDocument();
    }
    expect(screen.getByRole("link", { name: "Book a free call" })).toHaveAttribute("href", "/demo");
    expect(screen.getByRole("link", { name: "See all services" })).toHaveAttribute(
      "href",
      "/services",
    );
  });

  it("makes the wide service span both columns", () => {
    render(<ServicesSection section={servicesRecord} />);

    expect(screen.getByRole("heading", { name: "Tech build" }).closest("li")).toHaveClass(
      "sm:col-span-2",
    );
  });
});
