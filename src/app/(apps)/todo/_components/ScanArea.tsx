import { useEffect, useRef, useState } from 'react';
import { nanoid } from 'nanoid';
import { ScanAreaObserver } from '@/app/(apps)/todo/_components/ScanAreaObserver';
import { useWrapperElementTopLeftPosStore } from '@/app/(apps)/todo/_store/todoStore';
import { throttle } from 'es-toolkit';

type Props = {
  scanAreaObserver: ScanAreaObserver;
};

const id = nanoid();

export const ScanArea = ({ scanAreaObserver }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const parentPos = useWrapperElementTopLeftPosStore((state) => state.pos);
  useEffect(() => {
    if (scanAreaObserver) {
      scanAreaObserver.onAreaChange({
        id,
        fn: throttle((area) => {
          if (area) {
            const { x: x1, y: y1 } = area![0];
            const { x: x2, y: y2 } = area![1];
            const top = Math.min(y1, y2);
            const left = Math.min(x1, x2);
            const width = Math.abs(x1 - x2);
            const height = Math.abs(y1 - y2);

            ref.current!.style.display = 'block';
            ref.current!.style.top = `${top - parentPos.y}px`;
            ref.current!.style.left = `${left - parentPos.x}px`;
            ref.current!.style.width = `${width}px`;
            ref.current!.style.height = `${height}px`;
          } else {
            ref.current!.style.display = 'none';
          }
        }, 2),
      });
    }
  }, [scanAreaObserver, parentPos]);

  return (
    <div
      data-top={0}
      data-left={0}
      data-width={0}
      data-height={0}
      ref={ref}
      className={
        'absolute left-[29px] top-[20px] hidden h-4 w-4 cursor-default select-none border-1 border-blue-800 bg-blue-500 bg-opacity-10'
      }></div>
  );
};
