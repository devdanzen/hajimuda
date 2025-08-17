import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { Flight, Hotel, CalendarToday, LocationPin, AirlineSeatReclineNormal } from '@mui/icons-material';
import Image from 'next/image';

import { Color } from '@/styles/color';

interface PackageCardProps {
  id: number;
  type: string;
  title: string;
  departure_date: string | null;
  hotel_makkah: string;
  hotel_madinah: string;
  airline: string;
  departure_airport: string;
  remaining_seats: number;
  price_idr: number;
  image: string;
}

export default function PackageCard({
  title,
  type,
  departure_date,
  hotel_makkah,
  hotel_madinah,
  airline,
  departure_airport,
  remaining_seats,
  price_idr,
  image,
}: PackageCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID').format(price);
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'TBA';
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const listItems = [
    { icon: Flight, text: airline },
    { icon: LocationPin, text: departure_airport },
    { icon: Hotel, text: `Makkah: ${hotel_makkah}` },
    { icon: Hotel, text: `Madinah: ${hotel_madinah}` },
  ];

  return (
    <Card
      variant="outlined"
      sx={{
        p: 0,
        pb: 2,
        maxWidth: { xs: '100%', sm: 380 },
        width: '100%',
        border: `1px solid ${Color.ThemeGold}20`,
        background: 'white',
        borderRadius: 2,
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.12)',
        transition: 'all 0.3s ease-in-out',
        '&:hover': {
          boxShadow: `0 8px 24px ${Color.ThemeGold}15`,
          borderColor: `${Color.ThemeGold}40`,
          transform: 'translateY(-4px)',
        },
      }}
    >
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="div"
          sx={{
            height: 240,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <Image
            src={
              image ||
              'https://bb71d2eac085c69b0.nos.wjv-1.neo.id/1634910175-115171/17397844255834-etypuuSgEX.png'
            }
            alt={title}
            fill
            style={{ objectFit: 'cover' }}
          />
        </CardMedia>

        <Chip
          icon={<AirlineSeatReclineNormal />}
          label={remaining_seats > 0 ? `${remaining_seats} Sisa Seat` : 'Habis'}
          sx={{
            position: 'absolute',
            top: 12,
            left: 12,
            backgroundColor: remaining_seats > 0 ? Color.ThemeWhite : '#f44336',
            color: 'white',
            fontWeight: 600,
            fontSize: '0.75rem',
          }}
        />
        <Chip
          label={type}
          sx={{
            position: 'absolute',
            bottom: 12,
            left: 12,
            backgroundColor: Color.ThemeBlack + '80',
            '& .MuiChip-label': {
              color: Color.ThemeWhite,
              fontWeight: 500,
            },
          }}
        />
      </Box>

      <CardContent sx={{ p: 2}}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box>
            <Typography
              variant="h6"
              component="h3"
              sx={{ 
                fontWeight: 600, 
                color: 'text.primary', 
                fontSize: '1rem', 
                lineHeight: 1.4,
                mb: 1,
              }}
            >
              {title}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <CalendarToday sx={{ width: 18, height: 18, color: Color.ThemeGold }} />
            <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500 }}>
              Keberangkatan: {formatDate(departure_date)}
            </Typography>
          </Box>

          <List sx={{ p: 0 }}>
            {listItems.map((item, index) => (
              <ListItem key={index} sx={{ p: 0, mb: 1 }}>
                <ListItemIcon sx={{ minWidth: 28 }}>
                  <item.icon sx={{ width: 18, height: 18, color: Color.ThemeGold }} />
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{
                    variant: 'body2',
                    sx: { 
                      color: 'text.secondary', 
                      fontSize: index >= 2 ? '0.85rem' : '0.9rem',
                      fontWeight: 500 
                    },
                  }}
                />
              </ListItem>
            ))}
          </List>

          <Box sx={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', mt: 1, mb: 0 }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              mulai dari
            </Typography>
            <Typography variant="h5" sx={{ color: Color.ThemeGold, fontWeight: 'bold' }}>
              IDR {formatPrice(price_idr)}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
