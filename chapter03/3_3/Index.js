import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// index.js
import { AuthProvider } from "react-oidc-context";

const cognitoAuthConfig = {
  authority: "https://cognito-idp.us-east-1.amazonaws.com/us-east-1_cIjTqmVhq",
  client_id: "4gm4m86r2s175hqqsvp8es1fgc",
  redirect_uri: "https://fluffy-tribble-6vggp6xvx4r35vrg-3000.app.github.dev/",
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