export const isTitle = (line: string) => {
  return line.startsWith('# ');
};

export const parseTodo = (text: string): string[] => {
  const lines = text.split('\n').map((line) => line.trim());
  return lines.filter((line) => isTitle(line));
};
