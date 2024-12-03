import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { verify } from 'argon2';
import { TOKEN_EXPIRATION_TIME } from '../../../common/constants';
import { User } from '../../user/entities/user.entity';
import { UserRepository } from '../../user/repository/user.repository';
import {
  EmailNotMatchError,
  PasswordNotMatchError,
} from '../errors/user.error';
import {
  ILogin,
  ILoginResponse,
  ITokenGenerateResponse,
} from '../interface/auth';

@Injectable()
export class AuthService {
  constructor(
    private jwt: JwtService,
    private config: ConfigService,
    private userRepository: UserRepository,
  ) {}

  async signin(payload: ILogin): Promise<ILoginResponse> {
    const { email, password } = payload;
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new EmailNotMatchError();
    }
    if (!(await verify(user.password, password))) {
      throw new PasswordNotMatchError();
    }
    delete user.password;
    const tokenObj = await this.generateTokenFromUser(user);
    return {
      ...tokenObj,
      user: {
        id: user.id,
        email: user.email,
      },
    };
  }
  async generateTokenFromUser(user: User): Promise<ITokenGenerateResponse> {
    const token = await this.jwt.signAsync(
      {
        email: user.email,
        userId: user.id,
      },
      {
        expiresIn: TOKEN_EXPIRATION_TIME,
        secret: this.config.get('JWT_SECRET'),
      },
    );

    return {
      accessToken: token,
    };
  }
}
