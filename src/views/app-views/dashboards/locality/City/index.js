import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import CityList from './City-List'
import AddCity from './Add-City'
import EditCity from './Edit-City'

const City= (props) => {
  const { match } = props
  return (
    <Switch>
      <Redirect exact from={`${match.url}`} to={`${match.url}/City-List`} />
      <Route path={`${match.url}/Add-City`} component={AddCity} />
      <Route path={`${match.url}/Edit-City/:id`} component={EditCity } />
      <Route path={`${match.url}/City-List`} component={CityList} />
    </Switch>
  )
}



export default City
