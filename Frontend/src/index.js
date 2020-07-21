import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import store from './store';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,document.getElementById('root'));


//this is the index.js previuos code to control menu
document.getElementById("buttom").addEventListener("click", function() {
  document.querySelector(".sidebar").classList.add("open")
})

document.getElementById("sidebar-close").addEventListener("click", function() {
  document.querySelector(".sidebar").classList.remove("open")
})


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
