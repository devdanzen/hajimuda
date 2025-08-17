'use client';

import * as React from 'react';

import type { ThemeOptions } from '@mui/material/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { dataDisplayCustomizations } from '@/styles/shared/customizations/dataDisplay';
import { feedbackCustomizations } from '@/styles/shared/customizations/feedback';
import { inputsCustomizations } from '@/styles/shared/customizations/inputs';
import { navigationCustomizations } from '@/styles/shared/customizations/navigation';
import { surfacesCustomizations } from '@/styles/shared/customizations/surfaces';
import { palette, shadows, shape, typography } from '@/styles/shared/themePrimitives';

interface AppThemeProps {
  children: React.ReactNode;
  disableCustomTheme?: boolean;
  themeComponents?: ThemeOptions['components'];
}

export default function AppTheme(props: AppThemeProps) {
  const { children, disableCustomTheme, themeComponents } = props;
  const theme = React.useMemo(() => {
    return disableCustomTheme
      ? createTheme()
      : createTheme({
          palette: palette,
          typography,
          shadows,
          shape,
          components: {
            ...inputsCustomizations,
            ...dataDisplayCustomizations,
            ...feedbackCustomizations,
            ...navigationCustomizations,
            ...surfacesCustomizations,
            ...themeComponents,
          },
        });
  }, [disableCustomTheme, themeComponents]);

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
