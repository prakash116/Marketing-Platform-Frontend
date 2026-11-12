import type { Route } from "next";

/**
 * Frontend-only navigation helpers. The menu content itself (links, mega-menu
 * panels, promos) comes from the backend via `getSiteHeader()`.
 */

/**
 * Hrefs from the API are plain strings and most marketing pages are not built
 * yet, so typedRoutes cannot check them. Cast at the point of rendering.
 */
export const asRoute = (path: string) => path as Route;

/** App routes owned by the frontend, not by site content. */
export const authLinks = {
  login: asRoute("/login"),
  signup: asRoute("/signup"),
  bookDemo: asRoute("/demo"),
};

/** Is `href` the current page (or a parent of it)? Query strings are ignored. */
export function isActivePath(pathname: string, href: string): boolean {
  const path = href.split("?")[0] ?? href;
  if (path === "/") return pathname === "/";
  return pathname === path || pathname.startsWith(`${path}/`);
}
