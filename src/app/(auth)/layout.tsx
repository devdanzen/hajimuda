import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from '@/components/shared/Navbar';
import AppTheme from '@/theme/shared/AppTheme';

interface AuthLayoutProps {
  children: React.ReactNode;
  props: {
    disableCustomTheme?: boolean;
  };
}

export default function AuthLayout({ children, props }: AuthLayoutProps) {
  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />

      <main>{children}</main>
    </AppTheme>
  );
}
