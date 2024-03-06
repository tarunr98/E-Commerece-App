// import React from 'react';
// import Amplify from 'aws-amplify';
// import { AmplifyAuthenticator } from '@aws-amplify/ui-react';
// import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
// import awsconfig from '../../aws-exports';
// import LoginPage from './LoginPage';

// Amplify.configure(awsconfig);

// const AuthStateApp = (props) => {
//     const [authState, setAuthState] = React.useState();
//     const [user, setUser] = React.useState();

//     React.useEffect(() => {
//         return onAuthUIStateChange((nextAuthState, authData) => {
//             setAuthState(nextAuthState);
//             setUser(authData)
//         });
        
//     }, []);
// // user&&user.signInUserSession&&user.signInUserSession.idToken?
// //         console.log(authState,user.signInUserSession.idToken.jwtToken,user):console.log("No details found!");
// if(user&&user.signInUserSession&&user.signInUserSession.idToken){
// var userData = {
//   signInUserSession : user.signInUserSession,
//   username : user.username,
// }
// }
//   return authState === AuthState.SignedIn && user ? (
//       <div className="App">
          
//           <div>
//               <LoginPage
//                 user = {userData}
//                 authState = {authState}
//             />
//           </div>
//       </div>
//     ) : (
//       <AmplifyAuthenticator />
//   );
// }
// export default AuthStateApp;