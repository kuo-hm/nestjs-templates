import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';
import { UpdateProfileDto } from '../dtos/update-profile.dto';
import { UserResponseDto } from '../dtos/user-response.dto';

@Injectable()
export class UpdateProfileUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(userId: number, dto: UpdateProfileDto): Promise<UserResponseDto> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const updatedUser = await this.userRepository.update(userId, {});

    return {
      id: updatedUser.id,
      email: updatedUser.email,
      createdAt: updatedUser.createdAt,
      updatedAt: updatedUser.updatedAt,
    };
  }
}

