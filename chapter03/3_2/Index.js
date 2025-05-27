import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// index.js
import { AuthProvider } from "react-oidc-context";

const cognitoAuthConfig = {
  authority: "<< user-pool-issuer >>",
  client_id: "<< client-id >>",
  redirect_uri: "<< redirect-url >>",
  response_type: "code",
  scope: "email openid phone",
};

const root = ReactDOM.createRoot(document.getElementById("root"));

// wrap the application with AuthProvider
root.render(
  <React.StrictMode>
    <AuthProvider {...cognitoAuthConfig}>
      <App />
    </AuthProvider>
  </React.StrictMode>
);