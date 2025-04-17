import app from "./app";

if (import.meta.main) {
	const port = 8787;
	console.log(`🚀 Server ready on http://localhost:${port}/api/trpc`);
	Bun.serve({ port: 8787, fetch: app.fetch });
}
