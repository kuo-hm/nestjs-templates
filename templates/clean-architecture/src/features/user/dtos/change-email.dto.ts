import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class ChangeEmailDto {
  @ApiProperty()
  @IsEmail()
  newEmail: string;

  @ApiProperty()
  @IsString()
  password: string;
}

