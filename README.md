# 🚀 Production-Ready SaaS Identity Hub (Multi-Tenant)

A robust, highly scalable Node.js backend boilerplate designed specifically for modern SaaS applications. This project implements a secure **Multi-Tenant Architecture** (Shared DB, Shared Schema) with enterprise-grade identity management, atomic onboarding, and strict data isolation.

## 🛠 Tech Stack

- **Runtime & Language**: Node.js, TypeScript (ESM)
- **Framework**: Express.js
- **Database & ORM**: PostgreSQL, Prisma ORM
- **Security & Auth**: JSON Web Tokens (JWT), bcryptjs
- **Validation**: Zod (Strict schema validation)

## ✨ Core Features

- **🏢 True Multi-Tenant Isolation**: Implemented a robust `authGuard` middleware that securely injects the `tenantId` into the request context, ensuring 100% data isolation across different tenants.
- **⚡️ Atomic Tenant Onboarding**: Utilizes Prisma `$transaction` to guarantee atomic registration. It creates the `Tenant` entity and the initial `User` (Admin) simultaneously—preventing orphaned records.
- **🛡 Bulletproof Input Validation**: Integrated `Zod` at the middleware layer to catch invalid data formats (e.g., malformed emails, weak passwords) before they ever reach the service layer.
- **🔑 Stateless Authentication**: Employs JWT with embedded `tenantId` and `userId` payloads for fast, stateless API authorization.
- **🏗 Extensible RBAC Design**: Pre-configured database schema ready for Role-Based Access Control (`Role`, `Permission`, `UserRole` mappings).

## 🚀 Getting Started

### 1. Prerequisites
- Node.js (v18+ recommended)
- PostgreSQL database
- pnpm (Package manager)

### 2. Installation
Clone the repository and install dependencies:
```bash
git clone <your-repo-url>
cd saas-identity-hub
pnpm install