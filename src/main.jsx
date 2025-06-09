import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './app/store';
import App from './App';
import { registerSPARouting } from './utils/spa-redirect';

// Register SPA routing for GitHub Pages
registerSPARouting();

// Import styles
import './index.css';
import './App.css';

// Configure future flags for React Router v6.4+
const router = {
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true
  }
};

ReactDOM.createRoot(document.getElementById('root')).render(  <React.StrictMode>
    <BrowserRouter basename="/MyPortfolio" {...router}>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
