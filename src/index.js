import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import CSVFILE from './CSVFILE';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <CSVFILE />
  </React.StrictMode>
);
