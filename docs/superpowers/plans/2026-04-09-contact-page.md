# Contact Page + Azure Function Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a split-layout contact page and a standalone Azure Function (Node.js v4) that sends email via Mailtrap SMTP, protected by Cloudflare Turnstile CAPTCHA and in-memory rate limiting.

**Architecture:** The static Next.js site POSTs `{ name, email, message, turnstileToken }` to an Azure HTTP Function. The function rate-limits by IP, verifies the Turnstile token with Cloudflare's siteverify API, validates inputs, then sends email via Nodemailer. The contact page is a server component that renders a `ContactForm` client component.

**Tech Stack:** Next.js 14 (App Router, static export), React 18, `@marsidev/react-turnstile`, Azure Functions v4 Node.js (`@azure/functions` ^4), Nodemailer, Mailtrap SMTP, Cloudflare Turnstile, Jest (Azure Function unit tests)

---

## File Map

**Create:**
- `azure-functions/.gitignore`
- `azure-functions/package.json`
- `azure-functions/host.json`
- `azure-functions/local.settings.json` (gitignored)
- `azure-functions/src/rateLimit.js` — in-memory rate limiter (pure function, testable)
- `azure-functions/src/rateLimit.test.js`
- `azure-functions/src/validate.js` — input validation (pure function, testable)
- `azure-functions/src/validate.test.js`
- `azure-functions/src/turnstile.js` — Cloudflare token verification (fetch wrapper, mockable)
- `azure-functions/src/turnstile.test.js`
- `azure-functions/src/functions/sendEmail.js` — HTTP trigger handler
- `src/components/ContactForm.tsx` — `'use client'` form with Turnstile
- `src/app/contact/page.tsx` — server component with metadata + layout

**Modify:**
- `.gitignore` — add `.superpowers/`
- `package.json` (root) — add `@marsidev/react-turnstile`
- `src/styles/globals.css` — add contact page styles
- `src/app/sitemap.ts` — add `/contact/` entry

---

## Task 1: Add `.superpowers/` to root `.gitignore`

**Files:**
- Modify: `.gitignore`

- [ ] **Step 1: Append to `.gitignore`**

Open `.gitignore` and add to the end:
```
# Visual brainstorming companion
.superpowers/
```

- [ ] **Step 2: Commit**
```bash
git add .gitignore
git commit -m "chore: ignore .superpowers/ brainstorm directory"
```

---

## Task 2: Azure Function project scaffold

**Files:**
- Create: `azure-functions/.gitignore`
- Create: `azure-functions/package.json`
- Create: `azure-functions/host.json`
- Create: `azure-functions/local.settings.json`

- [ ] **Step 1: Create `azure-functions/.gitignore`**

```
node_modules/
local.settings.json
dist/
```

- [ ] **Step 2: Create `azure-functions/package.json`**

```json
{
  "name": "contact-function",
  "version": "1.0.0",
  "description": "Azure Function for contact form email delivery",
  "main": "src/functions/*.js",
  "scripts": {
    "start": "func start",
    "test": "jest"
  },
  "dependencies": {
    "@azure/functions": "^4.0.0",
    "nodemailer": "^6.9.0"
  },
  "devDependencies": {
    "jest": "^29.0.0"
  }
}
```

- [ ] **Step 3: Create `azure-functions/host.json`**

```json
{
  "version": "2.0",
  "logging": {
    "applicationInsights": {
      "samplingSettings": {
        "isEnabled": true,
        "excludedTypes": "Request"
      }
    }
  },
  "cors": {
    "allowedOrigins": ["http://localhost:3000"],
    "supportCredentials": false
  }
}
```

Note: the `cors` section here only applies to local `func start`. In Azure, configure CORS in the Function App's platform settings (Azure portal → Function App → API → CORS), adding `https://netsharpdev.github.io` and `http://localhost:3000`.

- [ ] **Step 4: Create `azure-functions/local.settings.json`**

This file is gitignored. Fill in your real Mailtrap sandbox credentials.

