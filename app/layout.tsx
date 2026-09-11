import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Lesedi AnI — Ancestral Intelligence',
  description: 'Lesedi AnI is VAH Labs ancestral intelligence layer for African creators and businesses.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}</body></html>
}