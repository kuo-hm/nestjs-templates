import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';
import { JwtAuthService } from './jwt.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { GoogleStrategy } from './google.strategy';
import { GitHubStrategy } from './github.strategy';
import { TokenCleanupService } from './token-cleanup.service';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '15m' },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    JwtStrategy,
    JwtAuthService,
    JwtAuthGuard,
    GoogleStrategy,
    GitHubStrategy,
    TokenCleanupService,
  ],
  exports: [JwtAuthService, JwtAuthGuard],
})
export class AuthModule {}