```json
{
  "IsEncrypted": false,
  "Values": {
    "AzureWebJobsStorage": "UseDevelopmentStorage=true",
    "FUNCTIONS_WORKER_RUNTIME": "node",
    "MAILTRAP_HOST": "sandbox.smtp.mailtrap.io",
    "MAILTRAP_PORT": "587",
    "MAILTRAP_USER": "<your-mailtrap-sandbox-username>",
    "MAILTRAP_PASS": "<your-mailtrap-sandbox-password>",
    "RECIPIENT_EMAIL": "pawel.pindel@netsharpdev.com",
    "TURNSTILE_SECRET_KEY": "1x0000000000000000000000000000000AA"
  }
}
```

The `TURNSTILE_SECRET_KEY` value `1x0000000000000000000000000000000AA` is Cloudflare's published test secret — it always passes. Replace with your real secret key before going to production.

- [ ] **Step 5: Install dependencies**

```bash
cd azure-functions && npm install
```

Expected: `node_modules/` created with `@azure/functions`, `nodemailer`, `jest`.

- [ ] **Step 6: Commit**

```bash
cd ..
git add azure-functions/.gitignore azure-functions/package.json azure-functions/host.json azure-functions/package-lock.json
git commit -m "feat: scaffold Azure Function project"
```

---

## Task 3: Rate limiter (TDD)

**Files:**
- Create: `azure-functions/src/rateLimit.js`
- Create: `azure-functions/src/rateLimit.test.js`

- [ ] **Step 1: Create the failing tests at `azure-functions/src/rateLimit.test.js`**

```js
const { checkRateLimit, _resetStore } = require('./rateLimit');

beforeEach(() => _resetStore());

test('allows first request from an IP', () => {
  expect(checkRateLimit('1.2.3.4').allowed).toBe(true);
});

test('allows up to 5 requests from the same IP', () => {
  for (let i = 0; i < 5; i++) {
    expect(checkRateLimit('1.2.3.4').allowed).toBe(true);
  }
});

test('blocks the 6th request from the same IP', () => {
  for (let i = 0; i < 5; i++) checkRateLimit('1.2.3.4');
  const result = checkRateLimit('1.2.3.4');
  expect(result.allowed).toBe(false);
  expect(result.retryAfter).toBeGreaterThan(0);
});

test('does not affect a different IP', () => {
  for (let i = 0; i < 5; i++) checkRateLimit('1.2.3.4');
  expect(checkRateLimit('5.6.7.8').allowed).toBe(true);
});
```

- [ ] **Step 2: Run tests — expect failure**

```bash
cd azure-functions && npx jest src/rateLimit.test.js
```

Expected: `Cannot find module './rateLimit'`

- [ ] **Step 3: Create `azure-functions/src/rateLimit.js`**

```js
const store = new Map();
const MAX_REQUESTS = 5;
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes

function checkRateLimit(ip) {
  const now = Date.now();
  const entry = store.get(ip);

  if (!entry || now > entry.resetAt) {
    store.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true, retryAfter: null };
  }

  if (entry.count >= MAX_REQUESTS) {
    const retryAfter = Math.ceil((entry.resetAt - now) / 1000);
    return { allowed: false, retryAfter };
  }

  entry.count++;
  return { allowed: true, retryAfter: null };
}

function _resetStore() {
  store.clear();
}

module.exports = { checkRateLimit, _resetStore };
```

- [ ] **Step 4: Run tests — expect all pass**

```bash
npx jest src/rateLimit.test.js
```

Expected: `4 passed`

- [ ] **Step 5: Commit**

```bash
cd ..
git add azure-functions/src/rateLimit.js azure-functions/src/rateLimit.test.js
git commit -m "feat: add in-memory rate limiter for Azure Function"
```

---

## Task 4: Input validator (TDD)

**Files:**
- Create: `azure-functions/src/validate.js`
- Create: `azure-functions/src/validate.test.js`

- [ ] **Step 1: Create `azure-functions/src/validate.test.js`**

