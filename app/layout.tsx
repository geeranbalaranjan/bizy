import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { UserProvider } from '@auth0/nextjs-auth0/client'
import { AppProvider } from '@/context/AppContext'
import { TranslationProvider } from '@/context/TranslationContext'
import { RTLWrapper } from '@/components/layout/RTLWrapper'
import '@/app/globals.css'


const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Bizy - Your first Canadian co-founder',
  description: 'Launch your business in Canada with confidence',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body className="font-sans antialiased text-gray-900 dark:text-gray-100">
        <UserProvider>
          <TranslationProvider>
            <RTLWrapper>
              <AppProvider>{children}</AppProvider>
            </RTLWrapper>
          </TranslationProvider>
        </UserProvider>
      </body>
    </html>
  )
}
