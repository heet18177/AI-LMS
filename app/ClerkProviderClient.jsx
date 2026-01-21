
"use client";

import { ClerkProvider } from "@clerk/nextjs";

export default function ClerkProviderClient({ children }) {
  return <ClerkProvider>{children}</ClerkProvider>;
}
