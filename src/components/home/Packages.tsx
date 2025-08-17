'use client';

import { Box, Button, Container, Typography } from '@mui/material';

import PackageCard from './PackageCard';

import { Color } from '@/styles/color';
import { sectionSubtitleSx } from '@/styles/typography';

export const packagesData = [
  {
    id: 1,
    type: 'Eksekutif',
    image:
      'https://bb71d2eac085c69b0.nos.wjv-1.neo.id/1634910175-115171/17397844255834-etypuuSgEX.png',
    title: 'UMROH MUSIM 1447 H | 9 HARI BY SAUDIA AIRLINES | EKSEKUTIF 6 OKTOBER 2025',
    departure_date: '2025-10-06',
    hotel_makkah: 'Al Marwa Rayhaan by Rotana / Setaraf',
    hotel_madinah: 'Al Aqeeq Madinah / Setaraf',
    airline: 'Saudi Arabian Airlines',
    departure_airport: 'Soekarno-Hatta International Airport (CGK)',
    remaining_seats: 18,
    price_idr: 41900000,
  },
  {
    id: 2,
    type: 'Ekonomis',
    image:
      'https://bb71d2eac085c69b0.nos.wjv-1.neo.id/1634910175-115171/17211890544553-D6GdToZBsf.png',
    title: 'UMROH MUSIM 1447 H | 9 HARI BY SAUDIA AIRLINES | EKONOMIS 24 DESEMBER 2025',
    departure_date: '2025-12-24',
    hotel_makkah: 'Maysan Al Mashaer (ex Rayyana) / Setaraf',
    hotel_madinah: 'Durrat Al Eiman Hotel',
    airline: 'Saudi Arabian Airlines',
    departure_airport: 'Soekarno-Hatta International Airport (CGK)',
    remaining_seats: 40,
    price_idr: 36500000,
  },
  {
    id: 3,
    type: 'Barokah',
    image:
      'https://bb71d2eac085c69b0.nos.wjv-1.neo.id/1634910175-115171/17013978431438-qB753AkqmocC57bwXyk8o5u6kGQSpwTVWIRmEHzN.png',
    title: 'UMROH MUSIM 1447 H | 9 HARI BY OMAN AIR | BAROKAH 9 DESEMBER 2025',
    departure_date: '2025-12-08',
    hotel_makkah: 'Al Marsa Jariyah (Makkah)',
    hotel_madinah: 'ODST Madinah (Madinah)',
    airline: 'Oman Air',
    departure_airport: 'Soekarno-Hatta International Airport (CGK)',
    remaining_seats: 41,
    price_idr: 26900000,
  },
];

const PACKAGES_CONFIG = {
  maxDisplayCount: 3, // Configure how many packages to display
  showAllButton: true, // Show "View All Packages" button
};

interface PackagesProps {
  maxDisplayCount?: number;
  showViewAllButton?: boolean;
}

export default function Packages({
  maxDisplayCount = PACKAGES_CONFIG.maxDisplayCount,
  showViewAllButton = PACKAGES_CONFIG.showAllButton,
}: PackagesProps) {
  const displayedPackages = packagesData.slice(0, maxDisplayCount);

  return (
    <Container
      id="packages"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: { xs: 3, sm: 6 },
      }}
    >
      {/* Title and Subtitle */}
      <Box sx={{ textAlign: 'center', maxWidth: '800px', mb: { xs: 2, sm: 4 } }}>
        <Typography
          component="h2"
          variant="h4"
          sx={{
            color: Color.ThemeGoldDark,
            fontWeight: 700,
            mb: 2,
            fontSize: { xs: '1.8rem', sm: '2.2rem' },
            fontFamily: 'var(--font-title), cursive',
          }}
        >
          Layanan Paket Umrah
        </Typography>
        <Typography variant="h6" sx={sectionSubtitleSx}>
          Daftar layanan yang kami sediakan untuk muslimin di seluruh Indonesia khususnya jamaah
          haji & umrah.
        </Typography>
      </Box>

      {/* Package Cards */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: maxDisplayCount >= 2 ? 'repeat(2, 1fr)' : '1fr',
            md:
              maxDisplayCount >= 3
                ? 'repeat(3, 1fr)'
                : maxDisplayCount >= 2
                  ? 'repeat(2, 1fr)'
                  : '1fr',
          },
          gap: { xs: 3, sm: 4 },
          width: '100%',
          maxWidth: '1200px',
        }}
      >
        {displayedPackages.map((packageItem) => (
          <Box key={packageItem.id} sx={{ display: 'flex', justifyContent: 'center' }}>
            <PackageCard {...packageItem} />
          </Box>
        ))}
      </Box>

      {/* View All Button */}
      {showViewAllButton && packagesData.length > maxDisplayCount && (
        <Box sx={{ textAlign: 'center', mt: 2 }}>
          <Button
            variant="contained"
            size="large"
            href="#"
            sx={{
              color: 'white',
              px: 4,
              py: 1.5,
              fontSize: '1.1rem',
              fontWeight: 600,
              '&:hover': {
                backgroundColor: Color.ThemeGoldDark,
              },
            }}
          >
            Lihat Semua Paket
          </Button>
        </Box>
      )}
    </Container>
  );
}
