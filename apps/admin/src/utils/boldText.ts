export const boldText = (item: string, keyword: string) => {
  if (!keyword) return item;
  const regexp = new RegExp(keyword.replace(/([\\+*?^$()[\]{}.|])/g, '\\$1'), 'g');
  return item.replace(regexp, `<strong>${keyword}</strong>`);
};
