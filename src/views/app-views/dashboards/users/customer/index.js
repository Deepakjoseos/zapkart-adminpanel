import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import CustomerList from './customer-list/index'
// import Orders from './orders'

const Ecommerce = (props) => {
  const { match } = props
  return (
    <Switch>
      <Redirect exact from={`${match.url}`} to={`${match.url}/customer-list`} />

      <Route path={`${match.url}/customer-list`} component={CustomerList} />
    </Switch>
  )
}

export default Ecommerce
