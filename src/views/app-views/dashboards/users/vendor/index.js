import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import VendorList from './vendor-list/index'
import EditVendor from './edit-vendor'
import AddVendor from './add-vendor'

const Vendor = (props) => {
  const { match } = props
  return (
    <Switch>
      <Redirect exact from={`${match.url}`} to={`${match.url}/vendor-list`} />

      <Route path={`${match.url}/vendor-list`} component={VendorList} />
      <Route path={`${match.url}/add-vendor`} component={AddVendor} />

      <Route path={`${match.url}/edit-vendor/:id`} component={EditVendor} />
    </Switch>
  )
}

export default Vendor
