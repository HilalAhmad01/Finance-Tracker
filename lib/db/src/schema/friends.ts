import { pgTable, serial, text, integer, real } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const friendsTable = pgTable("friends", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  username: text("username").notNull().unique(),
  avatarColor: text("avatar_color").notNull().default("#39FF14"),
  upiId: text("upi_id"),
  frugalityScore: integer("frugality_score").notNull().default(0),
  totalOwed: real("total_owed").notNull().default(0),
});

export const insertFriendSchema = createInsertSchema(friendsTable).omit({ id: true });
export type InsertFriend = z.infer<typeof insertFriendSchema>;
export type Friend = typeof friendsTable.$inferSelect;
