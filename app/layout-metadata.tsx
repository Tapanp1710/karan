import { Metadata } from 'next';

/**
 * Helper to generate common metadata structure
 * Use this pattern across all pages for consistency
 */
export function generatePageMetadata(
  title: string,
  description: string,
  keywords: string[],
  ogImage?: string
): Metadata {
  return {
    title,
    description,
    keywords,
    viewport: 'width=device-width, initial-scale=1',
    robots: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
    openGraph: {
      title,
      description,
      type: 'website',
      images: ogImage ? [ogImage] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}
