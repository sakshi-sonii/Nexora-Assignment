import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

// Ensure window.process exists for libraries that reference process in the browser.
// Use @ts-ignore to avoid TypeScript complaints while keeping the code valid JS.
// @ts-ignore
if (!window.process) {
  // @ts-ignore
  window.process = { env: {} };
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);