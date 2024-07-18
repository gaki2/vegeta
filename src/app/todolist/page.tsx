'use client';

import { useEffect, useRef } from 'react';
import { useResizeObserver, useDebounceCallback } from 'usehooks-ts';

export default function TodoListContentPage() {
  const ref = useRef<HTMLDivElement | null>(null);

  const onResize = useDebounceCallback(() => {}, 200);
  useResizeObserver({
    ref,
    onResize: onResize,
  });

  useEffect(() => {
    console.log(ref.current?.getBoundingClientRect());
  }, []);

  return (
    <main
      ref={ref}
      className='flex-coljustify-between flex h-full w-full bg-background p-12'>
      <p className='title'>병각의 할일</p>
    </main>
  );
}
