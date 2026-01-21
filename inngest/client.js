// inngest/client.js

// REMOVE: import { allFunctions } from "./functions"; 
import { Inngest } from "inngest";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "AI-LMS" });

// REMOVE: export const functions = allFunctions;
// The functions will be imported directly in the route handler.