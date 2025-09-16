/**
 * Format an ISO date string to a human-readable format
 * @param isoDate - ISO 8601 date string (e.g., "2021-07-16T10:00:00.000Z")
 * @returns Formatted date string (e.g., "16 July, 2021")
 */
export function formatDate(isoDate: string): string {
  const date = new Date(isoDate);
  
  const day = date.getDate();
  const month = date.toLocaleString('en-US', { month: 'long' });
  const year = date.getFullYear();
  
  return `${day} ${month}, ${year}`;
}

/**
 * Get a relative time string for an ISO date
 * @param isoDate - ISO 8601 date string
 * @returns Relative time string (e.g., "2 days ago", "1 month ago")
 */
export function getRelativeTime(isoDate: string): string {
  const date = new Date(isoDate);
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  
  if (diffInDays === 0) {
    return 'Today';
  } else if (diffInDays === 1) {
    return '1 day ago';
  } else if (diffInDays < 30) {
    return `${diffInDays} days ago`;
  } else if (diffInDays < 365) {
    const months = Math.floor(diffInDays / 30);
    return months === 1 ? '1 month ago' : `${months} months ago`;
  } else {
    const years = Math.floor(diffInDays / 365);
    return years === 1 ? '1 year ago' : `${years} years ago`;
  }
}

/**
 * Check if a date is valid
 * @param isoDate - ISO 8601 date string
 * @returns True if the date is valid
 */
export function isValidDate(isoDate: string): boolean {
  const date = new Date(isoDate);
  return !isNaN(date.getTime());
}