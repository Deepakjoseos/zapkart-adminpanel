import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import Brand from './brand/index'
import Attribute from './attribute/index'
import Manufacturer from './manufacturer/index'
import Category from './category/index'
import ProductTemplate from './productTemplate/index'
import Product from './product/index'

import Banner from './banner/index'
import MedicineType from './medicineType'
import Composition from './composition'
import Coupon from './coupon'

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
      <Route path={`${match.url}/category`} component={Category} />
      <Route
        path={`${match.url}/producttemplate`}
        component={ProductTemplate}
      />
      <Route path={`${match.url}/product`} component={Product} />
      <Route path={`${match.url}/banner`} component={Banner} />
      <Route path={`${match.url}/medicinetype`} component={MedicineType} />
      <Route path={`${match.url}/composition`} component={Composition} />
      <Route path={`${match.url}/coupon`} component={Coupon} />
    </Switch>
  )
}

export default Catalog
