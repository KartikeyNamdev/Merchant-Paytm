# 💳 Paytm - Full-Stack Digital Wallet

This project is a full-stack clone of the Paytm digital wallet, built with a modern, scalable, and type-safe stack. It features a complete monorepo architecture using **Turborepo** to manage separate applications for users, merchants, and backend services.

The primary `user-app` allows users to manage their wallet, send money to other users (P2P), and add funds from their bank via a simulated bank onramp. The entire system is built for reliability, using **PostgreSQL** and **Prisma** to ensure database integrity and **ACID properties** for all financial transactions.

### ✨ [Live Demo (User App)](https://roaring-starship-fbf52b.netlify.app/)

---

## 📸 Screenshots

|                   Landing Page                   | Dashboard Overview |
| :----------------------------------------------: | :----------------: |
| ![Landing Page](./public/screenshot-landing.png) |         !          |

_(To add these: create a `docs` folder in your project root, add your screenshots, and commit them.)_

---

## 🚀 Core Features

- **User Authentication:** Secure sign-up and sign-in using NextAuth.
- **P2P (Peer-to-Peer) Transfers:** Instantly send money to other users on the platform.
- **Wallet Management:** A personal digital wallet to hold and manage funds.
- **Add Money:** Simulate adding money to the wallet via a bank onramp.
- **Transaction History:** A complete, filterable list of all P2P and onramp transactions.
- **Decoupled Architecture:** Built as a monorepo with separate frontends and backend services.
- **Asynchronous Webhooks:** A dedicated `bank-webhook` service to process bank transfers asynchronously.

---

## 🛠️ Architecture & Tech Stack

This project uses a **Turborepo** monorepo to manage multiple applications and shared packages.

### Core Technologies

- **Monorepo:** [Turborepo](https://turbo.build/repo)
- **Framework:** [Next.js](https://nextjs.org/) (React)
- **Backend:** [Node.js](https://nodejs.org/) (for `bank-webhook` service)
- **Database:** [PostgreSQL](https://www.postgresql.org/)
- **ORM:** [Prisma](https://www.prisma.io/)
- **Authentication:** [NextAuth.js](https://next-auth.js.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Deployment:** Docker, Vercel/Netlify

### Project Structure

```
merchant-paytm/
├── apps/
│   ├── bank-webhook/  # Node.js service for bank webhooks
│   ├── merchant-app/  # Next.js app for merchants
│   └── user-app/      # Main Next.js app for users
├── packages/
│   ├── db/            # Shared Prisma schema and database client
│   └── ui/            # Shared React component library
├── .gitignore
├── package.json
└── turbo.json         # Turborepo configuration
```

---

## 💡 Principles Implemented

- **ACID Properties:** All P2P transfers are executed inside a `prisma.$transaction`. This ensures that debiting the sender and crediting the receiver is an **atomic** operation: it either fully completes or fails entirely, preventing data inconsistency.
- **Separation of Concerns:** By splitting the app into a `user-app`, `merchant-app`, and a `bank-webhook` service, we create a more resilient and scalable system. The `bank-webhook` can process payments independently without blocking the user-facing application.

---

## 🏁 Getting Started (Local Development)

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [npm](https://npm.io/) (or `npm`/`yarn`)
- [Docker](https://www.docker.com/) (for running PostgreSQL)

### 1. Clone the repository

```bash
git clone https://github.com/KartikeyNamdev/Merchant-Paytm
cd merchant-paytm
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up the Database (Docker)

1. Run the PostgreSQL database using Docker:

```bash
docker run --name paytm-db -e POSTGRES_PASSWORD=mysecretpassword -p 5432:5432 -d postgres
```

2. Create a `.env` file in the root of the project (or in `apps/user-app`).

**You must do this, or Prisma will fail.**

```bash
# .env
DATABASE_URL="postgresql://postgres:mysecretpassword@localhost:5432/postgres"

# For NextAuth
NEXTAUTH_URL="http://localhost:3001"
NEXTAUTH_SECRET="somesecretstring"
```

### 4. Run Database Migrations

Push the Prisma schema to your new database.

```bash
npm db:push # Assuming you have a script `prisma db push`
```

### 5. Run the Project

This will start all applications in the monorepo.

```bash
npm dev
```

Your `user-app` will be available at [http://localhost:3001](http://localhost:3001).

---

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/KartikeyNamdev/Merchant-Paytm/issues).

---

## 👨‍💻 Author

**Your Name**

- GitHub: [@KartikeyNamdev](https://github.com/KartikeyNamdev/Merchant-Paytm)
- LinkedIn: [Your Name](https://www.linkedin.com/in/kartikey-namdev-994a1420b/)

---

⭐️ If you found this project helpful, please consider giving it a star!
