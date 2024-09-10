'use client';

import { createContext, type ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import { User, getAuth } from 'firebase/auth';
import { LocalStorageKeyMap } from '@/app/shared/localStorageKey';

type UserState = { user: User | null; name: string; photoUrl: string };

const UserStateContext = createContext<UserState>({} as UserState);

export const UserContextProvider = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  const [authState, setAuthState] = useState<UserState>({
    user: null,
    name: '',
    photoUrl: '',
  });

  useEffect(() => {
    // const foo = localStorage.getItem(LocalStorageKeyMap.userInfo);
    // if (foo) {
    //   const { name, photoUrl } = JSON.parse(foo) as { name: string; photoUrl: string };
    //   setAuthState({
    //     user: null,
    //     name,
    //     photoUrl,
    //   });
    // }
    const auth = getAuth();
    auth.onAuthStateChanged(async (user) => {
      console.log(user);
      if (user) {
        setAuthState({ user, name: user.displayName!, photoUrl: user.photoURL! });
        // localStorage.setItem(
        //   LocalStorageKeyMap.userInfo,
        //   JSON.stringify({ name: user.displayName ?? '', photoUrl: user.photoURL ?? '' })
        // );
      }
    });
  }, []);

  return <UserStateContext.Provider value={authState}>{children}</UserStateContext.Provider>;
};

export const useUser = () => {
  const userState = useContext(UserStateContext);
  if (!userState) {
    throw new Error('useAuthState must be used within AuthContextProvider');
  }

  return { user: userState?.user, name: userState.name, photoUrl: userState.photoUrl };
};
