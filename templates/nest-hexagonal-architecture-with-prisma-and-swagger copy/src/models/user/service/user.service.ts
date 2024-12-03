import { Injectable } from '@nestjs/common';
import { hash } from 'argon2';
import { User } from '../entities/user.entity';
import {
  ICreateUser,
  IUserPaginationArgs,
  IUserPaginationResponse,
} from '../interface/user';
import { UserRepository } from '../repository/user.repository';

@Injectable()
export class UserService {
  constructor(private repository: UserRepository) {}

  async signup(userPayload: ICreateUser): Promise<User> {
    const { email, password } = userPayload;

    await this.repository.emailUnique(email);

    const payload: ICreateUser = {
      email,
      password: await hash(password),
    };

    const user = await this.repository.create(payload);
    delete user.password;
    return user;
  }

  async getMe(userId: number) {
    const user = await this.repository.find(userId);
    delete user.password;
    return user;
  }

  async getAll(
    paginationArgs: IUserPaginationArgs,
  ): Promise<IUserPaginationResponse> {
    const { items, meta } = await this.repository.findAll(paginationArgs);
    return { items, meta };
  }
}
