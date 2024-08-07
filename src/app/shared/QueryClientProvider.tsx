'use client';

import { QueryClient, QueryClientProvider as _QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';
const queryClient = new QueryClient();

export const QueryClientProvider = ({ children }: { children: ReactNode }) => {
  return <_QueryClientProvider client={queryClient}>{children}</_QueryClientProvider>;
};
