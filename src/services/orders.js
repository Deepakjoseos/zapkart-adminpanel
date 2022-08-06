import fetch from 'auth/FetchInterceptor'

const orderService = {}

orderService.getOrders = async function () {
  try {
    const res = await fetch({
      url: '/order/admin/view_all',
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

orderService.cancelOrder = async function (userId, orderId) {
  try {
    const res = await fetch({
      url: `/order/admin/${userId}/${orderId}`,
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
