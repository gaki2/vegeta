import type { Metadata } from 'next';
import { ReactNode } from 'react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div className={'flex h-full w-full'}>
      <Link
        className={'absolute left-0 top-0 text-2xl text-blue-800'}
        href={'/login'}>
        홈으로
      </Link>
      {children}
      <div
        aria-description={'시각적 요소'}
        className={'w-1/2 bg-blue-500'}></div>
    </div>
  );
}
