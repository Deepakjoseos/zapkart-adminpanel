import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import UserGroupList from './userGroup-list'
import AddUserGroup from './add-userGroup'
import EditUserGroup from './edit-userGroup'
// import Orders from './orders'

const Ecommerce = (props) => {
  const { match } = props
  return (
    <Switch>
      <Redirect
        exact
        from={`${match.url}`}
        to={`${match.url}/usergroup-list`}
      />
      <Route path={`${match.url}/add-usergroup`} component={AddUserGroup} />
      <Route
        path={`${match.url}/edit-usergroup/:id`}
        component={EditUserGroup}
      />
      <Route path={`${match.url}/usergroup-list`} component={UserGroupList} />
      {/* <Route path={`${match.url}/orders`} component={Orders} /> */}
    </Switch>
  )
}

export default Ecommerce
