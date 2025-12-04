import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserRepository } from './repository/user.repository';
import { GetProfileUseCase } from './usecases/get-profile.use-case';
import { UpdateProfileUseCase } from './usecases/update-profile.use-case';
import { ChangePasswordUseCase } from './usecases/change-password.use-case';
import { ChangeEmailUseCase } from './usecases/change-email.use-case';
import { DeleteAccountUseCase } from './usecases/delete-account.use-case';

@Module({
  controllers: [UserController],
  providers: [
    UserRepository,
    GetProfileUseCase,
    UpdateProfileUseCase,
    ChangePasswordUseCase,
    ChangeEmailUseCase,
    DeleteAccountUseCase,
  ],
  exports: [UserRepository],
})
export class UserModule {}

