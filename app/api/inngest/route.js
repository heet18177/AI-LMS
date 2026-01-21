// app/api/inngest/route.js
import { serve } from "inngest/next";
// Import the client (inngest) from the client file
import { inngest } from "../../../inngest/client";
// Import the functions array (allFunctions) directly from the functions file
import { allFunctions } from "../../../inngest/functions";

// Create an API that serves ALL functions
export const { GET, POST, PUT } = serve({
    client: inngest,
    functions: allFunctions, // <-- Use the directly imported 'allFunctions' array
});

// Optional: Increase timeout
export const maxDuration = 300;