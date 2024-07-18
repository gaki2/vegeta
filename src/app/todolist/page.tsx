import Link from 'next/link';

export default function Home() {
  return (
    <main className='flex h-full w-full flex-col items-center justify-between bg-slate-300 p-24'>
      <div>task 페이지</div>
      <Link href={'/'}>홈으로</Link>
    </main>
  );
}
