import { useEffect, useState } from 'react';

const CATEGORY_OPTIONS = [
  { value: 'pribadi', label: 'Pribadi' },
  { value: 'kuliah', label: 'Kuliah' },
  { value: 'kerja', label: 'Kerja' },
  { value: 'lainnya', label: 'Lainnya' },
];

const COLOR_OPTIONS = ['#ffffff', '#fff3b0', '#c8f7c5', '#c5d9f7', '#f7c5d9', '#e0d4f7'];

const emptyForm = {
  title: '',
  content: '',
  category: 'lainnya',
  color: '#ffffff',
};


function NoteForm({ initialNote, onSubmit, onCancel, saving }) {
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (initialNote) {
      setForm({
        title: initialNote.title ?? '',
        content: initialNote.content ?? '',
        category: initialNote.category ?? 'lainnya',
        color: initialNote.color ?? '#ffffff',
      });
    } else {
      setForm(emptyForm);
    }
  }, [initialNote]);

  const update = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    onSubmit(form);
  };

  return (
    <form className="note-form" onSubmit={handleSubmit}>
      <div className="field">
        <label>Judul</label>
        <input
          type="text"
          value={form.title}
          onChange={update('title')}
          placeholder="Judul catatan..."
          required
          autoFocus
        />
      </div>

      <div className="field">
        <label>Isi Catatan</label>
        <textarea
          rows="4"
          value={form.content}
          onChange={update('content')}
          placeholder="Tulis isi catatan di sini (opsional)..."
        />
      </div>

      <div className="field-row">
        <div className="field">
          <label>Kategori</label>
          <select value={form.category} onChange={update('category')}>
            {CATEGORY_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <div className="field">
          <label>Warna</label>
          <div className="color-swatches">
            {COLOR_OPTIONS.map((c) => (
              <button
                type="button"
                key={c}
                className={`swatch ${form.color === c ? 'swatch--active' : ''}`}
                style={{ backgroundColor: c }}
                onClick={() => setForm((prev) => ({ ...prev, color: c }))}
                aria-label={`Pilih warna ${c}`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn--primary" disabled={saving}>
          {saving ? 'Menyimpan...' : initialNote ? 'Simpan Perubahan' : 'Simpan Catatan'}
        </button>
        <button type="button" className="btn btn--muted" onClick={onCancel}>
          Batal
        </button>
      </div>
    </form>
  );
}

export default NoteForm;
