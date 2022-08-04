import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import OrderList from './order-list'
import OrderView from './order-view'
// import AddProduct from './add-product'
// import EditProduct from './edit-product'
// import Orders from './orders'

const Product = (props) => {
  const { match } = props
  return (
    <Switch>
      <Redirect exact from={`${match.url}`} to={`${match.url}/orders-list`} />
      {/* <Route path={`${match.url}/add-product`} component={AddProduct} />
      <Route path={`${match.url}/edit-product/:id`} component={EditProduct} /> */}
      <Route path={`${match.url}/orders-list`} component={OrderList} />
      <Route path={`${match.url}/order-view/:id`} component={OrderView} />
    </Switch>
  )
}

export default Product
