import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom'; // Changed to HashRouter for GitHub Pages
import { Provider } from 'react-redux';
import store from './app/store';
import App from './App';

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

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter {...router}>
      <Provider store={store}>
        <App />
      </Provider>
    </HashRouter>
  </React.StrictMode>
);
