import { protectedProcedure, publicProcedure, router } from "../trpc";

export const usersRouter = router({
	list: publicProcedure.query(async ({ ctx }) => {
		const users = await ctx.db.query.userTable.findMany({
			limit: 5,
		});

		return { users };
	}),

	privateData: protectedProcedure.query(async ({ ctx }) => {
		const clerkClient = ctx.honoCtx.get("clerk");

		const user = await clerkClient.users.getUser(ctx.userId);

		return { user };
	}),
});
