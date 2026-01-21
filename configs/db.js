import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const connectionString = process.env.NEXT_PUBLIC_DATABASE_CONNECTION_STRING;

if (!connectionString) {
  throw new Error("DATABASE_URL is missing");
}

const client = postgres(connectionString);
export const db = drizzle(client);