```js
const { validateContactInput } = require('./validate');

test('returns null for valid input', () => {
  expect(validateContactInput({
    name: 'Jan Kowalski',
    email: 'jan@example.com',
    message: 'Hello there',
  })).toBeNull();
});

test('rejects blank name', () => {
  expect(validateContactInput({ name: '   ', email: 'jan@example.com', message: 'Hi' }))
    .toBe('Name is required');
});

test('rejects missing name', () => {
  expect(validateContactInput({ name: undefined, email: 'jan@example.com', message: 'Hi' }))
    .toBe('Name is required');
});

test('rejects blank email', () => {
  expect(validateContactInput({ name: 'Jan', email: '', message: 'Hi' }))
    .toBe('Valid email is required');
});

test('rejects malformed email', () => {
  expect(validateContactInput({ name: 'Jan', email: 'notanemail', message: 'Hi' }))
    .toBe('Valid email is required');
});

test('rejects blank message', () => {
  expect(validateContactInput({ name: 'Jan', email: 'jan@example.com', message: '' }))
    .toBe('Message is required');
});

test('rejects message over 2000 chars', () => {
  expect(validateContactInput({ name: 'Jan', email: 'jan@example.com', message: 'a'.repeat(2001) }))
    .toBe('Message must be 2000 characters or fewer');
});
```

- [ ] **Step 2: Run tests — expect failure**

```bash
cd azure-functions && npx jest src/validate.test.js
```

Expected: `Cannot find module './validate'`

- [ ] **Step 3: Create `azure-functions/src/validate.js`**

```js
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateContactInput({ name, email, message }) {
  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    return 'Name is required';
  }
  if (!email || typeof email !== 'string' || !EMAIL_REGEX.test(email.trim())) {
    return 'Valid email is required';
  }
  if (!message || typeof message !== 'string' || message.trim().length === 0) {
    return 'Message is required';
  }
  if (message.length > 2000) {
    return 'Message must be 2000 characters or fewer';
  }
  return null;
}

module.exports = { validateContactInput };
```

- [ ] **Step 4: Run tests — expect all pass**

```bash
npx jest src/validate.test.js
```

Expected: `7 passed`

- [ ] **Step 5: Commit**

```bash
cd ..
git add azure-functions/src/validate.js azure-functions/src/validate.test.js
git commit -m "feat: add contact form input validator"
```

---

## Task 5: Turnstile verifier (TDD)

**Files:**
- Create: `azure-functions/src/turnstile.js`
- Create: `azure-functions/src/turnstile.test.js`

- [ ] **Step 1: Create `azure-functions/src/turnstile.test.js`**

```js
const { verifyTurnstile } = require('./turnstile');

beforeEach(() => {
  global.fetch = jest.fn();
});

afterEach(() => {
  delete global.fetch;
});

test('returns true when Cloudflare responds success: true', async () => {
  global.fetch.mockResolvedValue({ json: async () => ({ success: true }) });
  expect(await verifyTurnstile('valid-token', 'secret')).toBe(true);
});

test('returns false when Cloudflare responds success: false', async () => {
  global.fetch.mockResolvedValue({ json: async () => ({ success: false }) });
  expect(await verifyTurnstile('bad-token', 'secret')).toBe(false);
});

test('returns false for null token without calling fetch', async () => {
  expect(await verifyTurnstile(null, 'secret')).toBe(false);
  expect(global.fetch).not.toHaveBeenCalled();
});

test('calls the correct Cloudflare endpoint', async () => {
  global.fetch.mockResolvedValue({ json: async () => ({ success: true }) });
  await verifyTurnstile('token', 'my-secret');
  expect(global.fetch).toHaveBeenCalledWith(
    'https://challenges.cloudflare.com/turnstile/v0/siteverify',
    expect.objectContaining({ method: 'POST' })
  );
});
```

- [ ] **Step 2: Run tests — expect failure**

```bash
cd azure-functions && npx jest src/turnstile.test.js
```

Expected: `Cannot find module './turnstile'`

- [ ] **Step 3: Create `azure-functions/src/turnstile.js`**

