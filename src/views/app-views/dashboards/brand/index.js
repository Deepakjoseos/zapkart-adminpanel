import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import ProductList from './brand-list'
import AddBrand from './add-brand'
import EditBrand from './edit-brand'
// import Orders from './orders'

const Ecommerce = (props) => {
  const { match } = props
  return (
    <Switch>
      <Redirect exact from={`${match.url}`} to={`${match.url}/brands-list`} />
      <Route path={`${match.url}/add-brand`} component={AddBrand} />
      <Route path={`${match.url}/edit-brand/:id`} component={EditBrand} />
      <Route path={`${match.url}/brands-list`} component={ProductList} />
      {/* <Route path={`${match.url}/orders`} component={Orders} /> */}
    </Switch>
  )
}

export default Ecommerce
