import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import ProductTemplateList from './productTemplate-list'
import AddProductTemplate from './add-productTemplate'
import EditProductTemplate from './edit-productTemplate'
// import Orders from './orders'

const ProductTemplate = (props) => {
  const { match } = props
  return (
    <Switch>
      <Redirect
        exact
        from={`${match.url}`}
        to={`${match.url}/producttemplate-list`}
      />
      <Route
        path={`${match.url}/add-producttemplate`}
        component={AddProductTemplate}
      />
      <Route
        path={`${match.url}/edit-producttemplate/:id`}
        component={EditProductTemplate}
      />
      <Route
        path={`${match.url}/producttemplate-list`}
        component={ProductTemplateList}
      />
      {/* <Route path={`${match.url}/orders`} component={Orders} /> */}
    </Switch>
  )
}

export default ProductTemplate
