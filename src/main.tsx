import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/app/App.jsx";
import "./index.css";
import Modal from "react-modal";

Modal.setAppElement("#root");

const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error("Root element not found!");
}
