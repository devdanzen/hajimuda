'use client';

import * as React from 'react';

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { useAuth } from '@/context/AuthContext';
import { generateSlug } from '@/lib/articles';

interface Category {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  color: string | null;
  textColor: string | null;
  displayOrder: number | null;
}

type FormState = {
  name: string;
  slug: string;
  description: string;
  color: string;
  textColor: string;
  displayOrder: string;
};

const COLOR_PRESETS = [
  '#E3F2FD', '#FFEBEE', '#FFF9C4', '#E8F5E9', '#F3E5F5', '#FFF3E0',
  '#1565C0', '#C62828', '#F57C00', '#2E7D32', '#6A1B9A', '#EF6C00',
  '#FFFFFF', '#F5F5F5', '#9E9E9E', '#424242', '#212121', '#000000',
];

function ColorField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  const safeValue = /^#[0-9a-fA-F]{6}$/.test(value) ? value : '#ffffff';
  return (
    <Box sx={{ flex: 1 }}>
      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
        {label}
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Box
          component="input"
          type="color"
          value={safeValue}
          onChange={e => onChange(e.target.value.toUpperCase())}
          sx={{
            width: 44,
            height: 36,
            padding: 0,
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 1,
            cursor: 'pointer',
            background: 'transparent',
          }}
        />
        <Box
          sx={{
            flex: 1,
            px: 1,
            py: 0.75,
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 1,
            fontFamily: 'monospace',
            fontSize: 14,
            color: value ? 'text.primary' : 'text.secondary',
          }}
        >
          {value || 'Belum dipilih'}
        </Box>
        {value && (
          <Button size="small" onClick={() => onChange('')}>Hapus</Button>
        )}
      </Box>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 1 }}>
        {COLOR_PRESETS.map(c => (
          <Box
            key={c}
            onClick={() => onChange(c)}
            role="button"
            aria-label={c}
            sx={{
              width: 20,
              height: 20,
              borderRadius: '50%',
              backgroundColor: c,
              border: '1px solid',
              borderColor: value.toUpperCase() === c.toUpperCase() ? 'primary.main' : 'divider',
              cursor: 'pointer',
              boxShadow: value.toUpperCase() === c.toUpperCase() ? '0 0 0 2px rgba(25,118,210,0.3)' : 'none',
            }}
          />
        ))}
      </Box>
    </Box>
  );
}

const emptyForm: FormState = {
  name: '',
  slug: '',
  description: '',
  color: '',
  textColor: '',
  displayOrder: '',
};

