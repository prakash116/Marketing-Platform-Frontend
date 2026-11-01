import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

// Without this, components rendered in one test remain mounted in the next,
// and queries like getByRole start seeing duplicate elements.
afterEach(() => {
  cleanup();
});
