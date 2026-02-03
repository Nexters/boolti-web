import { ReactNode } from 'react';

export const highlightText = (
  text: string,
  searchText: string,
  HighlightComponent: React.ComponentType<{ children: ReactNode }>,
): ReactNode => {
  if (!searchText.trim()) {
    return text;
  }

  const escapedSearch = searchText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(${escapedSearch})`, 'gi');
  const parts = text.split(regex);

  return parts.map((part, index) =>
    part.toLowerCase() === searchText.toLowerCase() ? (
      <HighlightComponent key={index}>{part}</HighlightComponent>
    ) : (
      part
    ),
  );
};
