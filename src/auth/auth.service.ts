import { ForbiddenException, Injectable, NotImplementedException } from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { UserService } from '../user/user.service';
import { JwtDto } from './dto/jwt.dto';
import { JwtService } from '@nestjs/jwt';

const {
  JWT_SECRET_KEY = 'secret123123',
  JWT_SECRET_REFRESH_KEY = 'secret123123',
  TOKEN_EXPIRE_TIME = '1h',
  TOKEN_REFRESH_EXPIRE_TIME = '24h',
} = process.env;

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {}

  signup(signupDto: SignupDto) {
    return this.userService.create(signupDto);
  }

  async login(loginDto: LoginDto): Promise<JwtDto> {
    const user = await this.userService.findByLogin(loginDto.login);
    if (user && (await this.userService.isMatchPassword(user, loginDto.password))) {
      const payload = { username: user.login, sub: user.id };
      return {
        accessToken: this.jwtService.sign(payload, {
          secret: JWT_SECRET_KEY,
          expiresIn: TOKEN_EXPIRE_TIME,
        }),
        refreshToken: this.jwtService.sign(payload, {
          secret: JWT_SECRET_REFRESH_KEY,
          expiresIn: TOKEN_REFRESH_EXPIRE_TIME,
        }),
      };
    } else throw new ForbiddenException();
  }

  refreshToken(): Promise<JwtDto> {
    throw new NotImplementedException();
  }
}
