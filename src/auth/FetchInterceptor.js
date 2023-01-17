import axios from 'axios'
import { API_BASE_URL } from 'configs/AppConfig'
import { history } from '../App'
import { AUTH_TOKEN } from 'redux/constants/Auth'
import { notification } from 'antd'
import FirebaseService from 'services/FirebaseService'

import storeAction from 'redux/store'
import Utils from 'utils'
import { signOut } from 'redux/actions/Auth'

const service = axios.create({
  baseURL: API_BASE_URL,
  timeout: 60000,
})

let store

export const injectStore = (_store) => {
  store = _store
}

// Config
const ENTRY_ROUTE = '/auth/login'
const TOKEN_PAYLOAD_KEY = 'authorization'
const PUBLIC_REQUEST_KEY = 'public-request'

// API Request interceptor
service.interceptors.request.use(
  (config) => {
    const jwtToken = localStorage.getItem(AUTH_TOKEN)

    if (jwtToken) {
      config.headers[TOKEN_PAYLOAD_KEY] = `Bearer ${jwtToken}`
    }

    // if (!jwtToken && !config.headers[PUBLIC_REQUEST_KEY]) {
    //   history.push(ENTRY_ROUTE)
    //   window.location.reload()
    // }

    return config
  },
  (error) => {
    // Do something with request error here
    notification.error({
      message: 'Error',
    })
    Promise.reject(error)
  }
)

let alreadyShownError = false

// API respone interceptor
service.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    console.log('show-errerer')
    // if (store.getState().auth.authorized) {

    let notificationParam = {
      message: '',
    }

    // Remove token and redirect
    if (error.response.status === 401) {
      if (store.getState().auth.authorized) {
        if (window.location.pathname !== '/app/dashboards/authdetails') {
          if (!alreadyShownError) {
            notification.warning({ message: 'Verification needed' })
          }
          alreadyShownError = true
        }

        if (alreadyShownError) {
          setTimeout(() => {
            alreadyShownError = false
          }, 3000)
        }

        // window.location.reload()
        if (!window.location.href.includes('/app/dashboards/authdetails')) {
          history.replace('/app/dashboards/authdetails')
        }
      } else {
        notificationParam.message = 'Verification failed'
        notificationParam.description = 'Please login again'
        storeAction.dispatch(signOut())
        FirebaseService.signOutRequest()
        localStorage.removeItem(AUTH_TOKEN)
        window.location.reload()
        history.push(ENTRY_ROUTE)
      }
    }
    if (error.response.status === 403) {
      // notificationParam.message = 'Verification failed'
      // notificationParam.description = 'Please login again'
      // const fetchUser = () => async (getState, dispatch) => {
      //   storeAction.dispatch(signOut())
      // }
      // fetchUser()
      // console.log(storeAction, store, 'storeds')
      // ;(async () => {
      //   store.dispatch(await signOut())
      //   // dispatch(await getChartData());
      // })()
      store.dispatch(signOut())

      FirebaseService.signOutRequest()
      localStorage.removeItem(AUTH_TOKEN)
      history.replace(ENTRY_ROUTE)
      // window.location.reload()
    }

    if (error.response.status === 404) {
      notificationParam.message = 'Not Found'
    }

    if (error.response.status === 500) {
      notificationParam.message = 'Internal Server Error'
    }

    if (error.response.status === 508) {
      notificationParam.message = 'Time Out'
    }
    // if (notificationParam?.message) {
    //   notification.error(notificationParam)
    // }

    Utils.errorValidator(error.response.data)

    return Promise.reject(error)
  }
)

export default service
