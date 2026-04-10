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

test('rejects name over 200 chars', () => {
  expect(validateContactInput({ name: 'a'.repeat(201), email: 'jan@example.com', message: 'Hi' }))
    .toBe('Name must be 200 characters or fewer');
});

test('rejects email over 254 chars', () => {
  const longEmail = 'a'.repeat(250) + '@b.com';
  expect(validateContactInput({ name: 'Jan', email: longEmail, message: 'Hi' }))
    .toBe('Email address is too long');
});
