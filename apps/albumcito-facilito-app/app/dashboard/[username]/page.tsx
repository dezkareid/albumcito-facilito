import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import LogoutButton from './_components/LogoutButton';
import MyStickers from './_components/MyStickers';
import { fetchCollectionForUser } from '@/lib/collection';

const API_URL = process.env.API_URL ?? 'http://localhost:3001';

interface Props {
  params: Promise<{ username: string }>;
}

export default async function DashboardPage({ params }: Props) {
  const { username } = await params;

  const token = (await cookies()).get('auth_token')?.value;
  if (!token) redirect('/login');

  const res = await fetch(`${API_URL}/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: 'no-store',
  });
  if (!res.ok) redirect('/login');

  const user = await res.json();
  const collection = await fetchCollectionForUser(token);

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-2xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Welcome, {user.name}!</h1>
            <p className="mt-1 text-gray-500">@{username}</p>
          </div>
          <LogoutButton />
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">My stickers</h2>
            <span className="text-sm text-gray-400">{collection.length} collected</span>
          </div>
          <MyStickers entries={collection} />
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Browse albums</h2>
          <Link
            href="/"
            className="text-sm font-medium text-indigo-600 hover:underline"
          >
            Browse albums →
          </Link>
        </div>
      </div>
    </main>
  );
}
