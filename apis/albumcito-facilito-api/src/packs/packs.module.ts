import { Module } from '@nestjs/common';
import { AlbumsModule } from '../albums/albums.module';
import { PacksController } from './packs.controller';
import { PacksService } from './packs.service';

@Module({
  imports: [AlbumsModule],
  controllers: [PacksController],
  providers: [PacksService],
  exports: [PacksService],
})
export class PacksModule {}
