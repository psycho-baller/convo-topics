import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { Providers } from './Providers'
import { TRPCReactProvider } from './TRPCProviders'

const fontSans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
})

/**
 * Since we're passing `headers()` to the `TRPCReactProvider` we need to
 * make the entire app dynamic. You can move the `TRPCReactProvider` further
 * down the tree (e.g. /dashboard and onwards) to make part of the app statically rendered.
 */
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Create T3 Turbo',
  description: 'Simple monorepo with shared backend for web & mobile apps',
  openGraph: {
    title: 'Create T3 Turbo',
    description: 'Simple monorepo with shared backend for web & mobile apps',
    url: 'https://create-t3-turbo.vercel.app',
    siteName: 'Create T3 Turbo',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@jullerino',
    creator: '@jullerino',
  },
}

export default function Layout(props: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className={['font-sans', fontSans.variable].join(' ')}>
        <Providers>
          <TRPCReactProvider>
            {process.env.VERCEL_ENV !== 'production' ? (
              <>{props.children}</>
            ) : (
              <h1>stay tuned 👀</h1>
            )}
          </TRPCReactProvider>
        </Providers>
      </body>
    </html>
  )
}
