/**
 * Creates context for an incoming request
 * @see https://trpc.io/docs/v11/context
 */
export async function createContext() {
	return {
		secrets: {
			SECRET_GREETING: "Hello, this is a secret greeting from the context!",
		},
	};
}

export type Context = Awaited<ReturnType<typeof createContext>>;
