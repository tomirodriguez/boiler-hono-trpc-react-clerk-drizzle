import { QueryClient } from "@tanstack/react-query";
import type { AppRouter } from "@train/server/trpc";
import { createTRPCClient, httpBatchLink } from "@trpc/client";
import { createTRPCOptionsProxy } from "@trpc/tanstack-react-query";

export const queryClient = new QueryClient();

const trpcClient = createTRPCClient<AppRouter>({
	links: [
		httpBatchLink({
			url: "api/trpc",
		}),
	],
});

export const trpc = createTRPCOptionsProxy<AppRouter>({
	client: trpcClient,
	queryClient,
});
