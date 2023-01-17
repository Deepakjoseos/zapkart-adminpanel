import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import TaxCategoryList from './list-tax-category'
import AddTaxCategory from './add-tax-category'
import EditTaxCategory from './edit-tax-category'
// import Orders from './orders'

// In here we will define all our routes
const TaxCategory = (props) => {
  const { match } = props
  return (
    <Switch>
      <Redirect exact from={`${match.url}`} to={`${match.url}/tax-category-list`} />
     <Route path={`${match.url}/add-tax-category`} component={AddTaxCategory} /> 
       <Route path={`${match.url}/edit-tax-category/:id`} component={EditTaxCategory} /> 
      <Route path={`${match.url}/tax-category-list`} component={TaxCategoryList} />
 
    </Switch>
  )
}

export default TaxCategory
