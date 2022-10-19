import fetch from 'auth/FetchInterceptor'

const vendorService = {}
const apiRoute = '/vendors'

vendorService.getVendors = async function () {
  try {
    const res = await fetch({
      url: `${apiRoute}/all`,
      method: 'get',
    })
    const data = res.data.filter((cur) => cur.status !== 'Deleted')
    return data
  } catch (err) {
    console.log(err, 'show-err')
  }
}

vendorService.getVendorById = async function (id) {
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
vendorService.addVendor = async function (data) {
  try {
    const res = await fetch({
      url: `${apiRoute}`,
      method: 'post',
      data: data,
    })
    return res
  } catch (err) {
    console.log(err, 'show-err')
  }
}
vendorService.addPickUpLocation = async function (data) {
  try {
    const res = await fetch({
      url: `${apiRoute}/pickupLocation/new`,
      method: 'post',
      data: data,
    })
    return res
  } catch (err) {
    console.log(err, 'show-err')
  }
}
vendorService.verifyDocuments = async function (data,id) {
  try {
    const res = await fetch({
      url: `${apiRoute}/document/${id}/verify`,
      method: 'put',
      data: data,
    })
    return res
  } catch (err) {
    console.log(err, 'show-err')
  }
}
vendorService.uploadDocuments = async function (data,id) {
  try {
    const res = await fetch({
      url: `vendors/document/${id}`,
      method: 'put',
      data: data,
    })
    return res
  } catch (err) {
    console.log(err, 'show-err')
  }
}
vendorService.getDocuments = async function (data,id) {
  try {
    const res = await fetch({
      url: `vendors/document/${id}`,
      method: 'get',
      data: data,
    })
    return res
  } catch (err) {
    console.log(err, 'show-err')
  }
}
vendorService.editVendor = async function (id, data) {
  try {
    const res = await fetch({
      url: `${apiRoute}/${id}`,
      method: 'put',
      data,
    })
    return res
  } catch (err) {
    console.log(err, 'show-err')
  }
}

vendorService.editVendorStatus = async function (id, data) {
  try {
    const res = await fetch({
      url: `${apiRoute}/${id}/status`,
      method: 'put',
      data,
    })
    return res
  } catch (err) {
    console.log(err, 'show-err')
  }
}

export default vendorService
