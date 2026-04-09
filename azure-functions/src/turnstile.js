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
