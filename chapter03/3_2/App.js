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
  const signOutRedirect = () => {
    auth.removeUser();

    const clientId = "4gm4m86r2s175hqqsvp8es1fgc";
    const logoutUri = "https://fluffy-tribble-6vggp6xvx4r35vrg-3000.app.github.dev/";
    const cognitoDomain = "https://us-east-1cijtqmvhq.auth.us-east-1.amazoncognito.com";
    window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;
  };

  if (auth.isLoading) {
    return <div>Loading...</div>;
  }

  if (auth.error) {
    return <div>Encountering error... {auth.error.message}</div>;
  }

  if (auth.isAuthenticated) {
    return (
      <div>
        <div style={{ height: '200px' }}>
          <pre> Hello: {auth.user?.profile.email} </pre>
          <pre> ID Token: {auth.user?.id_token} </pre>
          <pre> Access Token: {auth.user?.access_token} </pre>
          <pre> Refresh Token: {auth.user?.refresh_token} </pre>

          <button onClick={() => signOutRedirect()}>Sign out</button>
        </div>
        Response results:
        <div style={{ backgroundColor: 'lightgrey' }} dangerouslySetInnerHTML={{ __html: htmlContent }} />
      </div>
    );
  } else {
    return (
      <div>
        <div style={{ height: '200px' }}>
          <button onClick={() => auth.signinRedirect()}>Sign in</button>
        </div>
        Response results:
        <div style={{ backgroundColor: 'lightgrey' }} dangerouslySetInnerHTML={{ __html: htmlContent }} />
      </div>
    );
  }

}

export default App;
