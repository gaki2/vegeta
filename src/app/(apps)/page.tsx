'use client';

import Link from 'next/link';
import { login, openGoogleLogin, useGoogleLogin } from '@/firebase/useGoogleLogin';
import { useEffect } from 'react';
import { getRedirectResult } from '@firebase/auth';
import { useFirebase } from '@/firebase/FirebaseProvider';
import { signOut } from 'firebase/auth';

export default function Home() {
  // const { login } = useGoogleLogin();
  const { auth } = useFirebase();

  const onClickGoogleLogin = () => {
    // openGoogleLogin('3000');
    login();
  };

  const check = () => {
    getRedirectResult(auth)
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const logOut = () => {
    signOut(auth);
  };

  useEffect(() => {
    getRedirectResult(auth)
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [auth]);

  return (
    <main className='user-select-none flex min-h-screen flex-col items-center justify-between p-24'>
      <div>
        <Link href={'/todo/task'}>task 로 가기</Link>
      </div>
      <button onClick={onClickGoogleLogin}>구글 로그인</button>
      <button onClick={check}>체크</button>
      <button onClick={logOut}>로그아웃</button>
    </main>
  );
}
