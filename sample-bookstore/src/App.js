import './App.css';
import React, { useState } from 'react';
// App.js

import { useAuth } from "react-oidc-context";

import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-providers";

function App() {
  const [htmlContent, setHtmlContent] = useState('');
  const updateHtml = (newContent) => {
    setHtmlContent('<pre>' + newContent + '</pre>');
  };

  const auth = useAuth();
  const apiInvokeUrl = 'https://1quiur394a.execute-api.us-east-1.amazonaws.com/prod';

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

  /**
   * registerPassKeyRedirect is an authenticated function that allows end-user tp
   * register PassKey by redirecting to Cognito passkeys/add endpoint
   */
  const registerPasskeyRedirect = () => {
    const clientId = "4gm4m86r2s175hqqsvp8es1fgc";
    const redirectUri = "https://fluffy-tribble-6vggp6xvx4r35vrg-3000.app.github.dev/";
    const cognitoDomain = "https://us-east-1cijtqmvhq.auth.us-east-1.amazoncognito.com";
    window.location.href = `${cognitoDomain}/passkeys/add?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}`;
  };

  /**
   * callListBooks is a function that invokes REST API simulating an un-authenticated action
   */
  const callListBooks = () => {
    fetch(apiInvokeUrl + '/listBooks', {
      method: "GET" // default, so we can ignore
    }).then((response) => response.json())
      .then((data) => {
        console.log(data);
        updateHtml(JSON.stringify(data, null, 2));
      });

  };

  /**
   * callAddToFavorite is a function that invokes REST API simulating an authenticated action
   */
  const callAddToFavorite = () => {
    fetch(apiInvokeUrl + '/addToFavorite', {
      method: "GET", // default, so we can ignore
      headers: {
        'Authorization': `Bearer ${auth.user.access_token}`,
        //'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then((response) => response.json())
      .then((data) => {
        console.log(data);
        updateHtml(JSON.stringify(data, null, 2));
      });

  };

  /**
   * callReadBook is a function that invokes REST API simulating an authenticated action
   */
  const callReadBook = () => {
    fetch(apiInvokeUrl + '/readBook', {
      method: "GET", // default, so we can ignore
      headers: {
        'Authorization': `Bearer ${auth.user.access_token}`,
        //'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then((response) => response.json())
      .then((data) => {
        console.log(data);
        updateHtml(JSON.stringify(data, null, 2));
      });

  };

  /**
   * readSampleChapter is a function that reads file from AWS S3
   */
  const Region = 'us-east-1';
  const UserPoolID = 'us-east-1_cIjTqmVhq';
  const IdentityPoolID = 'us-east-1:cf6eeb46-fa9b-4c95-9b8c-3c75e9fc62d4';
  const BucketName = 'bookstore-0001';
  const ObjectKey = 'isbn-001/sample-chapter.txt';

  const readSampleChapter = () => {
    const s3client = new S3Client({
      region: Region,
      credentials: fromCognitoIdentityPool({
        clientConfig: { region: Region },
        identityPoolId: IdentityPoolID,
        logins: { [`cognito-idp.${Region}.amazonaws.com/${UserPoolID}`]: auth.user.id_token }
      }),
    });

    const command = new GetObjectCommand({
      Bucket: BucketName,
      Key: ObjectKey
    });
    s3client.send(command)
      .then(async response => {
        console.log('S3 GetObject:', JSON.stringify(response));
        const str = await response.Body.transformToString();
        updateHtml(str);
      }).catch((err) => {
        console.error('S3 GetObject Error:', err);
        updateHtml(err);
      });

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
          <button onClick={() => callListBooks()}>List books</button>
          <button onClick={() => callAddToFavorite()}>Add to Favorite</button>
          <button onClick={() => readSampleChapter()}>Read sample chapter</button>
          <button onClick={() => callReadBook()}>Read book</button>
        </div>
        <div style={{ backgroundColor: 'white' }} dangerouslySetInnerHTML={{ __html: htmlContent }} />
      </div>
    );
  } else {
    return (

      <div class="w3-twothird w3-container">
        <div>
          <button onClick={() => auth.signinRedirect()}>Sign in</button>
          <button onClick={() => callListBooks()}>List books</button>
        </div>
        <div style={{ backgroundColor: 'lightgrey' }} dangerouslySetInnerHTML={{ __html: htmlContent }} />
      </div>
    );
  }

}

export default App;
