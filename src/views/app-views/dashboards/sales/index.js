import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import SalesDashboard from './saleslist'
// import AddNotification from './add-notification'
// import EditNotification from './edit-notification'

const Sales = (props) => {
  const { match } = props
  return (
    <Switch>
      <Redirect exact from={`${match.url}`} to={`${match.url}/saleslist`} />
      {/* <Route path={`${match.url}/add-notification`} component={AddNotification} /> */}
      {/* <Route path={`${match.url}/edit-notification/:id`} component={EditNotification} />*/}
      <Route path={`${match.url}/saleslist`} component={SalesDashboard} /> 
    </Switch>
  )
}

export default Sales
