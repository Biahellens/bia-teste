import { Injectable, UnauthorizedException, ConflictException, forwardRef, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import type { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import type { RegisterDto, LoginDto } from '../dtos/auth.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  jwtSecret: string | undefined;
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @Inject(forwardRef(() => JwtService))
    private readonly jwtService: JwtService,
    @Inject(ConfigService)
    private readonly configService: ConfigService,
  ) {
    console.log('ConfigService no AuthService:', this.configService);
  }

  async register(registerDto: RegisterDto): Promise<User> {
    const { username, password } = registerDto;
    const existingUser = await this.userRepository.findOneBy({ username });

    if (existingUser) {
      throw new ConflictException('Username already exists');
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = this.userRepository.create({ username, passwordHash });
    return this.userRepository.save(user);
  }

  async login(loginDto: LoginDto): Promise<{ accessToken: string }> {
    const { username, password } = loginDto;
    const user = await this.userRepository.findOneBy({ username });

    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.id, username: user.username };
    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_SECRET'),
      expiresIn: '4h',
    });

    return { accessToken };
  }

  async findUserById(id: number): Promise<User | null> {
    return this.userRepository.findOneBy({ id });
  }
}
