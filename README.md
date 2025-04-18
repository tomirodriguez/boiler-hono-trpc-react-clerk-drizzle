# 🚀 Hono + tRPC + React + Clerk + Drizzle Boilerplate

This boilerplate provides a solid foundation to build modern full-stack apps using:

- **Hono** as the backend framework.
- **tRPC** for fully typesafe APIs.
- **React + Vite** for the frontend.
- **Clerk** for authentication and user management.
- **Drizzle ORM** for PostgreSQL.
- **Turborepo** to manage a scalable monorepo setup.

---

## 📁 Project Structure

Organized using Turborepo:

```
boiler-hono-trpc-react-clerk-drizzle/
├── apps/
│   └── webapp/             # React frontend app
├── packages/
│   ├── db/                 # Drizzle ORM config and schema definitions
│   └── trpc/               # tRPC router and context
├── .husky/                 # Git hooks
├── docker-compose.yml      # Dev Docker setup
├── turbo.json              # Turborepo configuration
├── package.json            # Root dependencies and scripts
├── pnpm-workspace.yaml     # pnpm workspace setup
```

---

## 🧰 Tech Stack

| Layer        | Technology |
|-------------|------------|
| Backend      | [Hono](https://hono.dev), [tRPC](https://trpc.io) |
| Frontend     | [React](https://react.dev), [Vite](https://vitejs.dev), [Shadcn](https://ui.shadcn.com/), [TailwindcssV4](https://tailwindcss.com/) |
| Auth         | [Clerk](https://clerk.com) |
| ORM / DB     | [Drizzle ORM](https://orm.drizzle.team), PostgreSQL |
| Monorepo     | [Turborepo](https://turbo.build/repo) |
| Dev Tools    | TypeScript, Docker, pnpm, bun, Biome |

---

## 🚀 Getting Started

### Prerequisites

- Node.js ≥ 18aa
- pnpm
- Docker (for local PostgreSQL)
- Bun (to run the server)

### Setup

Clone the repository

```bash
git clone https://github.com/tomirodriguez/boiler-hono-trpc-react-clerk-drizzle.git
cd boiler-hono-trpc-react-clerk-drizzle
```

Install the dependencies

```bash
pnpm install
```

You could search inside the project for `myapp` and replace it with your desired name.

Update `.env` variables with your Clerk keys and PostgreSQL connection string. Use the `.env.example` files as guide.

```bash
- app/webapp/.env.example
- packages/server/.env.example
- packages/database/.env.example
```

Create the database tables

```bash
pnpm -F @myapp/database start
pnpm -F @myapp/database push
```

### Start Dev Environment

```bash
# If using the docker database for development, you should start it first
pnpm -F @myapp/database start

# Run dev webapp
pnpm dev:app
```

---

## Extras

A playground for TRPC queries and mutations is included. On development, you can access the [tRPC Panel](Http://localhost:8787/api/trpc/panel)

---

## 🧪 Testing

Coming soon...

---

## 🏗️ Roadmap

- [ ] Add testing setup (Vitest / Playwright)
- [ ] Add CI/CD (e.g., GitHub Actions)
- [ ] Add CLI for scaffolding new features
- [ ] Deployment examples (Cloudflare, Vercel)

---

## 📄 License

MIT - [See License](https://opensource.org/license/mit)
