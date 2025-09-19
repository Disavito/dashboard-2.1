import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ThemeProvider } from './components/ui-custom/theme-provider.tsx';
import { UserProvider } from './context/UserContext.tsx';
import { BrowserRouter as Router } from 'react-router-dom'; // Import BrowserRouter

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <UserProvider>
        <Router> {/* Wrap App with Router */}
          <App />
        </Router>
      </UserProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
