import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { getWaCreditsTone, WaCreditsChip } from "./wa-credits-chip";

describe("WaCreditsChip", () => {
  it.each([
    [1240, "ok", "bg-success-soft", "₹1,240"],
    [150, "low", "bg-warning-soft", "₹150"],
    [0, "empty", "bg-destructive-soft", "₹0"],
  ])("renders %i credits with the %s variant", (amount, tone, bgClass, text) => {
    render(<WaCreditsChip amount={amount} />);

    const chip = screen.getByRole("link");
    expect(chip).toHaveAttribute("data-tone", tone);
    expect(chip).toHaveClass(bgClass);
    expect(chip).toHaveTextContent(text);
    expect(chip).toHaveAttribute("href", "/wallet");
  });

  it("switches to warning just below ₹200", () => {
    expect(getWaCreditsTone(200)).toBe("ok");
    expect(getWaCreditsTone(199)).toBe("low");
  });
});
