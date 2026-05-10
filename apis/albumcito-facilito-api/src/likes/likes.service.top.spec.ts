import { LikesService } from './likes.service';

describe('LikesService — top ranking', () => {
  let service: LikesService;

  beforeEach(() => {
    service = new LikesService();
  });

  describe('getTopStickerIds', () => {
    it('returns empty array when no stickers have likes', () => {
      expect(service.getTopStickerIds(5)).toEqual([]);
    });

    it('returns stickers sorted by likeCount descending', () => {
      service.likeSticker('u1', 101);
      service.likeSticker('u2', 101);
      service.likeSticker('u3', 101); // sticker 101: 3 likes
      service.likeSticker('u1', 102);
      service.likeSticker('u2', 102); // sticker 102: 2 likes
      service.likeSticker('u1', 103); // sticker 103: 1 like

      const top = service.getTopStickerIds(5);
      expect(top[0]).toEqual({ id: 101, likeCount: 3 });
      expect(top[1]).toEqual({ id: 102, likeCount: 2 });
      expect(top[2]).toEqual({ id: 103, likeCount: 1 });
    });

    it('breaks ties by sticker id ascending', () => {
      service.likeSticker('u1', 107); // sticker 107: 1 like
      service.likeSticker('u1', 103); // sticker 103: 1 like

      const top = service.getTopStickerIds(5);
      expect(top[0].id).toBe(103);
      expect(top[1].id).toBe(107);
    });

    it('limits results to n', () => {
      for (let i = 1; i <= 10; i++) {
        service.likeSticker('u1', 100 + i);
      }
      expect(service.getTopStickerIds(5)).toHaveLength(5);
    });
  });

  describe('getTopAlbumIds', () => {
    it('returns empty array when no albums have likes', () => {
      expect(service.getTopAlbumIds(5)).toEqual([]);
    });

    it('returns albums sorted by likeCount descending', () => {
      service.likeAlbum('u1', 2);
      service.likeAlbum('u2', 2);
      service.likeAlbum('u3', 2); // album 2: 3 likes
      service.likeAlbum('u1', 1);
      service.likeAlbum('u2', 1); // album 1: 2 likes

      const top = service.getTopAlbumIds(5);
      expect(top[0]).toEqual({ id: 2, likeCount: 3 });
      expect(top[1]).toEqual({ id: 1, likeCount: 2 });
    });

    it('breaks ties by album id ascending', () => {
      service.likeAlbum('u1', 3); // album 3: 1 like
      service.likeAlbum('u1', 1); // album 1: 1 like

      const top = service.getTopAlbumIds(5);
      expect(top[0].id).toBe(1);
      expect(top[1].id).toBe(3);
    });
  });
});
