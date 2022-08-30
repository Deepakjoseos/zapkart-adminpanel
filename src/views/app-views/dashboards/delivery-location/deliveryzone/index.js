import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import AddDeliveryZone from './add-deliveryzone'
import DeliveryZonesList from './deliveryzone-list'
import EditDeliveryZone from './edit-deliveryzone'


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
        component={DeliveryZonesList}
      />
    </Switch>
  )
}


export default DeliveryZone
