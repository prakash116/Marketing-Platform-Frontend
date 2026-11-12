import { describe, expect, it } from "vitest";
import { formatIndianMobile, isValidIndianMobile, toMobileDigits } from "./phone";

describe("phone helpers", () => {
  it("keeps digits only and drops a pasted +91 or 0 prefix", () => {
    expect(toMobileDigits("98765 43210")).toBe("9876543210");
    expect(toMobileDigits("+91 98765-43210")).toBe("9876543210");
    expect(toMobileDigits("098765 43210")).toBe("9876543210");
    expect(toMobileDigits("98765432109999")).toBe("9876543210");
  });

  it("accepts 10-digit numbers starting with 6–9 only", () => {
    expect(isValidIndianMobile("9876543210")).toBe(true);
    expect(isValidIndianMobile("6000000000")).toBe(true);
    expect(isValidIndianMobile("5876543210")).toBe(false);
    expect(isValidIndianMobile("98765")).toBe(false);
  });

  it("formats as 98765 43210 while typing", () => {
    expect(formatIndianMobile("98765")).toBe("98765");
    expect(formatIndianMobile("987654")).toBe("98765 4");
    expect(formatIndianMobile("9876543210")).toBe("98765 43210");
  });
});
