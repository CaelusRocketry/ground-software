import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import { createStore } from "redux";
import { Provider } from "react-redux";
import reducers from "./store/reducers";

import { createSocketIoCallbacks, updateHeartbeatStatus } from "./api";

import * as serviceWorker from "./serviceWorker";
import { updateCountdown } from "./store/actions";

const store = createStore(reducers);
createSocketIoCallbacks(store);

setInterval(() => {
  updateHeartbeatStatus(store);
}, 5000);

export function countDownStart() {
  const { general } = store.getState().data;
  const countDownInterval = setInterval(() => {
    if (general.countdown > 0) {
      store.dispatch(updateCountdown());
    } else {
      clearInterval(countDownInterval);
    }
  }, 1000);
}

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
