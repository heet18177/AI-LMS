import { defineConfig } from "drizzle-kit";
import dotenv from "dotenv";

// explicitly load .env.local
dotenv.config({ path: ".env.local" });
export default defineConfig({
    dialect: "postgresql",
    schema: "./configs/schema.js",
    dbCredentials: {
        url: process.env.NEXT_PUBLIC_DATABASE_CONNECTION_STRING,
    },
});
