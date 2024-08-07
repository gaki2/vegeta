'use client';

import { ReactNode } from 'react';
import { useUser } from '@/firebase/UserProvider';

export default function Template({ children }: { children: ReactNode }) {
  const { user } = useUser();

  return <>{children}</>;
}
