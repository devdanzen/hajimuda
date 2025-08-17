'use client';

import * as React from 'react';

import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import CameraAltRoundedIcon from '@mui/icons-material/CameraAltRounded';
import DirectionsBusRoundedIcon from '@mui/icons-material/DirectionsBusRounded';
import FlightTakeoffRoundedIcon from '@mui/icons-material/FlightTakeoffRounded';
import GroupRoundedIcon from '@mui/icons-material/GroupRounded';
import HealthAndSafetyRoundedIcon from '@mui/icons-material/HealthAndSafetyRounded';
import HotelRoundedIcon from '@mui/icons-material/HotelRounded';
import InventoryRoundedIcon from '@mui/icons-material/InventoryRounded';
import LocalDrinkRoundedIcon from '@mui/icons-material/LocalDrinkRounded';
import RestaurantRoundedIcon from '@mui/icons-material/RestaurantRounded';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { Color } from '@/styles/color';
import { sectionSubtitleSx } from '@/styles/typography';

const items = [
  {
    icon: <FlightTakeoffRoundedIcon />,
    title: 'Tiket Pesawat',
    description: 'Tiket pesawat PP untuk keperluan berangkat ke tanah suci',
  },
  {
    icon: <AssignmentRoundedIcon />,
    title: 'Visa haji & umrah',
    description: 'Pengurusan visa haji & umrah untuk keperluan ibadah',
  },
  {
    icon: <InventoryRoundedIcon />,
    title: 'Perlengkapan Haji & Umrah',
    description: 'Paket umrah dengan perlengkapan kebutuhan ibadah yang lengkap',
  },
  {
    icon: <RestaurantRoundedIcon />,
    title: 'Konsumsi',
    description: 'Konsumsi yang terjamin dari memulai perjalanan sampai selesai',
  },
  {
    icon: <GroupRoundedIcon />,
    title: 'TL/ Muthawif',
    description: 'Umrah ditemani oleh tour leader dan muthawif yang tersertifikasi',
  },
  {
    icon: <HotelRoundedIcon />,
    title: 'Hotel Penginapan',
    description: 'Akomodasi hotel / penginapan terbaik dan ternyaman',
  },
  {
    icon: <DirectionsBusRoundedIcon />,
    title: 'Transportasi',
    description: 'Transportasi untuk memudahkan perjalanan jamaah',
  },
  {
    icon: <CameraAltRoundedIcon />,
    title: 'Dokumentasi',
    description: 'Dokumentasi untuk jamaah selama ibadah',
  },
  {
    icon: <HealthAndSafetyRoundedIcon />,
    title: 'Asuransi Perjalanan',
    description: 'Perjalanan ibadah anda akan terasa aman',
  },
  {
    icon: <LocalDrinkRoundedIcon />,
    title: 'Air Zam Zam',
    description: 'Oleh-oleh Yang diberikan kepada setiap jamaah " 5L "',
  },
];

export default function Facilities() {
  return (
    <Box
      id="facilities"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        color: 'white',
        bgcolor: 'grey.900',
      }}
    >
      <Container
        sx={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: { xs: 3, sm: 6 },
        }}
      >
        <Box
          sx={{
            width: { sm: '100%', md: '60%' },
            textAlign: { sm: 'left', md: 'center' },
          }}
        >
          <Typography
            component="h2"
            variant="h4"
            gutterBottom
            sx={{
              color: Color.ThemeGoldLight,
              fontFamily: 'var(--font-title), cursive',
              fontWeight: 700,
              fontSize: { xs: '1.8rem', sm: '2.2rem' },
            }}
          >
            Fasilitas Yang Disediakan
          </Typography>
          <Typography variant="h6" sx={{ ...sectionSubtitleSx, color: Color.ThemeWhite }}>
            Daftar fasilitas yang kami sediakan untuk para kaum muslimin di seluruh Indonesia
            khususnya jamaah haji & umrah.
          </Typography>
        </Box>
        <Grid container spacing={2}>
          {items.map((item, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
              <Stack
                direction="column"
                component={Card}
                spacing={1}
                useFlexGap
                sx={{
                  color: 'inherit',
                  p: 3,
                  height: '100%',
                  borderColor: 'hsla(220, 25%, 25%, 0.3)',
                  backgroundColor: 'grey.800',
                }}
              >
                <Box sx={{ opacity: '50%' }}>{item.icon}</Box>
                <div>
                  <Typography gutterBottom sx={{ fontWeight: 'medium' }}>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'grey.400' }}>
                    {item.description}
                  </Typography>
                </div>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
