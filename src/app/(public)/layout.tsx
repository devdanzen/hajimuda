import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from '@/components/shared/Navbar';
import AppTheme from '@/components/shared/AppTheme';

interface PublicLayoutProps {
  children: React.ReactNode;
  props: {
    disableCustomTheme?: boolean;
  };
}

export default function PublicLayout({ children, props }: PublicLayoutProps) {
  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />

      <Navbar />
      <main>{children}</main>
    </AppTheme>
  );
}
