import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    // Prefetched route data is treated as immediately stale so a page always
    // shows current data when someone lands on it.
    defaultPreloadStaleTime: 0,
  });

  return router;
};
