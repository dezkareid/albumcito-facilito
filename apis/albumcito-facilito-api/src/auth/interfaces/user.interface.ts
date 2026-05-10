export interface User {
  id: string;
  name: string;
  email: string;
  username: string;
  passwordHash: string;
  createdAt: Date;
  onboardingCompleted: boolean | null;
}

export interface JwtPayload {
  sub: string;
  email: string;
  username: string;
  name: string;
}
