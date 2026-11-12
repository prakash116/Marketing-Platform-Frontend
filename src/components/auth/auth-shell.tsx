import { AuthFlow } from "./auth-flow";
import { BrandPanel, type AuthVariant } from "./brand-panel";

/** Split screen on desktop (brand panel left, form right); form only below 1024px. */
export function AuthShell({ variant }: { variant: AuthVariant }) {
  return (
    <div className="flex min-h-dvh flex-1 bg-card">
      <BrandPanel variant={variant} />
      <AuthFlow mode={variant} />
    </div>
  );
}
