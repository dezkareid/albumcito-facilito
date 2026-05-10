import { ConflictException } from '@nestjs/common';
import { LikesService } from './likes.service';

describe('LikesService', () => {
  let service: LikesService;

  beforeEach(() => {
    service = new LikesService();
  });

  describe('likeSticker', () => {
    it('increments like count on first like', () => {
      expect(service.likeSticker('user-1', 101)).toBe(1);
      expect(service.likeSticker('user-2', 101)).toBe(2);
    });

    it('throws ConflictException on duplicate like', () => {
      service.likeSticker('user-1', 101);
      expect(() => service.likeSticker('user-1', 101)).toThrow(
        ConflictException,
      );
    });

    it('does not change count on duplicate like attempt', () => {
      service.likeSticker('user-1', 101);
      try {
        service.likeSticker('user-1', 101);
      } catch {}
      expect(service.getStickerLikeCount(101)).toBe(1);
    });
  });

  describe('likeAlbum', () => {
    it('increments like count on first like', () => {
      expect(service.likeAlbum('user-1', 1)).toBe(1);
      expect(service.likeAlbum('user-2', 1)).toBe(2);
    });

    it('throws ConflictException on duplicate like', () => {
      service.likeAlbum('user-1', 1);
      expect(() => service.likeAlbum('user-1', 1)).toThrow(ConflictException);
    });

    it('does not change count on duplicate like attempt', () => {
      service.likeAlbum('user-1', 1);
      try {
        service.likeAlbum('user-1', 1);
      } catch {}
      expect(service.getAlbumLikeCount(1)).toBe(1);
    });
  });

  describe('getStickerLikeCount', () => {
    it('returns 0 for sticker with no likes', () => {
      expect(service.getStickerLikeCount(999)).toBe(0);
    });
  });

  describe('getAlbumLikeCount', () => {
    it('returns 0 for album with no likes', () => {
      expect(service.getAlbumLikeCount(999)).toBe(0);
    });
  });
});
