'use client';

import * as React from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { Color } from '@/styles/color';

const StyledButton = styled(Button)<{ 
  component?: React.ElementType;
  target?: string;
  rel?: string;
}>(({ theme }) => ({
  fontWeight: 'bold',
  padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
  fontSize: '0.875rem',
  minHeight: '36px',
  [theme.breakpoints.up('md')]: {
    padding: `${theme.spacing(1.5)} ${theme.spacing(3)}`,
    fontSize: '1rem',
    minHeight: '42px',
  },
}));

export default function Hero() {
  return (
    <Box
      id="hero"
      sx={{
        width: '100%',
        height: { xs: '80vh', sm: '90vh', md: '100vh' },
        position: 'relative',
        backgroundImage: 'url(/assets/images/hajimuda_hero.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pt: { xs: '72px', sm: '72px', md: 0 },
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          zIndex: 1,
        },
      }}
    >
      <Container
        sx={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          color: 'white',
        }}
      >
        <Stack
          spacing={3}
          useFlexGap
          sx={{
            alignItems: 'center',
            width: { xs: '100%', sm: '80%', md: '70%' },
          }}
        >
          <Typography
            variant="h1"
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: 'center',
              fontSize: { xs: '1.8rem', sm: '2.5rem', md: '3.5rem' },
              fontWeight: 'bold',
              color: 'white',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)',
              lineHeight: { xs: 1.2, sm: 1.3, md: 1.4 },
            }}
          >
            Wujudkan Haji & Umrah yang Damai Bersama
            <Typography
              sx={{
                fontSize: 'inherit',
                fontWeight: 'inherit',
                color: Color.ThemeGold,
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)',
              }}
            >
              HajiMuda
            </Typography>
          </Typography>
          <Typography
            variant="h5"
            sx={{
              textAlign: 'center',
              color: 'white',
              width: { sm: '100%', md: '80%' },
              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.7)',
              lineHeight: 1.6,
              fontSize: { xs: '0.9rem', sm: '1.2rem', md: '1.5rem' },
            }}
          >
            &ldquo;Haji dan umrah menghapus dosa serta kemiskinan, sebagaimana api menghilangkan
            karat dari logam. Tiada pahala bagi haji mabrur kecuali surga.&ldquo; (HR. An Nasai,
            Tirmidzi, Ahmad)
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} useFlexGap sx={{ pt: 2 }}>
            <StyledButton
              size="large"
              variant="contained"
              component="a"
              href="https://wa.me/6281239019313?text=Halo,%20saya%20ingin%20konsultasi%20gratis%20tentang%20paket%20Haji%20dan%20Umrah"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                backgroundColor: Color.ThemeGold,
                color: 'white',
                '&:hover': {
                  backgroundColor: Color.ThemeGoldDark,
                },
              }}
            >
              Konsultasi Gratis
            </StyledButton>
            <StyledButton
              size="large"
              variant="outlined"
              component="a"
              href="#packages"
              sx={{
                borderColor: 'white',
                color: 'white',
                '&:hover': {
                  borderColor: Color.ThemeGoldDark,
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                },
              }}
            >
              Pelajari Lebih Lanjut
            </StyledButton>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
