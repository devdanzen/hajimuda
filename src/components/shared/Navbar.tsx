'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import PersonIcon from '@mui/icons-material/Person';
import { Tooltip } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import HajiMudaIcon from '../home/HajiMudaIcon';

import { useAuth } from '@/context/AuthContext';
import { Color } from '@/styles/color';

interface MenuItem {
  path: string;
  label: string;
  link: string;
  isExternal?: boolean;
  isDisabled?: boolean;
}

const MENU: MenuItem[] = [
  { path: '/', label: 'Beranda', link: '/' },
  { path: '/tentang-kami', label: 'Tentang Kami', link: '/tentang-kami' },
  { path: '/artikel', label: 'Artikel', link: '/artikel' },
  {
    path: 'https://wa.me/6281239019313',
    label: 'Kontak Kami',
    link: 'https://wa.me/6281239019313',
    isExternal: true,
  },
];

const StyledToolbar = styled(Toolbar)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexShrink: 0,
  minHeight: '72px',
  padding: '0',
  backgroundColor: Color.ThemeWhite,
  borderBottom: `1px solid #E5E7EB`,
  transition: 'all 0.3s ease-in-out',
}));

const NavButton = styled(Button)(() => ({
  fontWeight: 600,
  fontSize: '16px',
  textTransform: 'none',
  color: '#6B7280',
  padding: '12px 20px',
  borderRadius: '8px',
  minWidth: 'auto',
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    backgroundColor: `${Color.ThemeGold}08`,
    color: Color.ThemeGoldDark,
  },
}));

const CTAButton = styled(Button)(() => ({
  fontWeight: 700,
  fontSize: '16px',
  textTransform: 'none',
  color: Color.ThemeWhite,
  padding: '12px 24px',
  borderRadius: '8px',
  minWidth: 'auto',
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    backgroundColor: Color.ThemeGoldDark,
  },
}));

const HelpButton = styled(IconButton)(() => ({
  color: '#6B7280',
  padding: '8px',
  borderRadius: '8px',
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    backgroundColor: `${Color.ThemeGold}08`,
    color: Color.ThemeGoldDark,
  },
}));

