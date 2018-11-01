export function validateEmail(value) {
  let error;
  if (!value) {
    error = 'Required';
  } else if (![a-zA-Z0-9]+([-._][a-zA-Z0-9]+)*@([a-zA-Z0-9]+(-[a-zA-Z0-9]+)*)+([.][a-zA-Z]{2,4})?.test(value)) {
    error = 'Invalid email address';
  }
  return error;
}