import fetch from 'auth/FetchInterceptor'

const orderService = {}
const api = '/order/vendor/view_all'
orderService.getOrders = async function (paginationQuery = '', query = '') {
  try {
    let url = `${api}?statusOtherThan=Failed&statusOtherThan=Pending&${paginationQuery}&${query}`
    const res = await fetch({
      url,
      method: 'get',
    })
    // const data = res.data.filter((cur) => cur.status !== 'Deleted')
    return res
  } catch (err) {
    console.log(err, 'show-err')
  }
}

orderService.getAllOrders = async function () {
  try {
    let url = `${api}`
    const res = await fetch({
      url,
      method: 'get',
    })
    // const data = res.data.filter((cur) => cur.status !== 'Deleted')
    return res
  } catch (err) {
    console.log(err, 'show-err')
  }
}

orderService.getOrderById = async function (id) {
  try {
    const res = await fetch({
      url: `/order/vendor/${id}`,
      method: 'get',
    })
    const data = res.data
    return data
  } catch (err) {
    console.log(err, 'show-err')
  }
}

orderService.updateOrderItemStatus = async function (id, data) {
  try {
    const res = await fetch({
      url: `/order/vendor/status/items/${id}`,
      method: 'put',
      data,
    })

    return res
  } catch (err) {
    console.log(err, 'show-err')
  }
}

orderService.cancelOrderItem = async function (id, data) {
  try {
    const res = await fetch({
      url: `/order/vendor/${id}`,
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
orderService.createVendorOrderInvoice = async function (orderId, data) {
  try {
    const res = await fetch({
      url: `/order/vendor/addVendorInvoice/${orderId}`,
      method: 'post',
      data,
    })

    return res
  } catch (err) {
    console.log(err, 'show-err')
  }
}

export default orderService
