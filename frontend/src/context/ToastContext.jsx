import { createContext, useCallback, useContext, useState } from 'react';

const ToastContext = createContext(null);

let idCounter = 0;

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  
  const showToast = useCallback(
    (message, type = 'success', duration = 3000) => {
      const id = ++idCounter;
      setToasts((prev) => [...prev, { id, message, type }]);
      setTimeout(() => removeToast(id), duration);
    },
    [removeToast],
  );

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div style={styles.container}>
        {toasts.map((toast) => (
          <div key={toast.id} style={{ ...styles.toast, ...typeStyles[toast.type] }}>
            {typeIcons[toast.type]} {toast.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}

const typeIcons = {
  success: '',
  error: '',
  info: 'ℹ',
};

const typeStyles = {
  success: { backgroundColor: '#28a745' },
  error: { backgroundColor: '#dc3545' },
  info: { backgroundColor: '#17a2b8' },
};

const styles = {
  container: {
    position: 'fixed',
    top: '20px',
    right: '20px',
    zIndex: 1000,
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    maxWidth: 'min(90vw, 340px)',
  },
  toast: {
    color: 'white',
    padding: '12px 16px',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
    fontSize: '14px',
    animation: 'toast-in 0.25s ease-out',
  },
};

// Tambahkan animasi masuk untuk toast
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes toast-in {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
`;
document.head.appendChild(styleSheet);
