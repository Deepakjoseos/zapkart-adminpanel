import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import DistrictList from './DistrictList'
import AddDistrict from './adddistrict'
import EditDistrict from './editdistrict'

const District= (props) => {
  const { match } = props
  return (
    <Switch>
      <Redirect exact from={`${match.url}`} to={`${match.url}/DistrictList`} />
      <Route path={`${match.url}/adddistrict`} component={AddDistrict} />
      <Route path={`${match.url}/editdistrict/:id`} component={EditDistrict } />
      <Route path={`${match.url}/DistrictList`} component={DistrictList} />
    </Switch>
  )
}



export default District
