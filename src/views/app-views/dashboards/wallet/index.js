import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
// import PickupLocation from './pickupLocation'
// import Shipment from './shipment'
import Transaction from './transactions'

const Wallet = ({ match }) => {
  return (
    <Switch>
      <Redirect
        exact
        from={`${match.url}`}
        to={`${match.url}/transactions/transaction-list`}
      />
      <Route path={`${match.url}/transactions`} component={Transaction} />
      {/* <Route path={`${match.url}/pickuplocation`} component={PickupLocation} /> */}
    </Switch>
  )
}

export default Wallet
