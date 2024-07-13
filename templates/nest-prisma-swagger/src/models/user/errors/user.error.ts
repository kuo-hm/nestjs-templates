export class UserNotFoundError extends Error {
  constructor(message?: string) {
    super(message ?? 'user_not_found');
  }
}

export class UserAlreadyExistsError extends Error {
  constructor(message?: string) {
    super(message ?? 'user_already_exists');
  }
}

export class UserNotCreatedError extends Error {
  constructor(message?: string) {
    super(message ?? 'user_not_created');
  }
}

export class UserNotUpdatedError extends Error {
  constructor(message?: string) {
    super(message ?? 'user_not_updated');
  }
}

export class UserNotDeletedError extends Error {
  constructor(message?: string) {
    super(message ?? 'user_not_deleted');
  }
}

export class UserPaginationError extends Error {
  constructor(message?: string) {
    super(message ?? 'user_pagination_error');
  }
}
