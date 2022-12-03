import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import firebaseConfig from 'configs/FirebaseConfig'
import { getMessaging, getToken, onMessage } from 'firebase/messaging'

const firebaseApp = firebase.initializeApp(firebaseConfig)

const messaging = firebase.messaging()

// firebase utils
// const db = firebase.firestore()
const auth = firebase.auth()
const currentUser = auth.currentUser
const googleAuthProvider = new firebase.auth.GoogleAuthProvider()
const facebookAuthProvider = new firebase.auth.FacebookAuthProvider()
// const twitterAuthProvider = new firebase.auth.TwitterAuthProvider();
// const githubAuthProvider = new firebase.auth.GithubAuthProvider();

const vapidKey =
  'BIrtcruShLJM1CmUV4z1NPWMxQPkBKTF83rCSN1WgiK-Hii-QAzOQtkxVODBEDD7YFwg3j5guRfffW95eHSbiM8'

const getDeviceToken = (setDeviceToken) => {
  return messaging
    .requestPermission()
    .then(() => {
      return messaging.getToken()
    })
    .then((token) => {
      setDeviceToken(token)
    })
    .catch((err) => {
      setDeviceToken(null)
    })
  // return messaging.getToken().then((currentToken) => {
  //   if (currentToken) {
  //     return currentToken
  //   } else {
  //     console.log('No Instance ID token available. Requesting permission…')
  //     messaging
  //       .requestPermission()
  //       .then(() => {
  //         console.log('Notification permission granted.')
  //         return messaging.getToken()
  //       })
  //       .then((token) => {
  //         return token
  //         // setDeviceToken(token)
  //       })
  //       .catch((err) => {
  //         console.log('Unable to get permission to notify.', err)
  //         return null
  //       })
  //   }
  // })
}

// messaging.onBackgroundMessage(function (payload) {
//   console.log('Received background message ', payload)

//   const notificationTitle = payload.notification.title
//   const notificationOptions = {
//     body: payload.notification.body,
//   }

//   // self.registration.showNotification(notificationTitle, notificationOptions);
// })

// return getToken(messaging, { vapidKey })
//   .then((currentToken) => {
//     if (currentToken) {
//       console.log('current token for client: ', currentToken)
//       return currentToken
//       // Track the token -> client mapping, by sending to backend server
//       // show on the UI that permission is secured
//     } else {
//       console.log(
//         'No registration token available. Request permission to generate one.'
//       )
//       return null
//       // shows on the UI that permission is required
//     }
//   })
//   .catch((err) => {
//     console.log('An error occurred while retrieving token. ', err)
//     return null
//     // catch error while creating client token
//   })
// }

export {
  // db,
  auth,
  currentUser,
  googleAuthProvider,
  facebookAuthProvider,
  messaging,
  getDeviceToken,
  
  //   twitterAuthProvider,
  //   githubAuthProvider,
}
