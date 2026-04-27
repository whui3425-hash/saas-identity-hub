// src/services/AuthService.ts
import { PrismaClient } from '../../generated/prisma/index.js';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

export class AuthService {
    async register(tenantName: string, email: string, password: string) {
        const hashedPassword = await bcrypt.hash(password, 10);

        try {
            const result = await prisma.$transaction(async (tx) => {
                const tenant = await tx.tenant.create({
                    data: {
                        name: tenantName
                    }
                });

                const user = await tx.user.create({
                    data: {
                        username: email.split('@')[0] || 'admin',
                        email,
                        password: hashedPassword,
                        tenantId: tenant.id
                    }
                });

                const { password: _, ...safeUser } = user;
                return { tenant, user: safeUser };
            });

            return result;
        } catch (err: any) {
            if (err?.code === 'P2002') {
                const targets = Array.isArray(err?.meta?.target) ? err.meta.target : [];

                if (targets.includes('email')) {
                    throw new Error('Email already exists');
                }
                if (targets.includes('name')) {
                    throw new Error('Tenant name already exists');
                }
                throw new Error('Unique constraint conflict');
            }

            throw err;
        }
    }

    async login(email: string, pass: string) {
        const user = await prisma.user.findUnique({
            where: { email },
            include: { tenant: true }
        });

        if (!user || !(await bcrypt.compare(pass, user.password))) {
            throw new Error('Credential error');
        }

        // 签发 Token：把用户的归属租户 ID 固化在 Token 里
        const token = jwt.sign(
            { userId: user.id, tenantId: user.tenantId },
            process.env.JWT_SECRET as string,
            { expiresIn: '24h' }
        );

        return { token, tenantName: user.tenant.name };
    }
}

export const authService = new AuthService();