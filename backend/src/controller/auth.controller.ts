import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import type { AuthService } from '../services/auth.service';
import type { RegisterDto, LoginDto } from '../dtos/auth.dto';
import type { User } from '../entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body(ValidationPipe) registerDto: RegisterDto): Promise<User> {
    return this.authService.register(registerDto);
  }

  @Post('login')
  async login(@Body(ValidationPipe) loginDto: LoginDto): Promise<{ accessToken: string }> {
    return this.authService.login(loginDto);
  }
}