'use client';

import { useState } from 'react';

interface LikeButtonProps {
  entityType: 'sticker' | 'album';
  entityId: number;
  initialLikeCount: number;
}

export default function LikeButton({ entityType, entityId, initialLikeCount }: LikeButtonProps) {
  const [likeCount, setLikeCount] = useState(initialLikeCount);
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [animating, setAnimating] = useState(false);

  async function handleLike() {
    if (liked || loading) return;
    setLoading(true);
    setLikeCount((c) => c + 1);
    setLiked(true);
    setAnimating(true);
    setTimeout(() => setAnimating(false), 400);
    try {
      const res = await fetch(`/api/likes/${entityType}/${entityId}`, { method: 'POST' });
      if (!res.ok) {
        setLikeCount((c) => c - 1);
        setLiked(false);
      }
    } catch {
      setLikeCount((c) => c - 1);
      setLiked(false);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleLike}
      disabled={liked || loading}
      aria-label={`Like this ${entityType}`}
      className={`flex items-center gap-1 rounded-full px-3 py-1 text-sm font-medium transition ${
        liked
          ? 'bg-pink-100 text-pink-600 cursor-default'
          : 'bg-gray-100 text-gray-500 hover:bg-pink-50 hover:text-pink-500'
      }`}
    >
      <span className={`inline-block ${animating ? 'animate-heart-pulse' : ''}`}>♥</span>
      {' '}{likeCount}
    </button>
  );
}
