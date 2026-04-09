const { app } = require('@azure/functions');
const nodemailer = require('nodemailer');
const { checkRateLimit } = require('../rateLimit');
const { validateContactInput } = require('../validate');
const { verifyTurnstile } = require('../turnstile');

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

app.http('sendEmail', {
  methods: ['POST'],
  authLevel: 'anonymous',
  handler: async (request, context) => {
    const ip =
      (request.headers.get('x-forwarded-for') ?? '').split(',')[0].trim() ||
      'unknown';

    const rateCheck = checkRateLimit(ip);
    if (!rateCheck.allowed) {
      return {
        status: 429,
        headers: {
          'Content-Type': 'application/json',
          'Retry-After': String(rateCheck.retryAfter),
        },
        body: JSON.stringify({ error: 'Too many requests' }),
      };
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Invalid JSON body' }),
      };
    }

    const { name, email, message, turnstileToken } = body;

    const validationError = validateContactInput({ name, email, message });
    if (validationError) {
      return {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: validationError }),
      };
    }

    const turnstileValid = await verifyTurnstile(
      turnstileToken,
      process.env.TURNSTILE_SECRET_KEY
    );
    if (!turnstileValid) {
      return {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'CAPTCHA verification failed' }),
      };
    }

    const transporter = nodemailer.createTransport({
      host: process.env.MAILTRAP_HOST,
      port: parseInt(process.env.MAILTRAP_PORT),
      secure: false,
      auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASS,
      },
    });

    try {
      await transporter.sendMail({
        from: '"Contact Form" <noreply@netsharpdev.com>',
        to: process.env.RECIPIENT_EMAIL,
        subject: `[Contact] Message from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
        html: `<p><strong>Name:</strong> ${escapeHtml(name)}</p><p><strong>Email:</strong> ${escapeHtml(email)}</p><p><strong>Message:</strong></p><p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>`,
      });
    } catch (err) {
      context.error('Failed to send email:', err);
      return {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Failed to send email' }),
      };
    }

    return {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ success: true }),
    };
  },
});
