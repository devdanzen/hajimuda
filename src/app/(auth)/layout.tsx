import * as React from 'react';

import CssBaseline from '@mui/material/CssBaseline';

import AppTheme from '@/styles/shared/AppTheme';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <AppTheme>
      <CssBaseline enableColorScheme />

      <main>{children}</main>
    </AppTheme>
  );
}
