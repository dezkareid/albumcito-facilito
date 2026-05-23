'use client'

import { useState } from 'react'

type FilterChip = 'All' | 'Rare' | 'Common' | 'Legendary'

const CHIPS: FilterChip[] = ['All', 'Rare', 'Common', 'Legendary']

export function FilterChips() {
  const [active, setActive] = useState<FilterChip>('All')

  return (
    <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none" role="group" aria-label="Filter stickers by rarity">
      {CHIPS.map((chip) => (
        <button
          key={chip}
          onClick={() => setActive(chip)}
          aria-pressed={active === chip}
          className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
            active === chip
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          {chip}
        </button>
      ))}
    </div>
  )
}
