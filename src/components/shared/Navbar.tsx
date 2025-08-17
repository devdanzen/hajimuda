'use client';

import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import Container from '@mui/material/Container';
import Link from 'next/link';

import { Color } from '@/styles/color';

import HajiMudaIcon from '../home/HajiMudaIcon';

const MENU = [
  { label: 'Beranda', link: '/' },
  { label: 'Tentang Kami', link: '/tentang-kami' },
  { label: 'Paket', link: '#' },
  { label: 'Artikel', link: '#' },
  { label: 'Kontak Kami', link: 'https://wa.me/6281239019313', isExternal: true },
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
    backgroundColor: Color.ThemeGold,
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

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
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
            {MENU.map((item) => (
              item.isExternal ? (
                <a
                  key={item.label}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: 'none' }}
                >
                  <NavButton
                    variant="text"
                    endIcon={<OpenInNewIcon sx={{ fontSize: 14 }} />}
                  >
                    {item.label}
                  </NavButton>
                </a>
              ) : (
                <Link key={item.label} href={item.link} style={{ textDecoration: 'none' }}>
                  <NavButton variant="text">
                    {item.label}
                  </NavButton>
                </Link>
              )
            ))}
          </Box>

          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              gap: 1.5,
              alignItems: 'center',
            }}
          >
            <HelpButton>
              <HelpOutlineIcon sx={{ fontSize: 20 }} />
            </HelpButton>
            <CTAButton variant="contained">Login</CTAButton>
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

                {MENU.map((item) => (
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
                          color: Color.ThemeGray,
                          fontSize: '18px',
                          fontWeight: 600,
                          py: 2,
                          '&:hover': { backgroundColor: `${Color.ThemeGold}10` },
                        }}
                      >
                        {item.label}
                      </MenuItem>
                    </Link>
                  )
                ))}
                <Divider sx={{ my: 3, borderColor: `${Color.ThemeGoldLight}30` }} />
                <MenuItem sx={{ p: 0, mb: 2 }}>
                  <CTAButton variant="contained" fullWidth>
                    Login
                  </CTAButton>
                </MenuItem>
              </Box>
            </Drawer>
          </Box>
        </StyledToolbar>
      </Container>
    </AppBar>
  );
}
