import { initTRPC } from "@trpc/server";
import type { Context } from "./context";

const t = initTRPC.context<Context>().create();

const publicProcedure = t.procedure;
const router = t.router;

export const appRouter = router({
	hello: publicProcedure.query(({ ctx }) => {
		return { greeting: ctx.secrets.SECRET_GREETING };
	}),
});

export type AppRouter = typeof appRouter;
