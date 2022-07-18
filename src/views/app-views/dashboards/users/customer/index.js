import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import CustomerList from './customer-list/index'
import EditCustomer from './edit-customer/index'
// import Orders from './orders'

const Customer = (props) => {
  const { match } = props
  return (
    <Switch>
      <Redirect exact from={`${match.url}`} to={`${match.url}/customer-list`} />

      <Route path={`${match.url}/customer-list`} component={CustomerList} />
      <Route path={`${match.url}/edit-customer/:id`} component={EditCustomer} />
    </Switch>
  )
}

export default Customer
