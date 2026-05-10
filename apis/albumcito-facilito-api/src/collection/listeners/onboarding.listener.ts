import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { OnboardingCompletedEvent } from '../events/onboarding-completed.event';

@Injectable()
export class OnboardingListener {
  private readonly logger = new Logger(OnboardingListener.name);

  @OnEvent('onboarding.completed')
  handle(event: OnboardingCompletedEvent): void {
    this.logger.log(
      `[onboarding.completed] userId=${event.userId} username=${event.username} ` +
        `stickerId=${event.stickerId} albumId=${event.albumId} durationMs=${event.durationMs}`,
    );
  }
}
