import { db } from "@train/database";
import type { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";

/**
 * Defines your inner context shape.
 * Add fields here that the inner context brings.
 */
interface CreateInnerContextOptions
	extends Partial<FetchCreateContextFnOptions> {
	session: string | null;
}

/**
 * Inner context. Will always be available in your procedures, in contrast to the outer context.
 *
 * Also useful for:
 * - testing, so you don't have to mock Next.js' `req`/`res`
 * - tRPC's `createServerSideHelpers` where we don't have `req`/`res`
 *
 * @see https://trpc.io/docs/v11/context#inner-and-outer-context
 */
export async function createContextInner(opts?: CreateInnerContextOptions) {
	return {
		db,
		session: opts?.session,
	};
}

/**
 * Outer context. Used in the routers and will e.g. bring `req` & `res` to the context as "not `undefined`".
 *
 * @see https://trpc.io/docs/v11/context#inner-and-outer-context
 */
export async function createContext(opts: FetchCreateContextFnOptions) {
	const session = "111111";
	const contextInner = await createContextInner({ session });

	return {
		...contextInner,
		...opts,
	};
}

export type Context = Awaited<ReturnType<typeof createContext>>;
