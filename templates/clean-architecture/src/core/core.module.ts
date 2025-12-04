import { Global, Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';

@Global()
@Module({
  imports: [PrismaModule, AuthModule],
  exports: [PrismaModule, AuthModule],
})
export class CoreModule {}

