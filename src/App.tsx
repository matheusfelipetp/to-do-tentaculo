import { Header } from '@/components/Header';
import { BrowserRouter } from 'react-router-dom';
import { Router } from './routes';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Router />
    </BrowserRouter>
  );
}

export default App;
