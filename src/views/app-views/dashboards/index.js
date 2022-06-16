import React, { lazy, Suspense } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import Loading from 'components/shared-components/Loading'

const Dashboards = ({ match }) => {
  return (
    <Suspense fallback={<Loading cover="content" />}>
      <Switch>
        <Route
          path={`${match.url}/default`}
          component={lazy(() => import(`./default`))}
        />
        <Route
          path={`${match.url}/analytic`}
          component={lazy(() => import(`./analytic`))}
        />
        <Route
          path={`${match.url}/sales`}
          component={lazy(() => import(`./sales`))}
        />
        <Route
          path={`${match.url}/catalog`}
          component={lazy(() => import(`./catalog`))}
        />
        <Route
          path={`${match.url}/users`}
          component={lazy(() => import(`./users`))}
        />
        <Route
          path={`${match.url}/information`}
          component={lazy(() => import(`./information`))}
        />

        {/* <Route
          path={`${match.url}/brand`}
          component={lazy(() => import(`./brand`))}
        />
        <Route
          path={`${match.url}/attribute`}
          component={lazy(() => import(`./attribute`))}
        /> */}
        <Redirect from={`${match.url}`} to={`${match.url}/catalog`} />
      </Switch>
    </Suspense>
  )
}

export default Dashboards
