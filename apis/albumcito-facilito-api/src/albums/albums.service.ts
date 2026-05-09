import { Injectable, NotFoundException } from '@nestjs/common';

export interface Album {
  id: number;
  name: string;
  description: string;
  totalStickers: number;
}

export interface Sticker {
  id: number;
  albumId: number;
  number: number;
  name: string;
}

const ALBUMS: Album[] = [
  {
    id: 1,
    name: "Cody's Adventure 2024",
    description: 'Collect all 30 Cody stickers from his epic adventure!',
    totalStickers: 30,
  },
  {
    id: 2,
    name: "Cody's World Tour",
    description: 'Join Cody as he travels the world! 20 unique stickers.',
    totalStickers: 20,
  },
  {
    id: 3,
    name: "Cody's Space Mission",
    description: 'Blast off with Cody on his space mission! 25 stickers.',
    totalStickers: 25,
  },
];

function generateStickers(album: Album): Sticker[] {
  return Array.from({ length: album.totalStickers }, (_, i) => ({
    id: album.id * 100 + i + 1,
    albumId: album.id,
    number: i + 1,
    name: `Cody #${i + 1}`,
  }));
}

@Injectable()
export class AlbumsService {
  findAll(): Album[] {
    return ALBUMS;
  }

  findOne(id: number): Album {
    const album = ALBUMS.find((a) => a.id === id);
    if (!album) throw new NotFoundException(`Album ${id} not found`);
    return album;
  }

  findStickers(albumId: number): Sticker[] {
    const album = this.findOne(albumId);
    return generateStickers(album);
  }
}
