# Contributing to Portfolio

Thank you for your interest in this project! This repository is open source under the MIT License, which means you are free to fork it, clone it, and use it as a template for your own personal portfolio.

## Getting Started

To get a local copy up and running, follow these simple steps.

### 1. Prerequisites

- [Node.js](https://nodejs.org/en/) (v18 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- A [Supabase](https://supabase.com/) account and project (for PostgreSQL)
- A Gmail account with an App Password (for Nodemailer contact form)

### 2. Installation

1. **Fork and Clone the repository**
   ```sh
   git clone https://github.com/YOUR_USERNAME/PortFolio-NV.git
   cd PortFolio-NV
   ```

2. **Install NPM packages**
   ```sh
   npm install
   ```

3. **Set up Environment Variables**
   Duplicate `.env.example` and rename it to `.env`. Fill in the values:
   ```sh
   DATABASE_URL="your-supabase-connection-string"
   DIRECT_URL="your-supabase-direct-connection-string"
   ADMIN_PASSWORD="a-strong-password-for-the-dashboard"
   GMAIL_USER="your-email@gmail.com"
   GMAIL_APP_PASSWORD="your-16-character-app-password"
   ```

4. **Initialize the Database**
   Push the Prisma schema to your Supabase database:
   ```sh
   npx prisma db push
   ```

5. **Run the Development Server**
   ```sh
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.

## Customizing for Yourself

1. **Brand and Colors**: Open `tailwind.config.ts` and change the `neon` hex code to any color you like (e.g., `#3b82f6` for blue, `#ec4899` for pink).
2. **Text & Content**: Update the copy in `src/components/sections/Hero.tsx` to match your own details.
3. **Admin Dashboard**: Go to `http://localhost:3000/admin`, log in with your `ADMIN_PASSWORD`, and start adding your own projects, skills, and certificates!

## Submitting Pull Requests

If you find a bug or have a feature enhancement for the core template:
1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
