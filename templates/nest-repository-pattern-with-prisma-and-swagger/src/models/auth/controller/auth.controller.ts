import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from '../../../common/decorators/public';
import { AuthService } from '../service/auth.service';
import { SigninDto } from './dto/signin.dto';

@ApiTags('auth')
@ApiBearerAuth('Autorization')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  @ApiResponse({
    status: 200,
    description: 'Sign in a user with the provided credentials.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. The request body is invalid.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized. The user credentials are invalid.',
    example: {
      message: 'Unauthorized',
      statusCode: 401,
    },
  })
  @ApiBody({
    type: SigninDto,
  })
  @Public()
  async signin(@Body() dto: SigninDto) {
    return this.authService.signin(dto);
  }
}
