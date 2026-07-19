<div align="center">
  <img src="https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white" alt="Prisma" />
  <img src="https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" alt="Supabase" />
</div>

<br />

# Nisarg Vaghela — Portfolio

> A full-stack personal portfolio built with **Next.js 16**, **Prisma 7**, and **Supabase** — featuring a live project showcase, secure admin panel, and a contact form backed by Nodemailer & Gmail SMTP.

![Portfolio Preview](https://res.cloudinary.com/dic4befjx/image/upload/v1784497917/ezgif.com-video-to-gif-converter_2_wh3gzy.gif)

---

## ✨ Features

- **Dynamic Showcase** — Projects, skills, and certificates are stored in Supabase and fetched server-side on every request via Prisma. 
- **Contact Form (Gmail SMTP)** — Messages submitted by visitors are routed securely using `Nodemailer` directly through Gmail (no paid third-party email APIs required).
- **Admin Dashboard** — A secure `/admin` page lets you add, edit, or delete projects/skills/certificates without touching code. Secured via middleware.
- **Glassmorphism & Cyberpunk UI** — Sticky blurred navbar, Matrix rain animations, smooth scroll progress, and custom floating dock.
- **Dark Mode** — Full dark/light mode support engineered with Tailwind CSS v4.
- **Zero Client-Side Data Fetching** — The homepage is a React Server Component; Prisma queries run entirely on the server for maximum performance and SEO.

---

## 🗂️ Project Structure

```
portfolio/
├── prisma/
│   ├── schema.prisma          # Database models (Project, Message, Skill, Certificate)
│   └── migrations/            # SQL migration history
├── src/
│   ├── app/
│   │   ├── layout.tsx         # Root layout — nav, footer, UI wrappers
│   │   ├── page.tsx           # Homepage (Server Component)
│   │   ├── admin/             # Admin dashboard & login
│   │   └── actions/           # Server Actions (Contact, Projects, Skills)
│   └── components/
│       ├── admin/             # CMS tools and data entry forms
│       ├── layout/            # Navigations, overlays, boundaries
│       ├── metrics/           # Statistics, GitHub tracking, counters
│       ├── sections/          # Major landing page chunks (Hero, Skills)
│       └── ui/                # Reusable animations, glimmers, blocks
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
| Styling | Tailwind CSS v4 & Framer Motion |
| ORM | Prisma 7 (driver adapter pattern) |
| Database | PostgreSQL via [Supabase](https://supabase.com) |
| Email Service | Nodemailer + Gmail App Passwords |
| Font | Inter (Google Fonts) |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- A [Supabase](https://supabase.com) project (free tier works)
- A Google Account with 2FA enabled (for Gmail App Password)

### 1. Clone the repository

```bash
git clone https://github.com/nisargvghl27/portfolio.git
cd portfolio
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file at the project root based on `.env.example`:

```env
# Database Connections
DATABASE_URL="postgresql://postgres.[ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres"
DIRECT_URL="postgresql://postgres.[ref]:[password]@aws-0-[region].supabase.com:5432/postgres"

# Admin Dashboard Password
ADMIN_PASSWORD="your_secure_password"

# Gmail SMTP Configuration
GMAIL_USER="your.email@gmail.com"
GMAIL_APP_PASSWORD="your_16_char_app_password"
```

> **Where to find these:** 
> - **Supabase**: Dashboard → Project → Settings → Database → Connection string.  
> - **Gmail**: Google Account → Security → 2-Step Verification → App Passwords.

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

## 🔐 Environment Variables

| Variable | Required | Description |
|---|---|---|
| `DATABASE_URL` | ✅ | Supabase pooler connection (port 6543) |
| `DIRECT_URL` | ✅ | Supabase direct connection (port 5432) |
| `ADMIN_PASSWORD` | ✅ | Password to unlock the `/admin` dashboard routes |
| `GMAIL_USER` | ✅ | The Gmail address used to send/receive contact emails |
| `GMAIL_APP_PASSWORD` | ✅ | The 16-character App Password generated from Google |

> ⚠️ **Never commit your `.env` file.** It is already listed in `.gitignore`.

---

## 📬 Admin Panel

Navigate to [http://localhost:3000/admin](http://localhost:3000/admin) to manage your portfolio dynamically.
The `/admin` routes are protected by Next.js `middleware.ts`. You must log in using the `ADMIN_PASSWORD` defined in your `.env` file.

From the Admin Dashboard you can:
- **Projects**: Add, Edit, or Delete projects (Tech Stack, URLs, Impact Metrics).
- **Skills**: Manage your technical arsenal.
- **Certificates**: Upload and order your academic credentials.
- **Messages**: View messages submitted via the Contact form, and reply to them directly via Gmail SMTP.

After submitting any changes, the homepage updates instantly via `revalidatePath('/')`.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">
  Built by <strong>Nisarg Vaghela</strong> · Full-Stack AI & Software Engineer
</div>
