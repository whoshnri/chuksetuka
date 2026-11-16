import type { Metadata, Viewport } from 'next'
import { Manrope, Source_Serif_4 } from 'next/font/google'
import './globals.css'
import { SmoothScroll } from '@/components/smooth-scroll'
import { ShapeDefs } from '@/components/shape-defs'
import { ConsentAnalytics } from '@/components/consent-analytics'

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
  metadataBase: new URL('https://www.chuksetukaconsulting.com'),
  title: {
    default: 'Chuks Etuka Consulting | DEI&B Strategy, Training & Inclusive Leadership',
    template: '%s | Chuks Etuka Consulting',
  },
  description:
    'Lived-experience-led DEI&B strategy, workshops and coaching to help organisations build more inclusive workplaces. Based in the UK.',
  keywords: [
    'DEI consultant', 'DEI&B strategy', 'diversity equity inclusion',
    'inclusive leadership', 'inclusion training UK', 'accessibility audit',
    'anti-racism training', 'psychological safety', 'workplace inclusion',
    'Chuks Etuka', 'EDI consultant UK',
  ],
  authors: [{ name: 'Chuks Etuka', url: 'https://www.chuksetukaconsulting.com/founder' }],
  creator: 'Chuks Etuka Consulting',
  publisher: 'Chuks Etuka Consulting',
  openGraph: {
    title: 'Chuks Etuka Consulting | DEI&B Strategy, Training & Inclusive Leadership',
    description:
      'Lived-experience-led DEI&B strategy, workshops and coaching to help organisations build more inclusive workplaces.',
    type: 'website',
    locale: 'en_GB',
    siteName: 'Chuks Etuka Consulting',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Chuks Etuka Consulting — Decode DEI. Build trust. Boost impact.' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chuks Etuka Consulting | DEI&B Strategy & Training',
    description: 'Lived-experience-led DEI&B strategy, workshops and coaching to help organisations build more inclusive workplaces.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 },
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
  alternates: {
    canonical: '/',
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
        <ConsentAnalytics />
      </body>
    </html>
  )
}
