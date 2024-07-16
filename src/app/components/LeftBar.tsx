'use client';

import { Button } from '@nextui-org/react';
import { usePathname } from 'next/navigation';

export const LeftBar = () => {
  const pathname = usePathname();
  const variant = pathname.includes('todolist') ? 'flat' : 'light';

  return (
    <nav className='flex h-full w-24 flex-col items-center gap-4 bg-white px-2'>
      <div className='flex h-20 w-full items-center justify-center'>
        <a href='/'>
          <img
            className='h-9 w-9'
            src='/main_icon.png'
          />
        </a>
      </div>
      <Button
        aria-label='투두리스트로 이동하기'
        className='h-[64px] w-full flex-col gap-[2px]'
        variant={variant}
        color='primary'
        as='a'
        href='/todolist'
        startContent={
          <svg
            className='h-6 w-6'
            xmlns='http://www.w3.org/2000/svg'
            fill='currentColor'
            viewBox='0 0 24 24'>
            <path d='M16 3.5H8A2.5 2.5 0 0 0 5.5 6v12A2.5 2.5 0 0 0 8 20.5h2.361a.75.75 0 0 1 0 1.5H8a4 4 0 0 1-4-4V6a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v4.25a.75.75 0 0 1-1.5 0V6A2.5 2.5 0 0 0 16 3.5Z' />
            <path d='M21.799 15.266a.75.75 0 0 0-1.1-1.02l-4.776 5.155-2.652-2.558a.75.75 0 1 0-1.042 1.08l2.836 2.735a1.25 1.25 0 0 0 1.785-.05l4.949-5.342ZM10 7.25a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 0 1.5h-5.5a.75.75 0 0 1-.75-.75Zm.75 2.25a.75.75 0 0 0 0 1.5h5.5a.75.75 0 0 0 0-1.5h-5.5ZM10 13.25a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 0 1.5h-5.5a.75.75 0 0 1-.75-.75Zm-2-5a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm1 2a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm-1 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z' />
          </svg>
        }>
        TodoList
      </Button>
    </nav>
  );
};
