import type { LucideProps } from "lucide-react";
import { createElement } from "react";
import { getIcon } from "./icon-registry";

export interface DynamicIconProps extends LucideProps {
  /** Lucide icon name from API data, e.g. "message-circle". */
  name: string | undefined;
}

/** Renders an icon by name; renders nothing for an unknown or missing name. */
export function DynamicIcon({ name, ...props }: DynamicIconProps) {
  const icon = getIcon(name);
  return icon ? createElement(icon, props) : null;
}
