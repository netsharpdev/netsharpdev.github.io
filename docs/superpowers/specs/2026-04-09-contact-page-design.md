# Contact Page Design

**Date:** 2026-04-09
**Status:** Approved

## Context

The site's `/offer` and `/oferta` pages already link to `/contact`, but the page doesn't exist yet. Visitors have no way to reach out directly from the site. This spec covers the contact page UI and the Azure Function backend that handles email delivery via Mailtrap SMTP.

The site is a fully static Next.js 14 export deployed to GitHub Pages — no server-side rendering, no API routes. Email sending requires a separate backend service.

---

## Architecture

```
Browser (GitHub Pages)
  └─ POST JSON → Azure Function (HTTP trigger)
                   ├─ Rate limit check (in-memory, 5 req / IP / 15 min)
                   ├─ Turnstile token verification → Cloudflare siteverify API
                   ├─ Input validation
                   └─ Nodemailer → Mailtrap SMTP → inbox
```

Two independent deliverables:
1. **`src/app/contact/page.tsx`** — Next.js contact page
2. **`azure-functions/`** — standalone Azure Function App (Node.js)

---

## Contact Page (`src/app/contact/page.tsx`)

The page uses `'use client'` — it manages form field state and submit status with `useState`.

### Layout
Split two-column layout matching the site's dark aesthetic:

- **Left card** — contact info panel:
  - Name + title
  - Email (pawel.pindel@netsharpdev.com) with teal icon
  - LinkedIn link with blue icon
  - GitHub link with cyan icon
  - Location note ("Based in Poland · Available for remote projects worldwide")

- **Right card** — contact form:
  - Fields: Name, Email, Message (textarea)
  - Cloudflare Turnstile widget (renders above the submit button)
  - Submit button with gradient background
  - Three UI states: idle → loading (button disabled + spinner text) → success banner / error banner

### Form Behaviour
- Client-side validation before submit: all fields required, valid email format, message ≤ 2000 chars.
- Turnstile widget renders via the `@marsidev/react-turnstile` package. On solve it provides a token via `onSuccess` callback stored in state. Submit is disabled until the token is present.
- On submit: `fetch` POST to `process.env.NEXT_PUBLIC_CONTACT_API_URL` with `{ name, email, message, turnstileToken }` as JSON.
- After submission (success or error), reset the Turnstile widget via its ref so the user can resubmit.
- Success: green banner "Message sent! I'll get back to you soon."
- Error: red banner with generic message ("Something went wrong. Please try again or email me directly.")
- Rate-limited (429): banner "Too many requests. Please wait a few minutes and try again."

### Env vars
```
NEXT_PUBLIC_CONTACT_API_URL=https://<function-app>.azurewebsites.net/api/sendEmail
NEXT_PUBLIC_TURNSTILE_SITE_KEY=<cloudflare-site-key>
```
Set in GitHub Actions secrets for production build; `.env.local` for dev.

Turnstile site key is public (safe to expose). Use Cloudflare's test site key `1x00000000000000000000AA` in dev/CI so the widget always passes without a real challenge.

### Styling
Follows existing globals.css patterns:
- Container/section classes, `.gradient-text` for heading
- Monospace labels (`font-family: 'JetBrains Mono'`), teal `#00D4AA` accents
- Form inputs: `background: #050507`, `border: 1px solid #1e2e3a`, focus ring in teal
- Cards: `background: #0A0A0F`, `border: 1px solid #0d1e2a`, `border-radius: 12px`
- Button: existing `.btn--primary` gradient style

### SEO / metadata
- `<title>Contact | netsharpdev</title>`
- Meta description: "Get in touch with Pawel Pindel — AI consulting, software engineering."
- Add `/contact` to `sitemap.ts`.

---

## Azure Function (`azure-functions/`)

### Structure
```
azure-functions/
  src/functions/sendEmail.js   # HTTP trigger handler
  package.json                  # nodemailer dependency
  host.json                     # CORS, logging config
  local.settings.json           # gitignored — Mailtrap + Turnstile test creds for local dev
  .gitignore                    # excludes local.settings.json, node_modules
```

