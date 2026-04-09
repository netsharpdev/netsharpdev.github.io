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

test('returns false when fetch throws (network error)', async () => {
  global.fetch.mockRejectedValue(new Error('Network error'));
  expect(await verifyTurnstile('token', 'secret')).toBe(false);
});
