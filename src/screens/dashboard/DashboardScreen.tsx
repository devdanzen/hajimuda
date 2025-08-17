'use client'

import * as React from 'react';

import DashboardLayout from '@/components/dashboard/DashboardLayout';

export default function DashboardScreen({ children }: { children: React.ReactNode }) {
  // take url link
  // const pathname = usePathname();

  // const getScreen

  return (
    <DashboardLayout>
      {children}
    </DashboardLayout>
  );
}
