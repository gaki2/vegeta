import { Position } from '@/utils/position';

export type RectPos = { top: number; left: number; right: number; bottom: number };
// 두 점을 대각으로 하는 사각형
export type InSecureRectPos = [Position, Position];
type Target = {
  id: string;
  rect: RectPos;
};
type Listener = {
  id: string;
  fn: (area?: InSecureRectPos) => void;
};

export class ScanAreaObserver {
  private prevArea: InSecureRectPos | [null, null];
  private area: InSecureRectPos | [null, null];
  private rects: Target[];
  private onIncludedListener: Listener[];
  private onAreaChangeListeners: Listener[];
  private onDeleteListeners: Set<Listener>;

  constructor() {
    this.area = [null, null];
    this.prevArea = [null, null];
    this.rects = [];
    this.onIncludedListener = [];
    this.onAreaChangeListeners = [];
    this.onDeleteListeners = new Set();
  }

  public updateStartPos(pos: Position) {
    this.area[0] = pos;
  }

  public updateCurrentPos(pos: Position) {
    this.area[1] = pos;
    const includedIds = this.getIncludedRects();
    includedIds.forEach((includedId) =>
      this.onIncludedListener.find((listener) => listener.id === includedId)?.fn()
    );
    this.onAreaChangeListeners.forEach((listener) => listener.fn(this.area as InSecureRectPos));
  }

  public resetPos() {
    this.area = [null, null];
    this.onAreaChangeListeners.forEach((listener) => listener.fn());
  }

  /**
   * @pure
   */
  private isIncluded(scanArea: InSecureRectPos, rect: RectPos) {
    const { top, left, bottom, right } = this.convertToTopLeft(scanArea);
    const { top: targetTop, left: targetLeft, bottom: targetBottom, right: targetRight } = rect;

    if (targetTop > bottom) {
      return false;
    }
    if (targetBottom < top) {
      return false;
    }
    if (targetLeft > right) {
      return false;
    }
    if (targetRight < left) {
      return false;
    }
    return true;
  }

  /**
   * @pure
   */
  private convertToTopLeft = (rectPos: InSecureRectPos) => {
    const { x: x1, y: y1 } = rectPos[0];
    const { x: x2, y: y2 } = rectPos[1];

    return {
      top: Math.min(y1, y2),
      left: Math.min(x1, x2),
      bottom: Math.max(y1, y2),
      right: Math.max(x1, x2),
    };
  };

  private getIncludedRects() {
    return this.rects
      .filter((rect) => this.isIncluded(this.area as InSecureRectPos, rect.rect))
      .map((rect) => rect.id);
  }

  public addListener(l: Listener) {
    // 중복된 리스너가 존재할경우 제거 후 새롭게 추가
    this.onIncludedListener = this.onIncludedListener.filter((listener) => listener.id !== l.id);
    this.onIncludedListener.push(l);
  }

  public onAreaChange(l: Listener) {
    this.onAreaChangeListeners = this.onAreaChangeListeners.filter(
      (listener) => listener.id !== l.id
    );
    this.onAreaChangeListeners.push(l);
  }

  public onDelete() {}
}
