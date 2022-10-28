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
if (process.env.REACT_APP_SITE_NAME === 'athathy') {
  FirebaseConfig = {
    // apiKey: 'AIzaSyDIQXZ_KL265rV0hgSvYH1f5EQo010Lnjo',
    // authDomain: 'athathy-13dd6.firebaseapp.com',
    // projectId: 'athathy-13dd6',
    // storageBucket: 'athathy-13dd6.appspot.com',
    // messagingSenderId: '295619267638',
    // appId: '1:295619267638:web:5bb8523b198a33959bdc97',
    apiKey: 'AIzaSyBiN2BkR5RlgWKdaRa-psRzFCgPZ265zis',
    authDomain: 'athathy-766b1.firebaseapp.com',
    projectId: 'athathy-766b1',
    storageBucket: 'athathy-766b1.appspot.com',
    messagingSenderId: '685790667408',
    appId: '1:685790667408:web:3b3cd5dd6b24815747ee15',
  }
} else if (process.env.REACT_APP_SITE_NAME === 'awen') {
  FirebaseConfig = {
    apiKey: 'AIzaSyBUdVQKSYiMrWXKZLhpcR4pmtIUFa-40w0',
    authDomain: 'zapkartnew2022-dc8a8.firebaseapp.com',
    projectId: 'zapkartnew2022-dc8a8',
    storageBucket: 'zapkartnew2022-dc8a8.appspot.com',
    messagingSenderId: '812753080859',
    appId: '1:812753080859:web:63d1a2c52ff2a2a5161ebe',
  }
} else {
  switch (process.env.NODE_ENV) {
    case 'development':
      FirebaseConfig = {
        // apiKey: 'AIzaSyBUdVQKSYiMrWXKZLhpcR4pmtIUFa-40w0',
        // authDomain: 'zapkartnew2022-dc8a8.firebaseapp.com',
        // projectId: 'zapkartnew2022-dc8a8',
        // storageBucket: 'zapkartnew2022-dc8a8.appspot.com',
        // messagingSenderId: '812753080859',
        // appId: '1:812753080859:web:63d1a2c52ff2a2a5161ebe',
        apiKey: 'AIzaSyDE96sBpGy5JJKHNwTHP3OuUSChRCIgH_U',
        authDomain: 'ecommerce-74b71.firebaseapp.com',
        projectId: 'ecommerce-74b71',
        storageBucket: 'ecommerce-74b71.appspot.com',
        messagingSenderId: '1031062435017',
        appId: '1:1031062435017:web:d6b5ac03cd40d344480918',
      }
      break
    case 'production':
      FirebaseConfig = {
        apiKey: "AIzaSyDVRszGmdIg-Me-79_x9yuntOdt6Mz2LdM",
        authDomain: "zapkartlive.firebaseapp.com",
        projectId: "zapkartlive",
        storageBucket: "zapkartlive.appspot.com",
        messagingSenderId: "1010821971171",
        appId: "1:1010821971171:web:dcd6a429a1f65cb3ead9d6",
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
