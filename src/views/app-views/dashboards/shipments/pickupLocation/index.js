import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import PickuplocationList from './pickuplocation-list'
import AddPickuplocation from './add-pickuplocation'
import EditPickuplocation from './edit-pickuplocation'
// import Orders from './orders'

// In here we will define all our routes
const PickupLocation = (props) => {
  const { match } = props
  return (
    <Switch>
      <Redirect
        exact
        from={`${match.url}`}
        to={`${match.url}/pickuplocation-list`}
      />
      <Route
        path={`${match.url}/add-pickuplocation`}
        component={AddPickuplocation}
      />
      <Route
        path={`${match.url}/edit-pickuplocation/:id`}
        component={EditPickuplocation}
      />
      <Route
        path={`${match.url}/pickuplocation-list`}
        component={PickuplocationList}
      />
      {/* <Route path={`${match.url}/orders`} component={Orders} /> */}
    </Switch>
  )
}

export default PickupLocation
