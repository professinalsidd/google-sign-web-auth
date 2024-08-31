import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { GoogleOAuthProvider } from "@react-oauth/google";

const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

if (!CLIENT_ID) {
  throw new Error("Missing Google client ID in environment variables.");
}

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <GoogleOAuthProvider clientId={CLIENT_ID}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </GoogleOAuthProvider>
);
