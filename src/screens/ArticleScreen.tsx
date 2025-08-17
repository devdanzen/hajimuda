'use client'

import Container from '@mui/material/Container';

import Latest from '@/components/article/Latest';
import MainContent from '@/components/article/MainContent';

export default function ArticleScreen() {
  return (
    <Container
      maxWidth="lg"
      component="main"
      sx={{ display: 'flex', flexDirection: 'column', my: 16, gap: 4 }}
    >
      <MainContent />
      <Latest />
    </Container>
  );
}
