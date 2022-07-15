import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import CouponList from './coupon-list'
import AddCoupon from './add-coupon'
import EditCoupon from './edit-coupon'
// import Orders from './orders'

const Coupon = (props) => {
  const { match } = props
  return (
    <Switch>
      <Redirect exact from={`${match.url}`} to={`${match.url}/coupon-list`} />
      <Route path={`${match.url}/add-coupon`} component={AddCoupon} />
      <Route path={`${match.url}/edit-coupon/:id`} component={EditCoupon} />
      <Route path={`${match.url}/coupon-list`} component={CouponList} />
    </Switch>
  )
}

export default Coupon
