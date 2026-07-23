function Modal({ open, title, onClose, children }) {
  if (!open) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="modal-box__header">
          <h3>{title}</h3>
          <button className="icon-btn" onClick={onClose} aria-label="Tutup">
            ✕
          </button>
        </div>
        <div className="modal-box__body">{children}</div>
      </div>
    </div>
  );
}

export default Modal;
