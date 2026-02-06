// app/layout.js  ✅ SERVER COMPONENT
import { Outfit } from "next/font/google";
import "./globals.css";
import ClerkProviderClient from "./ClerkProviderClient";
import Provider from "./provider";
import { Toaster } from "sonner";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata = {
  title: "Learnify AI - AI Powered LMS",
  description: "Master any subject with AI-powered course generation, flashcards, and quizzes.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={outfit.className} suppressHydrationWarning>
        <ClerkProviderClient>
          <Provider>{children}</Provider>
          <Toaster />
        </ClerkProviderClient>
      </body>
    </html>
  );
}
