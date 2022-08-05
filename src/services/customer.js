import fetch from 'auth/FetchInterceptor'

const customerService = {}
const apiRoute = '/customers'

customerService.getCustomers = async function () {
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

customerService.getCustomerById = async function (id) {
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

customerService.editCustomer = async function (id, data) {
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

customerService.ediCustomerStatus = async function (id, data) {
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

customerService.getCustomerPrescription = async function (id) {
  try {
    const res = await fetch({
      url: `${apiRoute}/prescriptions/${id}`,
      method: 'get',
    })
    return res.data
  } catch (err) {
    console.log(err, 'show-err')
  }
}

export default customerService
