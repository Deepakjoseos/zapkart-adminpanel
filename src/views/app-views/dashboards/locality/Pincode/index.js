import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import Pincodelist from './pincodelist'
import AddPincode from './addpincode'
import EditPincode from './editpincode'

const Pincode = (props) => {
  const { match } = props
  return (
    <Switch>
      <Redirect exact from={`${match.url}`} to={`${match.url}/pincodelist `} />
      <Route path={`${match.url}/addpincode`} component={AddPincode} />
      <Route path={`${match.url}/editpincode/:id`} component={EditPincode} />
      <Route path={`${match.url}/pincodelist`} component={Pincodelist} />
    </Switch>
  )
}

export default Pincode
