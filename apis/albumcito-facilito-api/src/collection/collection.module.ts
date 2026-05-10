import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { CollectionController } from './collection.controller';
import { CollectionService } from './collection.service';
import { OnboardingListener } from './listeners/onboarding.listener';

@Module({
  imports: [AuthModule],
  controllers: [CollectionController],
  providers: [CollectionService, OnboardingListener],
})
export class CollectionModule {}
