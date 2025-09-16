'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PersonIcon from '@mui/icons-material/Person';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { getCategoryColor, getCategoryTextColor } from '@/lib/categories';
import { formatDate } from '@/lib/date';

const HeroImage = styled('img')({
  width: '100%',
  height: '400px',
  objectFit: 'cover',
  borderRadius: '12px',
});

const ArticleContent = styled(Box)(({ theme }) => ({
  '& p': {
    marginBottom: theme.spacing(2),
    lineHeight: 1.7,
    fontSize: '1.1rem',
  },
  '& h1': {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(2),
    fontWeight: 700,
    fontSize: '2rem',
  },
  '& h2': {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(2),
    fontWeight: 600,
    fontSize: '1.5rem',
  },
  '& h3': {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(1.5),
    fontWeight: 600,
    fontSize: '1.25rem',
  },
  '& ul, & ol': {
    marginBottom: theme.spacing(2),
    paddingLeft: theme.spacing(3),
  },
  '& li': {
    marginBottom: theme.spacing(0.5),
    lineHeight: 1.6,
  },
  '& blockquote': {
    borderLeft: `4px solid ${theme.palette.primary.main}`,
    paddingLeft: theme.spacing(2),
    marginLeft: 0,
    fontStyle: 'italic',
    color: theme.palette.text.secondary,
  },
  '& code': {
    backgroundColor: theme.palette.grey[100],
    padding: '2px 4px',
    borderRadius: '4px',
    fontSize: '0.875rem',
    fontFamily: 'monospace',
  },
  '& pre': {
    backgroundColor: theme.palette.grey[100],
    padding: theme.spacing(2),
    borderRadius: '8px',
    overflow: 'auto',
    marginBottom: theme.spacing(2),
  },
}));

interface ArticleDetailScreenProps {
  slug: string;
}

interface Article {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  image: string;
  category: string;
  createdAt: string;
  updatedAt: string;
  authorName: string;
  authorEmail: string;
}

export default function ArticleDetailScreen({ slug }: ArticleDetailScreenProps) {
  const router = useRouter();
  const [article, setArticle] = React.useState<Article | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);

  const fetchArticle = React.useCallback(async () => {
    try {
      setLoading(true);
      setError(false);
      const response = await fetch(`/api/articles/${slug}`);

      if (response.ok) {
        const data = await response.json();
        setArticle(data.article);
      } else if (response.status === 404) {
        setError(true);
      } else {
        console.error('Failed to fetch article');
        setError(true);
      }
    } catch (error) {
      console.error('Error fetching article:', error);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [slug]);

  React.useEffect(() => {
    fetchArticle();
  }, [fetchArticle]);

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ py: 4, display: 'flex', justifyContent: 'center', minHeight: '400px', alignItems: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error || !article) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Typography variant="h4" color="error" gutterBottom>
          Artikel tidak ditemukan
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Artikel yang Anda cari tidak ada atau telah dihapus.
        </Typography>
        <Button
          variant="contained"
          startIcon={<ArrowBackIcon />}
          onClick={() => router.push('/artikel')}
        >
          Kembali ke Artikel
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      {/* Back Button */}
      <Button
        variant="text"
        startIcon={<ArrowBackIcon />}
        onClick={() => router.back()}
        sx={{ mb: 3 }}
      >
        Kembali
      </Button>

      {/* Article Header */}
      <Box sx={{ mb: 4 }}>
        <Chip
          label={article.category}
          sx={{
            mb: 2,
            backgroundColor: getCategoryColor(article.category),
            color: getCategoryTextColor(article.category),
            fontWeight: 500,
            border: `1px solid ${getCategoryTextColor(article.category)}30`
          }}
        />
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
          {article.title}
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 3, lineHeight: 1.6 }}>
          {article.excerpt}
        </Typography>

        {/* Author Info */}
        <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <PersonIcon sx={{ fontSize: 20, color: 'text.secondary' }} />
            <Typography variant="body2" color="text.secondary">
              {article.authorName || 'Admin'}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <CalendarTodayIcon sx={{ fontSize: 20, color: 'text.secondary' }} />
            <Typography variant="body2" color="text.secondary">
              {formatDate(article.createdAt)}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ mb: 4 }} />
      </Box>

      {/* Hero Image */}
      {article.image && (
        <HeroImage
          src={article.image}
          alt={article.title}
          loading="eager"
        />
      )}

      {/* Article Content */}
      <ArticleContent sx={{ mt: 4 }}>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {article.content}
        </ReactMarkdown>
      </ArticleContent>

      {/* Bottom Navigation */}
      <Divider sx={{ mt: 6, mb: 4 }} />
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={() => router.push('/artikel')}
          size="large"
        >
          Lihat Artikel Lainnya
        </Button>
      </Box>
    </Container>
  );
}