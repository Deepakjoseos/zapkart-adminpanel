import fetch from 'auth/FetchInterceptor'

const deliveryLocation = {}

deliveryLocation.getDeliveryZones = async function () {
  try {
    const res = await fetch({
      url: '/deliveryzones',
      method: 'get',
    })
    return res.data
  } catch (err) {
    console.log(err, 'show-err')
  }
}

deliveryLocation.deleteDeliveryZone = async function (id) {
  try {
    const res = await fetch({
      url: `/deliveryZones/${id}`,
      method: 'delete',
    })
    //   const data = res.data.filter((cur) => cur.status !== 'Deleted')
    return res
  } catch (err) {
    console.log(err, 'show-err')
  }
}

deliveryLocation.getDeliveryZoneById = async function (id) {
  try {
    const res = await fetch({
      url: `/deliveryZones/${id}`,
      method: 'get',
    })
    return res.data
  } catch (err) {
    console.log(err, 'show-err')
  }
}

deliveryLocation.createDeliveryZone = async function (data) {
  try {
    const res = await fetch({
      url: `/deliveryZones`,
      method: 'post',
      data: data,
    })
    return res
  } catch (err) {
    console.log(err, 'show-err')
  }
}

deliveryLocation.addDeliveryLocationZone = async function (
  deliveryZoneId,
  deliveryLocationId
) {
  try {
    const res = await fetch({
      url: `/deliveryZones/${deliveryZoneId}/${deliveryLocationId}`,
      method: 'post',
    })
    return res
  } catch (err) {
    console.log(err, 'show-err')
  }
}

deliveryLocation.removeDeliveryLocationZone = async function (
  deliveryZoneId,
  deliveryLocationId
) {
  try {
    const res = await fetch({
      url: `/deliveryZones/${deliveryZoneId}/${deliveryLocationId}`,
      method: 'delete',
    })
    return res
  } catch (err) {
    console.log(err, 'show-err')
  }
}

deliveryLocation.editDeliveryZone = async function (id, data) {
  try {
    const res = await fetch({
      url: `/deliveryZones/${id}`,
      method: 'put',
      data: data,
    })
    return res
  } catch (err) {
    console.log(err, 'show-err')
  }
}

export default deliveryLocation
