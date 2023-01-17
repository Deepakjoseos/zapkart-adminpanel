import React from 'react'
import CouponForm from '../CouponForm'

const EditCoupon = (props) => {
  return <CouponForm mode="EDIT" param={props.match.params} />
}

export default EditCoupon
