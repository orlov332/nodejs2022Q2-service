import { ForbiddenException, Injectable } from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { UserService } from '../user/user.service';
import { JwtDto } from './dto/jwt.dto';
import { JwtService } from '@nestjs/jwt';
import { JWT_SECRET_KEY, JWT_SECRET_REFRESH_KEY, TOKEN_EXPIRE_TIME, TOKEN_REFRESH_EXPIRE_TIME } from './constants';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {}

  signup(signupDto: SignupDto) {
    return this.userService.create(signupDto);
  }

  async login(loginDto: LoginDto): Promise<JwtDto> {
    const user = await this.userService.findByLogin(loginDto.login);
    if (user && (await this.userService.isMatchPassword(user, loginDto.password))) {
      return this.createToken(user.id, user.login);
    } else throw new ForbiddenException();
  }

  async refreshToken(refreshToken: string): Promise<JwtDto> {
    try {
      const { username, sub } = await this.jwtService.verifyAsync(refreshToken, { secret: JWT_SECRET_REFRESH_KEY });
      return this.createToken(sub, username);
    } catch (e) {
      throw new ForbiddenException(e);
    }
  }

  private async createToken(sub, username): Promise<JwtDto> {
    const payload = { username, sub };
    return {
      accessToken: await this.jwtService.signAsync(payload, {
        secret: JWT_SECRET_KEY,
        expiresIn: TOKEN_EXPIRE_TIME,
      }),
      refreshToken: await this.jwtService.signAsync(payload, {
        secret: JWT_SECRET_REFRESH_KEY,
        expiresIn: TOKEN_REFRESH_EXPIRE_TIME,
      }),
    };
  }
}
