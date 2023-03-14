import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'; //install option 1
//import StyledFirebaseAuth from './StyledFirebaseAuth'; //install option 2

import { getAuth, EmailAuthProvider, GoogleAuthProvider } from 'firebase/auth'
const firebaseUIConfig = {
    signInOptions: [ //array of sign in options supported//array can include just "Provider IDs", or objects with the IDs and options
      GoogleAuthProvider.PROVIDER_ID,
      { provider: EmailAuthProvider.PROVIDER_ID, requiredDisplayName: true },],
    signInFlow: 'popup', //don't redirect to authenticate
    credentialHelper: 'none', //don't show the email account chooser
    callbacks: { //"lifecycle" callbacks
      signInSuccessWithAuthResult: () => {
        return false; //don't redirect after authentication
      }
    }
  }

export default function LoginPage(props){
    return (
        <div>
          <div className="post-content">
            <StyledFirebaseAuth uiConfig={firebaseUIConfig} firebaseAuth={getAuth()} />
          </div>
        </div>
     );
}