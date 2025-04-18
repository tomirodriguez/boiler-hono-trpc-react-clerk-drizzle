import "dotenv/config";

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schemas";

if (!process.env.DATABASE_URL) {
	throw new Error("You must set up a DATABASE_URL in your .env variables");
}

const connection = postgres(process.env.DATABASE_URL!, { prepare: false });

export const db = drizzle(connection, { schema });
