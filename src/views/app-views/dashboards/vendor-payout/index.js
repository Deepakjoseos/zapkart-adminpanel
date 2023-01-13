import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import PayoutList from './payout-list'

const VendorPayout = ({ match }) => {
  return (
    <Switch>
      <Redirect
        exact
        from={`${match.url}`}
        to={`${match.url}/payout-list`}
      />
      <Route path={`${match.url}/payout-list`} component={PayoutList} />
    </Switch>
  )
}

export default VendorPayout