import { Button, Card, notification, Radio, Space } from 'antd'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import orderService from 'services/orders'

const OrderComplete = ({
  availablePaymentMethods,
  paymentId,
  razorpayItems,
  setPaymentLoading,
  paymentLoading,
}) => {
  const [paymentMethod, setPaymentMethod] = useState('PaymentLink')

  const history = useHistory()

  const onChange = (e) => {
    console.log('radio checked', e.target.value)
    setPaymentMethod(e.target.value)
  }

  // Razor pay script load
  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement('script')
      script.src = src
      script.onload = () => {
        resolve(true)
      }

      script.onerror = () => {
        resolve(false)
      }
      document.body.appendChild(script)
    })
  }

  const displayRazorPay = async (amount, razorpayOrderId) => {
    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')

    if (!res) {
      notification.error({
        message: 'Error',
        description: 'Razorpay script not loaded',
      })
      return
    }

    const __DEV__ = document.domain === 'localhost'

    // const data = await fetch('http://localhost:8000/razorpay', {
    //   method: 'POST',
    // }).then((t) => t.json())

    // console.log(data, 'showw-razor')

    const options = {
      key: __DEV__ ? 'rzp_live_lAl1nz45cwfVDL' : 'rzp_live_lAl1nz45cwfVDL', // Enter the Key ID generated from the Dashboard
      currency: 'INR',
      amount: amount,
      order_id: razorpayOrderId,
      name: 'zapkart',
      // receipt: paymentId,
      description: 'Thank you for Purchase',
      image: 'https://example.com/your_logo',
      // order_id: 'order_9A33XWu170gUtm', //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      handler: function (response) {
        // if (response.razorpay_payment_id) {
        //     notification.success({
        //         message: 'Success',
        //         description: 'Your order is placed successfully',
        //     })
        //   // navigate('/')
        // }
        // console.log(response.razorpay_payment_id)
        // console.log(response.razorpay_order_id)
        // console.log(response.razorpay_signature)
      },
      // prefill: {
      //   name: 'Gaurav Kumar',
      //   email: 'gaurav.kumar@example.com',
      //   contact: '9999999999',
      // },
      // notes: {
      //   address: 'Razorpay Corporate Office',
      // },
      // theme: {
      //   color: '#3399cc',
      // },
    }

    var paymentObject = new window.Razorpay(options)

    paymentObject.open()
  }

  const onPlaceOrder = async () => {
    setPaymentLoading(true)
    const paymentRes = await orderService.orderPaymentMethod({
      paymentId,
      paymentType: paymentMethod,
    })

    if (paymentRes) {
      console.log(paymentRes, 'show-razor')
      if (paymentMethod === 'PaymentLink') {
        setPaymentLoading(false)
        history.push('/app/dashboards/orders/orders-list')
        notification.success({
          message: 'Success',
          description: 'Payment Link is Sent to Customer',
        })
      } else {
        notification.success({
          message: 'Success',
          description: 'Your Payment Method is Proccessing Please wait...',
        })
      }

      // displayRazorPay()
      // if (selectedPaymentOption === 'Online' && razorpayItems?.amount) {
      //   displayRazorPay()
      // }
    }
    // if (selectedPaymentOption === 'Online') {
    //   displayRazorPay()
    // } else {
    //   toast.success('Your order is placed successfully')
    //   navigate('/')
    // }
  }

  useEffect(() => {
    if (razorpayItems?.amount) {
      displayRazorPay(razorpayItems?.amount, razorpayItems?.razorPayOrderId)
    }
  }, [razorpayItems])

  console.log(razorpayItems, 'showpls')

  return (
    <Card title="Select Payment Method">
      <div>
        <Radio.Group onChange={onChange} value={paymentMethod}>
          <Space direction="vertical">
            {availablePaymentMethods?.map((cur) => (
              <Radio value={cur.value}>{cur.label}</Radio>
            ))}
          </Space>
        </Radio.Group>
      </div>
      <div className="mt-4">
        <Button onClick={onPlaceOrder} type="primary" loading={paymentLoading}>
          Place Order
        </Button>
      </div>
    </Card>
  )
}

export default OrderComplete
