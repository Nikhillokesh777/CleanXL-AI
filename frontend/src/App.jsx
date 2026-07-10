import { BrowserRouter } from 'react-router-dom';
import { UploadProvider } from './context/UploadContext';
import { ThemeProvider } from './context/ThemeContext';
import AppRoutes from './routes/AppRoutes';
import { ToastContainer } from './components/common/Toast';
import { useToast } from './hooks/useToast';

const AppInner = () => {
  const { toasts, removeToast } = useToast();
  return (
    <>
      <AppRoutes />
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </>
  );
};

const App = () => (
  <BrowserRouter>
    <ThemeProvider>
      <UploadProvider>
        <AppInner />
      </UploadProvider>
    </ThemeProvider>
  </BrowserRouter>
);

export default App;
