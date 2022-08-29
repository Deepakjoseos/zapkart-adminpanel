import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'


import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import PickupLocation from './pickupLocation'
import Shipment from './shipment'
import DeliveryZone from './deliveryzone'
import DeliveryLocation from './delivery-location'

const DeliveryLocations = ({ match }) => {
  return (
    <Switch>
      <Redirect
        exact
        from={`${match.url}`}
        to={`${match.url}/delivery-location/delivery-location-list`}
      />
      <Route path={`${match.url}/delivery-location`} component={DeliveryLocation} />
      <Route path={`${match.url}/deliveryzone`} component={DeliveryZone} />
    </Switch>
  )
}

export default DeliveryLocations

