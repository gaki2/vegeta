import '@/app/shared/globals.css';
import clsx from 'clsx';
import { NextUIProvider } from '@/app/shared/NextUIProvider';
import { ReactNode } from 'react';
import { UserContextProvider } from '@/firebase/UserProvider';
import { FirebaseProvider } from '@/firebase/FirebaseProvider';
import { QueryClientProvider } from '@/app/shared/QueryClientProvider';

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang='ko'>
      <body className={clsx('h-screen w-screen')}>
        <QueryClientProvider>
          <FirebaseProvider>
            <UserContextProvider>
              <NextUIProvider className='flex h-full w-full flex-row'>{children}</NextUIProvider>
            </UserContextProvider>
          </FirebaseProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
