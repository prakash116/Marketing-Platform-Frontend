import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { beforeAll, describe, expect, it } from "vitest";
import { OtpInput, type OtpStatus } from "./otp-input";

beforeAll(() => {
  // jsdom has neither matchMedia nor the Web Animations API.
  window.matchMedia = ((query: string) => ({
    matches: true,
    media: query,
  })) as typeof window.matchMedia;
});

function Harness({ status = "idle" }: { status?: OtpStatus }) {
  const [code, setCode] = useState("");
  return (
    <>
      <OtpInput value={code} onChange={setCode} status={status} />
      <output data-testid="code">{code}</output>
    </>
  );
}

const box = (n: number) => screen.getByLabelText(`Digit ${n}`);

describe("OtpInput", () => {
  it("moves focus to the next box while typing", async () => {
    const user = userEvent.setup();
    render(<Harness />);

    await user.click(box(1));
    await user.keyboard("482");

    expect(screen.getByTestId("code")).toHaveTextContent("482");
    expect(box(4)).toHaveFocus();
  });

  it("fills all six boxes on paste", async () => {
    const user = userEvent.setup();
    render(<Harness />);

    await user.click(box(1));
    await user.paste("Your code is 123456");

    expect(screen.getByTestId("code")).toHaveTextContent("123456");
    expect(box(6)).toHaveValue("6");
  });

  it("deletes one digit per backspace and steps back", async () => {
    const user = userEvent.setup();
    render(<Harness />);

    await user.click(box(1));
    await user.keyboard("48{Backspace}");

    expect(screen.getByTestId("code")).toHaveTextContent("4");
    expect(box(2)).toHaveFocus();
  });

  it("marks every box with the status", () => {
    render(<Harness status="error" />);
    for (let n = 1; n <= 6; n += 1) expect(box(n)).toHaveAttribute("data-status", "error");
  });
});
