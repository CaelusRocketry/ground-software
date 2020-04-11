import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import { createStore } from "redux";
import { Provider } from "react-redux";
import reducers from "./store/reducers";

import {socketConnection, heartbeatError} from './api';

import * as serviceWorker from "./serviceWorker";

const store = createStore(reducers);
socketConnection(store);
setInterval(() => {console.log(store.getState());}, 1000);
setInterval(() => {heartbeatError(store)} , 5000);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();



