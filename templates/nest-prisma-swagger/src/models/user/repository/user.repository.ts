import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../../prisma/prisma.service';
import { User } from '../entities/user.entity';
import {
  UserAlreadyExistsError,
  UserNotFoundError,
} from '../errors/user.error';
import {
  ICreateUser,
  IUserPaginationArgs,
  IUserPaginationResponse,
} from '../interface/user';
import { UserRepositoryInterface } from './user.repository.interface';

@Injectable()
export class UserRepository implements UserRepositoryInterface {
  constructor(private prisma: PrismaService) {}

  async findAll(
    paginationArgs: IUserPaginationArgs,
  ): Promise<IUserPaginationResponse> {
    const { page, perPage, sortBy, sortOrder, search } = paginationArgs;

    const where: Prisma.UserWhereInput = {};

    const args: Prisma.UserFindManyArgs = {
      orderBy: {
        [sortBy]: sortOrder,
      },
      select: {
        email: true,
        id: true,
      },
    };

    if (search) {
      if (!Array.isArray(where.OR)) {
        where.OR = [];
      }
      where.OR = [
        {
          email: {
            contains: search,
          },
        },
      ];
    }

    return await this.prisma.paginate({
      page,
      limit: perPage,
      model: this.prisma.user,
      args,
      where,
    });
  }
  async emailUnique(email: string): Promise<void> {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (user) {
      console.log(user);
      throw new UserAlreadyExistsError();
    }
  }
  async findByEmail(email: string): Promise<User> {
    return await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async find(id: number): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    if (!user) {
      throw new UserNotFoundError();
    }
    return user;
  }
  async create(data: ICreateUser): Promise<User> {
    return this.prisma.user.create({
      data,
    });
  }
}
