import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import DeliveryZoneList from './deliveryzone-list'
import AddDeliveryZone from './add-deliveryzone'
import EditDeliveryZone from './edit-deliveryzone'
import DeliveryZoneLocation from './add-deliveryzoneLocation'
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
        path={`${match.url}/add-deliveryzone`}
        component={AddDeliveryZone}
      />
      <Route
        path={`${match.url}/edit-deliveryzone/:id`}
        component={EditDeliveryZone}
      />
      <Route
        path={`${match.url}/deliveryzone-list`}
        component={DeliveryZoneList}
      />
      <Route
        path={`${match.url}/add-deliveryzonelocation/:id`}
        component={DeliveryZoneLocation}
      />
    </Switch>
  )
}

export default DeliveryZone
