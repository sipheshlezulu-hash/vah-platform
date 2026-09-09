import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'VAH AgentOS',
  description: 'Build your AI team. Run your business. Grow beyond yourself.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}</body></html>
}