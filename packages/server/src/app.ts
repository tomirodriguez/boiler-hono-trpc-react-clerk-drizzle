import { clerkMiddleware } from "@hono/clerk-auth";
import { trpcServer } from "@hono/trpc-server";
import { Hono } from "hono";
import { csrf } from "hono/csrf";
import { logger } from "hono/logger";
import { appRouter } from "./routers/_app";
import { createContext } from "./trpc/context";

const app = new Hono();

app.use(csrf());
app.use("*", logger());
app.use("*", clerkMiddleware());

app.use(
	"/api/trpc/*",
	trpcServer({
		endpoint: "/api/trpc",
		router: appRouter,
		createContext,
	}),
);

export default app;
