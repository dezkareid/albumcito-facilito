import { Body, Controller, Get, HttpCode, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { JwtPayload } from '../auth/interfaces/user.interface';
import { CollectionService } from './collection.service';
import { AddStickerDto } from './dto/add-sticker.dto';

@Controller('collection')
@UseGuards(JwtAuthGuard)
export class CollectionController {
  constructor(private readonly collectionService: CollectionService) {}

  @Post('stickers')
  @HttpCode(201)
  addSticker(@Req() req: { user: JwtPayload }, @Body() dto: AddStickerDto) {
    return this.collectionService.addSticker(req.user.sub, dto);
  }

  @Get('stickers')
  getStickers(@Req() req: { user: JwtPayload }) {
    return this.collectionService.getCollection(req.user.sub);
  }
}
