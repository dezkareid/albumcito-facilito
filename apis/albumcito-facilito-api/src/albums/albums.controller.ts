import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { AlbumsService } from './albums.service';

@Controller('albums')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Get()
  findAll() {
    return this.albumsService.findAll();
  }

  @Get(':id/stickers')
  findStickers(@Param('id', ParseIntPipe) id: number) {
    return this.albumsService.findStickers(id);
  }
}
