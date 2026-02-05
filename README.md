# AI-LMS ⚡

**AI-powered Learning Management System** — a Next.js app that helps creators and learners generate course outlines, flashcards, notes, quizzes and more using Google Generative AI. It includes subscription payments (Stripe), auth (Clerk), background tasks (Inngest), and a Postgres database via Drizzle ORM.

---

## 🚀 Highlights

- **Next.js 16** (app directory) with server components and client components
- **Auth**: Clerk for user sign-in and profile management
- **AI**: Google Generative AI (Gemini) for course outlines, notes, flashcards, and quiz generation
- **Database**: Postgres (Neon recommended) with **Drizzle ORM**
- **Payments**: Stripe Checkout for subscriptions
- **Background processing**: Inngest for async tasks (notes generation, etc.)
- **Styling**: Tailwind CSS + utilities

---

## 🔧 Tech Stack & Key Libraries

- next, react, react-dom
- @clerk/nextjs
- @google/genai / @google/generative-ai
- drizzle-orm, drizzle-kit
- postgres (node driver)
- stripe
- inngest
- tailwindcss
- sonner (toasts), lucide-react (icons), radix (UI primitives)

---

## 📁 Project Structure (important folders)

- `app/` — Next.js app routes and UI (pages like course, dashboard, create)
  - `app/api/` — server routes (e.g., `generate-course-outline`, `payment/checkout`, `user-subscription`)
  - `app/course/` — course pages (flashcards, quiz, notes, QA)
  - `app/dashboard/` — user dashboard and upgrade flow
- `configs/` — DB and AI model configuration (`db.js`, `aiModel.js`, `schema.js`)
- `inngest/` — background functions and client
- `components/` — shared UI components
- `lib/` — utilities

---




