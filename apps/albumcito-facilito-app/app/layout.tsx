import type { Metadata } from 'next'
import Link from 'next/link'
import './globals.css'

export const metadata: Metadata = {
  title: 'Albumcito Facilito',
  description: 'Track your Cody sticker collection',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <header className="border-b border-gray-200 bg-white">
          <nav
            className="mx-auto flex max-w-5xl items-center gap-6 px-6 py-3"
            aria-label="Site navigation"
          >
            <Link
              href="/"
              className="text-sm font-semibold text-gray-900 hover:text-indigo-600 transition-colors"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors"
            >
              About
            </Link>
          </nav>
        </header>
        {children}
      </body>
    </html>
  )
}
