import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import PickupLocation from './pickupLocation'
import Shipment from './shipment'

const Shipments = ({ match }) => {
  return (
    <Switch>
      <Redirect
        exact
        from={`${match.url}`}
        to={`${match.url}/shipment/shipment-list`}
      />
      <Route path={`${match.url}/shipment`} component={Shipment} />
      <Route path={`${match.url}/pickuplocation`} component={PickupLocation} />
    </Switch>
  )
}

export default Shipments
