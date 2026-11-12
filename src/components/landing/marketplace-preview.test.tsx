import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { marketplaceRecord } from "@/db/marketplace";
import { MarketplacePreview } from "./marketplace-preview";

describe("MarketplacePreview", () => {
  it("names the section with its heading", () => {
    render(<MarketplacePreview section={marketplaceRecord} />);

    // Cheaper than getByRole("region"), which computes every accessible name in the tree.
    const heading = screen.getByText(marketplaceRecord.title, { selector: "h2" });
    expect(heading.closest("section")).toHaveAttribute("aria-labelledby", heading.id);
  });

  it("lists every creator with their stats", () => {
    render(<MarketplacePreview section={marketplaceRecord} />);

    const creators = within(screen.getByRole("list", { name: "Creators near you" }));
    const cards = creators.getAllByRole("article");
    expect(cards).toHaveLength(marketplaceRecord.creators.length);

    const priya = cards[0]!;
    expect(priya).toHaveTextContent("Priya Sharma");
    expect(priya).toHaveTextContent("48.2k");
    expect(priya).toHaveTextContent("Followers");
    expect(priya).toHaveTextContent("₹2,500");
  });

  it("announces verified creators to screen readers", () => {
    render(<MarketplacePreview section={marketplaceRecord} />);

    const verified = marketplaceRecord.creators.filter((creator) => creator.verified).length;
    expect(screen.getAllByText("(verified)")).toHaveLength(verified);
  });

  it("lists every open brief with budget, deadline and applicants", () => {
    render(<MarketplacePreview section={marketplaceRecord} />);

    const briefs = within(screen.getByRole("list", { name: "Open briefs" })).getAllByRole(
      "article",
    );
    expect(briefs).toHaveLength(marketplaceRecord.briefs.length);
    expect(briefs[0]).toHaveTextContent("Diwali sweets reel");
    expect(briefs[0]).toHaveTextContent("₹2,500");
    expect(briefs[0]).toHaveTextContent("Closes in 5 days");
    expect(briefs[0]).toHaveTextContent("12 applied");
  });

  it("gives each side its own call to action", () => {
    render(<MarketplacePreview section={marketplaceRecord} />);

    expect(screen.getByRole("link", { name: "Browse creators" })).toHaveAttribute(
      "href",
      "/creators",
    );
    expect(screen.getByRole("link", { name: "See open briefs" })).toHaveAttribute(
      "href",
      "/briefs",
    );
  });
});
