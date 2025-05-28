import './App.css';
import React, { useState } from 'react';
// App.js

import { useAuth } from "react-oidc-context";

function App() {
  const [htmlContent, setHtmlContent] = useState('');
  const updateHtml = (newContent) => {
    setHtmlContent('<pre>' + newContent + '</pre>');
  };

  const auth = useAuth();

  /**
   * signOutRedirect function called from signOut button and it redirects the user
   * to application's landing page after calling Cognito logout endpoint to end session
  **/
  const clientId = "<< client-id >>";
  const logoutUri = "<< logout-url >>";
  const cognitoDomain = "<< https://user-pool-domain >>";
  const redirectUri = "<< redirect-url >>";

  const signOutRedirect = () => {
    auth.removeUser();
    window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;
  };

  /**
   * registerPassKeyRedirect is an authenticated function that allows end-user tp
   * register PassKey by redirecting to Cognito passkeys/add endpoint
   */
  const registerPasskeyRedirect = () => {
    window.location.href = `${cognitoDomain}/passkeys/add?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}`;
  };

  if (auth.isLoading) {
    return <div>Loading...</div>;
  }

  if (auth.error) {
    return <div>Encountering error... {auth.error.message}</div>;
  }

  if (auth.isAuthenticated) {
    return (
      <div class="w3-twothird w3-container">
        <div>
          <button onClick={() => signOutRedirect()}>Sign out</button>
          <button onClick={() => registerPasskeyRedirect()}>Register Passkey</button>
          <pre> Hello: {auth.user?.profile.email} </pre>
          <pre> <b>ID Token:</b> {auth.user?.id_token} </pre>
          <pre> <b>Access Token:</b> {auth.user?.access_token} </pre>
          <pre> <b>Refresh Token:</b> {auth.user?.refresh_token} </pre>
          <br></br>
          <h3>Bookstore actions:</h3>
        </div>
        <div style={{ backgroundColor: 'lightgrey' }} dangerouslySetInnerHTML={{ __html: htmlContent }} />
      </div>
    );
  } else {
    return (
      <div class="w3-twothird w3-container">
        <div>
          <button onClick={() => auth.signinRedirect()}>Sign in</button>
        </div>
        <div style={{ backgroundColor: 'lightgrey' }} dangerouslySetInnerHTML={{ __html: htmlContent }} />
      </div>
    );
  }

}

export default App;
