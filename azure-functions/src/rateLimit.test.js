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
