import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import productList from './product-list'
import AddProduct from './add-product'
import EditProduct from './edit-product'
// import Orders from './orders'

const Product = (props) => {
  const { match } = props
  return (
    <Switch>
      <Redirect exact from={`${match.url}`} to={`${match.url}/product-list`} />
      <Route path={`${match.url}/add-product`} component={AddProduct} />
      <Route path={`${match.url}/edit-product/:id`} component={EditProduct} />
      <Route path={`${match.url}/product-list`} component={productList} />
    </Switch>
  )
}

export default Product
