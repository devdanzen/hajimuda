import * as React from 'react';

import CssBaseline from '@mui/material/CssBaseline';

import AppTheme from '@/styles/shared/AppTheme';

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
