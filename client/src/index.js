import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './assets/main.css';
import * as serviceWorker from './serviceWorker';
import axios from 'axios';
import ScrollToTop from './components/ScrollToTop';
import 'typeface-poppins';

axios.get('/api/auth/loggedin').then((response) => {
  ReactDOM.render(
    <BrowserRouter>
      <App user={response.data} />
      <ScrollToTop />
    </BrowserRouter>,
    document.getElementById('root')
  );
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