```js
async function verifyTurnstile(token, secretKey) {
  if (!token) return false;
  const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ secret: secretKey, response: token }),
  });
  const data = await res.json();
  return data.success === true;
}

module.exports = { verifyTurnstile };
```

- [ ] **Step 4: Run all Azure Function tests**

```bash
npx jest
```

Expected: `15 passed` (4 rateLimit + 7 validate + 4 turnstile)

- [ ] **Step 5: Commit**

```bash
cd ..
git add azure-functions/src/turnstile.js azure-functions/src/turnstile.test.js
git commit -m "feat: add Cloudflare Turnstile verification"
```

---

## Task 6: sendEmail HTTP trigger handler

**Files:**
- Create: `azure-functions/src/functions/sendEmail.js`

- [ ] **Step 1: Create `azure-functions/src/functions/sendEmail.js`**

```js
const { app } = require('@azure/functions');
const nodemailer = require('nodemailer');
const { checkRateLimit } = require('../rateLimit');
const { validateContactInput } = require('../validate');
const { verifyTurnstile } = require('../turnstile');

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

    const validationError = validateContactInput({ name, email, message });
    if (validationError) {
      return {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: validationError }),
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
        html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong></p><p>${message.replace(/\n/g, '<br>')}</p>`,
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
```

- [ ] **Step 2: Smoke test locally**

Prerequisites: Azure Functions Core Tools installed (`npm install -g azure-functions-core-tools@4 --unsafe-perm true`), `local.settings.json` populated with real Mailtrap credentials.

```bash
cd azure-functions && func start
```

Expected output includes: `sendEmail: [POST] http://localhost:7071/api/sendEmail`

- [ ] **Step 3: Send a test request**

In a separate terminal:

```bash
curl -X POST http://localhost:7071/api/sendEmail \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","message":"Hello","turnstileToken":"XXXX"}'
```

Expected: `{"success":true}` and email appears in Mailtrap sandbox inbox.

(The test Turnstile secret key in `local.settings.json` accepts any token value.)

- [ ] **Step 4: Commit**

```bash
cd ..
git add azure-functions/src/functions/sendEmail.js
git commit -m "feat: add sendEmail Azure Function HTTP trigger"
```

---

## Task 7: Install Turnstile package in Next.js

**Files:**
- Modify: `package.json` (root)

- [ ] **Step 1: Install the package**

```bash
npm install @marsidev/react-turnstile
```

Expected: `package.json` and `package-lock.json` updated.

- [ ] **Step 2: Commit**

```bash
git add package.json package-lock.json
git commit -m "feat: add @marsidev/react-turnstile dependency"
```

---

## Task 8: Add contact page styles to globals.css

**Files:**
- Modify: `src/styles/globals.css`

- [ ] **Step 1: Append to end of `src/styles/globals.css`**

