import { User } from '../../user/entities/user.entity';

export interface ILogin {
  email: string;
  password: string;
}

export interface ILoginResponse {
  accessToken: string;
  user: User;
}

export interface ITokenPayload {
  email: string;
  userId: number;
}

export interface ITokenGenerateResponse {
  accessToken: string;
}
