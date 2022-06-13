/* eslint-disable consistent-return */
/* eslint-disable no-shadow */
/* eslint-disable func-names */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-unused-vars */
/* eslint-disable no-debugger */
import { all, takeEvery, put, call, takeLatest } from 'redux-saga/effects'
import { notification } from 'antd'
import {
  loginSocial,
  logoutJwt,
  // mockLoadCurrentAct,
  // mockLogin,
  login1,
  currentAccountJwt,
  // , currentAccount, login, logout,
} from 'services/user'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { getLeftMenuDataSeller, getLeftMenuData, getTopMenuData } from 'services/menu'
import * as constants from '_constants'
import { store as reduxStore } from 'index'
import { authentication } from 'firebaseconfig'
import actions from './actions'

// TODO Later decruction
const loginFB = async (email, password) => {
  try {
    const result = await signInWithEmailAndPassword(authentication, email, password)
    // setLoading(false)

    const { user } = result
    const idTokenResult = await user.getIdTokenResult(true)
    localStorage.setItem('token', idTokenResult.token)
    const userType = idTokenResult.claims.userType
    console.log('userType', userType)
    // if (userType === 'adminUser') {
    return { userType, ...user }
    // }
  } catch (err) {
    notification.error({ message: 'Cannot login', description: err.message })
  }
  return null
}

export function* LOGIN({ payload }) {
  const { email, password } = payload
  yield put({
    type: 'user/SET_STATE',
    payload: {
      loading: true,
    },
  })
  // login1

  const success = yield call(loginFB, email, password)
  console.log(success, 'showww-fb')

  // if (success) {
  //   console.log('SHOWW-DATA')
  //   const userData = yield call(currentAccountJwt)
  // }
  // if (success) {
  // }

  // debugger
  if (success) {
    notification.success({
      message: constants.LOGIN_SUCCESS,
      description: constants.LOGIN_SUCCESS_MESSAGE,
    })
    yield call(LOAD_CURRENT_ACCOUNT)
    yield put({
      type: 'user/SET_STATE',
      payload: {
        loading: false,
      },
    })
    // yield put({
    //   type: 'user/LOAD_CURRENT_ACCOUNT',
    //   payload: {
    //     user: success,
    //   },
    // })
  }
  yield put({
    type: 'user/SET_STATE',
    payload: {
      loading: false,
    },
  })
}

export function* LOGIN_SOCIAL({ payload }) {
  console.log('in social login ')
  console.log(payload)
  yield put({
    type: 'user/SET_STATE',
    payload: {
      loading: true,
    },
  })
  const {
    name,
    email,
    imageUrl: avatar,

    accessToken,
  } = payload
  const response = yield call(loginSocial, email, accessToken)

  if (response) {
    console.log(response)
    notification.success({
      message: constants.LOGIN_SUCCESS,
      description: constants.LOGIN_SUCCESS_MESSAGE,
    })
    const { userId: id, role, phone } = response
    yield put({
      type: 'user/SET_STATE',
      payload: {
        id,
        email,
        role,
        name,
        phone,
        avatar,
        authorized: true,
      },
    })
    yield put({
      type: 'user/LOAD_CURRENT_ACCOUNT',
    })
  }
}

export function* GET_MENU_DATA(role) {
  console.log(role, 'plss')
  // debugger
  let menuLeftData
  // TODO: Change with auth
  if (role === 'Admin') {
    menuLeftData = yield call(getLeftMenuData)
  } else {
    menuLeftData = yield call(getLeftMenuDataSeller)
  }
  // const menuLeftData = yield call(getLeftMenuData)

  const menuTopData = yield call(getTopMenuData)
  yield put({
    type: 'menu/SET_STATE',
    payload: {
      menuLeftData,
      menuTopData,
    },
  })
}

export const LOAD_FB_USER = new Promise(function (myResolve, myReject) {
  // "Producing Code" (May take some time)
  authentication.onAuthStateChanged(function (user) {
    if (user) {
      myResolve(user)
    }
  })
  // when successful
  // myReject('err') // when error
})

// const LOAD_FB_USER = new Promise((resolve, reject) => {
//   authentication.onAuthStateChanged(function (user) {
//     if (user) {
//       resolve(user)
//     }
//   })
// })

