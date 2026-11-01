import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { FadeIn } from "./fade-in";
import { MotionProvider } from "./motion-provider";

describe("FadeIn", () => {
  it("renders its children", () => {
    render(
      <MotionProvider>
        <FadeIn>
          <p>Hello</p>
        </FadeIn>
      </MotionProvider>,
    );

    expect(screen.getByText("Hello")).toBeInTheDocument();
  });

  it("forwards extra props to the wrapper", () => {
    render(
      <MotionProvider>
        <FadeIn data-testid="fade" className="block">
          <span>Child</span>
        </FadeIn>
      </MotionProvider>,
    );

    expect(screen.getByTestId("fade")).toHaveClass("block");
  });
});
