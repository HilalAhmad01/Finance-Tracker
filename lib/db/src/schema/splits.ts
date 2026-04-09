import { pgTable, serial, text, real, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const splitsTable = pgTable("splits", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  totalAmount: real("total_amount").notNull(),
  splitType: text("split_type").notNull().default("equal"),
  participants: jsonb("participants").notNull().default([]),
  settled: boolean("settled").notNull().default(false),
  upiMethod: text("upi_method"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertSplitSchema = createInsertSchema(splitsTable).omit({ id: true, createdAt: true });
export type InsertSplit = z.infer<typeof insertSplitSchema>;
export type Split = typeof splitsTable.$inferSelect;
