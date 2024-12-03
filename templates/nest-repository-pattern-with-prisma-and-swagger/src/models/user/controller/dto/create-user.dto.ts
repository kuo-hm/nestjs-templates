import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Match } from '../../../../common/decorators/match.decorator';

export class CreateUserDto {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsString()
  @MinLength(6)
  @MaxLength(20)
  @Matches(/^(?=.*[0-9])(?=.*[$&+,:;=?@#|'<>.^*()%!-])(?=.*[A-Za-z]).{8,}$/, {
    message: 'password too weak',
  })
  password: string;

  @ApiProperty()
  @IsString()
  @MinLength(6)
  @MaxLength(20)
  @Match('password', {
    message: 'confirm password is not match',
  })
  passwordConfirmation: string;
}
