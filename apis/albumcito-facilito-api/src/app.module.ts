import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AlbumsModule } from './albums/albums.module';
import { AuthModule } from './auth/auth.module';
import { CollectionModule } from './collection/collection.module';

@Module({
  imports: [
    EventEmitterModule.forRoot({ global: true }),
    AlbumsModule,
    AuthModule,
    CollectionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
