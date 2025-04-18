import { router } from "../trpc";
import { usersRouter } from "./user";

export const appRouter = router({
	user: usersRouter,
});

export type AppRouter = typeof appRouter;
