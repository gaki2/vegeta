'use client';

import { useEffect, useState } from 'react';
import { invoke } from '@tauri-apps/api/tauri';
import Link from 'next/link';

export default function Home() {
  const [name, setName] = useState('');
  useEffect(() => {
    invoke<string>('greet', { name: 'BG' }).then((result) => setName(result));
  }, []);

  return (
    <main className='user-select-none flex min-h-screen flex-col items-center justify-between p-24'>
      <div>
        <Link href={'/todo/task'}>task 로 가기</Link>
      </div>
    </main>
  );
}
