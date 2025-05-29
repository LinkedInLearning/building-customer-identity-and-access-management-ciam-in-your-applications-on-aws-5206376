import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// index.js
import { AuthProvider } from "react-oidc-context";

const cognitoAuthConfig = {
  authority: "<<user-pool-issuer>>",
  client_id: "<<app-client-id>>",
  redirect_uri: "<<application-redirect-url>>",
  response_type: "code",
  scope: "email openid phone bookstore/favorite.update",
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