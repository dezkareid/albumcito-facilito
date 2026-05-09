const API_URL = process.env.API_URL ?? 'http://localhost:3001';

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

export async function fetchAlbums(): Promise<Album[]> {
  const res = await fetch(`${API_URL}/albums`, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error('Failed to fetch albums');
  return res.json();
}

export async function fetchStickers(albumId: number): Promise<Sticker[]> {
  const res = await fetch(`${API_URL}/albums/${albumId}/stickers`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error(`Failed to fetch stickers for album ${albumId}`);
  return res.json();
}
