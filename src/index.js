import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// if MIME type is not the expected application/json, somehow SDK worker is not found. you need to provide exact scope.
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // React.StrictMode removed so that SDK only inititalises once
  <>
    <App />
  </>
);

reportWebVitals();
