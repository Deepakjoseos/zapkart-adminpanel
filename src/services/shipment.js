import fetch from 'auth/FetchInterceptor'

const shipmentService = {}
const apiRoute = '/shipment'

shipmentService.getShipments = async function () {
  try {
    const res = await fetch({
      url: `${apiRoute}`,
      method: 'get',
    })
    return res.data
  } catch (err) {
    console.log(err, 'show-err')
  }
}

// shipmentService.deleteComposition = async function (id) {
//   try {
//     const res = await fetch({
//       url: `${apiRoute}/${id}`,
//       method: 'delete',
//     })
//     //   const data = res.data.filter((cur) => cur.status !== 'Deleted')
//     return res
//   } catch (err) {
//     console.log(err, 'show-err')
//   }
// }

shipmentService.getShipmentById = async function (id) {
  try {
    const res = await fetch({
      url: `${apiRoute}/${id}`,
      method: 'get',
    })
    return res.data
  } catch (err) {
    console.log(err, 'show-err')
  }
}

shipmentService.createShipment = async function (data) {
  try {
    const res = await fetch({
      url: apiRoute,
      method: 'post',
      data: data,
    })
    return res
  } catch (err) {
    console.log(err, 'show-err')
  }
}

shipmentService.editShipment = async function (id, data) {
  try {
    const res = await fetch({
      url: `${apiRoute}/${id}`,
      method: 'put',
      data: data,
    })
    return res
  } catch (err) {
    console.log(err, 'show-err')
  }
}

export default shipmentService
