import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import ProductTemplate from './productTemplate/index'
import Product from './product/index'

const Catalog = ({ match }) => {
  return (
    <Switch>
      <Redirect
        exact
        from={`${match.url}`}
        to={`${match.url}/product/product-list`}
      />
      <Route path={`${match.url}/product`} component={Product} />

      <Route
        path={`${match.url}/producttemplate`}
        component={ProductTemplate}
      />
    </Switch>
  )
}

export default Catalog