export default function Navbar() {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const handleLogin = () => {
    router.push('/login');
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        bgcolor: Color.ThemeWhite,
        backgroundImage: 'none',
        top: 0,
        left: 0,
        right: 0,
      }}
    >
      <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 3 } }}>
        <StyledToolbar variant="dense" disableGutters>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Link href="/" style={{ display: 'flex', alignItems: 'center' }}>
              <HajiMudaIcon />
            </Link>
          </Box>

          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 0.5 }}>
            {MENU.map((item) =>
              item.isExternal ? (
                <a
                  key={item.label}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: 'none' }}
                >
                  <NavButton variant="text" endIcon={<OpenInNewIcon sx={{ fontSize: 14 }} />}>
                    {item.label}
                  </NavButton>
                </a>
              ) : (
                <Tooltip key={item.label} title={item.isDisabled ? 'Coming Soon' : ''} arrow>
                  <Link href={item.link} style={{ textDecoration: 'none' }}>
                    <NavButton
                      variant="text"
                      disabled={item.isDisabled}
                      sx={{
                        color: pathname === item.path ? Color.ThemeGoldDark : Color.Gray,
                        textDecoration: pathname === item.path ? 'underline' : 'none',
                        '&:hover': {
                          backgroundColor: `${Color.ThemeGold}10`,
                          color: Color.ThemeGoldDark,
                        },
                      }}
                    >
                      {item.label}
                    </NavButton>
                  </Link>
                </Tooltip>
              )
            )}
          </Box>

          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              gap: 1.5,
              alignItems: 'center',
            }}
          >
            <Tooltip title="Coming Soon" arrow>
              <HelpButton>
                <HelpOutlineIcon sx={{ fontSize: 20 }} />
              </HelpButton>
            </Tooltip>
            {user ? (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mr: 1 }}>
                  <PersonIcon sx={{ fontSize: 20, color: Color.ThemeGray }} />
                  <Typography variant="body2" sx={{ color: Color.ThemeGray }}>
                    {user.email}
                  </Typography>
                </Box>
                {user.role === 'admin' && (
                  <Link href="/dashboard" style={{ textDecoration: 'none', marginRight: 8 }}>
                    <CTAButton
                      variant="outlined"
                      sx={{
                        color: Color.ThemeGold,
                        borderColor: Color.ThemeGold,
                        '&:hover': {
                          borderColor: Color.ThemeGoldDark,
                          backgroundColor: `${Color.ThemeGold}10`,
                        },
                      }}
                    >
                      Dashboard
                    </CTAButton>
                  </Link>
                )}
                <CTAButton
                  variant="outlined"
                  startIcon={<LogoutIcon />}
                  onClick={handleLogout}
                  sx={{
                    color: Color.ThemeGold,
                    borderColor: Color.ThemeGold,
                    '&:hover': {
                      borderColor: Color.ThemeGoldDark,
                      backgroundColor: `${Color.ThemeGold}10`,
                    },
                  }}
                >
                  Logout
                </CTAButton>
              </Box>
            ) : (
              <CTAButton variant="contained" onClick={handleLogin}>
                Login
              </CTAButton>
            )}
          </Box>

          <Box sx={{ display: { xs: 'flex', md: 'none' }, gap: 1 }}>
            <IconButton
              aria-label="Menu button"
              onClick={toggleDrawer(true)}
              sx={{
                color: Color.ThemeGray,
                '&:hover': { backgroundColor: `${Color.ThemeGold}10` },
              }}
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="top"
              open={open}
              onClose={toggleDrawer(false)}
              PaperProps={{
                sx: {
                  top: 0,
                  backgroundColor: Color.ThemeBackground,
                  backdropFilter: 'blur(12px)',
                },
              }}
            >
              <Box sx={{ p: 3, backgroundColor: Color.ThemeBackground }}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                  }}
                >
                  <IconButton onClick={toggleDrawer(false)} sx={{ color: Color.ThemeGray }}>
                    <CloseRoundedIcon />
                  </IconButton>
                </Box>

                {MENU.map((item) =>
                  item.isExternal ? (
                    <MenuItem
                      key={item.label}
                      component="a"
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        color: Color.ThemeGray,
                        fontSize: '18px',
                        fontWeight: 600,
                        py: 2,
                        textDecoration: 'none',
                        '&:hover': { backgroundColor: `${Color.ThemeGold}10` },
                      }}
                    >
                      {item.label}
                    </MenuItem>
                  ) : (
                    <Link key={item.label} href={item.link} style={{ textDecoration: 'none' }}>
                      <MenuItem
                        sx={{
                          color: pathname === item.path ? Color.ThemeGold : Color.ThemeGray,
                          fontSize: '18px',
                          fontWeight: 600,
                          py: 2,
                          textDecoration: pathname === item.path ? 'underline' : 'none',
                          '&:hover': { backgroundColor: `${Color.ThemeGold}10` },
                        }}
                      >
                        {item.label}
                      </MenuItem>
                    </Link>
                  )
                )}
                <Divider sx={{ my: 3, borderColor: `${Color.ThemeGoldLight}30` }} />
                {user ? (
                  <>
                    <Box sx={{ px: 2, py: 1, mb: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <PersonIcon sx={{ fontSize: 20, color: Color.ThemeGray }} />
                        <Typography variant="body2" sx={{ color: Color.ThemeGray }}>
                          {user.email}
                        </Typography>
                      </Box>
                    </Box>
                    {user.role === 'admin' && (
                      <MenuItem sx={{ p: 0, mb: 2 }}>
                        <Link href="/dashboard" style={{ textDecoration: 'none', width: '100%' }}>
                          <CTAButton variant="contained" fullWidth>
                            Dashboard
                          </CTAButton>
                        </Link>
                      </MenuItem>
                    )}
                    <MenuItem sx={{ p: 0, mb: 2 }}>
                      <CTAButton
                        variant="outlined"
                        fullWidth
                        startIcon={<LogoutIcon />}
                        onClick={handleLogout}
                        sx={{
                          color: Color.ThemeGold,
                          borderColor: Color.ThemeGold,
                          '&:hover': {
                            borderColor: Color.ThemeGoldDark,
                            backgroundColor: `${Color.ThemeGold}10`,
                          },
                        }}
                      >
                        Logout
                      </CTAButton>
                    </MenuItem>
                  </>
                ) : (
                  <MenuItem sx={{ p: 0, mb: 2 }}>
                    <CTAButton variant="contained" fullWidth onClick={handleLogin}>
                      Login
                    </CTAButton>
                  </MenuItem>
                )}
              </Box>
            </Drawer>
          </Box>
        </StyledToolbar>
      </Container>
    </AppBar>
  );
}