// export async function LOAD_FB_USER() {

// }

export function* LOAD_CURRENT_ACCOUNT() {
  // yield put({
  //   type: 'user/SET_STATE',
  //   payload: {
  //     loading: false,
  //   },
  // })
  try {
    const user = yield LOAD_FB_USER
    if (user) {
      yield put({
        type: 'user/SET_STATE',
        payload: {
          loading: true,
        },
      })
      let token
      let userType
      user.getIdTokenResult().then((res) => {
        localStorage.setItem('token', res.token)
        userType = res.claims.userType
        if (res.claims.userType !== 'Admin') {
          reduxStore.dispatch({
            type: 'user/LOGOUT',
          })
        }
        // console.log(res.token, 'tokenn')
      })

      // Extract user userType here
      const userData = yield currentAccountJwt()
      // const userData = yield currentAccountJwt()

      if (userData) {
        yield put({
          type: actions.SET_STATE,
          payload: {
            // ...user,
            loading: false,
            token,
            id: userData?.id,
            email: userData.email,
            role: userType,
            name: userData.fullName,
            phone: userData.phone,
            authorized: true,
          },
        })
        yield GET_MENU_DATA(userType)
        yield put({
          type: 'user/SET_STATE',
          payload: {
            loading: false,
          },
        })
      } else {
        yield GET_MENU_DATA()
        yield put({
          type: 'user/SET_STATE',
          payload: {
            loading: false,
          },
        })
      }
      // authentication.onAuthStateChanged(async function (user) {
      // function* heyy() {
      //   yield put({
      //     type: 'user/SET_STATE',
      //     payload: {
      //       loading: true,
      //     },
      //   })
      //   if (user) {
      //     console.log('pleaseee', user)
      //     let token
      //     user.getIdTokenResult(true).then((res) => {
      //       localStorage.setItem('token', res.token)
      //       // console.log(res.token, 'tokenn')
      //     })

      //     // Extract user userType here
      //     const userData = yield currentAccountJwt()
      //     // const userData = yield currentAccountJwt()

      //     console.log(userData, 'minee')

      //     if (userData) {
      //       yield put({
      //         type: actions.SET_STATE,
      //         payload: {
      //           // ...user,
      //           loading: false,
      //           token,
      //           id: user?.id,
      //           email: user.email,
      //           role: 'adminUser',
      //           name: user.fullName,
      //           phone: user.phone,
      //           authorized: true,
      //         },
      //       })
      //       yield GET_MENU_DATA(user.user_type.name)
      //     } else {
      //       yield GET_MENU_DATA()
      //     }
      //   }
      // }

      // const wswswe = heyy()
      // wswswe.next()
      // wswswe.next()
      // })

      // const data = yield call(currentAccountJwt)
      // if (data) {
      //   const { user } = data
      //   yield put({
      //     type: actions.SET_STATE,
      //     payload: {
      //       ...user,
      //       loading: false,
      //       token: data.token,
      //       id: user.id,
      //       email: user.email,
      //       role: user.user_type.name,
      //       name: user.name || user.user_type.name,
      //       phone: user.phone,
      //       authorized: true,
      //     },
      //   })
      //   yield GET_MENU_DATA(user.user_type.name)
      // } else {
      //   // TODO: Change with auth
      //   yield GET_MENU_DATA()
      //   // yield put({
      //   //   type: 'user/SET_STATE',
      //   //   payload: {
      //   //     authorized: false,
      //   //   },
      //   // })
    } else {
      yield put({
        type: 'user/SET_STATE',
        payload: {
          loading: false,
        },
      })
    }
  } catch (err) {
    yield put({
      type: 'user/SET_STATE',
      payload: {
        loading: false,
      },
    })
  }

  // console.log(userr, 'xhgk')

  // if (user) {
  //   yield put({
  //     type: 'user/SET_STATE',
  //     payload: {
  //       loading: true,
  //     },
  //   })
  //   console.log('pleaseee', user)
  //   let token
  //   let userType
  //   user.getIdTokenResult().then((res) => {
  //     localStorage.setItem('token', res.token)
  //     userType = res.claims.userType
  //     if (res.claims.userType !== 'Admin') {
  //       reduxStore.dispatch({
  //         type: 'user/LOGOUT',
  //       })
  //     }
  //     // console.log(res.token, 'tokenn')
  //   })

  //   // Extract user userType here
  //   const userData = yield currentAccountJwt()
  //   // const userData = yield currentAccountJwt()

  //   if (userData) {
  //     yield put({
  //       type: actions.SET_STATE,
  //       payload: {
  //         // ...user,
  //         loading: false,
  //         token,
  //         id: userData?.id,
  //         email: userData.email,
  //         role: userType,
  //         name: userData.fullName,
  //         phone: userData.phone,
  //         authorized: true,
  //       },
  //     })
  //     yield GET_MENU_DATA(userType)
  //   } else {
  //     yield GET_MENU_DATA()
  //   }
  //   // authentication.onAuthStateChanged(async function (user) {
  //   // function* heyy() {
  //   //   yield put({
  //   //     type: 'user/SET_STATE',
  //   //     payload: {
  //   //       loading: true,
  //   //     },
  //   //   })
  //   //   if (user) {
  //   //     console.log('pleaseee', user)
  //   //     let token
  //   //     user.getIdTokenResult(true).then((res) => {
  //   //       localStorage.setItem('token', res.token)
  //   //       // console.log(res.token, 'tokenn')
  //   //     })

  //   //     // Extract user userType here
  //   //     const userData = yield currentAccountJwt()
  //   //     // const userData = yield currentAccountJwt()

  //   //     console.log(userData, 'minee')

  //   //     if (userData) {
  //   //       yield put({
  //   //         type: actions.SET_STATE,
  //   //         payload: {
  //   //           // ...user,
  //   //           loading: false,
  //   //           token,
  //   //           id: user?.id,
  //   //           email: user.email,
  //   //           role: 'adminUser',
  //   //           name: user.fullName,
  //   //           phone: user.phone,
  //   //           authorized: true,
  //   //         },
  //   //       })
  //   //       yield GET_MENU_DATA(user.user_type.name)
  //   //     } else {
  //   //       yield GET_MENU_DATA()
  //   //     }
  //   //   }
  //   // }

  //   // const wswswe = heyy()
  //   // wswswe.next()
  //   // wswswe.next()
  //   // })

  //   // const data = yield call(currentAccountJwt)
  //   // if (data) {
  //   //   const { user } = data
  //   //   yield put({
  //   //     type: actions.SET_STATE,
  //   //     payload: {
  //   //       ...user,
  //   //       loading: false,
  //   //       token: data.token,
  //   //       id: user.id,
  //   //       email: user.email,
  //   //       role: user.user_type.name,
  //   //       name: user.name || user.user_type.name,
  //   //       phone: user.phone,
  //   //       authorized: true,
  //   //     },
  //   //   })
  //   //   yield GET_MENU_DATA(user.user_type.name)
  //   // } else {
  //   //   // TODO: Change with auth
  //   //   yield GET_MENU_DATA()
  //   //   // yield put({
  //   //   //   type: 'user/SET_STATE',
  //   //   //   payload: {
  //   //   //     authorized: false,
  //   //   //   },
  //   //   // })
  // } else {
  //   yield put({
  //     type: 'user/SET_STATE',
  //     payload: {
  //       loading: false,
  //     },
  //   })
  // }

  yield put({
    type: 'user/SET_STATE',
    payload: {
      loading: false,
    },
  })
}

export function* LOGOUT() {
  yield call(logoutJwt)
  yield put({
    type: 'user/SET_STATE',
    payload: {
      id: '',
      name: '',
      role: '',
      email: '',
      avatar: '',
      authorized: false,
      loading: false,
    },
  })
}

export default function* rootSaga() {
  yield all([
    takeLatest(actions.LOGIN, LOGIN),
    takeEvery(actions.LOGIN_SOCIAL, LOGIN_SOCIAL),
    takeEvery(actions.LOAD_CURRENT_ACCOUNT, LOAD_CURRENT_ACCOUNT),
    takeEvery(actions.LOGOUT, LOGOUT),
    LOAD_CURRENT_ACCOUNT(),
  ])
}
