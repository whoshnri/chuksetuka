import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Manrope, Source_Serif_4 } from 'next/font/google'
import './globals.css'
import { SmoothScroll } from '@/components/smooth-scroll'
import { ShapeDefs } from '@/components/shape-defs'

const manrope = Manrope({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-heading',
})

const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
  variable: '--font-body-serif',
})

export const metadata: Metadata = {
  title: 'Chuks Etuka | Inclusive Culture & DEI Strategy',
  description:
    'Lived-experience-led DEI&B strategy, workshops and coaching to help organisations build more inclusive workplaces.',
  openGraph: {
    title: 'Chuks Etuka | Inclusive Culture & DEI Strategy',
    description:
      'Lived-experience-led DEI&B strategy, workshops and coaching to help organisations build more inclusive workplaces.',
    type: 'website',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#FAFAFA',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html className={`light ${manrope.variable} ${sourceSerif.variable}`} lang="en-GB">
      <head>
        <link href="https://fonts.googleapis.com" rel="preconnect" />
        <link crossOrigin="anonymous" href="https://fonts.gstatic.com" rel="preconnect" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <ShapeDefs />
        <SmoothScroll>{children}</SmoothScroll>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
