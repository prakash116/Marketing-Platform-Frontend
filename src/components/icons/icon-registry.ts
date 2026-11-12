import {
  BadgeIndianRupee,
  BookOpen,
  BriefcaseBusiness,
  Camera,
  CalendarDays,
  ChartColumn,
  Code,
  Dumbbell,
  FileText,
  Gift,
  GraduationCap,
  ImageIcon,
  Info,
  LayoutTemplate,
  LifeBuoy,
  MapPin,
  Megaphone,
  MessageCircle,
  Play,
  Scissors,
  Search,
  Send,
  ShoppingBag,
  Store,
  Stethoscope,
  TrendingUp,
  Users,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";

/**
 * Icons the backend may refer to by name. Data from the API (and `src/db/`)
 * sends a kebab-case lucide name; add the icon here before using a new name.
 * Importing each icon by name keeps the bundle small (no full lucide import).
 */
export const icons = {
  "badge-indian-rupee": BadgeIndianRupee,
  "book-open": BookOpen,
  "briefcase-business": BriefcaseBusiness,
  camera: Camera,
  "calendar-days": CalendarDays,
  "chart-column": ChartColumn,
  code: Code,
  dumbbell: Dumbbell,
  "file-text": FileText,
  gift: Gift,
  "graduation-cap": GraduationCap,
  image: ImageIcon,
  info: Info,
  "layout-template": LayoutTemplate,
  "life-buoy": LifeBuoy,
  "map-pin": MapPin,
  megaphone: Megaphone,
  "message-circle": MessageCircle,
  play: Play,
  scissors: Scissors,
  search: Search,
  send: Send,
  "shopping-bag": ShoppingBag,
  stethoscope: Stethoscope,
  store: Store,
  "trending-up": TrendingUp,
  users: Users,
  "utensils-crossed": UtensilsCrossed,
} satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof icons;

/** Resolve an icon name from API data. Unknown or missing names return undefined. */
export function getIcon(name: string | undefined): LucideIcon | undefined {
  if (!name || !Object.hasOwn(icons, name)) return undefined;
  return icons[name as IconName];
}
