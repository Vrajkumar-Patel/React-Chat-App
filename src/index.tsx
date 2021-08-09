import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "emoji-mart/css/emoji-mart.css";
import { Provider } from "react-redux";
import stores from "./redux/store";
import { Toaster } from "react-hot-toast";
import "./index.css";

ReactDOM.render(
  <Provider store={stores}>
    <Toaster position="top-right" />
    <App />
  </Provider>,
  document.getElementById("root")
);
