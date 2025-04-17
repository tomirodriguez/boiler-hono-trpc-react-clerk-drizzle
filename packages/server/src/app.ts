import { trpcServer } from "@hono/trpc-server";
import { Hono } from "hono";
import { logger } from "hono/logger";
import { createContext } from "./trpc/context";
import { appRouter } from "./trpc/router";

const app = new Hono();

app.use("*", logger());

app.use(
	"/api/trpc/*",
	trpcServer({
		endpoint: "/api/trpc",
		router: appRouter,
		createContext,
	}),
);

export default app;
