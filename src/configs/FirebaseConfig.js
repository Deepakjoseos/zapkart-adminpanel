let FirebaseConfig = {}

// FirebaseConfig = {

//   apiKey: 'AIzaSyBUdVQKSYiMrWXKZLhpcR4pmtIUFa-40w0',
//   authDomain: 'zapkartnew2022-dc8a8.firebaseapp.com',
//   projectId: 'zapkartnew2022-dc8a8',
//   storageBucket: 'zapkartnew2022-dc8a8.appspot.com',
//   messagingSenderId: '812753080859',
//   appId: '1:812753080859:web:63d1a2c52ff2a2a5161ebe',

//   // apiKey: 'AIzaSyDE96sBpGy5JJKHNwTHP3OuUSChRCIgH_U',
//   // authDomain: 'ecommerce-74b71.firebaseapp.com',
//   // projectId: 'ecommerce-74b71',
//   // storageBucket: 'ecommerce-74b71.appspot.com',
//   // messagingSenderId: '1031062435017',
//   // appId: '1:1031062435017:web:d6b5ac03cd40d344480918',
// }
if(process.env.REACT_APP_SITE_NAME === 'athathy') {
  FirebaseConfig = {
    apiKey: "AIzaSyDIQXZ_KL265rV0hgSvYH1f5EQo010Lnjo",
    authDomain: "athathy-13dd6.firebaseapp.com",
    projectId: "athathy-13dd6",
    storageBucket: "athathy-13dd6.appspot.com",
    messagingSenderId: "295619267638",
    appId: "1:295619267638:web:5bb8523b198a33959bdc97"
  }
} else {
  switch (process.env.NODE_ENV) {
    case 'development':
      FirebaseConfig = {
        apiKey: 'AIzaSyBUdVQKSYiMrWXKZLhpcR4pmtIUFa-40w0',
        authDomain: 'zapkartnew2022-dc8a8.firebaseapp.com',
        projectId: 'zapkartnew2022-dc8a8',
        storageBucket: 'zapkartnew2022-dc8a8.appspot.com',
        messagingSenderId: '812753080859',
        appId: '1:812753080859:web:63d1a2c52ff2a2a5161ebe',
      }
      break
    case 'production':
      FirebaseConfig = {
        apiKey: 'AIzaSyDE96sBpGy5JJKHNwTHP3OuUSChRCIgH_U',
        authDomain: 'ecommerce-74b71.firebaseapp.com',
        projectId: 'ecommerce-74b71',
        storageBucket: 'ecommerce-74b71.appspot.com',
        messagingSenderId: '1031062435017',
        appId: '1:1031062435017:web:d6b5ac03cd40d344480918',
      }
      break
    case 'test':
      FirebaseConfig = {
        apiKey: 'AIzaSyBUdVQKSYiMrWXKZLhpcR4pmtIUFa-40w0',
        authDomain: 'zapkartnew2022-dc8a8.firebaseapp.com',
        projectId: 'zapkartnew2022-dc8a8',
        storageBucket: 'zapkartnew2022-dc8a8.appspot.com',
        messagingSenderId: '812753080859',
        appId: '1:812753080859:web:63d1a2c52ff2a2a5161ebe',
      }
      break
    default:
      break
  }
}



export default FirebaseConfig
