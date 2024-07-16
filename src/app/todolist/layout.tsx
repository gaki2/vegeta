'use client';

import { useRef, useState } from 'react';
import { useHover } from 'usehooks-ts';
import { useResize } from './useResize';
import { clamp } from 'es-toolkit';

const MIN_WIDTH = 248;
const MAX_WIDTH = 412;

export default function TodoListLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const controllerRef = useRef<HTMLDivElement | null>(null);
  const isHover = useHover(controllerRef);
  const startWidth = useRef<number>(0);
  useResize(controllerRef, {
    pointerDown: () => {
      startWidth.current = wrapperRef.current!.clientWidth;
    },
    pointerMove: ({ dx, dy }) => {
      const newWidth = clamp(startWidth.current + dx, MIN_WIDTH, MAX_WIDTH);
      wrapperRef.current!.style.width = `${newWidth}px`;
    },
    pointerUp: () => {},
  });

  return (
    <div
      aria-label='투두리스트 좌패널'
      className='flex h-full w-full flex-row'>
      <div
        ref={wrapperRef}
        className={`relative flex w-[248px] flex-shrink-0 flex-row border-r-[1px] bg-stone-200 ${isHover ? 'border-stone-400' : 'border-stone-300'}`}>
        <div
          ref={controllerRef}
          aria-label='리사이즈 컨트롤'
          className='absolute right-0 h-full w-[12px] translate-x-1/2 cursor-col-resize'></div>
      </div>
      {children}
    </div>
  );
}
