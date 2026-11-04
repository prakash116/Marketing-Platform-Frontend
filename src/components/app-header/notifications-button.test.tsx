import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { formatBadgeCount, NotificationBadge, notificationsLabel } from "./notifications-button";

describe("NotificationBadge", () => {
  it("is hidden at 0", () => {
    render(<NotificationBadge count={0} />);
    expect(screen.queryByTestId("notification-badge")).not.toBeInTheDocument();
  });

  it("shows the count from 1 to 9", () => {
    render(<NotificationBadge count={3} />);
    expect(screen.getByTestId("notification-badge")).toHaveTextContent("3");
  });

  it("caps at 9+", () => {
    render(<NotificationBadge count={12} />);
    expect(screen.getByTestId("notification-badge")).toHaveTextContent("9+");
    expect(formatBadgeCount(9)).toBe("9");
  });

  it("builds the button label", () => {
    expect(notificationsLabel(3)).toBe("3 unread notifications");
    expect(notificationsLabel(1)).toBe("1 unread notification");
    expect(notificationsLabel(0)).toBe("Notifications");
  });
});
