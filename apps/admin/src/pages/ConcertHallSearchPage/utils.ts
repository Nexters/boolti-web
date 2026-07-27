type TextColor = '#000000' | '#FFFFFF';

/**
 * 배경색에 대해 대비가 더 높은 글자색을 반환합니다.
 *
 * 지원 형식:
 * - #RGB
 * - #RRGGBB
 *
 * @example
 * getContrastTextColor("#FFFFFF"); // "#000000"
 * getContrastTextColor("#263C96"); // "#FFFFFF"
 * getContrastTextColor("#F06E00"); // "#000000"
 */
export function getContrastTextColor(backgroundColor: string): TextColor {
  const { r, g, b } = hexToRgb(backgroundColor);

  const backgroundLuminance = getRelativeLuminance(r, g, b);

  const whiteContrast = getContrastRatio(backgroundLuminance, 1);
  const blackContrast = getContrastRatio(backgroundLuminance, 0);

  return whiteContrast >= blackContrast ? '#FFFFFF' : '#000000';
}

function hexToRgb(hex: string): {
  r: number;
  g: number;
  b: number;
} {
  const normalizedHex = hex.trim().replace(/^#/, '');

  const expandedHex =
    normalizedHex.length === 3
      ? normalizedHex
          .split('')
          .map((character) => character + character)
          .join('')
      : normalizedHex;

  if (!/^[0-9a-fA-F]{6}$/.test(expandedHex)) {
    throw new Error(`지원하지 않는 색상 형식입니다: ${hex}`);
  }

  return {
    r: Number.parseInt(expandedHex.slice(0, 2), 16),
    g: Number.parseInt(expandedHex.slice(2, 4), 16),
    b: Number.parseInt(expandedHex.slice(4, 6), 16),
  };
}

function getRelativeLuminance(red: number, green: number, blue: number): number {
  const [r, g, b] = [red, green, blue].map((channel) => {
    const normalized = channel / 255;

    return normalized <= 0.04045 ? normalized / 12.92 : ((normalized + 0.055) / 1.055) ** 2.4;
  });

  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function getContrastRatio(firstLuminance: number, secondLuminance: number): number {
  const lighter = Math.max(firstLuminance, secondLuminance);
  const darker = Math.min(firstLuminance, secondLuminance);

  return (lighter + 0.05) / (darker + 0.05);
}