```css
/* ===== Contact Page ===== */
.contact-split {
  display: grid;
  grid-template-columns: 1fr 1.4fr;
  gap: 2rem;
  max-width: 900px;
  margin: 0 auto;
}

@media (max-width: 768px) {
  .contact-split {
    grid-template-columns: 1fr;
  }
}

.contact-info,
.contact-form-card {
  background: #0A0A0F;
  border: 1px solid #0d1e2a;
  border-radius: 12px;
  padding: 2rem;
}

.contact-info__name {
  font-size: 1rem;
  font-weight: 600;
  color: #F5F5F5;
  margin-bottom: 0.25rem;
}

.contact-info__title {
  font-size: 0.75rem;
  font-family: "JetBrains Mono", "Fira Code", monospace;
  color: #71717A;
  margin-bottom: 1.5rem;
}

.contact-info__list {
  list-style: none;
  padding: 0;
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.contact-info__link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: #A1A1AA;
  font-size: 0.875rem;
  text-decoration: none;
  transition: color 0.2s ease;
}

.contact-info__link:hover {
  color: #F5F5F5;
}

.contact-info__icon {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 700;
  flex-shrink: 0;
}

.contact-info__icon--teal {
  background: rgba(0, 212, 170, 0.1);
  border: 1px solid rgba(0, 212, 170, 0.2);
  color: #00D4AA;
}

.contact-info__icon--blue {
  background: rgba(59, 130, 246, 0.1);
  border: 1px solid rgba(59, 130, 246, 0.2);
  color: #3B82F6;
}

.contact-info__icon--cyan {
  background: rgba(30, 171, 208, 0.1);
  border: 1px solid rgba(30, 171, 208, 0.2);
  color: #1EABD0;
}

.contact-info__location {
  font-size: 0.75rem;
  font-family: "JetBrains Mono", "Fira Code", monospace;
  color: #71717A;
  padding-top: 1.5rem;
  border-top: 1px solid #0d1e2a;
  margin-bottom: 0;
}

.contact-form__label {
  display: block;
  font-size: 0.6875rem;
  font-family: "JetBrains Mono", "Fira Code", monospace;
  color: #00D4AA;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 0.375rem;
}

.contact-form__input {
  width: 100%;
  background: #050507;
  border: 1px solid #1e2e3a;
  border-radius: 6px;
  padding: 0.625rem 0.875rem;
  color: #F5F5F5;
  font-size: 0.875rem;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.contact-form__input:focus {
  outline: none;
  border-color: #00D4AA;
  box-shadow: 0 0 0 3px rgba(0, 212, 170, 0.1);
}

.contact-form__textarea {
  resize: vertical;
  min-height: 120px;
}

.contact-form__error {
  font-size: 0.75rem;
  color: #f87171;
  margin-top: 0.25rem;
  margin-bottom: 0;
}

.contact-form__banner {
  border-radius: 6px;
  padding: 0.75rem 1rem;
  font-size: 0.875rem;
  margin-bottom: 1rem;
}

.contact-form__banner--success {
  background: rgba(0, 212, 170, 0.08);
  border: 1px solid rgba(0, 212, 170, 0.2);
  color: #00D4AA;
}

.contact-form__banner--error {
  background: rgba(248, 113, 113, 0.08);
  border: 1px solid rgba(248, 113, 113, 0.2);
  color: #f87171;
}
```

- [ ] **Step 2: Commit**

```bash
git add src/styles/globals.css
git commit -m "feat: add contact page CSS"
```

---

## Task 9: ContactForm client component

**Files:**
- Create: `src/components/ContactForm.tsx`

- [ ] **Step 1: Create `src/components/ContactForm.tsx`**

