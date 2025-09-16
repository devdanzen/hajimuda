export const getCategoryColor = (category: string) => {
  // Return custom light colors instead of MUI theme colors
  switch (category) {
    case 'teknologi':
      return '#E3F2FD'; // Light blue
    case 'berita':
      return '#FFEBEE'; // Light red
    case 'edukasi':
      return '#FFF9C4'; // Light yellow
    default:
      return '#F5F5F5'; // Light gray
  }
};

export const getCategoryTextColor = (category: string) => {
  // Darker text colors for better contrast
  switch (category) {
    case 'teknologi':
      return '#1565C0'; // Dark blue
    case 'berita':
      return '#C62828'; // Dark red
    case 'edukasi':
      return '#F57C00'; // Dark orange/yellow
    default:
      return '#616161'; // Dark gray
  }
};