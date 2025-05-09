import { TRPCError, initTRPC } from "@trpc/server";
import type { Context } from "./trpc/context";

export const t = initTRPC.context<Context>().create();

export const router = t.router;

export const publicProcedure = t.procedure;

export const protectedProcedure = t.procedure.use(async function isAuth(opts) {
  const { ctx } = opts;

  if (!ctx.userId) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  return opts.next({
    ctx: {
      userId: ctx.userId,
    },
  });
});
