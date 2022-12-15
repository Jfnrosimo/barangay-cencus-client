import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

//Import context
import { OccupantsContextProvider } from "./context/OccupantsContext";
import { AuthContextProvider } from "./context/AuthContext";

//Import routing
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter basename="/">
      <AuthContextProvider>
        <OccupantsContextProvider>
          <App />
        </OccupantsContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
