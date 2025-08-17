'use client';

import * as React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  Avatar,
  Stack,
  Divider,
  Button,
} from '@mui/material';
import {
  Phone,
  Email,
  LocationOn,
  WhatsApp,
  AccessTime,
  Person,
  Star,
  Group,
  Timeline,
} from '@mui/icons-material';

import { Color } from '@/styles/color';
import { sectionSubtitleSx } from '@/styles/typography';

const stats = [
  {
    icon: Group,
    number: '1000+',
    label: 'Jamaah Dilayani',
  },
  {
    icon: Timeline,
    number: '7+',
    label: 'Tahun Pengalaman',
  },
  {
    icon: Star,
    number: '4.9/5',
    label: 'Rating Kepuasan',
  },
  {
    icon: Person,
    number: '30+',
    label: 'Trip Berhasil',
  },
];

const teamMembers = [
  {
    name: 'Bong Tjandra',
    position: 'Founder',
    description: 'Pengalaman 7+ tahun di industri travel haji dan umroh. Tour leader, Tursina.',
    avatar: '/assets/images/bongtjandra_avatar.jpg',
  },
];

export default function AboutUsScreen() {
  return (
    <Container
      id="tentang-kami"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        gap: { xs: 6, sm: 10 },
      }}
    >
      {/* Hero Section */}
      <Box sx={{ textAlign: 'center', maxWidth: '800px', mx: 'auto' }}>
        <Typography
          component="h1"
          variant="h3"
          sx={{
            color: Color.ThemeGoldDark,
            fontFamily: 'var(--font-title), cursive',
            fontWeight: 700,
            mb: 2,
            fontSize: { xs: '2rem', sm: '2.5rem' },
          }}
        >
          Tentang HajiMuda
        </Typography>
        <Typography variant="h5" sx={sectionSubtitleSx}>
          Melayani perjalanan spiritual Anda dengan dedikasi tinggi dan pengalaman yang terpercaya
        </Typography>
      </Box>

      <Divider />

      {/* Story Section */}
      <Box sx={{ maxWidth: '900px', mx: 'auto' }}>
        <Typography
          component="h2"
          variant="h4"
          sx={{
            color: Color.ThemeGoldDark,
            fontFamily: 'var(--font-title), cursive',
            fontWeight: 700,
            mb: 3,
            fontSize: { xs: '1.8rem', sm: '2.2rem' },
            textAlign: 'center',
          }}
        >
          Cerita Kami
        </Typography>
        <Stack spacing={3}>
          <Typography variant="body1" sx={{ lineHeight: 1.7, textAlign: 'justify' }}>
            HajiMuda didirikan pada tahun 2018 dengan misi untuk memberikan layanan haji dan umroh
            terbaik bagi umat muslim Indonesia. Berawal dari pengalaman pribadi pendiri yang
            merasakan sulitnya mendapatkan layanan yang memuaskan.
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.7, textAlign: 'justify' }}>
            Dengan pengalaman lebih dari 7 tahun, kami telah melayani ribuan jamaah dan terus
            berkomitmen untuk memberikan pelayanan yang excellent dengan harga yang kompetitif.
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.7, textAlign: 'justify' }}>
            Tim kami terdiri dari para profesional yang berpengalaman di bidang travel haji dan
            umroh, didukung dengan pembimbing spiritual yang telah puluhan kali ke Tanah Suci.
          </Typography>
        </Stack>
      </Box>

      {/* Stats Section */}
      <Box sx={{ bgcolor: Color.ThemeGold + '10', borderRadius: 3, p: { xs: 3, sm: 5 } }}>
        <Grid container spacing={4} sx={{ justifyContent: 'space-between' }}>
          {stats.map((stat, index) => (
            <Grid key={index} sx={{ xs: 6, md: 3, display: 'flex', justifyContent: 'center' }}>
              <Box sx={{ textAlign: 'center' }}>
                <stat.icon
                  sx={{
                    fontSize: 48,
                    color: Color.ThemeGold,
                    mb: 2,
                  }}
                />
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 'bold',
                    color: Color.ThemeGoldDark,
                    mb: 1,
                    fontSize: { xs: '1.8rem', sm: '2.5rem' },
                  }}
                >
                  {stat.number}
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary', fontWeight: 500 }}>
                  {stat.label}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Divider />

      {/* Team Section */}
      <Box>
        <Typography
          component="h2"
          variant="h4"
          sx={{
            color: Color.ThemeGoldDark,
            fontFamily: 'var(--font-title), cursive',
            fontWeight: 700,
            mb: 5,
            fontSize: { xs: '1.8rem', sm: '2.2rem' },
            textAlign: 'center',
          }}
        >
          Tim Kami
        </Typography>
        <Grid container spacing={4} sx={{ justifyContent: 'center' }}>
          {teamMembers.map((member, index) => (
            <Grid key={index} sx={{ xs: 12, md: 4, display: 'flex', justifyContent: 'center' }}>
              <Card
                variant="outlined"
                sx={{
                  height: '100%',
                  textAlign: 'center',
                  p: 3,
                  border: `1px solid ${Color.ThemeGold}20`,
                  transition: 'all 0.3s ease',
                  width: '100%',
                  maxWidth: '350px',
                  '&:hover': {
                    boxShadow: `0 8px 24px ${Color.ThemeGold}15`,
                    borderColor: `${Color.ThemeGold}40`,
                  },
                }}
              >
                <Avatar
                  src={member.avatar}
                  alt={member.name}
                  sx={{
                    width: 100,
                    height: 100,
                    mx: 'auto',
                    mb: 3,
                    bgcolor: Color.ThemeGold,
                    fontSize: '2rem',
                  }}
                >
                  {member.name.charAt(0)}
                </Avatar>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 'bold',
                    color: 'text.primary',
                    mb: 1,
                  }}
                >
                  {member.name}
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{
                    color: Color.ThemeGold,
                    fontWeight: 600,
                    mb: 2,
                  }}
                >
                  {member.position}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: 'text.secondary',
                    lineHeight: 1.6,
                  }}
                >
                  {member.description}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Divider />

      {/* Contact Section */}
      <Box>
        <Typography
          component="h2"
          variant="h4"
          sx={{
            color: Color.ThemeGoldDark,
            fontFamily: 'var(--font-title), cursive',
            fontWeight: 700,
            mb: 5,
            fontSize: { xs: '1.8rem', sm: '2.2rem' },
            textAlign: 'center',
          }}
        >
          Hubungi Kami
        </Typography>
        <Grid container spacing={4} sx={{ justifyContent: 'space-between' }}>
          {/* Address */}
          <Grid sx={{ xs: 12, sm: 6, md: 3 }}>
            <Box>
              <Typography
                variant="h6"
                sx={{ fontWeight: 'bold', mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}
              >
                <LocationOn sx={{ color: Color.ThemeGold }} />
                Alamat Kantor
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
                Tursina Cilandak
                <br />
                Jl. Keramat No.15, RT.7/RW.1
                <br />
                Cilandak Tim., Ps. Minggu
                <br />
                Jakarta Selatan 12560, Indonesia
              </Typography>
            </Box>
          </Grid>

          {/* Phone */}
          <Grid sx={{ xs: 12, sm: 6, md: 3 }}>
            <Box>
              <Typography
                variant="h6"
                sx={{ fontWeight: 'bold', mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}
              >
                <Phone sx={{ color: Color.ThemeGold }} />
                Telepon
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary', mb: 1 }}>
                +62 812-3901-9313
              </Typography>
            </Box>
          </Grid>

          {/* Email */}
          <Grid sx={{ xs: 12, sm: 6, md: 3 }}>
            <Box>
              <Typography
                variant="h6"
                sx={{ fontWeight: 'bold', mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}
              >
                <Email sx={{ color: Color.ThemeGold }} />
                Email
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary', mb: 1 }}>
                info@hajimuda.com
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                bongtjandra@gmail.com
              </Typography>
            </Box>
          </Grid>

          {/* Operating Hours */}
          <Grid sx={{ xs: 12, sm: 6, md: 3 }}>
            <Box>
              <Typography
                variant="h6"
                sx={{ fontWeight: 'bold', mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}
              >
                <AccessTime sx={{ color: Color.ThemeGold }} />
                Jam Operasional
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary', mb: 1 }}>
                Senin - Jumat: 09:00 - 18:00
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary', mb: 1 }}>
                Sabtu & Minggu: Tutup
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Card
          variant="outlined"
          sx={{
            overflow: 'hidden',
            border: `1px solid ${Color.ThemeGold}20`,
            borderRadius: 2,
            '& iframe': {
              border: 0,
              width: '100%',
              height: 450,
            },
          }}
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.999586456474!2d106.81094231476363!3d-6.257195995433803!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f1a3b8d5a1db%3A0x4c8d9e4f5b6a2c3d!2sJl.%20Keramat%20No.15%2C%20RT.7%2FRW.1%2C%20Cilandak%20Tim.%2C%20Ps.%20Minggu%2C%20Kota%20Jakarta%20Selatan%2C%20Daerah%20Khusus%20Ibukota%20Jakarta%2012560!5e0!3m2!1sen!2sid!4v1643723400000!5m2!1sen!2sid"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Lokasi Kantor HajiMuda - Tursina Cilandak"
          />
        </Card>

        {/* Action Buttons */}
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            sx={{ justifyContent: 'center' }}
          >
            <Button
              variant="contained"
              startIcon={<WhatsApp />}
              component="a"
              href="https://wa.me/6281239019313"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                '&:hover': { backgroundColor: '#128C7E' },
              }}
            >
              Chat WhatsApp
            </Button>
            <Button
              variant="outlined"
              startIcon={<LocationOn />}
              component="a"
              href="https://maps.google.com/maps?q=Jl.+Keramat+No.15,+RT.7/RW.1,+Cilandak+Tim.,+Ps.+Minggu,+Kota+Jakarta+Selatan,+Daerah+Khusus+Ibukota+Jakarta+12560"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                borderColor: Color.ThemeGold,
                color: Color.ThemeGold,
                '&:hover': {
                  borderColor: Color.ThemeGoldDark,
                  backgroundColor: Color.ThemeGold + '10',
                },
              }}
            >
              Kunjungi Kantor
            </Button>
          </Stack>
        </Box>
      </Box>
    </Container>
  );
}
