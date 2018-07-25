import './polyfill'
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AppContainer from './App';

import { Provider } from 'react-redux';  
import { store } from './redux';
// disable ServiceWorker
// import registerServiceWorker from './registerServiceWorker';
ReactDOM.render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  document.getElementById('root')
);
// disable ServiceWorker
// registerServiceWorker();
