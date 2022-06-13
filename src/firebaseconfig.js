// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: 'AIzaSyDIFWVIkU4KLEgp1y_TTiB5uyXy8JFjWdA',
//   authDomain: 'test-auth-d7ae8.firebaseapp.com',
//   projectId: 'test-auth-d7ae8',
//   storageBucket: 'test-auth-d7ae8.appspot.com',
//   messagingSenderId: '678158957225',
//   appId: '1:678158957225:web:f91d62d77cdfd582d487b8',
// }

const firebaseConfig = {
  apiKey: 'AIzaSyBUdVQKSYiMrWXKZLhpcR4pmtIUFa-40w0',
  authDomain: 'zapkartnew2022-dc8a8.firebaseapp.com',
  projectId: 'zapkartnew2022-dc8a8',
  storageBucket: 'zapkartnew2022-dc8a8.appspot.com',
  messagingSenderId: '812753080859',
  appId: '1:812753080859:web:63d1a2c52ff2a2a5161ebe',
}

// Initialize Firebase
const intializeFirebase = initializeApp(firebaseConfig)

export const authentication = getAuth(intializeFirebase)

export default intializeFirebase
