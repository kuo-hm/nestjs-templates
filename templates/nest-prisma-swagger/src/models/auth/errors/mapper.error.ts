import { HttpStatus } from '@nestjs/common';
import { EmailNotMatchError, PasswordNotMatchError } from './user.error';
const errorMapping: Record<string, HttpStatus> = {
  [PasswordNotMatchError.name]: HttpStatus.UNAUTHORIZED,
  [EmailNotMatchError.name]: HttpStatus.UNAUTHORIZED,
};
export function errorMapper(error: Error): HttpStatus {
  return (
    errorMapping[error.constructor.name] || HttpStatus.INTERNAL_SERVER_ERROR
  );
}
