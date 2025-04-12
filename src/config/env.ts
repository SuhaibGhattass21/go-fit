import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
    PORT: z.coerce.number().default(3000),
    LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']).default('info'),
    ADMIN_PASSWORD: z.string({
        required_error: "ADMIN_PASSWORD is required"
    }),
    JWT_SECRET: z.string({
        required_error: "JWT_SECRET is required",
    }),
    JWT_EXPIRATION: z.number().default(60 * 60 * 24),
    CONNECTION_STRING: z.string({
        required_error: "CONNECTION_STRING is required",
    }),
    SMS_KEY: z.string().optional()
});

const env = envSchema.safeParse(process.env);

if (!env.success) {
    console.error('Invalid environment variables:', env.error.format());
    process.exit(1);
}

export default env.data;