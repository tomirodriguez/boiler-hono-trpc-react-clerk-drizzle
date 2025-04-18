import { clerkMiddleware } from "@hono/clerk-auth";
import { trpcServer } from "@hono/trpc-server";
import { Hono } from "hono";
import { env } from "hono/adapter";
import { csrf } from "hono/csrf";
import { logger } from "hono/logger";
import { appRouter } from "./routers/_app";
import { createContext } from "./trpc/context";

const app = new Hono();

app.use(csrf());
app.use("*", logger());
app.use("*", clerkMiddleware());

app.use("/api/trpc/panel", async (ctx) => {
  const { ENVIRONMENT } = env<{ ENVIRONMENT: string }>(ctx);

  if (ENVIRONMENT !== "development") {
    return ctx.text("Not Found", 404);
  }

  const { renderTrpcPanel } = await import("trpc-ui");

  return ctx.html(
    renderTrpcPanel(appRouter, {
      url: "http://localhost:8787/api/trpc",
      meta: {
        title: "tRPC Panel",
        description: "Playground to test tRPC endpoints.",
      },
    }),
  );
});

app.use(
  "/api/trpc/*",
  trpcServer({
    endpoint: "/api/trpc",
    router: appRouter,
    createContext,
  }),
);

export default app;
