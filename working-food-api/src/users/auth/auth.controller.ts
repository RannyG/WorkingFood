import { Body, Controller, Post } from '@nestjs/common';
import type { LoginDto } from './models/login.dto';
import { AuthService } from './auth.service';
import { Public } from 'src/core/annotation/public.annotation';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('login')
  login(@Body() body: LoginDto) {
    return this.authService.login(body);
  }
}
