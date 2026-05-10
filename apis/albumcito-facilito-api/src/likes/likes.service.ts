import { ConflictException, Injectable } from '@nestjs/common';

@Injectable()
export class LikesService {
  private readonly stickerLikes = new Map<number, Set<string>>();
  private readonly albumLikes = new Map<number, Set<string>>();

  likeSticker(userId: string, stickerId: number): number {
    if (!this.stickerLikes.has(stickerId)) {
      this.stickerLikes.set(stickerId, new Set());
    }
    const likes = this.stickerLikes.get(stickerId)!;
    if (likes.has(userId)) throw new ConflictException('Already liked');
    likes.add(userId);
    return likes.size;
  }

  likeAlbum(userId: string, albumId: number): number {
    if (!this.albumLikes.has(albumId)) {
      this.albumLikes.set(albumId, new Set());
    }
    const likes = this.albumLikes.get(albumId)!;
    if (likes.has(userId)) throw new ConflictException('Already liked');
    likes.add(userId);
    return likes.size;
  }

  getStickerLikeCount(stickerId: number): number {
    return this.stickerLikes.get(stickerId)?.size ?? 0;
  }

  getAlbumLikeCount(albumId: number): number {
    return this.albumLikes.get(albumId)?.size ?? 0;
  }

  getTopStickerIds(n: number): Array<{ id: number; likeCount: number }> {
    return [...this.stickerLikes.entries()]
      .map(([id, likes]) => ({ id, likeCount: likes.size }))
      .filter((e) => e.likeCount > 0)
      .sort((a, b) => b.likeCount - a.likeCount || a.id - b.id)
      .slice(0, n);
  }

  getTopAlbumIds(n: number): Array<{ id: number; likeCount: number }> {
    return [...this.albumLikes.entries()]
      .map(([id, likes]) => ({ id, likeCount: likes.size }))
      .filter((e) => e.likeCount > 0)
      .sort((a, b) => b.likeCount - a.likeCount || a.id - b.id)
      .slice(0, n);
  }
}
