import { RefObject, useEffect, useRef, useState } from 'react';
import { Position } from '@/utils/position';
import { throttle } from 'es-toolkit';

type PointerDownHandler = (pos: Position) => void;
type PointerMoveHandler = (pos: Position) => void;
type PointerUpHandler = () => void;

export const useDragging = (
  ref: RefObject<HTMLDivElement>,
  handlers: {
    pointerDown: PointerDownHandler;
    pointerMove: PointerMoveHandler;
    pointerUp: PointerUpHandler;
  },
  throttleTime?: number
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
      handlersRef.current!.pointerDown(mouseDownPosition.current);
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

    const handlePointerMove = throttle((e: MouseEvent) => {
      if (isPointerDownRef.current) {
        const nowX = e.pageX;
        const nowY = e.pageY;
        handlersRef.current!.pointerMove({ x: nowX, y: nowY });
      }
    }, throttleTime ?? 20);

    const element = ref.current;

    if (element) {
      element.addEventListener('pointerdown', handlePointerDown);
    }
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('pointermove', handlePointerMove);

    return () => {
      if (element) {
        element.removeEventListener('pointerdown', handlePointerDown);
      }
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointermove', handlePointerMove);
    };
  }, [throttleTime]);

  return {};
};
