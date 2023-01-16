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
          path={`${match.url}/sales`}
          component={lazy(() => import(`./sales`))}
        />
        <Route
          path={`${match.url}/analytic`}
          component={lazy(() => import(`./analytic`))}
        />
        <Route
          path={`${match.url}/sales`}
          component={lazy(() => import(`./sales/saleslist`))}
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
         <Route
          path={`${match.url}/review`}
          component={lazy(() => import(`./review`))}
        />
        {/* <Route
          path={`${match.url}/template`}
          component={lazy(() => import(`./template`))}
        /> */}
        <Route
          path={`${match.url}/deliverylocation`}
          component={lazy(() => import(`./delivery-location`))}
        />
         <Route
          path={`${match.url}/locality`}
          component={lazy(() => import(`./locality`))}
        />
         {/* <Route
          path={`${match.url}/delivery-location`}
          component={lazy(() => import(`./delivery-location/deliveryzone`))}
        /> */}
        <Route
          path={`${match.url}/widget`}
          component={lazy(() => import(`./widget`))}
        />

        <Route
          path={`${match.url}/orders`}
          component={lazy(() => import(`./orders`))}
        />
        <Route
          path={`${match.url}/settings`}
          component={lazy(() => import(`./settings`))}
        />
         <Route
          path={`${match.url}/notifications`}
          component={lazy(() => import(`./notifications`))}
        />

        <Route
          path={`${match.url}/shipments`}
          component={lazy(() => import(`./shipments`))}
        />
           <Route
          path={`${match.url}/tax-category`}
          component={lazy(() => import(`./tax-category`))}
        />
         <Route
          path={`${match.url}/image-categories`}
          component={lazy(() => import(`./Image-categories`))}
        />
           {/* <Route
          path={`${match.url}/main-banner`}
          component={lazy(() => import(`./main-banner`))}
        /> */}
        {/* <Route
          path={`${match.url}/brand`}
          component={lazy(() => import(`./brand`))}
        />
        <Route
          path={`${match.url}/attribute`}
          component={lazy(() => import(`./attribute`))}
        /> */}
        <Route
          path={`${match.url}/vendor-payout`}
          component={lazy(() => import(`./vendor-payout`))}
        />
        <Redirect from={`${match.url}`} to={`${match.url}/default`} />
      </Switch>
    </Suspense>
  )
}

export default Dashboards
