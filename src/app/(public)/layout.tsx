import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { Divider } from '@mui/material';

import Navbar from '@/components/shared/Navbar';
import AppTheme from '@/styles/shared/AppTheme';
import Footer from '@/components/home/Footer';

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
      <Divider />
      <Footer />
    </AppTheme>
  );
}
