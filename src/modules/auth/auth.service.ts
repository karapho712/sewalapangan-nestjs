import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { StaffService } from 'src/modules/staff/staff.service';
import { LoginDto } from './dto/auth.dto';
import { compare } from 'bcrypt';
import { omit } from 'lodash';
import { Staff } from 'src/modules/staff/entities/staff.entity';

const EXPIRE_TIME = 30 * 60 * 1000; // In seconds
const ACCESS_TOKEN_EXPIRE_TIME = '30m';
const REFRESH_TOKEN_EXPIRE_TIME = '20m';

@Injectable()
export class AuthService {
  constructor(
    private readonly staffService: StaffService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(loginDto: LoginDto) {
    const user = await this.staffService.findByEmail(loginDto.email);

    if (user && (await compare(loginDto.password, user.password))) {
      const rest = omit(user, 'password');
      return rest;
    } else {
      throw new UnauthorizedException();
    }
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto);

    return {
      user,
      backendTokens: {
        accessToken: await this.jwtService.signAsync(user, {
          expiresIn: ACCESS_TOKEN_EXPIRE_TIME,
          secret: process.env.jwtSecretKey,
        }),
        refreshToken: await this.jwtService.signAsync(user, {
          expiresIn: REFRESH_TOKEN_EXPIRE_TIME,
          secret: process.env.jwtRefreshTokenKey,
        }),
        expiresIn: new Date().setTime(new Date().getTime() + EXPIRE_TIME),
      },
    };
  }

  async refreshToken(user: Staff) {
    const staff = await this.staffService.findByEmail(user.email);

    return {
      user: staff,
      accessToken: await this.jwtService.signAsync(user, {
        expiresIn: ACCESS_TOKEN_EXPIRE_TIME,
        secret: process.env.jwtSecretKey,
      }),
      refreshToken: await this.jwtService.signAsync(user, {
        expiresIn: REFRESH_TOKEN_EXPIRE_TIME,
        secret: process.env.jwtRefreshTokenKey,
      }),
      expiresIn: new Date().setTime(new Date().getTime() + EXPIRE_TIME),
    };
  }
}
