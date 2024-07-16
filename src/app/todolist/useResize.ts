import { RefObject, useEffect, useRef, useState } from 'react';

type PointerDownHandler = () => void;
type PointerMoveHandler = (diff: { dx: number; dy: number }) => void;
type PointerUpHandler = () => void;

export const useResize = (
  ref: RefObject<HTMLDivElement>,
  handlers: {
    pointerDown: PointerDownHandler;
    pointerMove: PointerMoveHandler;
    pointerUp: PointerUpHandler;
  }
) => {
  const isPointerDownRef = useRef<boolean>(false);
  const mouseDownPosition = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const handlersRef = useRef<{
    pointerDown: PointerDownHandler;
    pointerMove: PointerMoveHandler;
    pointerUp: PointerUpHandler;
  }>();

  useEffect(() => {
    handlersRef.current = handlers;
  }, [handlers]);

  useEffect(() => {
    const handlePointerDown = (e: MouseEvent) => {
      isPointerDownRef.current = true;
      mouseDownPosition.current = {
        x: e.pageX,
        y: e.pageY,
      };
      handlersRef.current!.pointerDown();
    };

    const handlePointerUp = () => {
      if (isPointerDownRef.current) {
        isPointerDownRef.current = false;
        mouseDownPosition.current = {
          x: 0,
          y: 0,
        };
        handlersRef.current!.pointerUp();
      }
    };

    const handlePointerMove = (e: MouseEvent) => {
      if (isPointerDownRef.current) {
        const nowX = e.pageX;
        const nowY = e.pageY;
        const dx = nowX - mouseDownPosition.current.x;
        const dy = nowY - mouseDownPosition.current.y;

        handlersRef.current!.pointerMove({ dx, dy });
      }
    };

    ref.current!.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('pointermove', handlePointerMove);

    return () => {
      ref.current!.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointermove', handlePointerMove);
    };
  }, []);

  return {};
};
