import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import DeliveryLocationList from './deliveryLocation-list'
import AddDeliveryLocation from './add-deliveryLocation'
import EditDeliveryLocation from './edit-deliveryLocation'
// import Orders from './orders'

const DeliveryLocation = (props) => {
  const { match } = props
  return (
    <Switch>
      <Redirect
        exact
        from={`${match.url}`}
        to={`${match.url}/deliverylocation-list`}
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
        path={`${match.url}/deliverylocation-list`}
        component={DeliveryLocationList}
      />
    </Switch>
  )
}

export default DeliveryLocation
