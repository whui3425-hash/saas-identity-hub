# 🚀 Production-Ready SaaS Identity Hub (Multi-Tenant)

A robust, highly scalable Node.js backend boilerplate designed specifically for modern SaaS applications. This project implements a secure **Multi-Tenant Architecture** (Shared DB, Shared Schema) with enterprise-grade identity management, atomic onboarding, and strict data isolation.

## 🤝 Available for Freelance Work
Looking for a senior Node.js/TypeScript backend developer to build or scale your SaaS? I can help you save development time with production-ready architectures like this one.

[![Hire Me on Upwork](https://img.shields.io/badge/Upwork-Hire_Me-14a800?style=for-the-badge&logo=upwork&logoColor=white)](https://www.upwork.com/freelancers/~01777ff0bdd20cccd6?viewMode=1)

---

## 🛠 Tech Stack

- **Runtime & Language**: Node.js, TypeScript (ESM)
- **Framework**: Express.js
- **Database & ORM**: PostgreSQL, Prisma ORM
- **Security & Auth**: JSON Web Tokens (JWT), bcryptjs
- **Validation**: Zod (Strict schema validation)

## ✨ Core Features

- **🏢 True Multi-Tenant Isolation**: Implemented a robust `authGuard` middleware that securely injects the `tenantId` into the request context via TypeScript Declaration Merging, ensuring 100% data isolation across different tenants.
- **⚡️ Atomic Tenant Onboarding**: Utilizes Prisma `$transaction` to guarantee atomic registration. It creates the `Tenant` entity and the initial `User` (Admin) simultaneously—preventing orphaned records and ensuring data consistency.
- **🛡 Bulletproof Input Validation**: Integrated `Zod` at the middleware layer to catch invalid data formats (e.g., malformed emails, weak passwords) before they ever reach the service layer.
- **🔑 Stateless Authentication**: Employs JWT with embedded `tenantId` and `userId` payloads for fast, stateless, and secure API authorization.
- **🏗 Extensible RBAC Design**: Pre-configured database schema ready for Role-Based Access Control (`Role`, `Permission`, `UserRole` mappings).

## 🚀 Getting Started

### 1. Prerequisites
- Node.js (v18+ recommended)
- PostgreSQL database
- pnpm (Package manager)

### 2. Installation
```bash
git clone [https://github.com/whui3425-hash/saas-identity-hub.git](https://github.com/whui3425-hash/saas-identity-hub.git)
cd saas-identity-hub
pnpm install
