import fetch from 'auth/FetchInterceptor'

const deliveryLocation = {}

deliveryLocation.getDeliveryLocations = async function () {
  try {
    const res = await fetch({
      url: '/deliverylocations',
      method: 'get',
    })
    const data = res.data.filter((cur) => cur.status !== 'Deleted')
    return data
  } catch (err) {
    console.log(err, 'show-err')
  }
}

deliveryLocation.deleteDeliveryLocation = async function (id) {
  try {
    const res = await fetch({
      url: `/deliverylocations/${id}`,
      method: 'delete',
    })
    //   const data = res.data.filter((cur) => cur.status !== 'Deleted')
    return res
  } catch (err) {
    console.log(err, 'show-err')
  }
}

deliveryLocation.getDeliveryLocationById = async function (id) {
  try {
    const res = await fetch({
      url: `/deliverylocations/${id}`,
      method: 'get',
    })
    return res.data
  } catch (err) {
    console.log(err, 'show-err')
  }
}

deliveryLocation.createDeliveryLocation = async function (data) {
  try {
    const res = await fetch({
      url: `/deliverylocations`,
      method: 'post',
      data: data,
    })
    return res
  } catch (err) {
    console.log(err, 'show-err')
  }
}

deliveryLocation.editDeliveryLocation = async function (id, data) {
  try {
    const res = await fetch({
      url: `/deliverylocations/${id}`,
      method: 'put',
      data: data,
    })
    return res
  } catch (err) {
    console.log(err, 'show-err')
  }
}

export default deliveryLocation
