export const replaceUserCode = (text: string) => {
  return text
    .replace(/[^a-z0-9]/gi, '')
    .toUpperCase()
    .slice(0, 8);
};
