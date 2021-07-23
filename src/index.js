import React from 'react';
import ReactDOM from 'react-dom';
import './assets/scss/styles.scss';
import reportWebVitals from './reportWebVitals';
import { JournalApp } from './JournalApp';

ReactDOM.render(
  <React.StrictMode>
    <JournalApp />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
