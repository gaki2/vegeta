'use client';

import { NextUIProvider as _NextUIProvider } from '@nextui-org/react';
import { type ReactNode } from 'react';

export function NextUIProvider({ children }: { children: ReactNode }) {
  return <_NextUIProvider>{children}</_NextUIProvider>;
}
