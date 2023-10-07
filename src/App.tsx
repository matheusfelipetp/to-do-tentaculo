import { Header } from '@/components/Header';
import { ConfigProvider } from 'antd';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TaskProvider } from './contexts/TaskContext';
import { Router } from './routes';
import { themeConfig } from './styles/theme';

function App() {
  return (
    <BrowserRouter>
      <TaskProvider>
        <ConfigProvider theme={themeConfig}>
          <Header />
          <Router />
        </ConfigProvider>
      </TaskProvider>

      <ToastContainer
        position="top-center"
        autoClose={1500}
        closeOnClick
        pauseOnHover={false}
        theme="dark"
      />
    </BrowserRouter>
  );
}

export default App;
