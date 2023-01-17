import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import CountryList from './Country-list'
import Addcountry from './Add-country'
import Editcountry from './Edit-country'

const Country= (props) => {
  const { match } = props
  return (
    <Switch>
      <Redirect exact from={`${match.url}`} to={`${match.url}/country-list`} />
      <Route path={`${match.url}/add-country`} component={Addcountry} />
      <Route path={`${match.url}/edit-country/:id`} component={Editcountry} />
      <Route path={`${match.url}/country-list`} component={CountryList} />
    </Switch>
  )
}



export default Country
