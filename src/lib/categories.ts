const FALLBACK_COLORS: Record<string, { bg: string; fg: string }> = {
  teknologi: { bg: '#E3F2FD', fg: '#1565C0' },
  berita: { bg: '#FFEBEE', fg: '#C62828' },
  edukasi: { bg: '#FFF9C4', fg: '#F57C00' },
};

const DEFAULT = { bg: '#F5F5F5', fg: '#616161' };

export const getCategoryColor = (
  category: string,
  inlineColor?: string | null
) => inlineColor || FALLBACK_COLORS[category]?.bg || DEFAULT.bg;

export const getCategoryTextColor = (
  category: string,
  inlineColor?: string | null
) => inlineColor || FALLBACK_COLORS[category]?.fg || DEFAULT.fg;
