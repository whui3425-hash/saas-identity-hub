import type { NextFunction, Request, Response } from 'express';
import type { ZodType } from 'zod';

export const validate = (schema: ZodType) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const result = schema.safeParse(req.body);

        if (!result.success) {
            return res.status(400).json({
                errors: result.error.issues.map((issue) => ({
                    path: issue.path.join('.') || 'body',
                    message: issue.message
                }))
            });
        }

        req.body = result.data;
        next();
    };
};
