import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import ShipmentList from './shipment-list'
import AddShipment from './add-shipment'
import EditShiment from './edit-shipment'
import ShipmentView from './shipment-view'
// import Orders from './orders'

// In here we will define all our routes
const Shipment = (props) => {
  const { match } = props
  return (
    <Switch>
      <Redirect exact from={`${match.url}`} to={`${match.url}/shipment-list`} />
      <Route path={`${match.url}/add-shipment`} component={AddShipment} />
      <Route path={`${match.url}/edit-shipment/:id`} component={EditShiment} />
      <Route path={`${match.url}/shipment-list`} component={ShipmentList} />
      <Route path={`${match.url}/shipment-view/:id`} component={ShipmentView} />

      {/* <Route path={`${match.url}/orders`} component={Orders} /> */}
    </Switch>
  )
}

export default Shipment
