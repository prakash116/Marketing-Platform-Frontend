import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { BRAND_NAME } from "@/config/brand";
import { Logo } from "./logo";

describe("Logo", () => {
  it("renders the brand name and links home", () => {
    render(<Logo />);
    const link = screen.getByRole("link", { name: BRAND_NAME });
    expect(link).toHaveAttribute("href", "/");
  });

  it("links to the dashboard inside the app", () => {
    render(<Logo href="/dashboard" size={28} />);
    expect(screen.getByRole("link", { name: BRAND_NAME })).toHaveAttribute("href", "/dashboard");
  });

  it("keeps an accessible name without the wordmark", () => {
    render(<Logo withWordmark={false} />);
    expect(screen.getByRole("link", { name: `${BRAND_NAME} home` })).toBeInTheDocument();
    expect(screen.queryByText(BRAND_NAME)).not.toBeInTheDocument();
  });
});
