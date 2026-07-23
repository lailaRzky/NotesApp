import { ToastProvider } from './context/ToastContext';
import TodoApp from './pages/TodoApp';

function App() {
  return (
    <ToastProvider>
      <TodoApp />
    </ToastProvider>
  );
}

export default App;
