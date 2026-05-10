import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { LikesModule } from '../likes/likes.module';
import { AlbumsController } from './albums.controller';
import { AlbumsService } from './albums.service';

@Module({
  imports: [AuthModule, LikesModule],
  controllers: [AlbumsController],
  providers: [AlbumsService],
  exports: [AlbumsService],
})
export class AlbumsModule {}
