const API_URL = process.env.API_URL ?? 'http://localhost:3001';

export interface CollectionEntry {
  userId: string;
  stickerId: number;
  albumId: number;
  addedAt: string;
}

export async function fetchCollectionForUser(token: string): Promise<CollectionEntry[]> {
  const res = await fetch(`${API_URL}/collection/stickers`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: 'no-store',
  });
  if (!res.ok) return [];
  return res.json();
}

export async function addStickerToCollection(
  stickerId: number,
  albumId: number,
): Promise<CollectionEntry> {
  const res = await fetch('/api/collection/stickers', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ stickerId, albumId }),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message ?? 'Failed to add sticker');
  }
  return res.json();
}
