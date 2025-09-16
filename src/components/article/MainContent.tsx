'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';

import RssFeedRoundedIcon from '@mui/icons-material/RssFeedRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Chip from '@mui/material/Chip';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import Pagination from '@mui/material/Pagination';
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
  image: string;
  category: string;
  createdAt: string;
  authorName: string;
}

const SyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: 0,
  height: '100%',
  backgroundColor: (theme.vars || theme).palette.background.paper,
  '&:hover': {
    backgroundColor: 'transparent',
    cursor: 'pointer',
  },
  '&:focus-visible': {
    outline: '3px solid',
    outlineColor: 'hsla(210, 98%, 48%, 0.5)',
    outlineOffset: '2px',
  },
}));

const SyledCardContent = styled(CardContent)({
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
  padding: 16,
  flexGrow: 1,
  '&:last-child': {
    paddingBottom: 16,
  },
});

const StyledTypography = styled(Typography)({
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 2,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

function Author({ authorName, created }: { authorName: string; created: string }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        gap: 2,
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px',
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1, alignItems: 'center' }}>
        <Avatar
          sx={{ width: 24, height: 24, fontSize: '0.875rem' }}
        >
          {authorName?.charAt(0) || 'A'}
        </Avatar>
        <Typography variant="caption">{authorName || 'Anonymous'}</Typography>
      </Box>
      <Typography variant="caption">{formatDate(created)}</Typography>
    </Box>
  );
}

