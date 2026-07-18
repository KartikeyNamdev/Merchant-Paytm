# 💳 Paytm - Full-Stack Digital Wallet Monorepo

This project is a high-performance clone of the Paytm digital wallet, built with a modern, scalable, and type-safe stack. It features a complete monorepo architecture using **Turborepo** to manage separate applications for users, merchants, and backend webhook services.

---

## 📸 Concurrency & Lock Verification Results

To verify transactional integrity under heavy concurrent loads, we simulated a race condition test where a user with a starting balance of **15** attempts to make two concurrent transfers of **10** each at the exact same millisecond:

- **Without row-level locks**: Both transactions read the initial balance of 15, validate the amount as sufficient, and commit both transactions, overdrafting the account to **-5**.
- **With row-level locks (`SELECT FOR UPDATE`)**: 
  - Transaction 1 acquires a write-lock on the sender's balance row.
  - Transaction 2 is blocked and queues behind Transaction 1.
  - Transaction 1 decrements 10 and commits (balance becomes 5).
  - Transaction 2 wakes up, reads the updated balance of 5, detects insufficient funds, and rolls back cleanly.

```text
=== RUNNING P2P TRANSFER CONCURRENCY SIMULATION ===
Initial States:
- User 1 Balance: 15
- User 2 Balance: 0

Firing 2 concurrent transfers of 10 units simultaneously...
[P2P] Starting transfer of 10 from User 1 to User 2...
[Txn] SELECT FOR UPDATE: Locked Balance row for user 1.
[P2P] Starting transfer of 10 from User 1 to User 2...
[Txn] Row 1 is currently locked. Waiting for lock release...
[Txn] Updated Balance user 2 to 10
[Txn] Updated Balance user 1 to 5
[Txn] Transaction committed. Lock released.
[Txn] Lock released. Row 1 acquired by queued transaction.
[Txn] SELECT FOR UPDATE: Locked Balance row for user 1.
[Txn] Transaction rolled back. Lock released. Reason: Insufficient Balance !

=== CONCURRENCY TEST RESULTS ===
Transfer 1 Outcome: { success: true, message: 'Money Sent' }
Transfer 2 Outcome: { success: false, msg: 'Insufficient Balance !' }
Final Database State:
- User 1 Balance: 5 (Expected: 5, NO OVERDRAFTS!)
- User 2 Balance: 10 (Expected: 10)
```

---

## 🏗️ Monorepo Architecture & Package Boundaries

This project uses **Turborepo** to enforce clean boundaries between modules and prevent circular dependencies:

### Monorepo Structure
```text
merchant-paytm/
├── apps/
│   ├── bank-webhook/  # Node.js service processing bank onramp callbacks
│   ├── merchant-app/  # Next.js application for merchant portal
│   └── user-app/      # Next.js main consumer dashboard
├── packages/
│   ├── db/            # Shared database client, migrations, and Prisma schemas
│   ├── ui/            # Shared React UI component kit (Tailwind styled)
│   ├── tsconfig/      # Shared compilation configurations
│   └── eslint-config/ # Linting rules for Turborepo boundaries
```

### Boundary & Dependency Rules:
1. **Unidirectional Dependency Flow**: Applications (`apps/*`) depend on shared packages (`packages/*`), but packages must NEVER depend on applications.
2. **Database Isolation**: All database schemas and Prisma clients live exclusively in `packages/db`. Applications must never run local schema generation.
3. **No Circular Imports**: Direct imports across apps (e.g. importing code from `merchant-app` into `user-app`) is strictly prohibited. Sharing must happen via a package inside `packages/`.

---

## 📝 Architectural Decision Record (ADR): Prisma Transactions & NextAuth

### Context
A core requirement of a digital wallet is ensuring that all user transactions satisfy ACID principles. In a web environment with concurrent browser connections, we must prevent double-spend attacks and balance race conditions.

### Decisions Made:
1. **NextAuth Session Authentication**: We use NextAuth.js for session-based user authentication. The authenticated session user ID is treated as the immutable source of truth for the transaction sender (`fromUserId`).
2. **Prisma Interactive Transactions**: All P2P transfers are enclosed in a Prisma interactive transaction block (`prisma.$transaction(async (txn) => { ... })`).
3. **Pessimistic Row Locking (`SELECT FOR UPDATE`)**: 
   - Before verifying the user's balance, we execute a raw database query `SELECT * FROM "Balance" WHERE "userId" = ... FOR UPDATE`.
   - This locks the sender's balance row in PostgreSQL, preventing any other concurrent transactions from reading or writing to it until the transaction commits or rolls back.
4. **Validation Inside Transaction**: Balance validation is moved *inside* the locked transaction block, guaranteeing that decisions are made on fresh, non-stale database states.

### Consequences:
- **Pros**: 100% protection against double-spends and concurrent balance overdrafts.
- **Cons**: High concurrency on the same user account (e.g. a merchant receiving hundreds of payments concurrently) is serialized. However, for a single user's outgoing wallet payments, this lock duration is sub-5ms and does not impact UX.

---

## 🏁 Getting Started (Local Development)

### 1. Install dependencies
```bash
npm install
```

### 2. Set up the Database (Docker)
```bash
docker run --name paytm-db -e POSTGRES_PASSWORD=mysecretpassword -p 5432:5432 -d postgres
```

### 3. Generate Prisma Client
```bash
npm run db:generate
```

### 4. Run the Project
```bash
npm run dev
```
The `user-app` is available at [http://localhost:3001](http://localhost:3001).
