import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import Brand from './brand/index'
import Attribute from './attribute/index'
import Manufacturer from './manufacturer/index'

const Catalog = ({ match }) => {
  return (
    <Switch>
      <Redirect
        exact
        from={`${match.url}`}
        to={`${match.url}/brand/brands-list`}
      />
      <Route path={`${match.url}/brand`} component={Brand} />
      <Route path={`${match.url}/attribute`} component={Attribute} />
      <Route path={`${match.url}/manufacturer`} component={Manufacturer} />
    </Switch>
  )
}

export default Catalog
