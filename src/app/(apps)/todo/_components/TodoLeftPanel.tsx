'use client';

import { useEffect, useLayoutEffect, useRef } from 'react';
import { Position } from '@/utils/position';
import { useDragging } from '@/app/(apps)/todo/_components/useDragging';
import { clamp } from 'es-toolkit';
import { TodoInput } from '@/app/(apps)/todo/_components/todo_input/TodoInput';
import { useLocalStorage } from 'usehooks-ts';
import { LocalStorageKeyMap } from '@/app/shared/localStorageKey';
const MIN_WIDTH = 100;
const MAX_WIDTH = 512;

export const TodoLeftPanel = () => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const controllerRef = useRef<HTMLDivElement | null>(null);
  const savedWidth = useRef<number>(0);
  const pointerDownPos = useRef<Position>();

  useEffect(() => {
    const width = localStorage.getItem(LocalStorageKeyMap.todoInputPanelWidth);
    if (width) {
      wrapperRef.current!.style.width = `${width}px`;
    }
  }, []);

  useDragging(controllerRef, {
    pointerDown: (pos) => {
      savedWidth.current = wrapperRef.current!.clientWidth;
      pointerDownPos.current = pos;
      controllerRef.current?.classList.add('resizing');
    },
    pointerMove: ({ x }) => {
      const dx = x - pointerDownPos.current!.x;
      const newWidth = Math.round(clamp(savedWidth.current + dx, MIN_WIDTH, MAX_WIDTH));
      wrapperRef.current!.style.width = `${newWidth}px`;
    },
    pointerUp: () => {
      localStorage.setItem(
        LocalStorageKeyMap.todoInputPanelWidth,
        String(wrapperRef.current?.clientWidth)
      );
      controllerRef.current?.classList.remove('resizing');
    },
  });

  return (
    <div
      aria-label='투두리스트 좌패널'
      ref={wrapperRef}
      className={`title relative flex w-[248px] flex-shrink-0 select-none flex-row border-r-[1px] bg-stone-100`}>
      <div className={'w-full p-2'}>
        <TodoInput />
      </div>
      <div
        ref={controllerRef}
        aria-label='리사이즈 컨트롤'
        className='group absolute right-0 flex h-full w-[24px] translate-x-1/2 cursor-col-resize justify-center'>
        <div
          aria-label={'리사이즈 컨트롤 표시'}
          className={'h-full w-[1px] group-hover:bg-stone-300 group-[.resizing]:bg-stone-300'}
        />
      </div>
    </div>
  );
};
