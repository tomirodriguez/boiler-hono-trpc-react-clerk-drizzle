import { publicProcedure, router } from "../trpc";

export const usersRouter = router({
	list: publicProcedure.query(async ({ ctx }) => {
		const users = await ctx.db.query.usersTable.findMany({
			limit: 5,
		});

		return { users };
	}),
});
