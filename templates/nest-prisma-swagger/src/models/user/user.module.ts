import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { UsersController } from './controller/user.controller';
import { UserRepository } from './repository/user.repository';
import { UserService } from './service/user.service';

@Module({
  controllers: [UsersController],
  providers: [PrismaService, UserService, UserRepository],
  exports: [UserService],
})
export class UserModule {}
