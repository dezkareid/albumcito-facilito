import { Injectable, NotFoundException } from '@nestjs/common';
import { AlbumsService } from '../albums/albums.service';

export interface Pack {
  id: number;
  albumId: number;
  name: string;
  stickersPerPack: number;
  priceCents: number;
  currency: 'MXN';
}

export interface PackDto extends Pack {
  albumName: string;
}

const PACKS: Pack[] = [
  {
    id: 11,
    albumId: 1,
    name: 'Basic Pack',
    stickersPerPack: 5,
    priceCents: 2500,
    currency: 'MXN',
  },
  {
    id: 12,
    albumId: 1,
    name: 'Premium Pack',
    stickersPerPack: 10,
    priceCents: 4500,
    currency: 'MXN',
  },
  {
    id: 21,
    albumId: 2,
    name: 'Basic Pack',
    stickersPerPack: 5,
    priceCents: 2500,
    currency: 'MXN',
  },
  {
    id: 31,
    albumId: 3,
    name: 'Basic Pack',
    stickersPerPack: 5,
    priceCents: 2500,
    currency: 'MXN',
  },
];

@Injectable()
export class PacksService {
  constructor(private readonly albumsService: AlbumsService) {}

  findAll(): PackDto[] {
    return [...PACKS]
      .sort((a, b) => a.albumId - b.albumId || a.id - b.id)
      .map((pack) => this.toDto(pack));
  }

  findOne(id: number): PackDto {
    const pack = PACKS.find((p) => p.id === id);
    if (!pack) throw new NotFoundException(`Pack ${id} not found`);
    return this.toDto(pack);
  }

  findByAlbum(albumId: number): PackDto[] {
    this.albumsService.findOne(albumId);
    return this.findAll().filter((p) => p.albumId === albumId);
  }

  private toDto(pack: Pack): PackDto {
    const album = this.albumsService.findOne(pack.albumId);
    return {
      id: pack.id,
      albumId: pack.albumId,
      albumName: album.name,
      name: pack.name,
      stickersPerPack: pack.stickersPerPack,
      priceCents: pack.priceCents,
      currency: pack.currency,
    };
  }
}
