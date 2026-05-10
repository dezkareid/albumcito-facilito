import { Module } from '@nestjs/common';
import { AlbumsModule } from '../albums/albums.module';
import { AuthModule } from '../auth/auth.module';
import { LikesModule } from '../likes/likes.module';
import { StickersController } from './stickers.controller';

@Module({
  imports: [AlbumsModule, AuthModule, LikesModule],
  controllers: [StickersController],
})
export class StickersModule {}
