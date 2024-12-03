import { IMeta } from '../../../prisma/dto/paginate';
import { User } from '../entities/user.entity';

export interface ICreateUser {
  email: string;
  password: string;
}

export interface IUserPaginationArgs {
  page?: number;
  perPage?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  search?: string;
}

export interface IUserPaginationResponse {
  items: Array<User>;
  meta: IMeta;
}
