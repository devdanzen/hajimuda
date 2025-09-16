import * as React from 'react';

import { Divider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';

import Footer from '@/components/home/Footer';
import Navbar from '@/components/shared/Navbar';

import AppTheme from '@/styles/shared/AppTheme';

interface PublicLayoutProps {
  children: React.ReactNode;
}

export default function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <AppTheme>
      <CssBaseline enableColorScheme />

      <Navbar />
      <main>{children}</main>
      <Divider />
      <Footer />
    </AppTheme>
  );
}
