import nodemailer from 'nodemailer';
import env from '../../interfaces/config/env';
'.'

const transporter = nodemailer.createTransport({
    host: env.SMTP_HOST,
    port: Number(env.SMTP_PORT) || 587,
    secure: false,
    auth: {
        user: env.SMTP_USER,
        pass: env.SMTP_PASS,
    },
});

export async function sendEmail(to: string, subject: string, html: string) {
    const info = await transporter.sendMail({
        from: env.SMTP_FROM || '"Go-Fit" <no-reply@gofit.com>',
        to,
        subject,
        html,
    });
    return info;
}