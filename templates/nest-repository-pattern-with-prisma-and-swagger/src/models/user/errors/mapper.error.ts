import { HttpStatus } from '@nestjs/common';
import {
  UserAlreadyExistsError,
  UserNotCreatedError,
  UserNotDeletedError,
  UserNotFoundError,
  UserNotUpdatedError,
  UserPaginationError,
} from './user.error';
const errorMapping: Record<string, HttpStatus> = {
  [UserAlreadyExistsError.name]: HttpStatus.CONFLICT,
  [UserNotCreatedError.name]: HttpStatus.INTERNAL_SERVER_ERROR,
  [UserNotDeletedError.name]: HttpStatus.INTERNAL_SERVER_ERROR,
  [UserNotFoundError.name]: HttpStatus.NOT_FOUND,
  [UserNotUpdatedError.name]: HttpStatus.INTERNAL_SERVER_ERROR,
  [UserPaginationError.name]: HttpStatus.INTERNAL_SERVER_ERROR,
};

export function errorMapper(error: Error): HttpStatus {
  return (
    errorMapping[error.constructor.name] || HttpStatus.INTERNAL_SERVER_ERROR
  );
}
