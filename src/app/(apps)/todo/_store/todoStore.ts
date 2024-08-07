import { create } from 'zustand';
import { Position } from '@/utils/position';

interface TodoMainRect {
  pos: Position;
  update: (pos: Position) => void;
}

/**
 * Todolist 컨텐츠 레퍼의 좌상단 좌표
 */
export const useWrapperElementTopLeftPosStore = create<TodoMainRect>((set) => ({
  pos: { x: 0, y: 0 },
  update: (pos) => set(() => ({ pos })),
}));
