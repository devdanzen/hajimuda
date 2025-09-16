'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';

import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { getCategoryColor, getCategoryTextColor } from '@/lib/categories';
import { formatDate } from '@/lib/date';

interface Article {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  createdAt: string;
  authorName: string;
}

const StyledTypography = styled(Typography)({
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 2,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

function StickyFooter({ articles }: { articles: Article[] }) {
  const router = useRouter();

  const handleAllArticles = () => {
    router.push('/artikel');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 2,
        pt: 3,
        px: 2,
        width: '100%',
      }}
    >
      <Typography variant="caption">
        Menampilkan {articles.length} artikel terbaru
      </Typography>
      <Typography
        variant="caption"
        onClick={handleAllArticles}
        sx={{
          textDecoration: 'none',
          color: 'primary.main',
          cursor: 'pointer',
          '&:hover': { textDecoration: 'underline' },
        }}
      >
        Lihat semua artikel
        <NavigateNextRoundedIcon
          sx={{
            fontSize: '1rem',
            verticalAlign: 'middle',
          }}
        />
      </Typography>
    </Box>
  );
}

export default function Latest() {
  const [articles, setArticles] = React.useState<Article[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [focusedCardIndex, setFocusedCardIndex] = React.useState<number | null>(null);
  const router = useRouter();

  React.useEffect(() => {
    fetchLatestArticles();
  }, []);

  const fetchLatestArticles = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/articles?limit=4');
      if (response.ok) {
        const data = await response.json();
        setArticles(data.articles || []);
      } else {
        console.error('Failed to fetch latest articles');
        setArticles([]);
      }
    } catch (error) {
      console.error('Error fetching latest articles:', error);
      setArticles([]);
    } finally {
      setLoading(false);
    }
  };

  const handleFocus = (index: number) => {
    setFocusedCardIndex(index);
  };

  const handleBlur = () => {
    setFocusedCardIndex(null);
  };

  const handleClick = (slug: string) => {
    router.push(`/artikel/${slug}`);
  };


  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant="h2" gutterBottom>
        Artikel Terbaru
      </Typography>

      {loading ? (
        <Grid container spacing={2}>
          {[...Array(4)].map((_, index) => (
            <Grid key={index} size={{ xs: 12, sm: 6, lg: 3 }}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1,
                  padding: 2,
                  borderRadius: 1,
                  border: '1px solid',
                  borderColor: 'divider',
                }}
              >
                <Skeleton width="30%" height={20} />
                <Skeleton width="100%" height={30} />
                <Skeleton width="100%" height={20} />
                <Skeleton width="100%" height={20} />
                <Skeleton width="50%" height={20} />
              </Box>
            </Grid>
          ))}
        </Grid>
      ) : articles.length === 0 ? (
        <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
          Belum ada artikel terbaru
        </Typography>
      ) : (
        <>
          <Grid container spacing={2}>
            {articles.map((article, index) => (
              <Grid key={article.id} size={{ xs: 12, sm: 6, lg: 3 }}>
                <Box
                  onClick={() => handleClick(article.slug)}
                  onFocus={() => handleFocus(index)}
                  onBlur={handleBlur}
                  tabIndex={0}
                  className={focusedCardIndex === index ? 'Mui-focused' : ''}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1,
                    padding: 2,
                    borderRadius: 1,
                    border: '1px solid',
                    borderColor: 'divider',
                    cursor: 'pointer',
                    transition: 'all ease 0.3s',
                    '&:hover': {
                      borderColor: 'primary.main',
                      backgroundColor: 'action.hover',
                    },
                    '&.Mui-focused': {
                      outline: '3px solid',
                      outlineColor: 'hsla(210, 98%, 48%, 0.5)',
                      outlineOffset: '2px',
                    },
                  }}
                >
                  <Chip
                    label={article.category}
                    size="small"
                    sx={{
                      backgroundColor: getCategoryColor(article.category),
                      color: getCategoryTextColor(article.category),
                      fontWeight: 500
                    }}
                  />
                  <Typography
                    gutterBottom
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      display: '-webkit-box',
                      WebkitBoxOrient: 'vertical',
                      WebkitLineClamp: 2,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      minHeight: '3em',
                    }}
                  >
                    {article.title}
                  </Typography>
                  <StyledTypography variant="body2" color="text.secondary" gutterBottom>
                    {article.excerpt}
                  </StyledTypography>
                  <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, pt: 2 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1, alignItems: 'center' }}>
                      <Avatar
                        sx={{ width: 20, height: 20, fontSize: '0.75rem' }}
                      >
                        {article.authorName?.charAt(0) || 'A'}
                      </Avatar>
                      <Typography variant="caption">{article.authorName || 'Admin'}</Typography>
                    </Box>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                      {formatDate(article.createdAt)}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
          <StickyFooter articles={articles} />
        </>
      )}
    </Box>
  );
}