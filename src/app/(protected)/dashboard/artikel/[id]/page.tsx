'use client';

import * as React from 'react';
import { use } from 'react';
import { useRouter } from 'next/navigation';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SaveIcon from '@mui/icons-material/Save';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CircularProgress from '@mui/material/CircularProgress';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { useAuth } from '@/context/AuthContext';
import { generateSlug } from '@/lib/articles';

export default function EditArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { token } = useAuth();
  const resolvedParams = use(params);
  const articleId = resolvedParams.id;

  const [loading, setLoading] = React.useState(true);
  const [saving, setSaving] = React.useState(false);
  const [error, setError] = React.useState('');
  const [categories, setCategories] = React.useState<{ id: number; name: string; slug: string }[]>([]);
  const [formData, setFormData] = React.useState({
    title: '',
    slug: '',
    category: '',
    image: '',
    content: '',
    published: true,
  });

  React.useEffect(() => {
    fetch('/api/categories')
      .then(r => (r.ok ? r.json() : { categories: [] }))
      .then(data => setCategories(data.categories || []))
      .catch(() => {});
  }, []);

  const fetchArticle = React.useCallback(async () => {
    try {
      const response = await fetch(`/api/admin/articles/${articleId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setFormData({
          title: data.article.title || '',
          slug: data.article.slug || '',
          category: data.article.category || '',
          image: data.article.image || '',
          content: data.article.content || '',
          published: data.article.published ?? true,
        });
      } else {
        setError('Gagal memuat artikel');
      }
    } catch (_err) {
      setError('Terjadi kesalahan saat memuat artikel');
    } finally {
      setLoading(false);
    }
  }, [articleId, token]);

  React.useEffect(() => {
    fetchArticle();
  }, [fetchArticle]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSaving(true);

    try {
      const response = await fetch(`/api/admin/articles/${articleId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        router.push('/dashboard/artikel');
      } else {
        setError(data.error || 'Gagal memperbarui artikel');
      }
    } catch (_err) {
      setError('Terjadi kesalahan saat memperbarui artikel');
    } finally {
      setSaving(false);
    }
  };

  const handleTitleChange = (title: string) => {
    setFormData({
      ...formData,
      title,
      slug: generateSlug(title)
    });
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => router.back()}
          variant="outlined"
        >
          Kembali
        </Button>
        <Typography variant="h4" sx={{ fontWeight: 600 }}>
          Edit Artikel
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError('')}>
          {error}
        </Alert>
      )}

      <Card>
        <CardContent>
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Judul"
              value={formData.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              required
              sx={{ mb: 3 }}
            />

            <TextField
              fullWidth
              label="Slug"
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              helperText="Versi judul yang ramah URL"
              sx={{ mb: 3 }}
            />

            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel>Kategori</InputLabel>
              <Select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                label="Kategori"
                required
              >
                {categories.map(c => (
                  <MenuItem key={c.id} value={c.slug}>{c.name}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <Box sx={{ mb: 3 }}>
              <TextField
                fullWidth
                label="URL Gambar Sampul"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                helperText="Masukkan URL gambar sampul"
              />
              {formData.image && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                    Pratinjau Gambar:
                  </Typography>
                  <Box
                    component="img"
                    src={formData.image}
                    alt="Cover image preview"
                    sx={{
                      width: '100%',
                      maxWidth: '400px',
                      height: 'auto',
                      borderRadius: 2,
                      border: '1px solid',
                      borderColor: 'divider',
                    }}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                </Box>
              )}
            </Box>

            <TextField
              fullWidth
              label="Konten"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              multiline
              rows={15}
              helperText="Anda dapat menggunakan format Markdown"
              sx={{ mb: 3 }}
            />

            <FormControlLabel
              control={
                <Switch
                  checked={formData.published}
                  onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                />
              }
              label="Dipublikasikan (hilangkan centang untuk menyimpan sebagai draf)"
              sx={{ mb: 4 }}
            />

            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                type="submit"
                variant="contained"
                startIcon={<SaveIcon />}
                disabled={saving}
                size="large"
              >
                {saving ? 'Menyimpan...' : 'Simpan Perubahan'}
              </Button>
              <Button
                variant="outlined"
                onClick={() => router.back()}
                disabled={saving}
                size="large"
              >
                Batal
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}