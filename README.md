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

## ⚙️ Environment Variables

Create a `.env.local` with the variables below (example):

```
NEXT_PUBLIC_DATABASE_CONNECTION_STRING=postgres://user:pass@host:port/db
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key
STRIPE_SECRET_KEY=sk_...
NEXT_PUBLIC_HOST_URL=http://localhost:3000
# Clerk env vars (as needed)
# Other secrets: any webhook signing secrets, API keys
```

Notes:
- The app expects a Postgres connection string (Neon or other Postgres provider).
- Gemini key is used by the AI generators in `configs/aiModel.js`.

---

## 🔁 Common Scripts

- `npm run dev` — Run Next.js dev server
- `npm run build` — Build for production
- `npm start` — Start production server
- `npm run inngest` — Starts Inngest dev (uses `npx inngest-cli@latest dev`)

---

## 🔍 Important Server Routes & Features

- `POST /api/generate-course-outline` — Generates course outline via Gemini and persists study material
- `POST /api/payment/checkout` — Creates Stripe checkout session
- Background event: `notes.generate` (Inngest) — generates notes after outline creation

---

## 📝 How to run locally

1. Clone and install dependencies
   ```bash
   npm install
   ```
2. Create `.env.local` with the necessary env vars
3. Run dev servers:
   ```bash
   npm run dev
   npm run inngest
   ```
4. Open `http://localhost:3000`

---



