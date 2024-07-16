import { RefObject, useEffect, useRef, useState } from 'react';

type Handler = (diff: { dx: number; dy: number }) => void;

export const useResize = (ref: RefObject<HTMLDivElement>, handler: Handler) => {
  const [isPointerDown, setIsPointerDown] = useState(false);
  const isPointerDownRef = useRef<boolean>(false);
  const mouseDownPosition = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const handlerRef = useRef<Handler>();

  useEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  useEffect(() => {
    const handlePointerDown = (e: MouseEvent) => {
      setIsPointerDown(true);
      isPointerDownRef.current = true;
      mouseDownPosition.current = {
        x: e.pageX,
        y: e.pageY,
      };
    };

    const handlePointerUp = () => {
      if (isPointerDownRef.current) {
        setIsPointerDown(false);
        isPointerDownRef.current = false;
        mouseDownPosition.current = {
          x: 0,
          y: 0,
        };
      }
    };

    const handlePointerMove = (e: MouseEvent) => {
      if (isPointerDownRef.current) {
        const nowX = e.pageX;
        const nowY = e.pageY;
        const dx = nowX - mouseDownPosition.current.x;
        const dy = nowY - mouseDownPosition.current.y;

        handlerRef.current!({ dx, dy });
      }
    };

    ref.current?.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('pointermove', handlePointerMove);

    return () => {
      ref.current?.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointermove', handlePointerMove);
    };
  }, []);

  return isPointerDown;
};
