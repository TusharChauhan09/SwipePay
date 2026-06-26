# SwipePay

> Solana-based peer-to-peer payment and bill splitting platform.

SwipePay lets people send SOL payments and split bills on-chain. The project is a Turborepo monorepo with three tiers — a Go API for off-chain user/split management, a Solana Anchor smart contract for on-chain settlement, and a React Native (Expo) mobile app for the user-facing interface.

## Architecture

```
apps/
├── api/          Go REST server — manages users, splits, participants (PostgreSQL/Neon)
├── contract/     Solana Anchor smart contract — pay & split_pay instructions
└── mobile/       Expo / React Native app — mobile frontend (NativeWind, Zustand)

packages/
├── ui/           Shared React component library (Button, Card, Code)
├── eslint-config/  Shared ESLint configs
└── typescript-config/  Shared TSConfig bases
```

### Data Flow

1. **Mobile app** talks to the **Go API** for user profiles and split metadata.
2. When a payment is ready to settle, the **mobile app** (or any Solana wallet) submits a transaction to the **smart contract** on-chain.
3. The **Go API** records the on-chain transaction signature alongside the off-chain split record.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Monorepo** | Turborepo 2.9, PNPM 9, TypeScript 5.9 |
| **Backend** | Go 1.26, pgx/v5 (PostgreSQL), sqlc, Neon serverless |
| **Blockchain** | Solana, Anchor 1.0.1, Rust 1.89 |
| **Mobile** | Expo SDK 54, React Native 0.81, React 19, NativeWind 4, Zustand 5 |
| **Linting** | ESLint 9, Prettier 3.7 |

## Getting Started

### Prerequisites

- **Node.js** >= 18
- **pnpm** 9 — `npm install -g pnpm@9`
- **Go** 1.26+ — [install](https://go.dev/dl/)
- **Rust** 1.89+ with Solana toolchain — [install](https://docs.anza.xyz/cli/install)
- **Anchor** 1.0.1 — `cargo install --locked avm && avm install 1.0.1`

### Install

```bash
pnpm install
```

### Database

The Go API connects to a **Neon PostgreSQL** instance. Copy `apps/api/.env.example` (or create `apps/api/.env`) with:

```
DATABASE_URL=postgresql://user:password@ep-xxx.us-east-2.aws.neon.tech/swipepay?sslmode=require
```

The SQL schema lives in `apps/api/schema/` and typed Go code is generated with sqlc:

```bash
cd apps/api && sqlc generate
```

### Development

```bash
# Start everything in dev mode
pnpm dev

# Or start individual services
pnpm dev:api       # Go API with Air live-reload on :8080
pnpm dev:mobile    # Expo dev server (scan QR with Expo Go)
```

### Scripts

| Script | Description |
|--------|-------------|
| `pnpm build` | Build all apps and packages |
| `pnpm dev` | Run all workspaces in dev mode |
| `pnpm lint` | Lint all workspaces |
| `pnpm format` | Format with Prettier |
| `pnpm check-types` | Type-check all TypeScript workspaces |
| `pnpm test` | Run all tests |
| `pnpm clean` | Remove all build artifacts |
| `pnpm dev:mobile` | Start mobile app only |
| `pnpm dev:api` | Start Go API only |

## Smart Contract

The Solana program (`apps/contract/`) supports two instructions:

### `pay`
Transfers SOL from sender to recipient with a **0.01% fee** (1/10000) routed to a treasury account.

**Accounts:** `sender` (signer), `recipient`, `treasury`, `system_program`

### `split_pay`
Calculates the total of a multi-party split and transfers the **0.01% fee** from the sender to the treasury.

**Accounts:** `sender` (signer), `treasury`, `system_program`

```bash
# Run contract tests
cd apps/contract && anchor test
```

**Program ID (localnet):** `HZF2gdH6uHJQkYLioXZVGLBinJ2GySXZ7eBN44ti11Us`

## API Database Schema

### `users`
| Column | Type | Notes |
|--------|------|-------|
| `wallet_address` | TEXT PK | Solana wallet |
| `username` | TEXT UNIQUE | |
| `display_name` | TEXT | |
| `avatar_url` | TEXT? | |
| `created_at`, `updated_at` | TIMESTAMPTZ | |

### `splits`
| Column | Type | Notes |
|--------|------|-------|
| `id` | UUID PK | Auto-generated |
| `creator_wallet` | TEXT FK → users | |
| `title` | TEXT | |
| `total_amount` | NUMERIC(20,9) | |
| `currency` | TEXT | Default `USD` |
| `tx_signature` | TEXT? | Solana tx hash |
| `created_at` | TIMESTAMPTZ | |

### `split_participants`
| Column | Type | Notes |
|--------|------|-------|
| `id` | UUID PK | |
| `split_id` | UUID FK → splits | |
| `wallet_address` | TEXT FK → users | |
| `amount` | NUMERIC(20,9) | |
| `paid` | BOOLEAN | Default `false` |
| `created_at` | TIMESTAMPTZ | |

## Project Status

Early development — core infrastructure is in place (smart contract logic, database schema, build tooling), but the API routing layer and mobile screens are not yet implemented.

- [x] Smart contract payment & split logic
- [x] Database schema & sqlc codegen
- [ ] Go API HTTP handlers
- [ ] Mobile app screens (login, pay, splits)
- [ ] API ↔ Contract integration

## License

MIT
