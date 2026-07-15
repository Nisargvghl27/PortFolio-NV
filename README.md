# Nisarg Vaghela — Portfolio

> A full-stack personal portfolio built with **Next.js 16**, **Prisma 7**, and **Supabase** — featuring a live project showcase and a contact form backed by a real PostgreSQL database.

---

## ✨ Features

- **Dynamic Project Showcase** — Projects are stored in Supabase and fetched server-side on every request via Prisma. No static data.
- **Contact Form** — Messages submitted by visitors are saved directly to the database using Next.js Server Actions.
- **Admin Dashboard** — A private `/admin` page lets you add new projects (title, description, tech stack, GitHub/live links) without touching code.
- **Glassmorphism Navigation** — Sticky, blurred navbar with smooth scroll behaviour.
- **Dark Mode** — Full dark/light mode support with Tailwind CSS v4.
- **Premium UI** — Animated project cards with hover lift effects, gradient hero text, and rounded glass-card contact section.
- **Zero Client-Side Data Fetching** — The homepage is a React Server Component; Prisma queries run entirely on the server.

---

## 🗂️ Project Structure

```
portfolio/
├── prisma/
│   ├── schema.prisma          # Database models (Project, Message)
│   └── migrations/            # SQL migration history
├── src/
│   ├── app/
│   │   ├── layout.tsx         # Root layout — nav, footer, Inter font
│   │   ├── page.tsx           # Homepage (Server Component)
│   │   ├── admin/
│   │   │   └── page.tsx       # Admin dashboard — add projects
│   │   └── actions/
│   │       ├── contact.ts     # Server Action — save contact messages
│   │       └── project.ts     # Server Action — publish new projects
│   └── components/
│       └── ContactForm.tsx    # Client Component — contact form UI
├── prisma.config.ts           # Prisma 7 CLI config (uses DIRECT_URL)
├── .env                       # Environment variables (never commit this)
└── package.json
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 16](https://nextjs.org) (App Router, Turbopack) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| ORM | Prisma 7 (driver adapter pattern) |
| Database | PostgreSQL via [Supabase](https://supabase.com) |
| DB Adapter | `@prisma/adapter-pg` + `pg` |
| Font | Inter (Google Fonts) |
| Hosting | (Your deployment platform) |

---

## 🗄️ Database Schema

```prisma
model Project {
  id          String   @id @default(uuid())
  title       String
  description String
  techStack   String[]
  githubLink  String?
  liveLink    String?
  imageUrl    String?
  featured    Boolean  @default(false)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model Message {
  id        String   @id @default(uuid())
  name      String
  email     String
  message   String
  createdAt DateTime @default(now())
}
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- A [Supabase](https://supabase.com) project (free tier works)

### 1. Clone the repository

```bash
git clone https://github.com/your-username/portfolio.git
cd portfolio
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file at the project root:

```env
# Pooler connection — used by the app at runtime (port 6543)
DATABASE_URL="postgresql://postgres.[ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres"

# Direct connection — used by Prisma CLI for migrations (port 5432)
DIRECT_URL="postgresql://postgres.[ref]:[password]@aws-0-[region].supabase.com:5432/postgres"
```

> **Where to find these:** Supabase Dashboard → Project → Settings → Database → Connection string.  
> Use the **Transaction pooler** string for `DATABASE_URL` and the **Direct connection** string for `DIRECT_URL`.

### 4. Run database migrations

```bash
npx prisma migrate dev --name init
```

### 5. Generate the Prisma client

```bash
npx prisma generate
```

### 6. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📋 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server with Turbopack |
| `npm run build` | Build the production bundle |
| `npm run start` | Start the production server |
| `npm run lint` | Run ESLint |
| `npx prisma migrate dev` | Create and apply a new migration |
| `npx prisma generate` | Regenerate the Prisma client after schema changes |
| `npx prisma studio` | Open the Prisma visual database browser |

---

## ⚙️ Architecture Notes

### Why two database URLs?

Supabase's connection pooler (PgBouncer on port **6543**) uses **transaction mode**, which doesn't support the prepared statements that Prisma's migration engine requires.

- **`DATABASE_URL`** (port 6543, pooler) → used by the running Next.js app via `@prisma/adapter-pg` — handles concurrent connections efficiently.
- **`DIRECT_URL`** (port 5432, direct) → used only by the Prisma CLI (`migrate`, `generate`, `studio`) — bypasses PgBouncer so migrations work correctly.

### Prisma 7 + Next.js

Prisma 7 removed the ability to set `url`/`directUrl` inside `schema.prisma`. Instead:
- **CLI config** lives in `prisma.config.ts` (uses `DIRECT_URL`)
- **Runtime client** is created with `@prisma/adapter-pg` (uses `DATABASE_URL`)

```ts
// src/lib/prisma.ts
import { PrismaClient } from '.prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
export const prisma = new PrismaClient({ adapter })
```

### Server Actions

Forms use Next.js [Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations) — no API routes needed. The `'use server'` directive marks functions that run exclusively on the server, keeping database credentials out of the browser bundle.

---

## 🔐 Environment Variables

| Variable | Required | Description |
|---|---|---|
| `DATABASE_URL` | ✅ | Supabase pooler connection (port 6543) |
| `DIRECT_URL` | ✅ | Supabase direct connection (port 5432) |

> ⚠️ **Never commit your `.env` file.** It is already listed in `.gitignore`.

---

## 📬 Admin Panel

Navigate to [http://localhost:3000/admin](http://localhost:3000/admin) to add new projects to your portfolio.

Fields:
- **Title** — The project name
- **Description** — What the project does
- **Tech Stack** — Comma-separated list (e.g. `Next.js, TypeScript, Prisma`)
- **GitHub Link** *(optional)* — Link to the source code repository
- **Live Demo Link** *(optional)* — Link to the deployed app

After submitting, the homepage updates instantly via `revalidatePath('/')`.

> 💡 **Tip:** For a production deployment, protect `/admin` behind authentication (e.g. [NextAuth.js](https://next-auth.js.org) or [Clerk](https://clerk.com)).

---

## 📄 License

MIT — feel free to use this as a template for your own portfolio.

---

<div align="center">
  Built by <strong>Nisarg Vaghela</strong> · Full-Stack AI & Software Engineer
</div>
