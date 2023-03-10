import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import DeliveryLocationList from './deliverylocation-list'
import AddDeliveryLocation from './add-deliveryLocation'
import EditDeliveryLocation from './edit-delivery-location'

const DeliveryLocation = (props) => {
  const { match } = props
  return (
    <Switch>
      <Redirect
        exact
        from={`${match.url}`}
        to={`${match.url}/delivery-location-list`}
      />
      <Route
        path={`${match.url}/add-deliverylocation`}
        component={AddDeliveryLocation}
      />
      <Route
        path={`${match.url}/edit-deliverylocation/:id`}
        component={EditDeliveryLocation}
      />
      <Route
        path={`${match.url}/delivery-location-list`}
        component={DeliveryLocationList}
      />
    </Switch>
  )
}

export default DeliveryLocation


