import { pgTable, serial, varchar, boolean, json, text } from "drizzle-orm/pg-core";

export const USER_TABLE = pgTable("users", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).notNull(),
    isMember: boolean("is_member").default(false),
});

export const STUDY_MATERIAL_TABLE = pgTable("studyMaterial", {
    id: serial().primaryKey(),
    courseId: varchar().notNull(),
    courseType: varchar().notNull(),
    topic: varchar().notNull(),
    difficultLevel: varchar().default('Easy'),
    courseLayout: json(),
    createdBy: varchar().notNull(),
    status: varchar().default('Generating')
})

export const CHAPTER_NOTES_TABLE = pgTable("chapterNotes", {
    id: serial().primaryKey(),
    courseId: varchar().notNull(),
    chapterId: varchar().notNull(),
    notes: text("notes")
})

export const STUDY_TYPE_CONTENT_TABLE = pgTable("StudyTypeContent", {
    id: serial().primaryKey(),
    courseId: varchar().notNull(),
    content: json(),
    type: varchar().notNull(),
    status: varchar().default('Generating')
})