### Runtime
- Node.js v4 programming model (`@azure/functions` v4)
- Node.js 20 LTS

### HTTP Trigger
- **Method:** POST
- **Route:** `/api/sendEmail`
- **Auth level:** anonymous (CORS is the access control)

### Rate Limiting
In-memory map: `{ [ip: string]: { count: number, resetAt: number } }`.
- Max **5 requests per IP per 15 minutes**.
- IP extracted from `x-forwarded-for` header, falling back to socket remote address.
- Resets on cold start — acceptable trade-off; no Redis dependency needed.
- Returns `429` with `Retry-After` header when exceeded.

### Cloudflare Turnstile Verification
Before input validation, verify the `turnstileToken` from the request body:
```js
const verifyRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    secret: process.env.TURNSTILE_SECRET_KEY,
    response: turnstileToken,
  }),
});
const { success } = await verifyRes.json();
if (!success) return { status: 400, body: JSON.stringify({ error: 'CAPTCHA verification failed' }) };
```
- `TURNSTILE_SECRET_KEY` stored in Azure App Settings.
- Use Cloudflare's test secret key `1x0000000000000000000000000000000AA` in dev/CI.

### Input Validation
- All three fields (`name`, `email`, `message`) required.
- Email must match basic RFC 5322 regex.
- `message` capped at 2000 characters.
- Returns `400` with error description on failure.

### Email via Nodemailer + Mailtrap
```js
const transporter = nodemailer.createTransport({
  host: process.env.MAILTRAP_HOST,       // sandbox.smtp.mailtrap.io or live.smtp.mailtrap.io
  port: parseInt(process.env.MAILTRAP_PORT),  // 587
  secure: false,                         // port 587 uses STARTTLS, not SSL
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASS,
  },
});
```
Email sent to `process.env.RECIPIENT_EMAIL` (pawel.pindel@netsharpdev.com).
Subject: `[Contact] Message from {name}`.
Body: plain text + HTML with name, email, and message.

### Azure App Settings (env vars)
```
MAILTRAP_HOST
MAILTRAP_PORT
MAILTRAP_USER
MAILTRAP_PASS
RECIPIENT_EMAIL
TURNSTILE_SECRET_KEY
```

### CORS (`host.json`)
Allow origin: `https://netsharpdev.github.io` (production) + `http://localhost:3000` (dev).

### Response codes
| Code | Condition |
|------|-----------|
| 200  | Email sent successfully |
| 400  | Missing/invalid input |
| 429  | Rate limit exceeded |
| 500  | Nodemailer send failure |

---

## Deployment

### Azure Function
```bash
cd azure-functions
npm install
func azure functionapp publish <function-app-name>
```
Requires Azure Functions Core Tools (`func`) and an existing Function App in Azure portal.

### Next.js site
Add `@marsidev/react-turnstile` to the site's `package.json` (`npm install @marsidev/react-turnstile`).
Set `NEXT_PUBLIC_CONTACT_API_URL` and `NEXT_PUBLIC_TURNSTILE_SITE_KEY` in GitHub Actions environment secrets. No other CI changes needed.

---

## Verification

1. **Local dev:** Start function locally with `func start`, set `NEXT_PUBLIC_CONTACT_API_URL=http://localhost:7071/api/sendEmail` and `NEXT_PUBLIC_TURNSTILE_SITE_KEY=1x00000000000000000000AA` in `.env.local`, run `npm run dev`. Submit form → Turnstile auto-passes → check Mailtrap sandbox inbox.
2. **Rate limiting:** Submit form 6 times rapidly → 6th request returns 429 banner.
3. **Validation:** Submit with empty fields / bad email → client-side error before request fires.
4. **Production:** Deploy function to Azure, set env vars, trigger GitHub Actions build. Submit form on live site → email arrives in inbox.
5. **Sitemap:** Confirm `/contact` appears in generated sitemap after build.
