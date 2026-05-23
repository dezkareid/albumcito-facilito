import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AlbumsService, Sticker } from './albums.service';

describe('AlbumsService', () => {
  let service: AlbumsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AlbumsService],
    }).compile();

    service = module.get<AlbumsService>(AlbumsService);
  });

  describe('getRandomSticker', () => {
    it('returns a sticker with valid id, number, name, and albumId from the catalog', () => {
      const sticker = service.getRandomSticker();

      expect(sticker).toMatchObject<Sticker>({
        id: expect.any(Number),
        albumId: expect.any(Number),
        number: expect.any(Number),
        name: expect.any(String),
      });
      expect(sticker.id).toBeGreaterThan(0);
      expect(sticker.number).toBeGreaterThan(0);
      expect(sticker.albumId).toBeGreaterThan(0);
      expect(sticker.name.length).toBeGreaterThan(0);
    });

    it('returns a sticker that belongs to the full catalog', () => {
      const sticker = service.getRandomSticker();
      const all = service.findAllStickers();

      expect(all).toContainEqual(sticker);
    });

    it('throws NotFoundException when the catalog is empty', () => {
      jest.spyOn(service, 'findAllStickers').mockReturnValue([]);

      expect(() => service.getRandomSticker()).toThrow(NotFoundException);
      expect(() => service.getRandomSticker()).toThrow('No stickers available');
    });
  });
});
