import { defaultShouldDehydrateQuery, isServer, QueryClient } from "@tanstack/react-query";
import { ApiError } from "@/lib/api/client";

function makeQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // Avoid an immediate refetch on the client right after SSR hydration.
        staleTime: 60 * 1000,
        retry: (failureCount, error) => {
          // 4xx responses are deterministic; retrying only adds latency.
          if (error instanceof ApiError && error.isClientError) return false;
          return failureCount < 2;
        },
      },
      dehydrate: {
        // Include pending queries so streaming SSR can hand them to the client.
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) || query.state.status === "pending",
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined;

/**
 * Server: a fresh client per request so data never leaks between users.
 * Browser: one client for the lifetime of the tab, created lazily so React
 * Suspense re-renders do not throw the cache away.
 */
export function getQueryClient(): QueryClient {
  if (isServer) return makeQueryClient();
  browserQueryClient ??= makeQueryClient();
  return browserQueryClient;
}
