import Link from "next/link";

export default function Home() {
    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div>
          task 페이지
        </div>
        <Link href={'/'}>홈으로</Link>
      </main> 
    );
  }
  