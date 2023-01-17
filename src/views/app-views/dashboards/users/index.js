import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import UserGroup from './userGroup/index'
import Customer from './customer/index'
import Vendor from './vendor/index'

const Catalog = ({ match }) => {
  return (
    <Switch>
      <Redirect
        exact
        from={`${match.url}`}
        to={`${match.url}/usergroup/usergroup-list`}
      />
      <Route path={`${match.url}/usergroup`} component={UserGroup} />
      <Route path={`${match.url}/customer`} component={Customer} />
      <Route path={`${match.url}/vendor`} component={Vendor} />
    </Switch>
  )
}

export default Catalog
