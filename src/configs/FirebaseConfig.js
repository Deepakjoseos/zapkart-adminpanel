let FirebaseConfig = {}

// FirebaseConfig = {
//   // apiKey: 'AIzaSyAOWoRQGoegkmwnCca7B2GG5GUG_ZP1lcM',
//   // authDomain: 'emilus.firebaseapp.com',
//   // databaseURL: 'https://emilus.firebaseio.com',
//   // projectId: 'emilus',
//   // storageBucket: 'emilus.appspot.com',
//   // messagingSenderId: '807555350717',
//   // appId: '1:807555350717:web:145ba7c21af47203a2f7d4',
//   // measurementId: 'G-8KE7HJB252'

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

export default FirebaseConfig
