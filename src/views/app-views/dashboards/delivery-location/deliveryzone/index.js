import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import DeliveryZonesList from './deliveryzone-list'
// import DeliveryLocationList from './deliverylocation-list'
// import AddDeliveryLocation from './add-deliveryLocation'
// import EditDeliveryLocation from './edit-delivery-location'
// import Orders from './orders'

const DeliveryZone = (props) => {
  const { match } = props
  return (
    <Switch>
      <Redirect
        exact
        from={`${match.url}`}
        to={`${match.url}/deliveryzone-list`}
      />
      <Route
        path={`${match.url}/add-deliveryzone-list`}
        // component={AddDeliveryLocation}
      />
      <Route
        path={`${match.url}/edit-deliveryzone/:id`}
        // component={EditDeliveryLocation}
      />
      <Route
        path={`${match.url}/deliveryzone-list`}
        component={DeliveryZonesList}
      />
    </Switch>
  )
}


export default DeliveryZone
