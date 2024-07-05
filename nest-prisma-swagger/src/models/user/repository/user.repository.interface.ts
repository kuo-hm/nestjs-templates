import {
  IPaginatedResponse,
  PaginationArgs,
} from '../../../prisma/dto/paginate';
import { User } from '../entities/user.entity';
import { ICreateUser } from '../interface/user';

export interface UserRepositoryInterface {
  find(id: number): Promise<User>;
  create(data: ICreateUser): Promise<User>;
  findByEmail(email: string): Promise<User>;
  emailUnique(email: string): Promise<void>;
  findAll(paginationArgs: PaginationArgs): Promise<IPaginatedResponse>;
}
