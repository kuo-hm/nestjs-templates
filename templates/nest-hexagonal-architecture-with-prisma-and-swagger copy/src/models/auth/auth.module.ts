import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserRepository } from '../user/repository/user.repository';
import { AuthController } from './controller/auth.controller';
import { AuthService } from './service/auth.service';
import { JwtStrategy } from './startegy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, UserRepository],
  imports: [JwtModule.register({})],
})
export class AuthModule {}
