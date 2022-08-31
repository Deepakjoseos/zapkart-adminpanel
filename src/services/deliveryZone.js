import fetch from 'auth/FetchInterceptor'

const deliveryzoneService = {}
const api='/deliveryzones/public'
deliveryzoneService.getDeliveryZones = async function (query) {
  // try {
  //   const res = await fetch({
  //     url: `/deliveryzones/public?${
  //       vendorId && `vendorId=${vendorId}`
  //     }&status=Active`,
  //     method: 'get',
  //   })
  //   return res.data
  // } catch (err) {
  //   console.log(err, 'show-err')
  // }

  try {
    let url = `${api}`
  
     const status = query?.status
    const vendorId = query?.vendorId
    
    if (vendorId) url = `${url}?vendorId=${vendorId}`

      if (status)
     url =
       vendorId && vendorId !== null
         ? `${url}&status=${status}`
         : `${url}?status=${status}`
   

    const res = await fetch({
      url,
      method: 'get',
    })
    return res.data
  } catch (err) {
    console.log(err, 'show-err')
  }
}

deliveryzoneService.getDeliveryZonesByVendorId = async function (vendorId) {
  try {
    const res = await fetch({
      url: `/deliveryzones/public?vendorId=${vendorId}&status=Active`,
      method: 'get',
    })

    return res.data
  } catch (err) {
    console.log(err, 'show-err')
  }
}
deliveryzoneService.getDeliveryZoneById = async function (id) {
  try {
    const res = await fetch({
      url: `/deliveryzones/${id}/public`,
      method: 'get',
    })
    return res.data
  } catch (err) {
    console.log(err, 'show-err')
  }
}
deliveryzoneService.createDeliveryZone = async function (data) {
  try {
    const res = await fetch({
      url: `/deliveryzones/${data.vendorId}/admin`,
      method: 'post',
      data: data,
    })
    return res
  } catch (err) {
    console.log(err, 'show-err')
  }
}
deliveryzoneService.editDeliveryZone = async function (id, data) {
  try {
    const res = await fetch({
      url: `/deliveryzones/${id}/${data.vendorId}/admin`,
      method: 'put',
      data: data,
    })
    return res
  } catch (err) {
    console.log(err, 'show-err')
  }
}
deliveryzoneService.addDeliveryLocationZone = async function (
  deliveryZoneId,
  deliveryLocationId,
  vendorId
) {
  try {
    const res = await fetch({
      url: `/deliveryZones/${deliveryZoneId}/${deliveryLocationId}/${vendorId}/admin`,
      method: 'post',
    })
    return res
  } catch (err) {
    console.log(err, 'show-err')
  }
}

deliveryzoneService.removeDeliveryLocationZone = async function (
  deliveryZoneId,
  deliveryLocationId,
  vendorId
) {
  try {
    const res = await fetch({
      url: `/deliveryZones/${deliveryZoneId}/${deliveryLocationId}/${vendorId}/admin`,
      method: 'delete',
    })
    return res
  } catch (err) {
    console.log(err, 'show-err')
  }
}

 
export default deliveryzoneService
