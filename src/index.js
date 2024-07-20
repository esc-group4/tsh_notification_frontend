import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// SDK deprecated version will be called because of current version's unsupported MIME type  
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // React.StrictMode removed so that SDK only inititalises once
  <>
    <App />
    <div>Please download this site as an app! Turn on your browser notifications to receive notifications from me :D</div>
  </>
);

reportWebVitals();
