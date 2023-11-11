import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '竞赛统计平台',
  description: '小型竞赛统计平台',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' style={{ height: 'calc(100%)', width: 'calc(100%)' }}>
      <body style={{ margin: '0', height: 'calc(100%)', width: 'calc(100%)' }}>
        {children}
      </body>
    </html>
  )
}
