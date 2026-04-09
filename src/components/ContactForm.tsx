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
      {status === 'error' && (
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
