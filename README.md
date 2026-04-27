🚀 Production-Ready SaaS Identity Hub (Multi-Tenant)
A robust, highly scalable Node.js backend boilerplate designed specifically for modern SaaS applications. This project implements a secure Multi-Tenant Architecture (Shared DB, Shared Schema) with enterprise-grade identity management, atomic onboarding, and strict data isolation.

🤝 Available for Freelance Work
Looking for a senior Node.js/TypeScript backend developer to build or scale your SaaS? I can help you save development time with production-ready architectures like this one.

🛠 Tech Stack
Runtime & Language: Node.js, TypeScript (ESM)

Framework: Express.js

Database & ORM: PostgreSQL, Prisma ORM

Security & Auth: JSON Web Tokens (JWT), bcryptjs

Validation: Zod (Strict schema validation)

✨ Core Features
🏢 True Multi-Tenant Isolation: Implemented a robust authGuard middleware that securely injects the tenantId into the request context, ensuring 100% data isolation across different tenants.

⚡️ Atomic Tenant Onboarding: Utilizes Prisma $transaction to guarantee atomic registration. It creates the Tenant entity and the initial User (Admin) simultaneously—preventing orphaned records.

🛡 Bulletproof Input Validation: Integrated Zod at the middleware layer to catch invalid data formats before they ever reach the service layer.

🔑 Stateless Authentication: Employs JWT with embedded tenantId and userId payloads for fast, stateless API authorization.

🏗 Extensible RBAC Design: Pre-configured database schema ready for Role-Based Access Control (Role, Permission, UserRole mappings).

🚀 Getting Started
Install Dependencies: pnpm install

Setup Environment: Create a .env file with DATABASE_URL and JWT_SECRET.

Initialize Database: pnpm run db:push

Run Server: pnpm run dev

🛣 API Endpoints
POST /auth/register - Register a new tenant and admin user.

POST /auth/login - Authenticate and receive a JWT.

GET /api/my-data - (Protected) Test endpoint for tenant-isolated data.
