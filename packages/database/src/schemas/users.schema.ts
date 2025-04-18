import { integer, pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import type { InferSelectModel } from "drizzle-orm/table";

export const userTable = pgTable("users", {
  id: uuid("id").primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  age: integer().notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
});

export type User = InferSelectModel<typeof userTable>;
