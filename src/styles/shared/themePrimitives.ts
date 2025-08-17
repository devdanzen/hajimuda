import { alpha, createTheme, Shadows } from '@mui/material/styles';

const defaultTheme = createTheme();

export const brand = {
  50: 'hsl(45, 80%, 95%)',
  100: 'hsl(45, 75%, 88%)',
  200: 'hsl(45, 70%, 75%)',
  300: 'hsl(45, 65%, 65%)',
  400: 'hsl(45, 60%, 55%)',
  500: 'hsl(45, 55%, 45%)',
  600: 'hsl(45, 50%, 40%)',
  700: 'hsl(45, 45%, 35%)',
  800: 'hsl(45, 40%, 25%)',
  900: 'hsl(45, 35%, 15%)',
};

export const gray = {
  50: 'hsl(0, 0%, 98%)',
  100: 'hsl(0, 0%, 95%)',
  200: 'hsl(0, 0%, 88%)',
  300: 'hsl(0, 0%, 75%)',
  400: 'hsl(0, 0%, 60%)',
  500: 'hsl(0, 0%, 45%)',
  600: 'hsl(0, 0%, 30%)',
  700: 'hsl(0, 0%, 20%)',
  800: 'hsl(0, 0%, 10%)',
  900: 'hsl(0, 0%, 5%)',
};

export const green = {
  50: 'hsl(120, 80%, 98%)',
  100: 'hsl(120, 75%, 94%)',
  200: 'hsl(120, 75%, 87%)',
  300: 'hsl(120, 61%, 77%)',
  400: 'hsl(120, 44%, 53%)',
  500: 'hsl(120, 59%, 30%)',
  600: 'hsl(120, 70%, 25%)',
  700: 'hsl(120, 75%, 16%)',
  800: 'hsl(120, 84%, 10%)',
  900: 'hsl(120, 87%, 6%)',
};

export const orange = {
  50: 'hsl(45, 100%, 97%)',
  100: 'hsl(45, 92%, 90%)',
  200: 'hsl(45, 94%, 80%)',
  300: 'hsl(45, 90%, 65%)',
  400: 'hsl(45, 90%, 40%)',
  500: 'hsl(45, 90%, 35%)',
  600: 'hsl(45, 91%, 25%)',
  700: 'hsl(45, 94%, 20%)',
  800: 'hsl(45, 95%, 16%)',
  900: 'hsl(45, 93%, 12%)',
};

export const red = {
  50: 'hsl(0, 100%, 97%)',
  100: 'hsl(0, 92%, 90%)',
  200: 'hsl(0, 94%, 80%)',
  300: 'hsl(0, 90%, 65%)',
  400: 'hsl(0, 90%, 40%)',
  500: 'hsl(0, 90%, 30%)',
  600: 'hsl(0, 91%, 25%)',
  700: 'hsl(0, 94%, 18%)',
  800: 'hsl(0, 95%, 12%)',
  900: 'hsl(0, 93%, 6%)',
};

export const palette = {
  mode: 'light' as const,
  primary: {
    light: brand[200],
    main: brand[400],
    dark: brand[700],
    contrastText: brand[50],
  },
  info: {
    light: brand[100],
    main: brand[300],
    dark: brand[600],
    contrastText: gray[50],
  },
  warning: {
    light: orange[300],
    main: orange[400],
    dark: orange[800],
  },
  error: {
    light: red[300],
    main: red[400],
    dark: red[800],
  },
  success: {
    light: green[300],
    main: green[400],
    dark: green[800],
  },
  grey: {
    ...gray,
  },
  divider: alpha(gray[300], 0.4),
  background: {
    default: 'hsl(0, 0%, 99%)',
    paper: 'hsl(0, 0%, 98%)',
  },
  text: {
    primary: gray[900],
    secondary: gray[700],
    warning: orange[400],
  },
  action: {
    hover: alpha(brand[100], 0.1),
    selected: alpha(brand[100], 0.2),
  },
};

export const typography = {
  fontFamily: 'Inter, sans-serif',
  h1: {
    fontSize: defaultTheme.typography.pxToRem(48),
    fontWeight: 600,
    lineHeight: 1.2,
    letterSpacing: -0.5,
  },
  h2: {
    fontSize: defaultTheme.typography.pxToRem(36),
    fontWeight: 600,
    lineHeight: 1.2,
  },
  h3: {
    fontSize: defaultTheme.typography.pxToRem(30),
    lineHeight: 1.2,
  },
  h4: {
    fontSize: defaultTheme.typography.pxToRem(24),
    fontWeight: 600,
    lineHeight: 1.5,
  },
  h5: {
    fontSize: defaultTheme.typography.pxToRem(20),
    fontWeight: 600,
  },
  h6: {
    fontSize: defaultTheme.typography.pxToRem(18),
    fontWeight: 600,
  },
  subtitle1: {
    fontSize: defaultTheme.typography.pxToRem(18),
  },
  subtitle2: {
    fontSize: defaultTheme.typography.pxToRem(14),
    fontWeight: 500,
  },
  body1: {
    fontSize: defaultTheme.typography.pxToRem(14),
  },
  body2: {
    fontSize: defaultTheme.typography.pxToRem(14),
    fontWeight: 400,
  },
  caption: {
    fontSize: defaultTheme.typography.pxToRem(12),
    fontWeight: 400,
  },
};

export const shape = {
  borderRadius: 8,
};

//@ts-expect-error - MUI shadows type mismatch
const customShadows: Shadows = [
  'none',
  'hsla(220, 30%, 5%, 0.07) 0px 4px 16px 0px, hsla(220, 25%, 10%, 0.07) 0px 8px 16px -5px',
  ...defaultTheme.shadows.slice(2),
];

export const shadows = customShadows;
