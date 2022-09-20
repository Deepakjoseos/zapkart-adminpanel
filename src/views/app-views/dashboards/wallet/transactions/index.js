import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import TransactionList from './transactions-list'

// import Orders from './orders'

// In here we will define all our routes
const Transaction = (props) => {
  const { match } = props
  return (
    <Switch>
      <Redirect exact from={`${match.url}`} to={`${match.url}/transaction-list`} />
      {/* <Route path={`${match.url}/add-shipment`} component={AddTransaction} />
      <Route path={`${match.url}/edit-shipment/:id`} component={EditShiment} /> */}
      <Route path={`${match.url}/transaction-list`} component={TransactionList} />
      {/* <Route path={`${match.url}/shipment-view/:id`} component={TransactionView} /> */}

      {/* <Route path={`${match.url}/orders`} component={Orders} /> */}
    </Switch>
  )
}

export default Transaction
