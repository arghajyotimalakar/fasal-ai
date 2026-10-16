import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Fasal AI – फसल AI | AI Crop Disease Detector for Indian Farmers',
  description:
    'Take a photo of your diseased crop and get instant AI-powered diagnosis and treatment advice in Hindi & English. Free for all farmers.',
  manifest: '/manifest.json',
  themeColor: '#16a34a',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="hi">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="min-h-screen bg-fasal-light font-sans antialiased">{children}</body>
    </html>
  );
}
