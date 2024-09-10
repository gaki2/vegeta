const getDaysDiff = (src: number, target: number) => {
  const diffTime = Math.abs(src - target);
  return Math.floor(diffTime / (1000 * 60 * 60 * 24));
};

export const getRelativeDate = (timestamp: number) => {
  const diff = getDaysDiff(timestamp, Date.now());
  if (diff === 0) {
    return '오늘';
  } else if (diff === 1) {
    return '어제';
  } else if (diff === 2) {
    return '그제';
  } else {
    return `${diff}일 전`;
  }
};
