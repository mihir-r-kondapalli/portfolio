import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Mihir Kondapalli | Software Engineer & Researcher',
  description: 'Portfolio of Mihir Kondapalli, Software Engineer and Researcher at UCSB',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <body className="bg-white text-gray-900 min-h-screen">
        {children}
      </body>
    </html>
  );
}