'use client'

import { useState } from 'react'

interface Sticker {
  id: number
  albumId: number
  number: number
  name: string
}

type FetchState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; sticker: Sticker }
  | { status: 'error'; message: string }

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001'

export function RandomStickerButton() {
  const [state, setState] = useState<FetchState>({ status: 'idle' })

  async function handleClick() {
    setState({ status: 'loading' })
    try {
      const res = await fetch(`${API_URL}/stickers/random`)
      if (!res.ok) {
        const message =
          res.status === 404
            ? 'No stickers found in the album yet.'
            : `Could not load a sticker (${res.status}). Please try again.`
        setState({ status: 'error', message })
        return
      }
      const sticker: Sticker = await res.json()
      setState({ status: 'success', sticker })
    } catch {
      setState({
        status: 'error',
        message: 'Network error — please check your connection and try again.',
      })
    }
  }

  const isLoading = state.status === 'loading'

  return (
    <div className="flex flex-col items-start gap-4">
      <button
        onClick={handleClick}
        disabled={isLoading}
        className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isLoading ? 'Loading…' : 'Get a Random Sticker'}
      </button>

      {state.status === 'success' && (
        <div
          role="region"
          aria-label="Random sticker result"
          className="rounded-lg border border-indigo-100 bg-indigo-50 px-5 py-4 text-sm text-gray-800"
        >
          <p className="font-semibold text-indigo-700">
            #{state.sticker.number} — {state.sticker.name}
          </p>
          <p className="mt-1 text-xs text-gray-500">Sticker ID: {state.sticker.id}</p>
        </div>
      )}

      {state.status === 'error' && (
        <p role="alert" className="text-sm text-red-600">
          {state.message}
        </p>
      )}
    </div>
  )
}
