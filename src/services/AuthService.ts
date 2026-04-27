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