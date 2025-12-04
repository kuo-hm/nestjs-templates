import {
  Controller,
  Get,
  Put,
  Patch,
  Delete,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../core/auth/jwt-auth.guard';
import { GetProfileUseCase } from './usecases/get-profile.use-case';
import { UpdateProfileUseCase } from './usecases/update-profile.use-case';
import { ChangePasswordUseCase } from './usecases/change-password.use-case';
import { ChangeEmailUseCase } from './usecases/change-email.use-case';
import { DeleteAccountUseCase } from './usecases/delete-account.use-case';
import { UpdateProfileDto } from './dtos/update-profile.dto';
import { ChangePasswordDto } from './dtos/change-password.dto';
import { ChangeEmailDto } from './dtos/change-email.dto';
import { UserResponseDto } from './dtos/user-response.dto';

@ApiTags('User')
@ApiBearerAuth('Authorization')
@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(
    private getProfileUseCase: GetProfileUseCase,
    private updateProfileUseCase: UpdateProfileUseCase,
    private changePasswordUseCase: ChangePasswordUseCase,
    private changeEmailUseCase: ChangeEmailUseCase,
    private deleteAccountUseCase: DeleteAccountUseCase,
  ) {}

  @Get('profile')
  @ApiOperation({ summary: 'Get user profile' })
  @ApiResponse({ status: 200, type: UserResponseDto })
  async getProfile(@Request() req): Promise<UserResponseDto> {
    return this.getProfileUseCase.execute(req.user.userId);
  }

  @Put('profile')
  @ApiOperation({ summary: 'Update user profile' })
  @ApiResponse({ status: 200, type: UserResponseDto })
  async updateProfile(
    @Request() req,
    @Body() dto: UpdateProfileDto,
  ): Promise<UserResponseDto> {
    return this.updateProfileUseCase.execute(req.user.userId, dto);
  }

  @Patch('password')
  @ApiOperation({ summary: 'Change password' })
  @ApiResponse({ status: 200, description: 'Password changed successfully' })
  async changePassword(@Request() req, @Body() dto: ChangePasswordDto): Promise<void> {
    return this.changePasswordUseCase.execute(req.user.userId, dto);
  }

  @Patch('email')
  @ApiOperation({ summary: 'Change email' })
  @ApiResponse({ status: 200, description: 'Email changed successfully' })
  async changeEmail(@Request() req, @Body() dto: ChangeEmailDto): Promise<void> {
    return this.changeEmailUseCase.execute(req.user.userId, dto);
  }

  @Delete('account')
  @ApiOperation({ summary: 'Delete user account' })
  @ApiResponse({ status: 200, description: 'Account deleted successfully' })
  async deleteAccount(@Request() req): Promise<void> {
    return this.deleteAccountUseCase.execute(req.user.userId);
  }
}

