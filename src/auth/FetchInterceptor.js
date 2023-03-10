import axios from 'axios'
import { API_BASE_URL } from 'configs/AppConfig'
import history from '../history'
import { AUTH_TOKEN } from 'redux/constants/Auth'
import { notification } from 'antd'
import FirebaseService from 'services/FirebaseService'
import Utils from 'utils'
import { currentUser } from './FirebaseAuth'

const service = axios.create({
  baseURL: API_BASE_URL,
  timeout: 60000,
})

// Config
const ENTRY_ROUTE = '/auth/login'
const TOKEN_PAYLOAD_KEY = 'authorization'
const PUBLIC_REQUEST_KEY = 'public-request'

// API Request interceptor
service.interceptors.request.use(
  async (config) => {
    const jwtToken = localStorage.getItem(AUTH_TOKEN)

    const refreshedToken = await FirebaseService.refreshToken()

    // .then((token) => {
    //   console.log(token, 'heyteg')
    // })

    if (refreshedToken || jwtToken) {
      config.headers[TOKEN_PAYLOAD_KEY] = `Bearer ${refreshedToken || jwtToken}`
      config.headers.deviceToken = window.localStorage.getItem('deviceToken')
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

// API respone interceptor
service.interceptors.response.use(
  (response) => {
    return response.data
  },
  async (error) => {
    let notificationParam = {
      message: '',
    }
    const originalRequest = error.config

    // Remove token and redirect
    if (error.response.status === 401 || error.response.status === 403) {
      // if (currentUser) {
      //   const refreshed = await FirebaseService.refreshToken()

      //   if (refreshed) {
      //     originalRequest._retry = true

      //     axios.defaults.headers.common['authorization'] = 'Bearer ' + refreshed
      //     return service(originalRequest)
      //   } else {
      //     FirebaseService.signOutRequest()
      //     localStorage.removeItem(AUTH_TOKEN)
      //     history.push(ENTRY_ROUTE)
      //     window.location.reload()
      //     notificationParam.message = 'Authentication Fail'
      //     notificationParam.description = 'Please login again'
      //   }
      // } else {
      FirebaseService.signOutRequest()
      localStorage.removeItem(AUTH_TOKEN)
      history.push(ENTRY_ROUTE)
      window.location.reload()
      notificationParam.message = 'Authentication Fail'
      notificationParam.description = 'Please login again'
      // }
      // const refreshed = await FirebaseService.refreshToken()

      // if (refreshed && currentUser) {
      //   originalRequest._retry = true

      //   axios.defaults.headers.common['authorization'] = 'Bearer ' + refreshed
      //   return service(originalRequest)
      // } else {
      //   FirebaseService.signOutRequest()
      //   localStorage.removeItem(AUTH_TOKEN)
      //   history.push(ENTRY_ROUTE)
      //   window.location.reload()
      //   notificationParam.message = 'Authentication Fail'
      //   notificationParam.description = 'Please login again'
      // }
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

    // notification.error(notificationParam)
    Utils.errorValidator(error.response.data)

    return Promise.reject(error)
  }
)

export default service
