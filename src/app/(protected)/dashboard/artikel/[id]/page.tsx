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
  const [formData, setFormData] = React.useState({
    title: '',
    slug: '',
    category: 'teknologi' as 'teknologi' | 'berita' | 'edukasi',
    image: '',
    content: '',
    published: true,
  });

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
          category: data.article.category || 'teknologi',
          image: data.article.image || '',
          content: data.article.content || '',
          published: data.article.published ?? true,
        });
      } else {
        setError('Failed to load article');
      }
    } catch (_err) {
      setError('An error occurred while loading the article');
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
        setError(data.error || 'Failed to update article');
      }
    } catch (_err) {
      setError('An error occurred while updating the article');
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
          Back
        </Button>
        <Typography variant="h4" sx={{ fontWeight: 600 }}>
          Edit Article
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
              label="Title"
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
              helperText="URL-friendly version of the title"
              sx={{ mb: 3 }}
            />

            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel>Category</InputLabel>
              <Select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                label="Category"
                required
              >
                <MenuItem value="teknologi">Teknologi</MenuItem>
                <MenuItem value="berita">Berita</MenuItem>
                <MenuItem value="edukasi">Edukasi</MenuItem>
              </Select>
            </FormControl>

            <Box sx={{ mb: 3 }}>
              <TextField
                fullWidth
                label="Cover Image URL"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                helperText="Enter the URL of the cover image"
              />
              {formData.image && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                    Image Preview:
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
              label="Content"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              multiline
              rows={15}
              helperText="You can use Markdown formatting"
              sx={{ mb: 3 }}
            />

            <FormControlLabel
              control={
                <Switch
                  checked={formData.published}
                  onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                />
              }
              label="Published (uncheck to save as draft)"
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
                {saving ? 'Saving...' : 'Save Changes'}
              </Button>
              <Button
                variant="outlined"
                onClick={() => router.back()}
                disabled={saving}
                size="large"
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}