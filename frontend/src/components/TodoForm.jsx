import { useState, useEffect } from 'react';

const initialFormState = {
  title: '',
  description: '',
  priority: 'low',
  dueDate: '',
};


function TodoForm({ initialData, onSubmit, onCancel, loading }) {
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title ?? '',
        description: initialData.description ?? '',
        priority: initialData.priority ?? 'low',
        dueDate: initialData.dueDate ?? '',
      });
    } else {
      setFormData(initialFormState);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      return;
    }
    const payload = { ...formData };
    if (!payload.dueDate) delete payload.dueDate;
    onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <div style={styles.formGroup}>
        <label style={styles.label}>Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Masukkan judul todo"
          style={styles.input}
          required
          autoFocus
        />
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Masukkan deskripsi (opsional)..."
          style={styles.textarea}
          rows="3"
        />
      </div>

      <div style={styles.grid}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Priority</label>
          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            style={styles.select}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Due Date</label>
          <input
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            style={styles.input}
          />
        </div>
      </div>

      <div style={styles.buttonGroup}>
        <button type="submit" disabled={loading} style={styles.submitButton}>
          {loading ? 'Menyimpan...' : initialData ? 'Update' : 'Tambah'}
        </button>
        <button type="button" onClick={onCancel} style={styles.cancelButton}>
          Batal
        </button>
      </div>
    </form>
  );
}

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '15px',
  },
  formGroup: {
    marginBottom: '15px',
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  label: {
    fontWeight: '600',
    fontSize: '14px',
  },
  input: {
    width: '100%',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    fontSize: '16px',
    boxSizing: 'border-box',
  },
  textarea: {
    width: '100%',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    fontSize: '16px',
    fontFamily: 'inherit',
    boxSizing: 'border-box',
  },
  select: {
    width: '100%',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    fontSize: '16px',
    boxSizing: 'border-box',
  },
  buttonGroup: {
    display: 'flex',
    gap: '10px',
    marginTop: '6px',
  },
  submitButton: {
    flex: 1,
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  cancelButton: {
    flex: 1,
    padding: '10px 20px',
    backgroundColor: '#6c757d',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
  },
};

export default TodoForm;
