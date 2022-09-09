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
      url: `${apiRoute}/create`,
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

shipmentService.getPickupLocations = async function () {
  try {
    const res = await fetch({
      url: `${apiRoute}/pickupLocations/get_all`,
      method: 'get',
    })
    return res.data
  } catch (err) {
    console.log(err, 'show-err')
  }
}

shipmentService.createPickupLocation = async function (data) {
  try {
    const res = await fetch({
      url: `/vendors/pickuplocation/new/${data.vendorId}`,
      method: 'post',
      data,
    })
    return res
  } catch (err) {
    console.log(err, 'show-err')
  }
}

shipmentService.changePickupLocation = async function (data) {
  try {
    const res = await fetch({
      url: `${apiRoute}/pickupLocations`,
      method: 'put',
      data,
    })
    return res
  } catch (err) {
    console.log(err, 'show-err')
  }
}

shipmentService.requestPickupOrder = async function (data) {
  try {
    const res = await fetch({
      url: `${apiRoute}/pickupOrder/request`,
      method: 'post',
      data: data,
    })
    return res
  } catch (err) {
    console.log(err, 'show-err')
  }
}

shipmentService.shipmentCancel = async function (data) {
  try {
    const res = await fetch({
      url: `${apiRoute}/cancel`,
      method: 'post',
      data: data,
    })
    return res
  } catch (err) {
    console.log(err, 'show-err')
  }
}

shipmentService.checkIfDeliverable = async function (data) {
  try {
    const res = await fetch({
      url: `${apiRoute}/checkIfDeliverable`,
      method: 'post',
      data: data,
    })
    return res.data?.available_courier_companies
  } catch (err) {
    console.log(err, 'show-err')
  }
}

// Generate Api's
shipmentService.generateAwb = async function (data) {
  console.log('data',data)
  try {
    const res = await fetch({
      url: `${apiRoute}/generateAwb`,
      method: 'post',
      data,
    })

    return res
  } catch (err) {
    console.log(err, 'show-err')
  }
}

shipmentService.generateManifest = async function (data) {
  try {
    const res = await fetch({
      url: `${apiRoute}/generateManifest`,
      method: 'post',
      data,
    })
    return res
  } catch (err) {
    console.log(err, 'show-err')
  }
}
shipmentService.generateLabel = async function (data) {
  try {
    const res = await fetch({
      url: `${apiRoute}/generateLabel`,
      method: 'post',
      data,
    })
    return res
  } catch (err) {
    console.log(err, 'show-err')
  }
}
shipmentService.generateInvoice = async function (data) {
  try {
    const res = await fetch({
      url: `${apiRoute}/generateInvoice`,
      method: 'post',
      data,
    })
    return res
  } catch (err) {
    console.log(err, 'show-err')
  }
}

export default shipmentService
