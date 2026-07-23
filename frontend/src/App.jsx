import './styles/app.css';
import { ToastProvider } from './context/ToastContext';
import NotesApp from './pages/NotesApp';

function App() {
  return (
    <ToastProvider>
      <NotesApp />
    </ToastProvider>
  );
}

export default App;
