import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { EventEmitter2 } from '@nestjs/event-emitter';
import * as bcrypt from 'bcryptjs';
import { User } from './interfaces/user.interface';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { OnboardingCompletedEvent } from '../collection/events/onboarding-completed.event';

@Injectable()
export class AuthService {
  private readonly users: User[] = [];

  constructor(
    private readonly jwtService: JwtService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

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
    const user: User = {
      id: crypto.randomUUID(),
      name,
      email,
      username,
      passwordHash,
      createdAt: new Date(),
      onboardingCompleted: false,
    };
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

  getUser(userId: string): User {
    const user = this.users.find((u) => u.id === userId);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  completeOnboarding(userId: string, stickerId: number, albumId: number): void {
    const user = this.users.find((u) => u.id === userId);
    if (!user || user.onboardingCompleted === true) return;

    const onboardingCompletedAt = new Date();
    user.onboardingCompleted = true;

    this.eventEmitter.emit(
      'onboarding.completed',
      new OnboardingCompletedEvent({
        userId: user.id,
        username: user.username,
        stickerId,
        albumId,
        accountCreatedAt: user.createdAt,
        onboardingCompletedAt,
        durationMs: onboardingCompletedAt.getTime() - user.createdAt.getTime(),
      }),
    );
  }

  private signToken(user: User) {
    const payload = { sub: user.id, email: user.email, username: user.username, name: user.name };
    return {
      access_token: this.jwtService.sign(payload),
      username: user.username,
    };
  }
}
