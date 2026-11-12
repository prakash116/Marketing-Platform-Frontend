import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { audiencesRecord } from "@/db/audiences";
import { AudiencePaths } from "./audience-paths";

describe("AudiencePaths", () => {
  it("names the section with its heading", () => {
    render(<AudiencePaths section={audiencesRecord} />);

    // Cheaper than getByRole("region"), which computes every accessible name in the tree.
    const heading = screen.getByText("Pick your path", { selector: "h2" });
    expect(heading.closest("section")).toHaveAttribute("aria-labelledby", heading.id);
  });

  it("renders one card per audience, each with a heading", () => {
    render(<AudiencePaths section={audiencesRecord} />);

    const headings = screen.getAllByRole("heading", { level: 3 });
    expect(headings.map((heading) => heading.textContent)).toEqual([
      "I run a business",
      "I'm a creator",
      "I run an agency",
      "I need tech help",
    ]);
  });

  it("gives every card exactly one link, named after the CTA and the audience", () => {
    render(<AudiencePaths section={audiencesRecord} />);

    const cards = screen.getAllByRole("article");
    expect(cards).toHaveLength(4);
    for (const [index, card] of cards.entries()) {
      const path = audiencesRecord.paths[index]!;
      const links = within(card).getAllByRole("link");
      expect(links).toHaveLength(1);
      expect(links[0]).toHaveAccessibleName(`${path.cta.title}: ${path.title}`);
      expect(links[0]).toHaveAttribute("href", path.cta.href);
    }
  });

  it("sends creators and agencies to their own signup", () => {
    render(<AudiencePaths section={audiencesRecord} />);

    expect(screen.getByRole("link", { name: /I'm a creator/ })).toHaveAttribute(
      "href",
      "/signup?as=creator",
    );
    expect(screen.getByRole("link", { name: /I run an agency/ })).toHaveAttribute(
      "href",
      "/signup?as=agency",
    );
  });
});
