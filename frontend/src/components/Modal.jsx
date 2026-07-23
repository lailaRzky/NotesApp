function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div style={styles.header}>
          <h3 style={styles.title}>{title}</h3>
          <button onClick={onClose} style={styles.closeButton} aria-label="Tutup">
            ✕
          </button>
        </div>
        <div style={styles.body}>{children}</div>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: 'fixed',
    inset: 0,
    backgroundColor: 'rgba(0,0,0,0.45)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    zIndex: 900,
  },
  modal: {
    backgroundColor: '#fff',
    borderRadius: '10px',
    width: '100%',
    maxWidth: '480px',
    maxHeight: '90vh',
    overflowY: 'auto',
    boxShadow: '0 8px 30px rgba(0,0,0,0.25)',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 20px',
    borderBottom: '1px solid #eee',
  },
  title: {
    margin: 0,
    fontSize: '18px',
  },
  closeButton: {
    border: 'none',
    background: 'none',
    fontSize: '18px',
    cursor: 'pointer',
    color: '#666',
    lineHeight: 1,
    padding: '4px',
  },
  body: {
    padding: '20px',
  },
};

export default Modal;
