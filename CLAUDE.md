# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `pnpm dev` - Start Next.js development server on http://localhost:3000
- `pnpm build` - Build the production application
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint with auto-fix capabilities
- `drizzle-kit push` - Push database schema changes to PostgreSQL
- `drizzle-kit studio` - Open Drizzle Studio for database management
- `tsx src/index.ts` - Run database operations script directly

## Architecture Overview

This is a Next.js 15 application with a multi-layout architecture supporting both public marketing pages and protected dashboard functionality.

### Route Structure

The app uses Next.js App Router with route groups:

- `(public)` - Marketing pages with shared navbar layout
- `(protected)` - Dashboard/admin pages with authentication
- `(auth)` - Authentication pages (login, etc.)

### Database Architecture

- **ORM**: Drizzle ORM with PostgreSQL (Neon/Vercel Postgres)
- **Schema Location**: `src/db/schema/`
- **Main Tables**: `users` (with roles: member/admin) and `articles` (with categories: teknologi/berita/edukasi)
- **Relations**: Articles belong to users via `authorId`
- **Config**: `drizzle.config.ts` uses `POSTGRES_URL` environment variable

### Theme System

The project uses a dual-theme approach:

1. **Shared Theme** (`src/theme/shared/`): Advanced Material-UI theme with color schemes, customizations for inputs, data display, feedback, navigation, and surfaces
2. **Simple Theme** (`src/theme/theme.ts`): Basic Material-UI theme for simpler components

Theme providers are layered:

- Root: `CustomThemeProvider` (simple theme)
- Route layouts: `AppTheme` (advanced theme with customizations)

### Component Architecture

- **Screens**: High-level page components in `src/screens/`
- **Components**: Organized by domain (`home/`, `dashboard/`, `auth/`, `shared/`)
- **Dashboard**: Uses MUI X DataGrid with CRUD operations, client-side routing via React Router
- **Data Layer**: Mock data with localStorage persistence in `src/data/dashboard/users.ts`

### State Management

- **Dashboard Context**: `src/context/dashboard/DashboardSidebarContext.ts`
- **Custom Hooks**: Notifications and dialogs providers in `src/hooks/dashboard/`
- **Local Storage**: User data persistence for dashboard demo

### Key Patterns

- Material-UI with extensive customizations
- Screen-component-hook architecture
- Route group layouts for different app sections
- Dual theme system for flexibility
- Mock data with localStorage for demo functionality

## Database Operations

The `src/index.ts` file contains example database operations. Use this pattern for:

- Creating users with `db.insert(users).values(userData)`
- Querying with `db.select().from(table)`
- Updating with `db.update(table).set(data).where(condition)`

Environment variable `POSTGRES_URL` must be configured in `.env` file.
