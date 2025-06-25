import { Request } from "express";
import { rateLimit } from "express-rate-limit";

const rateLimitingConfig = {
    windowMs: 15 * 60 * 1000,
    max: (req: Request<any, any, any, any, any>) => {
        if (req.url.includes('/client')) {
            return 1000;
        }
        return 100;
    },
    message: 'Too many requests, please try again later.',
    headers: true,

};

export const RateLimiting = rateLimit(rateLimitingConfig);