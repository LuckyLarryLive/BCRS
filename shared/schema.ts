import { sql } from "drizzle-orm";
import { pgTable, text, varchar, numeric, boolean, timestamp, uuid } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  walletAddress: text("wallet_address").unique(),
  briksBalance: numeric("briks_balance").default("15000"),
  hasCompletedTutorial: boolean("has_completed_tutorial").default(false),
  username: text("username"),
  netWorth: numeric("net_worth").default("0"),
  rank: numeric("rank").default("0"),
  createdAt: timestamp("created_at").default(sql`now()`),
});

export const properties = pgTable("properties", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  price: numeric("price").notNull(),
  briksPrice: numeric("briks_price").notNull(),
  location: text("location").notNull(),
  propertyType: text("property_type").notNull(),
  income: numeric("income").notNull(),
  demand: numeric("demand").notNull(),
  rarity: text("rarity").notNull(),
  condition: numeric("condition").default("100"),
  imageUrl: text("image_url"),
  features: text("features").array(),
  bedrooms: numeric("bedrooms"),
  bathrooms: numeric("bathrooms"),
  sqft: numeric("sqft"),
  yearBuilt: numeric("year_built"),
  monthlyIncome: numeric("monthly_income"),
  annualROI: numeric("annual_roi"),
  ownerId: uuid("owner_id").references(() => users.id),
  listingDate: timestamp("listing_date").default(sql`now()`),
});

export const transactions = pgTable("transactions", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: uuid("user_id").references(() => users.id).notNull(),
  propertyId: uuid("property_id").references(() => properties.id),
  type: text("type").notNull(), // "purchase", "sale", "rent_payment"
  amount: numeric("amount").notNull(),
  createdAt: timestamp("created_at").default(sql`now()`),
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});

export const insertPropertySchema = createInsertSchema(properties).omit({
  id: true,
  listingDate: true,
});

export const insertTransactionSchema = createInsertSchema(transactions).omit({
  id: true,
  createdAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertProperty = z.infer<typeof insertPropertySchema>;
export type Property = typeof properties.$inferSelect;
export type InsertTransaction = z.infer<typeof insertTransactionSchema>;
export type Transaction = typeof transactions.$inferSelect;
