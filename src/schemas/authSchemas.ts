import { z } from 'zod';

export const RegisterSchema = z.object({
    tenantName: z
        .string()
        .trim()
        .min(3, '租户名长度不能少于3个字符')
        .max(50, '租户名长度不能超过50个字符'),
    email: z.email('无效的邮箱格式'),
    password: z.string().min(6, '密码长度不能少于6位')
});

export const LoginSchema = z.object({
    email: z.email('无效的邮箱格式'),
    password: z.string().min(1, '密码不能为空')
});