export function Search({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return (
    <FormControl sx={{ width: { xs: '100%', md: '25ch' } }} variant="outlined">
      <OutlinedInput
        size="small"
        id="search"
        placeholder="Search…"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        sx={{ flexGrow: 1 }}
        startAdornment={
          <InputAdornment position="start" sx={{ color: 'text.primary' }}>
            <SearchRoundedIcon fontSize="small" />
          </InputAdornment>
        }
        inputProps={{
          'aria-label': 'search',
        }}
      />
    </FormControl>
  );
}

const categories = [
  { value: 'all', label: 'Semua Kategori' },
  { value: 'edukasi', label: 'Edukasi' },
  { value: 'berita', label: 'Berita' },
  { value: 'teknologi', label: 'Teknologi' },
];

export default function MainContent() {
  const [articles, setArticles] = React.useState<Article[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState('all');
  const [page, setPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(1);
  const [focusedCardIndex, setFocusedCardIndex] = React.useState<number | null>(null);
  const router = useRouter();

  const fetchArticles = React.useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '6',
        ...(searchQuery && { search: searchQuery }),
        ...(selectedCategory !== 'all' && { category: selectedCategory }),
      });

      const response = await fetch(`/api/articles?${params}`);
      if (response.ok) {
        const data = await response.json();
        setArticles(data.articles || []);
        setTotalPages(data.pagination?.totalPages || 1);
      } else {
        console.error('Failed to fetch articles');
        setArticles([]);
      }
    } catch (error) {
      console.error('Error fetching articles:', error);
      setArticles([]);
    } finally {
      setLoading(false);
    }
  }, [page, searchQuery, selectedCategory]);

  React.useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  const handleFocus = (index: number) => {
    setFocusedCardIndex(index);
  };

  const handleBlur = () => {
    setFocusedCardIndex(null);
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    setPage(1);
  };

  const handleCardClick = (slug: string) => {
    router.push(`/artikel/${slug}`);
  };

  const handleSearchChange = React.useMemo(
    () => {
      let timeoutId: NodeJS.Timeout;
      return (value: string) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          setSearchQuery(value);
          setPage(1);
        }, 500);
      };
    },
    []
  );


  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <div>
        <Typography variant="h1" gutterBottom>
          Artikel
        </Typography>
        <Typography>Temukan informasi terkini seputar Haji dan Umrah</Typography>
      </div>
      <Box
        sx={{
          display: { xs: 'flex', sm: 'none' },
          flexDirection: 'row',
          gap: 1,
          width: { xs: '100%', md: 'fit-content' },
          overflow: 'auto',
        }}
      >
        <Search value={searchQuery} onChange={handleSearchChange} />
        <IconButton size="small" aria-label="RSS feed">
          <RssFeedRoundedIcon />
        </IconButton>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column-reverse', md: 'row' },
          width: '100%',
          justifyContent: 'space-between',
          alignItems: { xs: 'start', md: 'center' },
          gap: 4,
          overflow: 'auto',
        }}
      >
        <Box
          sx={{
            display: 'inline-flex',
            flexDirection: 'row',
            gap: 3,
            overflow: 'auto',
          }}
        >
          {categories.map((cat) => (
            <Chip
              key={cat.value}
              onClick={() => handleCategoryClick(cat.value)}
              size="medium"
              label={cat.label}
              color={selectedCategory === cat.value ? 'primary' : 'default'}
              sx={{
                backgroundColor: selectedCategory === cat.value ? undefined : 'transparent',
                border: selectedCategory === cat.value ? undefined : 'none',
              }}
            />
          ))}
        </Box>
        <Box
          sx={{
            display: { xs: 'none', sm: 'flex' },
            flexDirection: 'row',
            gap: 1,
            width: { xs: '100%', md: 'fit-content' },
            overflow: 'auto',
          }}
        >
          <Search value={searchQuery} onChange={handleSearchChange} />
          <IconButton size="small" aria-label="RSS feed">
            <RssFeedRoundedIcon />
          </IconButton>
        </Box>
      </Box>

      {loading ? (
        <Grid container spacing={2} columns={12}>
          {[...Array(6)].map((_, index) => (
            <Grid key={index} size={{ xs: 12, md: index < 2 ? 6 : 4 }}>
              <Card variant="outlined">
                <Skeleton variant="rectangular" height={200} />
                <CardContent>
                  <Skeleton width="30%" height={20} sx={{ mb: 1 }} />
                  <Skeleton width="100%" height={30} sx={{ mb: 1 }} />
                  <Skeleton width="100%" height={20} />
                  <Skeleton width="100%" height={20} />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : articles.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary">
            Tidak ada artikel ditemukan
          </Typography>
        </Box>
      ) : (
        <>
          <Grid container spacing={2} columns={12}>
            {articles.map((article, index) => {
              const isLarge = index < 2;
              return (
                <Grid key={article.id} size={{ xs: 12, md: isLarge ? 6 : 4 }}>
                  <SyledCard
                    variant="outlined"
                    onFocus={() => handleFocus(index)}
                    onBlur={handleBlur}
                    onClick={() => handleCardClick(article.slug)}
                    tabIndex={0}
                    className={focusedCardIndex === index ? 'Mui-focused' : ''}
                    sx={{ height: '100%' }}
                  >
                    {article.image && (
                      <CardMedia
                        component="img"
                        alt={article.title}
                        image={article.image}
                        sx={{
                          aspectRatio: '16 / 9',
                          borderBottom: '1px solid',
                          borderColor: 'divider',
                          objectFit: 'cover',
                        }}
                      />
                    )}
                    <SyledCardContent>
                      <Chip
                        label={article.category}
                        size="small"
                        sx={{
                          backgroundColor: getCategoryColor(article.category),
                          color: getCategoryTextColor(article.category),
                          fontWeight: 500
                        }}
                      />
                      <Typography gutterBottom variant="h6" component="div">
                        {article.title}
                      </Typography>
                      <StyledTypography variant="body2" color="text.secondary" gutterBottom>
                        {article.excerpt}
                      </StyledTypography>
                    </SyledCardContent>
                    <Author authorName={article.authorName} created={article.createdAt} />
                  </SyledCard>
                </Grid>
              );
            })}
          </Grid>
          {totalPages > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={(_, value) => setPage(value)}
                color="primary"
                size="large"
              />
            </Box>
          )}
        </>
      )}
    </Box>
  );
}