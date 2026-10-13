import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AlbumsService } from '../albums/albums.service';
import { PacksService } from './packs.service';

describe('PacksService', () => {
  let service: PacksService;
  let albums: AlbumsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PacksService, AlbumsService],
    }).compile();

    service = module.get<PacksService>(PacksService);
    albums = module.get<AlbumsService>(AlbumsService);
  });

  describe('findAll', () => {
    it('returns packs ordered by albumId then id', () => {
      const packs = service.findAll();

      expect(packs.map((p) => p.id)).toEqual([11, 12, 21, 31]);
    });

    it('returns the PackDto shape with albumName', () => {
      const [first] = service.findAll();

      expect(first).toEqual({
        id: 11,
        albumId: 1,
        albumName: albums.findOne(1).name,
        name: 'Basic Pack',
        stickersPerPack: 5,
        priceCents: 2500,
        currency: 'MXN',
      });
    });

    it('gives every pack a positive integer priceCents', () => {
      for (const pack of service.findAll()) {
        expect(Number.isInteger(pack.priceCents)).toBe(true);
        expect(pack.priceCents).toBeGreaterThan(0);
      }
    });

    it('gives every album between 1 and 2 packs', () => {
      for (const album of albums.findAll()) {
        const count = service
          .findAll()
          .filter((p) => p.albumId === album.id).length;
        expect(count).toBeGreaterThanOrEqual(1);
        expect(count).toBeLessThanOrEqual(2);
      }
    });
  });

  describe('findOne', () => {
    it('returns the pack with the given id', () => {
      expect(service.findOne(12)).toMatchObject({
        id: 12,
        name: 'Premium Pack',
      });
    });

    it('throws NotFoundException when the pack does not exist', () => {
      expect(() => service.findOne(999)).toThrow(NotFoundException);
    });
  });

  describe('findByAlbum', () => {
    it('returns only packs of the album', () => {
      const packs = service.findByAlbum(1);

      expect(packs.map((p) => p.id)).toEqual([11, 12]);
      expect(packs.every((p) => p.albumId === 1)).toBe(true);
    });

    it('throws NotFoundException for an unknown album', () => {
      expect(() => service.findByAlbum(999)).toThrow(NotFoundException);
    });
  });
});
