import { trpcServer } from "@hono/trpc-server";
import { Hono } from "hono";
import { logger } from "hono/logger";
import { appRouter } from "./routers/_app";
import { createContext } from "./trpc/context";

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
