export const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? "Invalid email address"
    : undefined;

export const requiredEmail = value => (value ? undefined : "Email is Required");

export const requiredName = value => (value ? undefined : "Name is Required");

export const requiredPassword = value => (value ? undefined : "Password is Required");
