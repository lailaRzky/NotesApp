import { useState, useEffect, useCallback } from 'react';
import api from '../api/axiosInstance';
import Modal from '../components/Modal';
import TodoForm from '../components/TodoForm';
import TodoItem from '../components/TodoItem';
import { useToast } from '../context/ToastContext';

function TodoApp() {
  const { showToast } = useToast();

  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all'); 

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null); 
  const [submitting, setSubmitting] = useState(false);

 
  const fetchTodos = useCallback(async (currentFilter = filter) => {
    try {
      setLoading(true);
      setError(null);
      const params = {};
      if (currentFilter === 'active') params.completed = 'false';
      if (currentFilter === 'completed') params.completed = 'true';

      const response = await api.get('/api/v1/todos', { params });
      setTodos(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Gagal mengambil data todo');
    } finally {
      setLoading(false);
    }
   
  }, []);

  useEffect(() => {
    fetchTodos(filter);
  }, [filter, fetchTodos]);

  const openAddModal = () => {
    setEditingTodo(null);
    setIsModalOpen(true);
  };

  const openEditModal = (todo) => {
    setEditingTodo(todo);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingTodo(null);
  };


  const handleCreate = async (formData) => {
    try {
      setSubmitting(true);
      await api.post('/api/v1/todos', formData);
      showToast('Todo berhasil ditambahkan', 'success');
      closeModal();
      await fetchTodos(filter);
    } catch (err) {
      showToast(err.response?.data?.message || 'Gagal menambah todo', 'error');
    } finally {
      setSubmitting(false);
    }
  };


  const handleUpdate = async (formData) => {
    try {
      setSubmitting(true);
      await api.put(`/api/v1/todos/${editingTodo.id}`, formData);
      showToast('Todo berhasil diperbarui', 'success');
      closeModal();
      await fetchTodos(filter); 
    } catch (err) {
      showToast(err.response?.data?.message || 'Gagal mengupdate todo', 'error');
    } finally {
      setSubmitting(false);
    }
  };

 
  const handleToggle = async (id, currentStatus) => {
    try {
      setLoading(true);
      await api.put(`/api/v1/todos/${id}`, { completed: !currentStatus });
      showToast(
        !currentStatus ? 'Todo ditandai selesai' : 'Todo ditandai belum selesai',
        'success',
      );
      await fetchTodos(filter); 
    } catch (err) {
      showToast(err.response?.data?.message || 'Gagal mengubah status todo', 'error');
    } finally {
      setLoading(false);
    }
  };


  const handleDelete = async (id) => {
    if (!confirm('Yakin ingin menghapus todo ini?')) return;
    try {
      setLoading(true);
      await api.delete(`/api/v1/todos/${id}`);
      showToast('Todo berhasil dihapus', 'success');
      await fetchTodos(filter); 
    } catch (err) {
      showToast(err.response?.data?.message || 'Gagal menghapus todo', 'error');
    } finally {
      setLoading(false);
    }
  };

  const totalTodos = todos.length;
  const completedTodos = todos.filter((t) => t.completed).length;
  const activeTodos = totalTodos - completedTodos;

  
  if (error && !loading) {
    return (
      <div style={styles.container}>
        <div style={styles.errorContainer}>
          <h2>Error</h2>
          <p>{error}</p>
          <button onClick={() => fetchTodos(filter)} style={styles.retryButton}>
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.h1}>Todo App</h1>
        <button onClick={openAddModal} style={styles.addButton}>
          Tambah
        </button>
      </div>

      <div style={styles.stats}>
        <span>Total: {totalTodos}</span>
        <span>Selesai: {completedTodos}</span>
        <span>Aktif: {activeTodos}</span>
      </div>

      <div style={styles.filterContainer}>
        <button
          onClick={() => setFilter('all')}
          style={filter === 'all' ? styles.activeFilter : styles.filter}
        >
          Semua
        </button>
        <button
          onClick={() => setFilter('active')}
          style={filter === 'active' ? styles.activeFilter : styles.filter}
        >
          Aktif
        </button>
        <button
          onClick={() => setFilter('completed')}
          style={filter === 'completed' ? styles.activeFilter : styles.filter}
        >
          Selesai
        </button>
      </div>

     
      {loading && todos.length === 0 ? (
        <div style={styles.loadingContainer}>
          <div style={styles.spinner}></div>
          <p>Loading todos</p>
        </div>
      ) : todos.length === 0 ? (
        <p style={styles.emptyMessage}>
          {filter === 'all'
            ? 'Belum ada todo. Klik "Tambah" untuk mulai!'
            : 'Tidak ada todo dengan filter ini.'}
        </p>
      ) : (
        <div>
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={handleToggle}
              onEdit={openEditModal}
              onDelete={handleDelete}
              loading={loading}
            />
          ))}
        </div>
      )}

      
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={editingTodo ? 'Edit' : 'Tambah'}
      >
        <TodoForm
          key={editingTodo?.id || 'create'}
          initialData={editingTodo}
          onSubmit={editingTodo ? handleUpdate : handleCreate}
          onCancel={closeModal}
          loading={submitting}
        />
      </Modal>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '12px',
    marginBottom: '10px',
  },
  h1: {
    margin: 0,
    fontSize: '22px',
  },
  addButton: {
    padding: '10px 18px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '15px',
    whiteSpace: 'nowrap',
  },
  stats: {
    display: 'flex',
    gap: '20px',
    flexWrap: 'wrap',
    padding: '10px 15px',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    marginBottom: '15px',
    fontSize: '14px',
  },
  filterContainer: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px',
    flexWrap: 'wrap',
  },
  filter: {
    padding: '8px 16px',
    backgroundColor: '#e9ecef',
    border: 'none',
    borderRadius: '20px',
    cursor: 'pointer',
  },
  activeFilter: {
    padding: '8px 16px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '20px',
    cursor: 'pointer',
  },
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px',
  },
  spinner: {
    width: '40px',
    height: '40px',
    border: '4px solid #f3f3f3',
    borderTop: '4px solid #007bff',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
  emptyMessage: {
    textAlign: 'center',
    padding: '40px',
    color: '#888',
    fontSize: '16px',
  },
  errorContainer: {
    textAlign: 'center',
    padding: '40px',
  },
  retryButton: {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  @media (max-width: 480px) {
    body { font-size: 15px; }
  }
`;
document.head.appendChild(styleSheet);

export default TodoApp;
