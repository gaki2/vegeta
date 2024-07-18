'use client';

import { NextUIProvider as _NextUIProvider } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { type ReactNode } from 'react';

export function NextUIProvider({
  className,
  children,
}: {
  className: string;
  children: ReactNode;
}) {
  const router = useRouter();

  return (
    <_NextUIProvider
      className={className}
      navigate={router.push}>
      {children}
    </_NextUIProvider>
  );
}
