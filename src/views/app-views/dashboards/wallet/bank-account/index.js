import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import AddBankAccount from './add-bank-accounnt'
import BankAccountList from './list-bank-account'

// import Orders from './orders'

// In here we will define all our routes
const BankAccount = (props) => {
  const { match } = props
  return (
    <Switch>
      <Redirect exact from={`${match.url}`} to={`${match.url}/bank-account-list`} />
       <Route path={`${match.url}/add-bank-account`} component={AddBankAccount} />
      {/* <Route path={`${match.url}/edit-shipment/:id`} component={EditShiment} /> */} 
      <Route path={`${match.url}/bank-account-list`} component={BankAccountList} />
      {/* <Route path={`${match.url}/shipment-view/:id`} component={TransactionView} /> */}

      {/* <Route path={`${match.url}/orders`} component={Orders} /> */}
    </Switch>
  )
}

export default BankAccount
