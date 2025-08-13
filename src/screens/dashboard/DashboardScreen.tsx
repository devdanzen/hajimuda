'use client'

import * as React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';

export default function DashboardScreen({ children }: { children: React.ReactNode }) {
  return (
    <DashboardLayout>
      {children}
    </DashboardLayout>
  );
}
