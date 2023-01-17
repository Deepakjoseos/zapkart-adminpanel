import { currentUser } from 'auth/FirebaseAuth'
import FirebaseService from 'services/FirebaseService'
import {
  AUTH_TOKEN,
  AUTHENTICATED,
  SHOW_AUTH_MESSAGE,
  HIDE_AUTH_MESSAGE,
  SIGNOUT_SUCCESS,
  SIGNUP_SUCCESS,
  SHOW_LOADING,
  SIGNIN_WITH_GOOGLE_AUTHENTICATED,
  SIGNIN_WITH_FACEBOOK_AUTHENTICATED,
} from '../constants/Auth'

const initState = {
  loading: true,
  message: '',
  showMessage: false,
  redirect: '',
  user: null,
  authorized: null,
  token: null,
}

const auth = (state = initState, action) => {
  switch (action.type) {
    case AUTHENTICATED:
      return {
        ...state,
        loading: false,
        redirect: '/',
        authorized: true,
        user: action.payload.user,
        token: action.payload.token,
      }
    case SHOW_AUTH_MESSAGE:
      return {
        ...state,
        message: action.message,
        showMessage: true,
        loading: false,
      }
    case HIDE_AUTH_MESSAGE:
      return {
        ...state,
        message: '',
        showMessage: false,
      }
    case SIGNOUT_SUCCESS: {
      return {
        ...state,
        token: null,
        user: null,
        authorized: null,
        redirect: '/auth/login',
        loading: false,
      }
    }
    case SIGNUP_SUCCESS: {
      return {
        ...state,
        loading: false,
        token: action.token,
      }
    }
    case SHOW_LOADING: {
      return {
        ...state,
        loading: action.loading === null ? true : action.loading,
      }
    }
    case SIGNIN_WITH_GOOGLE_AUTHENTICATED: {
      return {
        ...state,
        loading: false,
        token: action.token,
      }
    }
    case SIGNIN_WITH_FACEBOOK_AUTHENTICATED: {
      return {
        ...state,
        loading: false,
        token: action.token,
      }
    }
    default:
      return state
  }
}

export default auth
