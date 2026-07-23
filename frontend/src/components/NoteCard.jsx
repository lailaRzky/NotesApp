const CATEGORY_LABELS = {
  pribadi: 'Pribadi',
  kuliah: 'Kuliah',
  kerja: 'Kerja',
  lainnya: 'Lainnya',
};

function NoteCard({ note, onTogglePin, onEdit, onDelete, busy }) {
  return (
    <div className="note-card" style={{ backgroundColor: note.color || '#ffffff' }}>
      <div className="note-card__top">
        <h4 className="note-card__title">{note.title}</h4>
        <button
          className={`pin-btn ${note.isPinned ? 'pin-btn--active' : ''}`}
          onClick={() => onTogglePin(note.id)}
          disabled={busy}
          title={note.isPinned ? 'Lepas pin' : 'Pin catatan ini'}
        >
        
        </button>
      </div>

      {note.content && <p className="note-card__content">{note.content}</p>}

      <div className="note-card__meta">
        <span className="tag">{CATEGORY_LABELS[note.category] || note.category}</span>
        <span className="note-card__date">
          {new Date(note.updatedAt).toLocaleDateString('id-ID', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
          })}
        </span>
      </div>

      <div className="note-card__actions">
        <button className="btn btn--small btn--warning" onClick={() => onEdit(note)} disabled={busy}>
          Edit
        </button>
        <button
          className="btn btn--small btn--danger"
          onClick={() => onDelete(note.id)}
          disabled={busy}
        >
          Hapus
        </button>
      </div>
    </div>
  );
}

export default NoteCard;
