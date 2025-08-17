'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

const logos = ['/assets/images/multazam_logo.webp', '/assets/images/tursina_logo.png', '/assets/images/almira_logo.png'];

const logoStyle = {
  width: '100px',
  height: '80px',
  margin: '0 32px',
  opacity: 0.7,
  filter: 'grayscale(100%)',
};

export default function LogoCollection() {
  return (
    <Box id="logoCollection" sx={{ py: 4 }}>
      <Typography
        variant="h6"
        align='center'
        sx={{
          color: 'gray.400',
          lineHeight: 1.6,
          fontSize: { xs: '1rem', sm: '1.25rem' },
          fontWeight: 400,
        }}
      >
        Dipercaya oleh beberapa perusahaan travel terkemuka
      </Typography>
      <Grid container sx={{ justifyContent: 'center', mt: 0.5, opacity: 0.6 }}>
        {logos.map((logo, index) => (
          <Grid key={index}>
            <img src={logo} alt={`Fake company number ${index + 1}`} style={logoStyle} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
