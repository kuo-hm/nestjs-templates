import {
  Body,
  Controller,
  Get,
  HttpException,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetUser } from '../../../common/decorators/get-user.decorator';
import { Public } from '../../../common/decorators/public';
import { PaginationArgs } from '../../../prisma/dto/paginate';
import { User } from '../entities/user.entity';
import { errorMapper } from '../errors/mapper.error';
import { UserService } from '../service/user.service';
import { CreateUserDto } from './dto/create-user.dto';

@ApiBearerAuth('Autorization')
@ApiTags('User')
@Controller('user')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  @Public()
  @ApiResponse({ status: 201, description: 'User created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 409, description: 'Email already exists' })
  @ApiBody({ type: CreateUserDto })
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    try {
      const user = await this.userService.signup(createUserDto);
      return user;
    } catch (error) {
      console.error(error);
      throw new HttpException(error.message, errorMapper(error));
    }
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Users found successfully' })
  @ApiResponse({ status: 404, description: 'Users not found' })
  async getAll(@Query() paginationArgs: PaginationArgs) {
    try {
      const users = await this.userService.getAll(paginationArgs);
      return users;
    } catch (error) {
      console.error(error);
      throw new HttpException(error.message, errorMapper(error));
    }
  }

  @Get('me')
  @ApiResponse({ status: 200, description: 'User found successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async getMe(@GetUser() userId: number) {
    try {
      const user = await this.userService.getMe(userId);
      return user;
    } catch (error) {
      console.error(error);
      throw new HttpException(error.message, errorMapper(error));
    }
  }
}
