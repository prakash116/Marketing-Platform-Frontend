import { queryOptions, useQuery } from "@tanstack/react-query";
import { appHeaderMock, type AppHeaderData } from "@/mocks/app-header";

export const appHeaderQuery = queryOptions({
  queryKey: ["me", "header"],
  // TODO: replace with `apiClient.get<AppHeaderData>("/me/header")` once the endpoint exists.
  queryFn: async (): Promise<AppHeaderData> => appHeaderMock,
});

/** Business, user, credits and unread count for the app header. */
export function useAppHeaderData() {
  return useQuery(appHeaderQuery);
}
