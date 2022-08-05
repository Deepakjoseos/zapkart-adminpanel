import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
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
    </Switch>
  )
}

export default Shipments
