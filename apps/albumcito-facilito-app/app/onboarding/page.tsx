import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { fetchStickers } from '@/lib/albums';
import StickerPicker from './_components/StickerPicker';

const API_URL = process.env.API_URL ?? 'http://localhost:3001';

export default async function OnboardingPage() {
  const token = (await cookies()).get('auth_token')?.value;
  if (!token) redirect('/login');

  const res = await fetch(`${API_URL}/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: 'no-store',
  });
  if (!res.ok) redirect('/login');

  const user = await res.json();

  if (user.onboardingCompleted !== false) {
    redirect(`/dashboard/${user.username}`);
  }

  const stickers = await fetchStickers(1);

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome to your album, {user.name}!</h1>
          <p className="mt-2 text-gray-500">
            Pick your first Cody sticker to start your collection.
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-gray-800">Cody&apos;s Adventure 2024</h2>
          <StickerPicker stickers={stickers} username={user.username} />
        </div>
      </div>
    </main>
  );
}
