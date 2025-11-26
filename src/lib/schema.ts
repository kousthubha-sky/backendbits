import { pgTable, text, timestamp, uuid, boolean, integer, jsonb } from "drizzle-orm/pg-core";
import { userAgent } from "next/server";

export const user = pgTable("user", {
  id: uuid("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").notNull().unique(),
  emailVerified: boolean("emailVerified").default(false),
  image: text("image"),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
  // Custom fields for your application
  role: text("role").default("user"),
  reputationScore: integer("reputationScore").default(0),
  githubUsername: text("githubUsername"),
  avatarUrl: text("avatarUrl"),
  bio: text("bio"),
  website: text("website"),
  location: text("location"),
  skills: jsonb("skills"),
  isVerified: boolean("isVerified").default(false),
  verificationBadge: text("verificationBadge"),
  joinedDate: timestamp("joinedDate").defaultNow(),
  lastActive: timestamp("lastActive").defaultNow(),
});

export const session = pgTable("session", {
  id: uuid("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  token: text("token").notNull().unique(),
  userId: uuid("userId").notNull().references(() => user.id, { onDelete: "cascade" }),
  expires: timestamp("expires").notNull(),
  ipAddress: text("ipAddress"),
  userAgent: text("userAgent"),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
  expiresAt: timestamp("expiresAt").defaultNow(),
});

export const account = pgTable("account", {
  id: uuid("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  accountId: text("accountId").notNull(),
  userId: uuid("userId").notNull().references(() => user.id, { onDelete: "cascade" }),
  type: text("type").notNull().default("credential"),
  provider: text("provider").notNull().default("credential"),
  providerId: text("providerId"),
  providerAccountId: text("providerAccountId").notNull().default(""),
  refresh_token: text("refresh_token"),
  access_token: text("access_token"),
  expires_at: integer("expires_at"),
  token_type: text("token_type"),
  scope: text("scope"),
  id_token: text("id_token"),
  session_state: text("session_state"),
  password: text("password"),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
});

export const verification = pgTable("verification", {
  id: uuid("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  identifier: text("identifier").notNull(),
  token: text("token").notNull().unique(),
  expires: timestamp("expires").notNull(),
});

// Additional tables for the application
export const templates = pgTable("templates", {
  id: uuid("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  title: text("title").notNull(),
  description: text("description").notNull(),
  githubUrl: text("githubUrl").notNull().unique(),
  category: text("category").notNull(),
  techStack: jsonb("techStack"),
  features: jsonb("features"),
  deployment: jsonb("deployment"),
  useCases: jsonb("useCases"),
  status: text("status").default("pending"),
  submittedBy: uuid("submittedBy").references(() => user.id),
  publishedAt: timestamp("publishedAt"),
  version: integer("version").default(1),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
});

export const template_submissions = pgTable("template_submissions", {
  id: uuid("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  submitterId: uuid("submitterId").notNull().references(() => user.id, { onDelete: "cascade" }),
  submitterName: text("submitterName"),
  status: text("status").default("submitted"),
  submittedAt: timestamp("submittedAt").defaultNow(),
  lastReviewedAt: timestamp("lastReviewedAt"),
  title: text("title").notNull(),
  description: text("description").notNull(),
  githubUrl: text("githubUrl").notNull(),
  category: text("category").notNull(),
  techStack: jsonb("techStack"),
  features: jsonb("features"),
  deployment: jsonb("deployment"),
  useCases: jsonb("useCases"),
  reviewNotes: jsonb("reviewNotes"),
  version: integer("version").default(1),
});