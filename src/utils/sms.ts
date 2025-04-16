import twilio from 'twilio';
import env from '../config/env';

const client = twilio(
    env.TWILIO_ACCOUNT_SID,
    env.TWILIO_AUTH_TOKEN
);

export async function sendWhatsApp(to: string, message: string) {
    return client.messages.create({
        from: process.env.TWILIO_WHATSAPP_FROM || env.TWILIO_WHATSAPP_FROM,
        to: `whatsapp:${to}`,
        body: message,
    });
}