'use client';

import * as React from 'react';

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { Color } from '@/styles/color';
import { sectionSubtitleSx } from '@/styles/typography';

const userTestimonials = [
  {
    avatar: (
      <Avatar
        alt="Alsuntika"
        src="https://lh3.googleusercontent.com/a-/ALV-UjUHlbOEE3xb_VQnAgfSTg2DcIrgurkkXOSx8K6JqVvEPbwSyoQ=w72-h72-p-rp-mo-br100"
      />
    ),
    name: 'Alsuntika',
    package: 'Umroh Barokah',
    testimonial:
      'Saya mengenal Tursinai Tour saat pameran dan sangat terkesan dengan pelayanan timnya. Penjelasan tentang program umroh dan haji disampaikan dengan sabar, detail, dan transparan sehingga mudah dipahami. Stafnya ramah, komunikatif, dan tidak segan menjawab semua pertanyaan jamaah. Booth pamerannya juga tertata rapi dan informatif. Dari cara mereka melayani saja sudah terasa profesional dan amanah. InsyaAllah jadi makin yakin memilih Tursinai Tour untuk perjalanan ibadah ke Tanah Suci.',
  },
  {
    avatar: (
      <Avatar
        alt="ahmadwafiq pwid"
        src="https://lh3.googleusercontent.com/a-/ALV-UjUkbpehbG7kqGC4KI-zdCSczgDv1uWFksuwXyJfDzRgk6THisM=w72-h72-p-rp-mo-br100"
      />
    ),
    name: 'ahmadwafiq pwid',
    package: 'Umroh Ekonomis',
    testimonial: 'tempatnya sangat nyaman,bersih,dan rapi',
  },
  {
    avatar: (
      <Avatar
        alt="NADYA AFANI"
        src="https://lh3.googleusercontent.com/a/ACg8ocIyKypiT4yQg6HZvScitxGgxdhaq4YPRvgz-wZY60_xx6sPdw=w72-h72-p-rp-mo-br100"
      />
    ),
    name: 'NADYA AFANI',
    package: 'Umroh Eksekutif',
    testimonial:
      'Masyaa Allah, Alhamdulillah Tursina sangat bagus penawarannya. Semoga bisa berangkat besok bersama tursina',
  },
  {
    avatar: <Avatar alt="Maya Kartika" src="/static/images/avatar/4.jpg" />,
    name: 'Maya Kartika',
    package: 'Haji Khusus',
    testimonial: 'Alhamdulillah ibadah berjalan lancar, fasilitas premium sesuai harapan.',
  },
  {
    avatar: <Avatar alt="Budi Santoso" src="/static/images/avatar/5.jpg" />,
    name: 'Budi Santoso',
    package: 'Haji Mujamalah',
    testimonial: 'Pelayanan profesional dari awal hingga akhir. Terima kasih HajiMuda.',
  },
];

export default function Testimonials() {
  return (
    <Container
      id="testimonials"
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
            color: Color.ThemeGoldDark,
            fontFamily: 'var(--font-title), cursive',
            fontWeight: 700,
            fontSize: { xs: '1.8rem', sm: '2.2rem' },
          }}
        >
          Testimonials
        </Typography>
        <Typography variant="h6" sx={sectionSubtitleSx}>
          Apa kata pelanggan kami tentang layanan tour kami
        </Typography>
      </Box>
      <Grid container spacing={2}>
        {userTestimonials.map((testimonial, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index} sx={{ display: 'flex' }}>
            <Card
              variant="outlined"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                flexGrow: 1,
              }}
            >
              <CardContent>
                <Typography variant="body1" gutterBottom sx={{ color: 'text.secondary' }}>
                  {testimonial.testimonial}
                </Typography>
              </CardContent>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <CardHeader
                  avatar={testimonial.avatar}
                  title={testimonial.name}
                  subheader={testimonial.package}
                />
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
