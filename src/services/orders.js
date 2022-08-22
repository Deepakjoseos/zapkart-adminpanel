import { notification } from 'antd'
import fetch from 'auth/FetchInterceptor'

const orderService = {}

const api = '/order/admin/view_all'
orderService.getOrders = async function (query) {
  try {
    let url = `${api}`
    const status = query?.status
    const userId = query?.userId
    const limit = query?.limit

    if (status) url = `${url}?status=${status}`
    if (userId)
      url =
        status && status !== null
          ? `${url}&userId=${userId}`
          : `${url}?userId=${userId}`

    if (limit)
      url =
        (status && status !== null) || (userId && userId !== null)
          ? `${url}&limit=${limit}`
          : `${url}?limit=${limit}`

    const res = await fetch({
      url,
      method: 'get',
    })
    const data = res.data.filter((cur) => cur.status !== 'Deleted')
    return data
  } catch (err) {
    console.log(err, 'show-err')
  }
}

orderService.getOrderById = async function (id) {
  try {
    const res = await fetch({
      url: `/order/admin/${id}`,
      method: 'get',
    })
    const data = res.data
    return data
  } catch (err) {
    console.log(err, 'show-err')
  }
}

orderService.updateOrderStatus = async function (id, status) {
  try {
    const res = await fetch({
      url: `/order/admin/status/${id}/${status}`,
      method: 'put',
    })

    return res
  } catch (err) {
    console.log(err, 'show-err')
  }
}

orderService.updateOrderItemStatus = async function (id, data) {
  try {
    const res = await fetch({
      url: `/order/admin/status/items/${id}`,
      method: 'put',
      data,
    })

    return res
  } catch (err) {
    console.log(err, 'show-err')
  }
}

orderService.createOrder = async function (userId, data) {
  try {
    const res = await fetch({
      url: `/order/admin/request/${userId}`,
      method: 'post',
      data,
    })

    return res
  } catch (err) {
    try {
      const parsedErr = JSON.parse(err.response.data.detail)
      if (parsedErr) {
        parsedErr.forEach((cur) => {
          notification.error({
            message: cur.type,
            description: cur.item.name,
          })
        })
      }
    } catch (err) {
      notification.error({
        message: 'Error',
        description: err.response.data.detail,
      })
    }

    console.log(err, 'show-err')
  }
}

orderService.cancelOrder = async function (orderId) {
  try {
    const res = await fetch({
      url: `/order/admin/${orderId}`,
      method: 'put',
    })

    return res
  } catch (err) {
    console.log(err, 'show-err')
  }
}

orderService.cancelOrderItem = async function (id, data) {
  try {
    const res = await fetch({
      url: `/order/admin/${id}`,
      method: 'post',
      data: [data],
    })

    return res
  } catch (err) {
    console.log(err, 'show-err')
  }
}

orderService.orderPaymentMethod = async function (data) {
  try {
    const res = await fetch({
      url: `/payment/paymentMethod`,
      method: 'post',
      data: data,
    })
    // alert(JSON.stringify(res.data))
    return res
  } catch (err) {
    const parsedErr = JSON.parse(err.response.data.detail)

    if (parsedErr) {
      parsedErr.forEach((cur) => {
        notification.error({
          message: cur.type,
          description: cur.item.name,
        })
      })
    }
  }
}

// orderService.getProductById = async function (id) {
//   try {
//     const res = await fetch({
//       url: `/products/${id}`,
//       method: 'get',
//     })
//     return res.data
//   } catch (err) {
//     console.log(err, 'show-err')
//   }
// }

// orderService.setPost = function (data) {
//   return fetch({
//     url: '/posts',
//     method: 'post',
//     data: data
//   })
// }

export default orderService
