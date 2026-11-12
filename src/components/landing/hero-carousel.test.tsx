import { act, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { heroSlidesRecord } from "@/db/hero-slides";
import { AUTOPLAY_MS, HeroCarousel } from "./hero-carousel";

const selectedTab = () => screen.getByRole("tab", { selected: true });

describe("HeroCarousel", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders one tab per audience with the first one selected", () => {
    render(<HeroCarousel slides={heroSlidesRecord} />);

    const tabs = screen.getAllByRole("tab");
    expect(tabs.map((tab) => tab.getAttribute("aria-label"))).toEqual([
      "Business",
      "Creators",
      "Agencies",
      "Tech services",
    ]);
    expect(selectedTab()).toHaveAccessibleName("Business");
  });

  it("shows the short label on phones and the full label from sm", () => {
    render(<HeroCarousel slides={heroSlidesRecord} />);

    const tab = screen.getByRole("tab", { name: "Tech services" });
    expect(tab.querySelector('[class~="sm:hidden"]')).toHaveTextContent(/^Services$/);
    expect(tab.querySelector('[class~="sm:inline"]')).toHaveTextContent(/^Tech services$/);
  });

  it("keeps every slide in the HTML but makes only the active one interactive", () => {
    const { container } = render(<HeroCarousel slides={heroSlidesRecord} />);

    const panels = container.querySelectorAll('[role="tabpanel"]');
    expect(panels).toHaveLength(4);
    expect(panels[0]).not.toHaveAttribute("inert");
    expect(panels[1]).toHaveAttribute("inert");
    expect(screen.getByText("Get paid to create")).toBeInTheDocument();
  });

  it("moves with the arrow buttons and wraps around", async () => {
    const user = userEvent.setup();
    render(<HeroCarousel slides={heroSlidesRecord} />);

    await user.click(screen.getByRole("button", { name: "Next slide" }));
    expect(selectedTab()).toHaveAccessibleName("Creators");

    await user.click(screen.getByRole("button", { name: "Previous slide" }));
    await user.click(screen.getByRole("button", { name: "Previous slide" }));
    expect(selectedTab()).toHaveAccessibleName("Tech services");
  });

  it("selects a slide by clicking its tab and moves with arrow keys", async () => {
    const user = userEvent.setup();
    render(<HeroCarousel slides={heroSlidesRecord} />);

    await user.click(screen.getByRole("tab", { name: "Agencies" }));
    expect(selectedTab()).toHaveAccessibleName("Agencies");

    await user.keyboard("{ArrowRight}");
    expect(selectedTab()).toHaveAccessibleName("Tech services");
    expect(selectedTab()).toHaveFocus();

    await user.keyboard("{Home}");
    expect(selectedTab()).toHaveAccessibleName("Business");
  });

  it("changes slide on a horizontal swipe but not on a vertical scroll", () => {
    const { container } = render(<HeroCarousel slides={heroSlidesRecord} />);
    const track = container.querySelector('[role="tabpanel"]')!.parentElement!;

    fireEvent.touchStart(track, { touches: [{ clientX: 300, clientY: 100 }] });
    fireEvent.touchEnd(track, { changedTouches: [{ clientX: 200, clientY: 110 }] });
    expect(selectedTab()).toHaveAccessibleName("Creators");

    fireEvent.touchStart(track, { touches: [{ clientX: 200, clientY: 100 }] });
    fireEvent.touchEnd(track, { changedTouches: [{ clientX: 140, clientY: 300 }] });
    expect(selectedTab()).toHaveAccessibleName("Creators");
  });

  it("advances on its own and stops when paused", () => {
    vi.useFakeTimers();
    render(<HeroCarousel slides={heroSlidesRecord} />);

    act(() => vi.advanceTimersByTime(AUTOPLAY_MS));
    expect(selectedTab()).toHaveAccessibleName("Creators");

    fireEvent.click(screen.getByRole("button", { name: "Pause slideshow" }));
    act(() => vi.advanceTimersByTime(AUTOPLAY_MS * 3));
    expect(selectedTab()).toHaveAccessibleName("Creators");
    expect(screen.getByRole("button", { name: "Play slideshow" })).toBeInTheDocument();
  });

  it("links each CTA to the right signup", () => {
    render(<HeroCarousel slides={heroSlidesRecord} />);

    expect(screen.getByRole("link", { name: /Join as a creator/ })).toHaveAttribute(
      "href",
      "/signup?as=creator",
    );
    expect(screen.getByRole("link", { name: /Start as an agency/ })).toHaveAttribute(
      "href",
      "/signup?as=agency",
    );
  });
});
