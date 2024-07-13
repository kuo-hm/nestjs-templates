export class PasswordNotMatchError extends Error {
  constructor(message?: string) {
    super(message ?? 'password_not_match');
  }
}
export class EmailNotMatchError extends Error {
  constructor(message?: string) {
    super(message ?? 'email_not_match');
  }
}
