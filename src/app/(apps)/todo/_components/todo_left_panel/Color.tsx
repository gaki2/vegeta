type Props = {
  color: string;
  onColorChange: (color: string) => void;
};

export const PALLET = [
  '#64748b',
  '#6b7280',
  '#78716c',
  '#ef4444',
  '#f97316',
  '#f59e0b',
  '#84cc16',
  '#10b981',
  '#14b8a6',
  '#0ea5e9',
  '#3b82f6',
  '#6366f1',
  '#8b5cf6',
  '#d946ef',
  '#ec4899',
  '#f43f5e',
];

export const Color = ({ color, onColorChange }: Props) => {
  return (
    <button
      className={`h-5 w-5 rounded-full`}
      style={{ backgroundColor: color }}
      onClick={() => onColorChange(color)}></button>
  );
};
