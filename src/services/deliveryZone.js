import fetch from 'auth/FetchInterceptor'

const deliveryLocation = {}

deliveryLocation.getDeliveryZonesByVendorId = async function (vendorId) {
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

export default deliveryLocation