export default function CategoryManagementPage() {
  const { token } = useAuth();
  const [rows, setRows] = React.useState<Category[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState('');

  const [editorOpen, setEditorOpen] = React.useState(false);
  const [editing, setEditing] = React.useState<Category | null>(null);
  const [form, setForm] = React.useState<FormState>(emptyForm);
  const [slugDirty, setSlugDirty] = React.useState(false);
  const [saving, setSaving] = React.useState(false);

  const [deleteTarget, setDeleteTarget] = React.useState<Category | null>(null);
  const [deleting, setDeleting] = React.useState(false);

  const fetchCategories = React.useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/categories', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || 'Gagal memuat kategori');
        return;
      }
      const data = await res.json();
      setRows(data.categories || []);
      setError('');
    } catch (_e) {
      setError('Gagal memuat kategori');
    } finally {
      setLoading(false);
    }
  }, [token]);

  React.useEffect(() => {
    if (token) fetchCategories();
  }, [token, fetchCategories]);

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setSlugDirty(false);
    setEditorOpen(true);
  };

  const openEdit = (c: Category) => {
    setEditing(c);
    setForm({
      name: c.name,
      slug: c.slug,
      description: c.description ?? '',
      color: c.color ?? '',
      textColor: c.textColor ?? '',
      displayOrder: c.displayOrder != null ? String(c.displayOrder) : '',
    });
    setSlugDirty(true);
    setEditorOpen(true);
  };

  const handleNameChange = (name: string) => {
    setForm(prev => ({
      ...prev,
      name,
      slug: slugDirty ? prev.slug : generateSlug(name),
    }));
  };

  const handleSlugChange = (slug: string) => {
    setSlugDirty(true);
    setForm(prev => ({ ...prev, slug }));
  };

  const handleSave = async () => {
    setSaving(true);
    setError('');
    try {
      const payload = {
        name: form.name.trim(),
        slug: form.slug.trim() || generateSlug(form.name),
        description: form.description.trim() || null,
        color: form.color.trim() || null,
        textColor: form.textColor.trim() || null,
        displayOrder: form.displayOrder.trim() === '' ? null : Number(form.displayOrder),
      };

      const url = editing ? `/api/admin/categories/${editing.id}` : '/api/admin/categories';
      const method = editing ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || 'Gagal menyimpan');
        return;
      }
      setEditorOpen(false);
      await fetchCategories();
    } finally {
      setSaving(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    setError('');
    try {
      const res = await fetch(`/api/admin/categories/${deleteTarget.id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || 'Gagal menghapus');
        return;
      }
      setDeleteTarget(null);
      await fetchCategories();
    } finally {
      setDeleting(false);
    }
  };

  return (
    <Box>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" sx={{ fontWeight: 600 }}>
          Manajemen Kategori
        </Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={openCreate}>
          Kategori Baru
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError('')}>
          {error}
        </Alert>
      )}

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nama</TableCell>
              <TableCell>Slug</TableCell>
              <TableCell>Pratinjau</TableCell>
              <TableCell>Urutan</TableCell>
              <TableCell align="right">Aksi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(c => (
              <TableRow key={c.id} hover>
                <TableCell>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>{c.name}</Typography>
                  {c.description && (
                    <Typography variant="caption" color="text.secondary">
                      {c.description}
                    </Typography>
                  )}
                </TableCell>
                <TableCell>{c.slug}</TableCell>
                <TableCell>
                  <Chip
                    label={c.name}
                    size="small"
                    sx={{
                      backgroundColor: c.color || '#F5F5F5',
                      color: c.textColor || '#616161',
                      fontWeight: 500,
                    }}
                  />
                </TableCell>
                <TableCell>{c.displayOrder ?? '—'}</TableCell>
                <TableCell align="right">
                  <IconButton size="small" color="primary" onClick={() => openEdit(c)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton size="small" color="error" onClick={() => setDeleteTarget(c)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {!loading && rows.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
                  <Typography color="text.secondary">Belum ada kategori</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={editorOpen} onClose={() => setEditorOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>{editing ? 'Edit Kategori' : 'Kategori Baru'}</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              label="Nama"
              value={form.name}
              onChange={e => handleNameChange(e.target.value)}
              required
              fullWidth
            />
            <TextField
              label="Slug"
              value={form.slug}
              onChange={e => handleSlugChange(e.target.value)}
              helperText="Identifier ramah URL; harus unik"
              required
              fullWidth
            />
            <TextField
              label="Deskripsi"
              value={form.description}
              onChange={e => setForm({ ...form, description: e.target.value })}
              fullWidth
              multiline
              rows={2}
            />
            <Stack direction="row" spacing={2}>
              <ColorField
                label="Warna Latar"
                value={form.color}
                onChange={value => setForm({ ...form, color: value })}
              />
              <ColorField
                label="Warna Teks"
                value={form.textColor}
                onChange={value => setForm({ ...form, textColor: value })}
              />
            </Stack>
            <TextField
              label="Urutan Tampil"
              value={form.displayOrder}
              onChange={e => setForm({ ...form, displayOrder: e.target.value.replace(/[^0-9-]/g, '') })}
              helperText="Angka lebih kecil muncul lebih dulu"
              fullWidth
            />
            <Box>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
                Pratinjau
              </Typography>
              <Chip
                label={form.name || 'Pratinjau'}
                size="small"
                sx={{
                  backgroundColor: form.color || '#F5F5F5',
                  color: form.textColor || '#616161',
                  fontWeight: 500,
                }}
              />
            </Box>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditorOpen(false)} disabled={saving}>Batal</Button>
          <Button
            variant="contained"
            onClick={handleSave}
            disabled={saving || !form.name.trim()}
          >
            {saving ? 'Menyimpan…' : 'Simpan'}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={!!deleteTarget} onClose={() => setDeleteTarget(null)}>
        <DialogTitle>Hapus Kategori</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Hapus &quot;{deleteTarget?.name}&quot;? Kategori yang sedang digunakan artikel tidak dapat dihapus.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteTarget(null)} disabled={deleting}>Batal</Button>
          <Button color="error" variant="contained" onClick={handleConfirmDelete} disabled={deleting}>
            {deleting ? 'Menghapus…' : 'Hapus'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
