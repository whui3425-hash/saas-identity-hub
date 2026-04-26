// src/services/AuthService.ts
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

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