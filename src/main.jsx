import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from '@/router/router';
import { Reset } from 'styled-reset';
import './main.css';
import './assets/fonts/font.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <Reset />
    <RouterProvider router={router} />
  </>
);
