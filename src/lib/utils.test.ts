import { describe, expect, it } from "vitest";
import { initials } from "./utils";

describe("initials", () => {
  it("takes the first letter of the first two words", () => {
    expect(initials("Sharma Sweets")).toBe("SS");
    expect(initials("Care Plus Clinic")).toBe("CP");
  });

  it("handles one word, extra spaces and lower case", () => {
    expect(initials("glow")).toBe("G");
    expect(initials("  priya   sharma ")).toBe("PS");
  });
});
