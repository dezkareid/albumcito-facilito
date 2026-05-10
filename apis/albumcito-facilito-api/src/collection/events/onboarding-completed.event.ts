export class OnboardingCompletedEvent {
  userId: string;
  username: string;
  stickerId: number;
  albumId: number;
  accountCreatedAt: Date;
  onboardingCompletedAt: Date;
  durationMs: number;

  constructor(data: OnboardingCompletedEvent) {
    Object.assign(this, data);
  }
}
