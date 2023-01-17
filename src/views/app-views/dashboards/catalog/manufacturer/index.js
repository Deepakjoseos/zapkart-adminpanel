import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import ManufacturerList from './manufacturer-list'
import AddManufacturer from './add-manufacturer'
import EditManufacturer from './edit-manufacturer'

const Manufacturer = (props) => {
  const { match } = props
  return (
    <Switch>
      <Redirect
        exact
        from={`${match.url}`}
        to={`${match.url}/manufacturer-list`}
      />
      <Route
        path={`${match.url}/add-manufacturer`}
        component={AddManufacturer}
      />
      <Route
        path={`${match.url}/edit-manufacturer/:id`}
        component={EditManufacturer}
      />
      <Route
        path={`${match.url}/manufacturer-list`}
        component={ManufacturerList}
      />
      {/* <Route path={`${match.url}/orders`} component={Orders} /> */}
    </Switch>
  )
}

export default Manufacturer
