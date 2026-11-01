import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

/**
 * State ownership rules:
 *   API data      → TanStack Query (server cache, never duplicated here)
 *   UI state      → Zustand (this store: sidebar, panels, local toggles)
 *   Forms         → React Hook Form + Zod
 *   Filters/sort  → URL search params (shareable, back-button friendly)
 */

export interface UiState {
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
}

export const useUiStore = create<UiState>()(
  devtools(
    persist(
      (set) => ({
        sidebarCollapsed: false,
        toggleSidebar: () =>
          set(
            (state) => ({ sidebarCollapsed: !state.sidebarCollapsed }),
            false,
            "ui/toggleSidebar",
          ),
        setSidebarCollapsed: (collapsed) =>
          set({ sidebarCollapsed: collapsed }, false, "ui/setSidebarCollapsed"),
      }),
      {
        name: "mp-ui",
        partialize: (state) => ({ sidebarCollapsed: state.sidebarCollapsed }),
      },
    ),
    { name: "ui-store", enabled: process.env.NODE_ENV !== "production" },
  ),
);