```tsx
'use client';

import { useState, useRef } from 'react';
import { Turnstile } from '@marsidev/react-turnstile';
import type { TurnstileInstance } from '@marsidev/react-turnstile';

type Status = 'idle' | 'loading' | 'success' | 'error' | 'rateLimit';
type FieldErrors = { name?: string; email?: string; message?: string };

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>('idle');
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const turnstileRef = useRef<TurnstileInstance>(null);

  function validate(): FieldErrors {
    const errs: FieldErrors = {};
    if (!name.trim()) errs.name = 'Name is required';
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      errs.email = 'Valid email is required';
    if (!message.trim()) errs.message = 'Message is required';
    else if (message.length > 2000)
      errs.message = 'Message must be 2000 characters or fewer';
    return errs;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setFieldErrors(errs);
      return;
    }
    if (!turnstileToken) return;

    setStatus('loading');
    setFieldErrors({});

    try {
      const res = await fetch(process.env.NEXT_PUBLIC_CONTACT_API_URL!, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message, turnstileToken }),
      });

      if (res.status === 429) {
        setStatus('rateLimit');
      } else if (!res.ok) {
        setStatus('error');
      } else {
        setStatus('success');
        setName('');
        setEmail('');
        setMessage('');
      }
    } catch {
      setStatus('error');
    } finally {
      turnstileRef.current?.reset();
      setTurnstileToken(null);
    }
  }

  const submitDisabled = status === 'loading' || !turnstileToken;

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="contact-name" className="contact-form__label">
          Name
        </label>
        <input
          id="contact-name"
          type="text"
          className="contact-form__input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your full name"
          autoComplete="name"
        />
        {fieldErrors.name && (
          <p className="contact-form__error">{fieldErrors.name}</p>
        )}
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="contact-email" className="contact-form__label">
          Email
        </label>
        <input
          id="contact-email"
          type="email"
          className="contact-form__input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          autoComplete="email"
        />
        {fieldErrors.email && (
          <p className="contact-form__error">{fieldErrors.email}</p>
        )}
      </div>

      <div style={{ marginBottom: '1.25rem' }}>
        <label htmlFor="contact-message" className="contact-form__label">
          Message
        </label>
        <textarea
          id="contact-message"
          className="contact-form__input contact-form__textarea"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tell me about your project..."
          rows={5}
        />
        {fieldErrors.message && (
          <p className="contact-form__error">{fieldErrors.message}</p>
        )}
      </div>

      <div style={{ marginBottom: '1.25rem' }}>
        <Turnstile
          ref={turnstileRef}
          siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
          onSuccess={(token) => setTurnstileToken(token)}
          onExpire={() => setTurnstileToken(null)}
          onError={() => setTurnstileToken(null)}
          options={{ theme: 'dark' }}
        />
      </div>

      {status === 'success' && (
        <div className="contact-form__banner contact-form__banner--success">
          Message sent! I&apos;ll get back to you soon.
        </div>
      )}
      {(status === 'error') && (
        <div className="contact-form__banner contact-form__banner--error">
          Something went wrong. Please try again or email me directly.
        </div>
      )}
      {status === 'rateLimit' && (
        <div className="contact-form__banner contact-form__banner--error">
          Too many requests. Please wait a few minutes and try again.
        </div>
      )}

      <button
        type="submit"
        className="btn btn--primary"
        disabled={submitDisabled}
        style={{ width: '100%', opacity: submitDisabled ? 0.6 : 1 }}
      >
        {status === 'loading' ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ContactForm.tsx
git commit -m "feat: add ContactForm client component with Turnstile"
```

---

## Task 10: Contact page (server component)

**Files:**
- Create: `src/app/contact/page.tsx`

- [ ] **Step 1: Create `src/app/contact/page.tsx`**

```tsx
import type { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';

export const metadata: Metadata = {
  title: 'Contact | netsharpdev',
  description:
    'Get in touch with Pawel Pindel — AI consulting, software engineering.',
  alternates: {
    canonical: '/contact/',
  },
  openGraph: {
    title: 'Contact | netsharpdev',
    description:
      'Get in touch with Pawel Pindel — AI consulting, software engineering.',
    url: '/contact/',
  },
};

export default function ContactPage() {
  return (
    <article>
      <header className="post-header">
        <div className="container">
          <span className="tag-pill" style={{ marginBottom: '1rem' }}>
            // get in touch
          </span>
          <h1 className="post-header__title gradient-text">
            Let&apos;s Work Together
          </h1>
          <p
            className="post-header__meta"
            style={{ display: 'block', textAlign: 'center' }}
          >
            Have a project in mind? Send me a message and I&apos;ll get back to
            you within 24 hours.
          </p>
        </div>
      </header>

      <div className="page-content">
        <div className="contact-split">
          {/* Left: contact info */}
          <div className="contact-info">
            <p className="contact-info__name">Pawe&#322; Pindel</p>
            <p className="contact-info__title">Principal Software Engineer</p>

            <ul className="contact-info__list">
              <li>
                <a
                  href="mailto:pawel.pindel@netsharpdev.com"
                  className="contact-info__link"
                >
                  <span className="contact-info__icon contact-info__icon--teal">
                    ✉
                  </span>
                  <span>pawel.pindel@netsharpdev.com</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/pawelpindel/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-info__link"
                >
                  <span className="contact-info__icon contact-info__icon--blue">
                    in
                  </span>
                  <span>linkedin.com/in/pawelpindel</span>
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/netsharpdev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-info__link"
                >
                  <span className="contact-info__icon contact-info__icon--cyan">
                    gh
                  </span>
                  <span>github.com/netsharpdev</span>
                </a>
              </li>
            </ul>

            <p className="contact-info__location">
              Based in Poland &middot; Available for remote projects worldwide
            </p>
          </div>

          {/* Right: form */}
          <div className="contact-form-card">
            <ContactForm />
          </div>
        </div>
      </div>
    </article>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/contact/page.tsx
git commit -m "feat: add contact page"
```

