/* eslint-disable camelcase */
import React,{useState} from 'react'
import { Helmet } from 'react-helmet'
import { createOrderByAdmin } from 'services/orders'
import { Redirect } from 'react-router-dom'

import Form from './Form'

const OrdersList = () => {
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (values) => {
    const data = {}
    console.log('values', values)
    if (values.cart) {
      values.cart = values?.cart?.map((i) => {
        return { productId: i.id, quantity: i.quantity }
      })
    }

    Object.keys(values).forEach((key) => {
      if (key?.length > 0) {
        if (key) {
          data[key] = values[key]
        }
      }
    })

    const res = await createOrderByAdmin(data)
    console.log("RESSDFA",res)
    if (res?.success) {
      if (res?.data?.updateOrderMaster) {
        setSuccess(true)
        redirectTo(res?.data?.updateOrderMaster?.id)
      }
    }
  }
  const redirectTo = (id) => {
    console.log('aaaa', id)
    // setSuccess(true)
    return <Redirect to="/order-management/orders" />
  }

  const form = <Form onSubmit={handleSubmit} initialValues={{}} />
  if(success) return <Redirect to="/order-management/orders" />

  return (
    <div>
      <Helmet title="Create order" />
      <div className="card">
        <div className="card-header">
          <div className="utils__title">
            <strong>Create Orders</strong>
          </div>
        </div>
        <div className="card-body">{form}</div>
      </div>
    </div>
  )
}

export default OrdersList
