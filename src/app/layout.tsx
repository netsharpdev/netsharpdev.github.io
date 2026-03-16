import type { Metadata } from 'next';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import '@/styles/globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://netsharpdev.com'),
  title: {
    default: 'Paweł Pindel | .NET - Azure - Software Development',
    template: '%s | Paweł Pindel',
  },
  description:
    'NETSHARPDEV is a developer blog about Azure, .NET and Architecture. Here you can read some great posts of Paweł Pindel, Principal Software Engineer at Verisk Analytics and NETSharp Development.',
  openGraph: {
    type: 'website',
    siteName: 'NETSHARPDEV',
    locale: 'en_US',
    url: '/',
    title: 'Paweł Pindel | .NET - Azure - Software Development',
    description:
      'Developer blog about Azure, .NET and Architecture by Paweł Pindel, Principal Software Engineer.',
    images: [
      {
        url: '/images/og-default.png',
        width: 1200,
        height: 630,
        alt: 'NETSHARPDEV - Paweł Pindel',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Paweł Pindel | .NET - Azure - Software Development',
    description:
      'Developer blog about Azure, .NET and Architecture by Paweł Pindel.',
    images: ['/images/og-default.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: '/',
    types: {
      'application/rss+xml': '/feed.xml',
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  );
}
