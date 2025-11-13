import * as yup from "yup";

export function getErrorMessages(err: yup.ValidationError) {
  const errors: Record<string, string> = {};

  err.inner.forEach((e) => {
    if (e.path) {
      errors[e.path] = e.message;
    }
  });

  return errors;
}
