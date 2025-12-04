import { Injectable, NotFoundException, UnauthorizedException, ConflictException } from '@nestjs/common';
import * as argon2 from 'argon2';
import { UserRepository } from '../repository/user.repository';
import { ChangeEmailDto } from '../dtos/change-email.dto';

@Injectable()
export class ChangeEmailUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(userId: number, dto: ChangeEmailDto): Promise<void> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isPasswordValid = await argon2.verify(user.password, dto.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Password is incorrect');
    }

    const existingUser = await this.userRepository.findByEmail(dto.newEmail);
    if (existingUser) {
      throw new ConflictException('Email already in use');
    }

    await this.userRepository.update(userId, { email: dto.newEmail });
  }
}

