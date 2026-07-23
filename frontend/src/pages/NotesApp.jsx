import { useCallback, useEffect, useState } from 'react';
import api from '../api/axiosInstance';
import Modal from '../components/Modal';
import NoteForm from '../components/NoteForm';
import NoteCard from '../components/NoteCard';
import { useToast } from '../context/ToastContext';

const CATEGORY_TABS = [
  { value: 'semua', label: 'Semua' },
  { value: 'pribadi', label: 'Pribadi' },
  { value: 'kuliah', label: 'Kuliah' },
  { value: 'kerja', label: 'Kerja' },
  { value: 'lainnya', label: 'Lainnya' },
];

function NotesApp() {
  const { notify } = useToast();

  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState('semua');
  const [search, setSearch] = useState('');

  const [modalOpen, setModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null); 
  const [saving, setSaving] = useState(false);
  const [busyId, setBusyId] = useState(null);

 
  const loadNotes = useCallback(async (cat, term) => {
    try {
      setLoading(true);
      setError(null);
      const params = {};
      if (cat && cat !== 'semua') params.category = cat;
      if (term) params.search = term;

      const res = await api.get('/api/notes', { params });
      setNotes(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Gagal memuat catatan dari server');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => loadNotes(category, search), 300);
    return () => clearTimeout(timeout);
  }, [category, search, loadNotes]);

  const openCreateModal = () => {
    setEditingNote(null);
    setModalOpen(true);
  };

  const openEditModal = (note) => {
    setEditingNote(note);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingNote(null);
  };

 
  const handleCreate = async (payload) => {
    try {
      setSaving(true);
      await api.post('/api/notes', payload);
      notify('Catatan berhasil ditambahkan', 'success');
      closeModal();
      await loadNotes(category, search);
    } catch (err) {
      notify(err.response?.data?.message || 'Gagal menambah catatan', 'error');
    } finally {
      setSaving(false);
    }
  };


  const handleUpdate = async (payload) => {
    try {
      setSaving(true);
      await api.patch(`/api/notes/${editingNote.id}`, payload);
      notify('Catatan berhasil diperbarui', 'success');
      closeModal();
      await loadNotes(category, search);
    } catch (err) {
      notify(err.response?.data?.message || 'Gagal memperbarui catatan', 'error');
    } finally {
      setSaving(false);
    }
  };


  const handleTogglePin = async (id) => {
    try {
      setBusyId(id);
      await api.patch(`/api/notes/${id}/pin`);
      await loadNotes(category, search);
    } catch (err) {
      notify(err.response?.data?.message || 'Gagal mengubah status pin', 'error');
    } finally {
      setBusyId(null);
    }
  };


  const handleDelete = async (id) => {
    if (!window.confirm('Yakin ingin menghapus catatan ini? Tindakan ini tidak bisa dibatalkan.')) {
      return;
    }
    try {
      setBusyId(id);
      await api.delete(`/api/notes/${id}`);
      notify('Catatan berhasil dihapus', 'success');
      await loadNotes(category, search);
    } catch (err) {
      notify(err.response?.data?.message || 'Gagal menghapus catatan', 'error');
    } finally {
      setBusyId(null);
    }
  };

  const pinnedCount = notes.filter((n) => n.isPinned).length;

  if (error && !loading) {
    return (
      <div className="page">
        <div className="state-box state-box--error">
          <h2>Terjadi Kesalahan</h2>
          <p>{error}</p>
          <button className="btn btn--primary" onClick={() => loadNotes(category, search)}>
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <header className="page-header">
        <h1>Notes App</h1>
        <button className="btn btn--primary" onClick={openCreateModal}>
          Catatan Baru
        </button>
      </header>

      <div className="toolbar">
        <input
          type="search"
          className="search-input"
          placeholder="Cari judul catatan..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="stats">
          <span>{notes.length} catatan</span>
          <span>{pinnedCount} dipin</span>
        </div>
      </div>

      <nav className="tabs">
        {CATEGORY_TABS.map((tab) => (
          <button
            key={tab.value}
            className={`tab ${category === tab.value ? 'tab--active' : ''}`}
            onClick={() => setCategory(tab.value)}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {loading && notes.length === 0 ? (
        <div className="state-box">
          <div className="spinner" />
          <p>Memuat catatan...</p>
        </div>
      ) : notes.length === 0 ? (
        <p className="empty-state">
          {search
            ? `Tidak ada catatan yang cocok dengan "${search}".`
            : 'Belum ada catatan. Klik "Catatan Baru"'}
        </p>
      ) : (
        <div className="note-grid">
          {notes.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              onTogglePin={handleTogglePin}
              onEdit={openEditModal}
              onDelete={handleDelete}
              busy={busyId === note.id}
            />
          ))}
        </div>
      )}

      <Modal
        open={modalOpen}
        onClose={closeModal}
        title={editingNote ? 'Edit Catatan' : 'Catatan Baru'}
      >
        <NoteForm
          key={editingNote?.id ?? 'new'}
          initialNote={editingNote}
          onSubmit={editingNote ? handleUpdate : handleCreate}
          onCancel={closeModal}
          saving={saving}
        />
      </Modal>
    </div>
  );
}

export default NotesApp;
