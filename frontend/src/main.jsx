import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { AppThemeProvider } from './context/ThemeContext';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import './styles/overrides.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <AppThemeProvider>
          <App />
        </AppThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);


