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
