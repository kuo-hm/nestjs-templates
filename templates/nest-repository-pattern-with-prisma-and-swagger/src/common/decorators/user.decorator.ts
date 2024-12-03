import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

export const UserId = createParamDecorator(
  async (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    const jwtService = new JwtService();

    if (!token || token === '' || type !== 'Bearer') {
      throw new UnauthorizedException('Missing authentication token');
    }

    const { sub } = await jwtService.verifyAsync(token, {
      secret: process.env.JWT_SECRET_KEY,
    });

    return sub;
  },
);

export const Language = createParamDecorator(
  async (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const language = request.headers['accept-language'] ?? 'AR';
    return language;
  },
);
