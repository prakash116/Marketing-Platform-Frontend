import type { Metadata } from "next";
import { AuthShell } from "@/components/auth/auth-shell";

export const metadata: Metadata = {
  title: "Create your free account",
};

export default function SignupPage() {
  return <AuthShell variant="signup" />;
}
