import { getAuth } from "@hono/clerk-auth";
import { db } from "@train/database";
import type { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import type { Context as HonoContext } from "hono";

/**
 * Defines your inner context shape.
 * Add fields here that the inner context brings.
 */
interface CreateInnerContextOptions
	extends Partial<FetchCreateContextFnOptions> {
	userId?: string | null;
	c: HonoContext;
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
export async function createContextInner(opts: CreateInnerContextOptions) {
	return {
		db,
		userId: opts.userId,
		honoCtx: opts.c,
	};
}

/**
 * Outer context. Used in the routers and will e.g. bring `req` & `res` to the context as "not `undefined`".
 *
 * @see https://trpc.io/docs/v11/context#inner-and-outer-context
 */
export async function createContext(
	opts: FetchCreateContextFnOptions,
	c: HonoContext,
) {
	const auth = getAuth(c);
	const contextInner = await createContextInner({ userId: auth?.userId, c });

	return {
		...contextInner,
		...opts,
	};
}

export type Context = Awaited<ReturnType<typeof createContext>>;
