import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

// Estilos globales divididos por responsabilidad (es más fácil de mantener).
import './styles/base.css';
import './styles/layout.css';
import './styles/sections.css';
import './styles/studio.css';
import './styles/responsive.css';

/**
 * Punto de entrada de React.
 * StrictMode ayuda a detectar errores durante el desarrollo.
 */
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
