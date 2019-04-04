import './polyfill'
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import store from './Store/Store';
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(
   <Provider store={store}>
      <App />
   </Provider>
   , document.getElementById('root'));
// disable ServiceWorker
registerServiceWorker();
