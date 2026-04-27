// src/server.ts
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { authService } from './services/AuthService.js';
import { authGuard } from './middlewares/authMiddleware.js';
import { validate } from './middlewares/validateMiddleware.js';
import { LoginSchema, RegisterSchema } from './schemas/authSchemas.js';

const app = express();
app.use(express.json());
app.use(cors());

// 1. 注册接口（租户初始入驻）
app.post('/auth/register', validate(RegisterSchema), async (req, res) => {
    try {
        const { tenantName, email, password } = req.body;
        const result = await authService.register(tenantName, email, password);
        res.status(201).json(result);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
});

// 2. 登录接口
app.post('/auth/login', validate(LoginSchema), async (req, res) => {
    try {
        const result = await authService.login(req.body.email, req.body.password);
        res.json(result);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
});

// 3. 测试隔离的接口 (演示用)
app.get('/api/my-data', authGuard, (req, res) => {
    // 看到没？这里直接能拿到 req.tenantId，不需要前端传
    res.json({
        msg: '这是你家租户的数据',
        yourTenantId: req.tenantId,
        action: '你应该在这里执行 prisma.someTable.findMany({ where: { tenantId: req.tenantId } })'
    });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));