import React from "react";
import ReactDOM from 'react-dom/client';
import App from "./App";
import { MemoryRouter } from "react-router-dom"; //hide detail url from address bar

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <MemoryRouter>
      <App />
    </MemoryRouter>
  </React.StrictMode>,
);
