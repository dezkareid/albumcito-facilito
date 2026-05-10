const API_URL = process.env.API_URL ?? 'http://localhost:3001';

export interface StickerWithLikes {
  id: number;
  albumId: number;
  number: number;
  name: string;
  likeCount: number;
}

export async function fetchTopStickers(): Promise<StickerWithLikes[]> {
  const res = await fetch(`${API_URL}/stickers/top`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch top stickers');
  return res.json();
}

export async function likeSticker(stickerId: number, token: string): Promise<{ id: number; likeCount: number }> {
  const res = await fetch(`${API_URL}/stickers/${stickerId}/like`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error(`Failed to like sticker ${stickerId}`);
  return res.json();
}
