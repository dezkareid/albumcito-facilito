import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { PacksService } from './packs.service';

@Controller()
export class PacksController {
  constructor(private readonly packsService: PacksService) {}

  @Get('packs')
  findAll() {
    return this.packsService.findAll();
  }

  @Get('packs/:id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.packsService.findOne(id);
  }

  @Get('albums/:id/packs')
  findByAlbum(@Param('id', ParseIntPipe) id: number) {
    return this.packsService.findByAlbum(id);
  }
}
