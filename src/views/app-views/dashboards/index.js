import React, { lazy, Suspense } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import Loading from 'components/shared-components/Loading'

const Dashboards = ({ match }) => {
  return (
    <Suspense fallback={<Loading cover="content" />}>
      <Switch>
        <Route
          path={`${match.url}/profile`}
          component={lazy(() => import(`./profile`))}
        />
        <Route
          path={`${match.url}/default`}
          component={lazy(() => import(`./default`))}
        />
        <Route
          path={`${match.url}/analytic`}
          component={lazy(() => import(`./analytic`))}
        />
        {/* <Route
          path={`${match.url}/sales`}
          component={lazy(() => import(`./sales/saleslist`))}
        /> */}
        <Route
          path={`${match.url}/catalog`}
          component={lazy(() => import(`./catalog`))}
        />
        <Route
          path={`${match.url}/users`}
          component={lazy(() => import(`./users`))}
        />

        <Route
          path={`${match.url}/deliverylocation`}
          component={lazy(() => import(`./deliveryLocation`))}
        />

        <Route
          path={`${match.url}/authdetails`}
          component={lazy(() => import(`./authDetails`))}
        />
        <Route
          path={`${match.url}/review`}
          component={lazy(() => import(`./review`))}
        />
  {/* <Route
          path={`${match.url}/sales`}
          component={lazy(() => import(`./sales`))}
        /> */}
        <Route
          path={`${match.url}/wallet`}
          component={lazy(() => import(`./wallet`))}
        />
        {/* Vendor */}

        <Route
          path={`${match.url}/deliveryzone`}
          component={lazy(() => import(`./deliveryzone`))}
        />

        <Route
          path={`${match.url}/orders`}
          component={lazy(() => import(`./orders`))}
        />
        <Route 
          path={`${match.url}/payout`}
          component={lazy(() =>  import(`./payout`))}
        />
        <Route
          path={`${match.url}/shipment`}
          component={lazy(() => import(`./shipment`))}
        />
        <Route
          path={`${match.url}/document-upload`}
          component={lazy(() => import(`./documentUpload`))}
        />

        <Redirect from={`${match.url}`} to={`${match.url}/default`} />
      </Switch>
    </Suspense>
  )
}

export default Dashboards
