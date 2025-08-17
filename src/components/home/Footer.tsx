'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

import SitemarkIcon from './HajiMudaIcon';

function Copyright() {
  return (
    <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
      {'Copyright © '}
      <Link color="text.secondary" href="https://hajimuda.id/">
        HajiMuda
      </Link>
      &nbsp;
      {new Date().getFullYear()}
    </Typography>
  );
}

export default function Footer() {
  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: { xs: 4, sm: 8 },
        py: { xs: 8, sm: 10 },
        textAlign: { sm: 'center', md: 'left' },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          width: '100%',
          justifyContent: 'space-between',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
            minWidth: { xs: '100%', sm: '60%' },
          }}
        >
          <Box sx={{ width: { xs: '100%', sm: '60%' } }}>
            <SitemarkIcon />
            <Typography variant="body2" gutterBottom sx={{ fontWeight: 600, mt: 2 }}>
              Hubungi Kami via WhatsApp
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
              Konsultasi gratis seputar paket haji, umrah, dan halal trip
            </Typography>
            <Button 
              variant="contained" 
              startIcon={<WhatsAppIcon />}
              component="a"
              href="https://wa.me/6281239019313"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                backgroundColor: '#25D366',
                '&:hover': { backgroundColor: '#128C7E' },
                mt: 1
              }}
            >
              Chat WhatsApp
            </Button>
          </Box>
        </Box>
        <Box
          sx={{
            display: { xs: 'none', sm: 'flex' },
            flexDirection: 'column',
            gap: 1,
          }}
        >
          <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
            Navigasi
          </Typography>
          <Link color="text.secondary" variant="body2" href="/">
            Beranda
          </Link>
          <Link color="text.secondary" variant="body2" href="/tentang-kami">
            Tentang Kami
          </Link>
          <Link color="text.secondary" variant="body2" href="#">
            Paket
          </Link>
          <Link color="text.secondary" variant="body2" href="#">
            Artikel
          </Link>
        </Box>
        <Box
          sx={{
            display: { xs: 'none', sm: 'flex' },
            flexDirection: 'column',
            gap: 1,
          }}
        >
          <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
            Layanan
          </Typography>
          <Link color="text.secondary" variant="body2" href="#">
            Paket Umrah
          </Link>
          <Link color="text.secondary" variant="body2" href="#">
            Paket Haji
          </Link>
          <Link color="text.secondary" variant="body2" href="#">
            Konsultasi
          </Link>
        </Box>
        <Box
          sx={{
            display: { xs: 'none', sm: 'flex' },
            flexDirection: 'column',
            gap: 1,
          }}
        >
          <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
            Kontak
          </Typography>
          <Link 
            color="text.secondary" 
            variant="body2" 
            href="https://wa.me/6281239019313"
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp
          </Link>
          <Link color="text.secondary" variant="body2" href="#">
            Alamat Kantor
          </Link>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          pt: { xs: 4, sm: 8 },
          width: '100%',
          borderTop: '1px solid',
          borderColor: 'divider',
        }}
      >
        <div>
          <Copyright />
        </div>
        <Stack
          direction="row"
          spacing={1}
          useFlexGap
          sx={{ justifyContent: 'left', color: 'text.secondary' }}
        >
          <IconButton
            color="inherit"
            size="small"
            href="https://www.instagram.com/bongtjandra/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            sx={{ alignSelf: 'center' }}
          >
            <InstagramIcon />
          </IconButton>
          <IconButton
            color="inherit"
            size="small"
            href="https://www.youtube.com/@bongtjandra"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
            sx={{ alignSelf: 'center' }}
          >
            <YouTubeIcon />
          </IconButton>
          <IconButton
            color="inherit"
            size="small"
            href="https://www.tiktok.com/@bong.tjandra.ofc"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="TikTok"
            sx={{ alignSelf: 'center' }}
          >
            <Box component="svg" viewBox="0 0 24 24" sx={{ width: 20, height: 20 }}>
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" fill="currentColor"/>
            </Box>
          </IconButton>
        </Stack>
      </Box>
    </Container>
  );
}
