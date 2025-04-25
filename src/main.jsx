import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ReduxProvider } from "./redux/provider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ReduxProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ReduxProvider>
    <ToastContainer position="top-right" autoClose={3000} />
  </React.StrictMode>
);
