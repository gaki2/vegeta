'use client';

import { useRef } from 'react';
import { useHover } from 'usehooks-ts';
import { useResize } from './useResize';

const MIN_WIDTH = '248';
const MAX_WIDTH = '360';

export default function TodoListLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const wrapperRef = useRef();
  const controllerRef = useRef<HTMLDivElement>(null);
  const isHover = useHover(controllerRef);
  const isPointerDown = useResize(controllerRef, ({ dx, dy }) => {
    console.log(dx, dy);
  });

  console.log(isPointerDown);

  return (
    <div
      aria-label='투두리스트 좌패널'
      className='flex h-full w-full flex-row'>
      <div
        className={`relative flex w-[248px] flex-row border-r-[1px] bg-stone-200 ${isHover ? 'border-stone-400' : 'border-stone-300'}`}>
        <div
          ref={controllerRef}
          aria-label='리사이즈 컨트롤'
          className='absolute right-0 h-full w-[12px] translate-x-1/2 cursor-col-resize'></div>
      </div>
      {children}
    </div>
  );
}
