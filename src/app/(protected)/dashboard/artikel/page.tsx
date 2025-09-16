'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

import { useAuth } from '@/context/AuthContext';
import { getCategoryColor, getCategoryTextColor } from '@/lib/categories';
import { formatDate } from '@/lib/date';

interface Article {
  id: number;
  title: string;
  slug: string;
  category: 'teknologi' | 'berita' | 'edukasi';
  published: boolean;
  createdAt: string;
  updatedAt: string;
  authorName?: string;
}

export default function ArticleManagementPage() {
  const router = useRouter();
  const { token } = useAuth();
  const [articles, setArticles] = React.useState<Article[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [totalCount, setTotalCount] = React.useState(0);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [categoryFilter, setCategoryFilter] = React.useState('all');
  const [statusFilter, setStatusFilter] = React.useState('all');
  const [deleteDialog, setDeleteDialog] = React.useState<{
    open: boolean;
    article: Article | null;
  }>({ open: false, article: null });

  const fetchArticles = React.useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: String(page + 1),
        limit: String(rowsPerPage),
        ...(searchQuery && { search: searchQuery }),
        ...(categoryFilter !== 'all' && { category: categoryFilter }),
        ...(statusFilter !== 'all' && { published: statusFilter }),
      });

      const response = await fetch(`/api/admin/articles?${params}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setArticles(data.articles || []);
        setTotalCount(data.pagination?.total || 0);
      }
    } catch (error) {
      console.error('Error fetching articles:', error);
      // Use mock data for now since API is not implemented yet
      const mockArticles: Article[] = [
        {
          id: 1,
          title: 'Panduan Lengkap Haji 2024',
          slug: 'panduan-lengkap-haji-2024',
          category: 'edukasi',
          published: true,
          createdAt: '2024-01-15T10:00:00Z',
          updatedAt: '2024-01-15T10:00:00Z',
          authorName: 'Admin',
        },
        {
          id: 2,
          title: 'Tips Memilih Paket Umrah',
          slug: 'tips-memilih-paket-umrah',
          category: 'edukasi',
          published: true,
          createdAt: '2024-01-14T09:00:00Z',
          updatedAt: '2024-01-14T09:00:00Z',
          authorName: 'Admin',
        },
        {
          id: 3,
          title: 'Teknologi dalam Ibadah Haji',
          slug: 'teknologi-dalam-ibadah-haji',
          category: 'teknologi',
          published: false,
          createdAt: '2024-01-13T08:00:00Z',
          updatedAt: '2024-01-13T08:00:00Z',
          authorName: 'Admin',
        },
        {
          id: 4,
          title: 'Berita Terbaru Kuota Haji',
          slug: 'berita-terbaru-kuota-haji',
          category: 'berita',
          published: true,
          createdAt: '2024-01-12T07:00:00Z',
          updatedAt: '2024-01-12T07:00:00Z',
          authorName: 'Admin',
        },
      ];
      setArticles(mockArticles);
      setTotalCount(mockArticles.length);
    } finally {
      setLoading(false);
    }
  }, [page, rowsPerPage, searchQuery, categoryFilter, statusFilter, token]);

  React.useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleEdit = (article: Article) => {
    router.push(`/dashboard/artikel/${article.id}`);
  };

  const handleDelete = (article: Article) => {
    setDeleteDialog({ open: true, article });
  };

  const confirmDelete = async () => {
    if (!deleteDialog.article) return;

    try {
      const response = await fetch(`/api/admin/articles/${deleteDialog.article.id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        fetchArticles();
      }
    } catch (error) {
      console.error('Error deleting article:', error);
    } finally {
      setDeleteDialog({ open: false, article: null });
    }
  };


  return (
    <Box>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" sx={{ fontWeight: 600 }}>
          Article Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => router.push('/dashboard/artikel/new')}
        >
          Create New Article
        </Button>
      </Box>

      <Card sx={{ mb: 3, p: 2 }}>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <FormControl sx={{ minWidth: 300 }}>
            <OutlinedInput
              size="small"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              startAdornment={
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              }
            />
          </FormControl>
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Category</InputLabel>
            <Select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              label="Category"
            >
              <MenuItem value="all">All Categories</MenuItem>
              <MenuItem value="teknologi">Teknologi</MenuItem>
              <MenuItem value="berita">Berita</MenuItem>
              <MenuItem value="edukasi">Edukasi</MenuItem>
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              label="Status"
            >
              <MenuItem value="all">All Status</MenuItem>
              <MenuItem value="true">Published</MenuItem>
              <MenuItem value="false">Draft</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Card>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Author</TableCell>
              <TableCell>Created</TableCell>
              <TableCell>Updated</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {articles.map((article) => (
              <TableRow key={article.id} hover>
                <TableCell>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {article.title}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    /{article.slug}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    label={article.category}
                    size="small"
                    sx={{
                      backgroundColor: getCategoryColor(article.category),
                      color: getCategoryTextColor(article.category),
                      fontWeight: 500
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={article.published ? 'Published' : 'Draft'}
                    size="small"
                    color={article.published ? 'success' : 'default'}
                    variant={article.published ? 'filled' : 'outlined'}
                  />
                </TableCell>
                <TableCell>{article.authorName || 'Unknown'}</TableCell>
                <TableCell>{formatDate(article.createdAt)}</TableCell>
                <TableCell>{formatDate(article.updatedAt)}</TableCell>
                <TableCell align="right">
                  <IconButton
                    size="small"
                    onClick={() => handleEdit(article)}
                    color="primary"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => handleDelete(article)}
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {articles.length === 0 && !loading && (
              <TableRow>
                <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
                  <Typography color="text.secondary">No articles found</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={totalCount}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>

      <Dialog open={deleteDialog.open} onClose={() => setDeleteDialog({ open: false, article: null })}>
        <DialogTitle>Delete Article</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete &quot;{deleteDialog.article?.title}&quot;? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialog({ open: false, article: null })}>Cancel</Button>
          <Button onClick={confirmDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}