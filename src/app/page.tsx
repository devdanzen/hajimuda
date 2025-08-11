'use client';
import { Container, Typography, Button, Box, Card, CardContent } from '@mui/material';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography variant="h2" component="h1" gutterBottom align="center">
          Welcome to Hajimuda Frontend
        </Typography>
        
        <Typography variant="h6" color="text.secondary" align="center" sx={{ mb: 4 }}>
          Built with Next.js, TypeScript, MUI, and Framer Motion
        </Typography>
      </motion.div>

      <Box sx={{ display: 'grid', gap: 3, gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' } }}>
        {[
          { title: 'Next.js 15', description: 'Latest version with App Router' },
          { title: 'TypeScript', description: 'Type-safe development' },
          { title: 'Material-UI', description: 'Beautiful React components' },
          { title: 'Framer Motion', description: 'Smooth animations' },
        ].map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card
              component={motion.div}
              whileHover={{ scale: 1.02 }}
              sx={{ height: '100%' }}
            >
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  {item.title}
                </Typography>
                <Typography color="text.secondary">
                  {item.description}
                </Typography>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </Box>

      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button variant="contained" size="large" color="primary">
            Get Started
          </Button>
        </motion.div>
      </Box>
    </Container>
  );
}
