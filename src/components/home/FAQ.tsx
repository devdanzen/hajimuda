'use client';

import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { AddBox } from '@mui/icons-material';

import { Color } from '@/styles/color';

const faqData = [
  {
    id: 'panel1',
    question: 'Bagaimana cara menghubungi tim HajiMuda?',
    answer: (
      <>
        Anda dapat menghubungi tim layanan pelanggan kami melalui email di{' '}
        <Link href="mailto:support@hajimuda.com">support@hajimuda.com</Link>
        {' '}atau WhatsApp/telpon ke nomor{' '}
        <Link href="https://wa.me/6281239019313" target="_blank" rel="noopener noreferrer">
          +62 812-3901-9313
        </Link>
        . Kami siap membantu Anda dengan cepat dan ramah.
      </>
    ),
  },
  {
    id: 'panel2',
    question: 'Apa saja paket Haji dan Umrah yang tersedia?',
    answer:
      'Kami menyediakan berbagai paket Haji dan Umrah sesuai kebutuhan dan budget Anda. Mulai dari paket ekonomis hingga VIP dengan fasilitas lengkap. Konsultasikan dengan tim kami untuk mendapatkan paket yang tepat.',
  },
  {
    id: 'panel3',
    question: 'Berapa lama waktu persiapan untuk keberangkatan Haji/Umrah?',
    answer:
      'Untuk Haji, persiapan minimal 1-2 tahun karena sistem kuota. Sedangkan untuk Umrah, persiapan dapat dilakukan 1-3 bulan sebelum keberangkatan, tergantung kelengkapan dokumen dan ketersediaan jadwal.',
  },
  {
    id: 'panel4',
    question: 'Apa saja dokumen yang diperlukan untuk Haji dan Umrah?',
    answer:
      'Dokumen yang diperlukan meliputi: Paspor (minimal berlaku 6 bulan), KTP, Kartu Keluarga, Akta Kelahiran, Surat Keterangan Sehat, dan foto terbaru. Untuk wanita di bawah 45 tahun tanpa mahram, diperlukan surat izin khusus.',
  },
  {
    id: 'panel5',
    question: 'Apakah ada garansi jika terjadi pembatalan perjalanan?',
    answer:
      'Ya, kami memiliki kebijakan pembatalan yang fleksibel. Jika pembatalan terjadi karena force majeure atau kebijakan pemerintah, dana dapat dikembalikan atau dialihkan ke periode berikutnya sesuai dengan syarat dan ketentuan yang berlaku.',
  },
  {
    id: 'panel6',
    question: 'Apa yang membedakan HajiMuda dengan travel lainnya?',
    answer:
      'HajiMuda mengutamakan pelayanan prima dengan harga terjangkau, bimbingan ibadah yang komprehensif, akomodasi berkualitas, dan pendampingan 24/7 selama perjalanan. Tim kami berpengalaman dan berkomitmen memberikan pengalaman ibadah yang berkesan.',
  },
];

export default function FAQ() {
  const [expanded, setExpanded] = React.useState<string[]>([]);

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? [...expanded, panel] : expanded.filter((item) => item !== panel));
  };

  return (
    <Container
      id="faq"
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
      <Typography
        component="h2"
        variant="h4"
        sx={{
          color: Color.ThemeGoldDark,
          fontFamily: 'var(--font-title), cursive',
          fontWeight: 700,
          fontSize: { xs: '1.8rem', sm: '2.2rem' },
          width: { sm: '100%', md: '60%' },
          textAlign: { sm: 'left', md: 'center' },
        }}
      >
        Pertanyaan yang Sering Diajukan
      </Typography>
      <Box sx={{ width: '100%' }}>
        {faqData.map((faq) => (
          <Accordion
            key={faq.id}
            expanded={expanded.includes(faq.id)}
            onChange={handleChange(faq.id)}
          >
            <AccordionSummary
              expandIcon={<AddBox sx={{ color: Color.ThemeGoldDark }} />}
              aria-controls={`${faq.id}d-content`}
              id={`${faq.id}d-header`}
            >
              <Typography component="span" variant="subtitle2">
                {faq.question}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" gutterBottom sx={{ maxWidth: { sm: '100%', md: '70%' } }}>
                {faq.answer}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Container>
  );
}
