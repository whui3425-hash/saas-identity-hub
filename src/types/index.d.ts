// src/types/index.d.ts
import { Request } from 'express';

// 这就是 TypeScript 的 "Declaration Merging"，给原生的 Request 对象打补丁
declare global {
    namespace Express {
        interface Request {
            tenantId?: string;
            userId?: string;
        }
    }
}