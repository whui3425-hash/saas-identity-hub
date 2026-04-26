// src/middlewares/authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
    userId: string;
    tenantId: string;
}

export const authGuard = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) return res.status(401).json({ msg: 'Unauthorized' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;

        // 【关键动作】：将 Token 里的 tenantId 注入到 req 对象中
        req.tenantId = decoded.tenantId;
        req.userId = decoded.userId;

        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token invalid' });
    }
};