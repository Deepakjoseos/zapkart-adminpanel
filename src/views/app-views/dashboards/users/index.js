import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import UserGroup from './userGroup/index'

const Catalog = ({ match }) => {
  return (
    <Switch>
      <Redirect
        exact
        from={`${match.url}`}
        to={`${match.url}/usergroup/usergroup-list`}
      />
      <Route path={`${match.url}/usergroup`} component={UserGroup} />
    </Switch>
  )
}

export default Catalog
