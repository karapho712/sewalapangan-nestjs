import { Controller, Post, Body, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/auth.dto';
import { Staff } from 'src/modules/staff/entities/staff.entity';
import { Public } from 'src/utils/decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  async login(@Body() dto: LoginDto) {
    return await this.authService.login(dto);
  }

  @Post('refresh')
  async refreshToken(@Req() req: Request & { user: Staff }) {
    return await this.authService.refreshToken(req.user);
  }
}
