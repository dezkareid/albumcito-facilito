import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { User } from './interfaces/user.interface';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  private readonly users: User[] = [];

  constructor(private readonly jwtService: JwtService) {}

  async signup(dto: SignupDto) {
    const { name, email, password } = dto;
    if (!name || !email || !password) {
      throw new BadRequestException('name, email and password are required');
    }
    if (this.users.find((u) => u.email === email)) {
      throw new BadRequestException('Email already registered');
    }

    const username = name.trim().toLowerCase().replace(/\s+/g, '-');
    const passwordHash = await bcrypt.hash(password, 10);
    const user: User = { id: crypto.randomUUID(), name, email, username, passwordHash };
    this.users.push(user);

    return this.signToken(user);
  }

  async login(dto: LoginDto) {
    const { email, password } = dto;
    if (!email || !password) {
      throw new BadRequestException('email and password are required');
    }

    const user = this.users.find((u) => u.email === email);
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.signToken(user);
  }

  private signToken(user: User) {
    const payload = { sub: user.id, email: user.email, username: user.username, name: user.name };
    return {
      access_token: this.jwtService.sign(payload),
      username: user.username,
    };
  }
}
