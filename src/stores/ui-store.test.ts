import { act } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { useUiStore } from "./ui-store";

describe("useUiStore", () => {
  beforeEach(() => {
    useUiStore.setState({ sidebarCollapsed: false });
  });

  it("toggles the sidebar", () => {
    expect(useUiStore.getState().sidebarCollapsed).toBe(false);

    act(() => useUiStore.getState().toggleSidebar());
    expect(useUiStore.getState().sidebarCollapsed).toBe(true);

    act(() => useUiStore.getState().toggleSidebar());
    expect(useUiStore.getState().sidebarCollapsed).toBe(false);
  });

  it("sets the sidebar state explicitly", () => {
    act(() => useUiStore.getState().setSidebarCollapsed(true));
    expect(useUiStore.getState().sidebarCollapsed).toBe(true);
  });
});
