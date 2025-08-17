'use client';

import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';

import AppTheme from '@/styles/shared/AppTheme';
import {
  dataGridCustomizations,
  datePickersCustomizations,
  formInputCustomizations,
  sidebarCustomizations,
} from '@/styles/dashboard/customizations';
import NotificationsProvider from '@/hooks/dashboard/useNotifications/NotificationsProvider';
import DialogsProvider from '@/hooks/dashboard/useDialogs/DialogsProvider';

const themeComponents = {
  ...dataGridCustomizations,
  ...datePickersCustomizations,
  ...sidebarCustomizations,
  ...formInputCustomizations,
};

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

export default function ProtectedLayout({ children }: ProtectedLayoutProps) {
  return (
    <AppTheme themeComponents={themeComponents}>
      <CssBaseline enableColorScheme />
      <NotificationsProvider>
        <DialogsProvider>
          <main>{children}</main>
        </DialogsProvider>
      </NotificationsProvider>
    </AppTheme>
  );
}
