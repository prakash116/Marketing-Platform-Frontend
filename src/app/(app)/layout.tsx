import { AppHeader } from "@/components/app-header/app-header";

export default function AppLayout({ children }: LayoutProps<"/">) {
  // Header data is read on the client via useAppHeaderData(). When it comes from
  // `GET /me/header`, prefetch it here inside <Suspense> + HydrationBoundary
  // (that makes the route per-request, which Cache Components requires).
  return (
    <>
      <AppHeader />
      {children}
    </>
  );
}
