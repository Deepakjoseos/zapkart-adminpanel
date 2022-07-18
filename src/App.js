import React, { useEffect } from 'react'
import { Provider, useDispatch } from 'react-redux'
import store from './redux/store'
import { BrowserRouter as Router } from 'react-router-dom'
import Views from './views'
import { Route, Switch } from 'react-router-dom'
import { ThemeSwitcherProvider } from 'react-css-theme-switcher'
import { THEME_CONFIG } from './configs/AppConfig'
import { auth } from 'auth/FirebaseAuth'
import authAdminService from 'services/auth/admin'
import { authenticated, showLoading, signOut } from 'redux/actions/Auth'
import { AUTH_TOKEN } from 'redux/constants/Auth'

const themes = {
  dark: `${process.env.PUBLIC_URL}/css/dark-theme.css`,
  light: `${process.env.PUBLIC_URL}/css/light-theme.css`,
}

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    // dispatch(showLoading(false))

    // Firebase auth
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult(true)
        const userType = idTokenResult.claims.userType
        window.localStorage.setItem(AUTH_TOKEN, idTokenResult.token)
        console.log(userType, 'userType')
        if (userType === 'Admin') {
          const data = await authAdminService.getProfile()
          if (data) {
            console.log(data, 'heteet')
            const userData = {
              userType,
              firstName: data.firstName,
              lastName: data.lastName,
              email: data.email,
              phone: data.phone,
              displayImage: data.displayImage,
              emailVerified: user.emailVerified,
              phoneVerified: user.phoneNumber ? true : false,
            }

            dispatch(
              authenticated({ user: userData, token: idTokenResult.token })
            )
            dispatch(showLoading(false))
          }
          dispatch(showLoading(false))
        } else {
          dispatch(signOut())
          dispatch(showLoading(false))
        }
      } else {
        dispatch(showLoading(false))
      }
    })
  }, [])
  return (
    <div className="App">
      {/* <Provider store={store}> */}
      <ThemeSwitcherProvider
        themeMap={themes}
        defaultTheme={THEME_CONFIG.currentTheme}
        insertionPoint="styles-insertion-point"
      >
        <Router>
          <Switch>
            <Route path="/" component={Views} />
          </Switch>
        </Router>
      </ThemeSwitcherProvider>
      {/* </Provider> */}
    </div>
  )
}

export default App
