import { ScanArea } from '@/app/(apps)/todo/_components/ScanArea';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useUser } from '@/firebase/UserProvider';
import { useWrapperElementTopLeftPosStore } from '@/app/(apps)/todo/_store/todoStore';
import { ScanAreaObserver } from '@/app/(apps)/todo/_components/ScanAreaObserver';
import { useDragging } from '@/app/(apps)/todo/_components/useDragging';
import { useDebounceCallback, useResizeObserver } from 'usehooks-ts';
import { TodoItem } from '@/app/(apps)/todo/_components/todo_content/TodoItem';

export const TodoContent = () => {
  const { name } = useUser();
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const updatePos = useWrapperElementTopLeftPosStore((state) => state.update);
  const scanAreaObserver = useMemo(() => new ScanAreaObserver(), []);
  const onResize = useDebounceCallback(() => {
    if (wrapperRef.current) {
      const { top, left } = wrapperRef.current.getBoundingClientRect();
      updatePos({ x: left, y: top });
    }
  }, 200);

  useResizeObserver({
    ref: wrapperRef,
    onResize: onResize,
  });
  /**
   * ScanArea 를 만들기 위해 이벤트 부착
   */
  useDragging(wrapperRef, {
    pointerDown: (pos) => {
      scanAreaObserver.updateStartPos(pos);
    },
    pointerMove: (pos) => {
      scanAreaObserver.updateCurrentPos(pos);
    },
    pointerUp: () => {
      scanAreaObserver.resetPos();
    },
  });

  return (
    <main
      ref={wrapperRef}
      className='relative flex h-full w-full cursor-default select-none flex-col bg-background p-12'>
      <p className='title cursor-default'>{`${name}의 할일`}</p>
      <ScanArea scanAreaObserver={scanAreaObserver} />
      <TodoItem id={'qm8YMbftdrTAmho1mx56u'} />
    </main>
  );
};
