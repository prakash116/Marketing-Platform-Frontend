import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { featuresRecord } from "@/db/features";
import { FeaturesSection } from "./features-section";

describe("FeaturesSection", () => {
  it("names the section with its heading", () => {
    render(<FeaturesSection section={featuresRecord} />);

    expect(screen.getByRole("region", { name: featuresRecord.title })).toBeInTheDocument();
  });

  it("renders one card per feature with a single 'learn more' link", () => {
    render(<FeaturesSection section={featuresRecord} />);

    const cards = screen.getAllByRole("article");
    expect(cards).toHaveLength(featuresRecord.items.length);
    for (const [index, card] of cards.entries()) {
      const item = featuresRecord.items[index]!;
      const links = within(card).getAllByRole("link");
      expect(links).toHaveLength(1);
      expect(links[0]).toHaveAccessibleName(`Learn more about ${item.title}`);
      expect(links[0]).toHaveAttribute("href", item.href);
    }
  });

  it("lists each feature's highlights", () => {
    render(<FeaturesSection section={featuresRecord} />);

    const list = screen.getByRole("list", { name: "WhatsApp highlights" });
    expect(
      within(list)
        .getAllByRole("listitem")
        .map((item) => item.textContent),
    ).toEqual(["Chatbot", "Team inbox", "Broadcasts"]);
  });

  it("makes wide cards span two columns and shows their preview", () => {
    render(<FeaturesSection section={featuresRecord} />);

    const whatsapp = screen.getByRole("heading", { name: "WhatsApp" }).closest("li");
    expect(whatsapp).toHaveClass("sm:col-span-2");
    expect(screen.getByText("Diwali offer kab tak hai?")).toBeInTheDocument();
    expect(screen.getByText("New leads")).toBeInTheDocument();
  });

  it("ends with the outro card's links", () => {
    render(<FeaturesSection section={featuresRecord} />);

    expect(screen.getByRole("link", { name: "All features" })).toHaveAttribute("href", "/features");
    expect(screen.getByRole("link", { name: "Book a demo" })).toHaveAttribute("href", "/demo");
  });
});
