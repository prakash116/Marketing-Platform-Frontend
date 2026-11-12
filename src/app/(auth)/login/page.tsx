import type { Metadata } from "next";
import { AuthShell } from "@/components/auth/auth-shell";

export const metadata: Metadata = {
  title: "Log in",
};

export default function LoginPage() {
  return <AuthShell variant="login" />;
}
