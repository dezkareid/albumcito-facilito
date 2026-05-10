import {
  Controller,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UseGuards,
  Get,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { JwtPayload } from '../auth/interfaces/user.interface';
import { AlbumsService } from '../albums/albums.service';
import { LikesService } from '../likes/likes.service';

const TOP_N = 5;

@Controller('stickers')
export class StickersController {
  constructor(
    private readonly albumsService: AlbumsService,
    private readonly likesService: LikesService,
  ) {}

  @Get('top')
  getTop() {
    const topIds = this.likesService.getTopStickerIds(TOP_N);
    return topIds.map(({ id, likeCount }) => ({
      ...this.albumsService.findStickerById(id),
      likeCount,
    }));
  }

  @Post(':id/like')
  @HttpCode(201)
  @UseGuards(JwtAuthGuard)
  likeSticker(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: { user: JwtPayload },
  ) {
    this.albumsService.findStickerById(id);
    const likeCount = this.likesService.likeSticker(req.user.sub, id);
    return { id, likeCount };
  }
}