---

## Task 11: Update sitemap

**Files:**
- Modify: `src/app/sitemap.ts`

- [ ] **Step 1: Add `/contact/` entry**

In `src/app/sitemap.ts`, add the following object to the array returned by `sitemap()`, after the `oferta` entry and before `...postEntries`:

```ts
{
  url: 'https://netsharpdev.com/contact/',
  lastModified: new Date(),
  changeFrequency: 'yearly',
  priority: 0.6,
},
```

The full return array should look like:
```ts
return [
  {
    url: 'https://netsharpdev.com/',
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 1.0,
  },
  {
    url: 'https://netsharpdev.com/about/',
    lastModified: new Date(),
    changeFrequency: 'yearly',
    priority: 0.5,
  },
  {
    url: 'https://netsharpdev.com/portfolio/',
    lastModified: new Date(),
    changeFrequency: 'yearly',
    priority: 0.5,
  },
  {
    url: 'https://netsharpdev.com/offer/',
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  },
  {
    url: 'https://netsharpdev.com/oferta/',
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  },
  {
    url: 'https://netsharpdev.com/contact/',
    lastModified: new Date(),
    changeFrequency: 'yearly',
    priority: 0.6,
  },
  ...postEntries,
];
```

- [ ] **Step 2: Commit**

```bash
git add src/app/sitemap.ts
git commit -m "feat: add /contact/ to sitemap"
```

---

## Task 12: Build verification

- [ ] **Step 1: Add env vars to `.env.local`**

Create or update `.env.local` in the project root (it is already gitignored):

```
NEXT_PUBLIC_CONTACT_API_URL=http://localhost:7071/api/sendEmail
NEXT_PUBLIC_TURNSTILE_SITE_KEY=1x00000000000000000000AA
```

The Turnstile value `1x00000000000000000000AA` is Cloudflare's published test site key — the widget always passes automatically.

- [ ] **Step 2: Run the build**

```bash
npm run build
```

Expected: build completes with no errors. `/contact` appears in the route list.

- [ ] **Step 3: Spot-check locally**

```bash
npm run dev
```

Open `http://localhost:3000/contact`. Verify:
- Split layout renders with info card on left and form on right
- Turnstile widget appears and auto-validates (test key)
- Submit button becomes active after Turnstile solves
- Form submits to local Azure Function (if running) and shows success banner

- [ ] **Step 4: Azure deployment**

Set the following in Azure Function App → Settings → Environment variables:
```
MAILTRAP_HOST         live.smtp.mailtrap.io
MAILTRAP_PORT         587
MAILTRAP_USER         <production mailtrap username>
MAILTRAP_PASS         <production mailtrap password>
RECIPIENT_EMAIL       pawel.pindel@netsharpdev.com
TURNSTILE_SECRET_KEY  <real secret key from Cloudflare dashboard>
```

Then deploy:
```bash
cd azure-functions
func azure functionapp publish <your-function-app-name>
```

Set production env vars in GitHub Actions secrets:
```
NEXT_PUBLIC_CONTACT_API_URL = https://<your-function-app>.azurewebsites.net/api/sendEmail
NEXT_PUBLIC_TURNSTILE_SITE_KEY = 0x4AAAAAAC2xGBy_CE0gVAOY
```

Configure CORS in Azure portal: Function App → API → CORS → add `https://netsharpdev.github.io`.

- [ ] **Step 5: Final commit if any cleanup needed**

```bash
git add -p
git commit -m "chore: finalize contact page implementation"
```
